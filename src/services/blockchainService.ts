
interface BlockchainTransaction {
  txid: string;
  blockHeight: number;
  timestamp: number;
  inputs: {
    signature: string;
    publicKey: string;
    r: string;
    s: string;
    messageHash: string;
  }[];
}

interface VulnerabilityResult {
  txid1: string;
  txid2: string;
  sharedR: string;
  privateKey?: string;
  publicKey: string;
  vulnerability: 'nonce_reuse' | 'weak_k' | 'linear_recurrence';
}

class BlockchainService {
  private baseUrl = 'https://blockstream.info/api';
  
  async fetchRecentBlocks(count: number = 10): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/blocks`);
      const blocks = await response.json();
      return blocks.slice(0, count);
    } catch (error) {
      console.error('Error fetching blocks:', error);
      return [];
    }
  }
  
  async fetchBlockTransactions(blockHash: string): Promise<BlockchainTransaction[]> {
    try {
      const response = await fetch(`${this.baseUrl}/block/${blockHash}/txs`);
      const txs = await response.json();
      
      return txs.map((tx: any) => ({
        txid: tx.txid,
        blockHeight: tx.status.block_height,
        timestamp: tx.status.block_time,
        inputs: tx.vin.map((input: any) => ({
          signature: input.scriptsig,
          publicKey: input.witness?.[1] || '',
          r: this.extractRFromSignature(input.scriptsig),
          s: this.extractSFromSignature(input.scriptsig),
          messageHash: tx.txid // Simplified
        })).filter((input: any) => input.r && input.s)
      })).filter((tx: BlockchainTransaction) => tx.inputs.length > 0);
    } catch (error) {
      console.error('Error fetching block transactions:', error);
      return [];
    }
  }
  
  private extractRFromSignature(scriptsig: string): string {
    // Extract R value from DER encoded signature
    if (!scriptsig || scriptsig.length < 20) return '';
    try {
      const sigBytes = scriptsig.substring(0, 144); // First 72 bytes typically
      const rStart = 8; // Skip DER header
      const rLength = parseInt(sigBytes.substring(6, 8), 16) * 2;
      return sigBytes.substring(rStart, rStart + rLength);
    } catch {
      return '';
    }
  }
  
  private extractSFromSignature(scriptsig: string): string {
    // Extract S value from DER encoded signature
    if (!scriptsig || scriptsig.length < 20) return '';
    try {
      const sigBytes = scriptsig.substring(0, 144);
      const rLength = parseInt(sigBytes.substring(6, 8), 16) * 2;
      const sStart = 8 + rLength + 4; // Skip R and S length indicator
      const sLength = parseInt(sigBytes.substring(8 + rLength + 2, 8 + rLength + 4), 16) * 2;
      return sigBytes.substring(sStart, sStart + sLength);
    } catch {
      return '';
    }
  }
  
  async analyzeForVulnerabilities(transactions: BlockchainTransaction[]): Promise<VulnerabilityResult[]> {
    const vulnerabilities: VulnerabilityResult[] = [];
    const rValues = new Map<string, { tx: BlockchainTransaction, inputIndex: number }[]>();
    
    // Group transactions by R value
    transactions.forEach(tx => {
      tx.inputs.forEach((input, index) => {
        if (input.r) {
          if (!rValues.has(input.r)) {
            rValues.set(input.r, []);
          }
          rValues.get(input.r)!.push({ tx, inputIndex: index });
        }
      });
    });
    
    // Find R value reuse (potential nonce reuse)
    rValues.forEach((txsWithSameR, rValue) => {
      if (txsWithSameR.length > 1) {
        for (let i = 0; i < txsWithSameR.length - 1; i++) {
          for (let j = i + 1; j < txsWithSameR.length; j++) {
            const tx1 = txsWithSameR[i];
            const tx2 = txsWithSameR[j];
            
            vulnerabilities.push({
              txid1: tx1.tx.txid,
              txid2: tx2.tx.txid,
              sharedR: rValue,
              publicKey: tx1.tx.inputs[tx1.inputIndex].publicKey,
              vulnerability: 'nonce_reuse',
              privateKey: this.calculatePrivateKeyFromNonceReuse(
                tx1.tx.inputs[tx1.inputIndex],
                tx2.tx.inputs[tx2.inputIndex]
              )
            });
          }
        }
      }
    });
    
    return vulnerabilities;
  }
  
  private calculatePrivateKeyFromNonceReuse(input1: any, input2: any): string | undefined {
    // Simplified private key recovery from nonce reuse
    // In reality, this requires complex elliptic curve arithmetic
    try {
      if (input1.r === input2.r && input1.s !== input2.s) {
        // This is a placeholder - real implementation would use secp256k1 math
        return '0x' + 'recovered_private_key_placeholder_' + Date.now().toString(16);
      }
    } catch (error) {
      console.error('Error calculating private key:', error);
    }
    return undefined;
  }
}

export const blockchainService = new BlockchainService();
