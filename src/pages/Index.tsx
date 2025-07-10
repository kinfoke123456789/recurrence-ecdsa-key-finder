import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Lock, Unlock, Calculator, Zap, Shield, AlertTriangle } from 'lucide-react';
import AttackVisualization from '@/components/AttackVisualization';
import ParameterPanel from '@/components/ParameterPanel';
import ResultsDisplay from '@/components/ResultsDisplay';
import MathematicalBackground from '@/components/MathematicalBackground';
import RealDataAnalysis from '@/components/RealDataAnalysis';

// Utility function to generate random hex string
const generateRandomHex = (length: number) => {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Utility function to generate realistic private key
const generatePrivateKey = () => {
  return '0x' + generateRandomHex(64); // 256-bit key
};

// Utility function to calculate polynomial degree
const calculatePolynomialDegree = (N: number) => {
  let sum = 0;
  for (let i = 1; i <= N - 3; i++) {
    sum += i;
  }
  return 1 + sum;
};

const Index = () => {
  const [attackProgress, setAttackProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [parameters, setParameters] = useState({
    N: 7,
    curve: 'SECP256k1',
    privateKey: null,
    nonces: [],
    signatures: []
  });

  const simulateAttack = async () => {
    setIsRunning(true);
    setAttackProgress(0);
    setResults(null);
    
    // Generate a new random private key for this attack
    const actualKey = generatePrivateKey();
    const recoveredKey = actualKey; // In a real attack, this would be computed
    
    console.log('Starting attack simulation with parameters:', parameters);
    console.log('Generated private key:', actualKey);
    
    // Simulate the attack progression with more realistic timing
    const steps = [15, 30, 45, 60, 75, 90, 100];
    const delays = [400, 500, 600, 700, 800, 600, 400]; // Variable delays for realism
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, delays[i]));
      setAttackProgress(steps[i]);
      console.log(`Attack progress: ${steps[i]}%`);
    }
    
    // Calculate realistic polynomial degree based on N
    const polynomialDegree = calculatePolynomialDegree(parameters.N);
    
    // Simulate execution time based on polynomial degree
    const baseTime = 1.2;
    const complexityFactor = Math.pow(polynomialDegree / 8, 1.5);
    const executionTime = (baseTime * complexityFactor).toFixed(1) + 's';
    
    // Generate realistic results
    const attackResults = {
      success: Math.random() > 0.1, // 90% success rate for demo
      recoveredKey: recoveredKey,
      actualKey: actualKey,
      polynomialDegree: polynomialDegree,
      rootsFound: Math.floor(Math.random() * 3) + 1, // 1-3 roots
      timeElapsed: executionTime,
      signaturesUsed: parameters.N,
      curve: parameters.curve
    };
    
    console.log('Attack completed with results:', attackResults);
    setResults(attackResults);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Shield className="w-16 h-16 text-purple-400 mr-4" />
              <Zap className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ECDSA Vulnerability Scanner
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real-time blockchain analysis for ECDSA nonce vulnerabilities and private key recovery from actual transaction data
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge variant="secondary" className="bg-green-600/20 text-green-300 border-green-500/30">
              Live Blockchain Data
            </Badge>
            <Badge variant="secondary" className="bg-red-600/20 text-red-300 border-red-500/30">
              Real Vulnerability Detection
            </Badge>
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30">
              Private Key Recovery
            </Badge>
          </div>
        </div>

        {/* Warning Alert */}
        <Alert className="mb-8 border-amber-500/30 bg-amber-500/10">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200">
            This tool analyzes real blockchain data for actual vulnerabilities. Use responsibly and only for legitimate security research.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="live-analysis" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="live-analysis" className="data-[state=active]:bg-purple-600">Live Analysis</TabsTrigger>
            <TabsTrigger value="simulation" className="data-[state=active]:bg-purple-600">Demo Mode</TabsTrigger>
            <TabsTrigger value="theory" className="data-[state=active]:bg-purple-600">Mathematical Background</TabsTrigger>
            <TabsTrigger value="results" className="data-[state=active]:bg-purple-600">Results Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="live-analysis">
            <RealDataAnalysis />
          </TabsContent>

          <TabsContent value="simulation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Calculator className="w-5 h-5 mr-2 text-purple-400" />
                    Attack Configuration
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure the parameters for the ECDSA nonce attack
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="signatures" className="text-gray-300">Number of Signatures (N)</Label>
                      <Input
                        id="signatures"
                        type="number"
                        value={parameters.N}
                        onChange={(e) => setParameters({...parameters, N: parseInt(e.target.value)})}
                        className="bg-slate-700 border-slate-600 text-white"
                        min="4"
                        max="10"
                        disabled={isRunning}
                      />
                    </div>
                    <div>
                      <Label htmlFor="curve" className="text-gray-300">Elliptic Curve</Label>
                      <Input
                        id="curve"
                        value={parameters.curve}
                        onChange={(e) => setParameters({...parameters, curve: e.target.value})}
                        className="bg-slate-700 border-slate-600 text-white"
                        readOnly
                      />
                    </div>
                  </div>
                  
                  <Separator className="bg-slate-600" />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Attack Progress</span>
                      <span className="text-purple-400">{attackProgress}%</span>
                    </div>
                    <Progress value={attackProgress} className="h-2" />
                  </div>

                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex justify-between">
                      <span>Polynomial Degree:</span>
                      <span className="text-white">{calculatePolynomialDegree(parameters.N)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expected Complexity:</span>
                      <span className="text-white">O(d³)</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={simulateAttack}
                    disabled={isRunning}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {isRunning ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Running Attack...
                      </>
                    ) : (
                      <>
                        <Unlock className="w-4 h-4 mr-2" />
                        Launch New Attack
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <AttackVisualization 
                progress={attackProgress}
                isRunning={isRunning}
                results={results}
              />
            </div>
          </TabsContent>

          <TabsContent value="theory">
            <MathematicalBackground />
          </TabsContent>

          <TabsContent value="results">
            <ResultsDisplay results={results} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
