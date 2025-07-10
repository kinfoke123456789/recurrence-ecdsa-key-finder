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
import { Lock, Unlock, Calculator, Zap, Shield, AlertTriangle, ExternalLink, Globe, BarChart3, History, Activity } from 'lucide-react';
import AttackVisualization from '@/components/AttackVisualization';
import ParameterPanel from '@/components/ParameterPanel';
import ResultsDisplay from '@/components/ResultsDisplay';
import MathematicalBackground from '@/components/MathematicalBackground';
import RealDataAnalysis from '@/components/RealDataAnalysis';
import VulnerabilityDetails from '@/components/VulnerabilityDetails';
import LiveBlockchain from '@/components/LiveBlockchain';
import VulnerabilityHistory from '@/components/VulnerabilityHistory';
import AdvancedAnalytics from '@/components/AdvancedAnalytics';

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
  const [activeTab, setActiveTab] = useState('live-blockchain');
  const [selectedVulnerability, setSelectedVulnerability] = useState(null);
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
    
    const actualKey = generatePrivateKey();
    const recoveredKey = actualKey;
    
    console.log('Starting attack simulation with parameters:', parameters);
    console.log('Generated private key:', actualKey);
    
    const steps = [15, 30, 45, 60, 75, 90, 100];
    const delays = [400, 500, 600, 700, 800, 600, 400];
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, delays[i]));
      setAttackProgress(steps[i]);
      console.log(`Attack progress: ${steps[i]}%`);
    }
    
    const polynomialDegree = calculatePolynomialDegree(parameters.N);
    const baseTime = 1.2;
    const complexityFactor = Math.pow(polynomialDegree / 8, 1.5);
    const executionTime = (baseTime * complexityFactor).toFixed(1) + 's';
    
    const attackResults = {
      success: Math.random() > 0.1,
      recoveredKey: recoveredKey,
      actualKey: actualKey,
      polynomialDegree: polynomialDegree,
      rootsFound: Math.floor(Math.random() * 3) + 1,
      timeElapsed: executionTime,
      signaturesUsed: parameters.N,
      curve: parameters.curve
    };
    
    console.log('Attack completed with results:', attackResults);
    setResults(attackResults);
    setIsRunning(false);
  };

  const handleTabChange = (value: string) => {
    console.log('Switching to tab:', value);
    setActiveTab(value);
  };

  const handleVulnerabilitySelect = (vulnerability: any) => {
    console.log('Selected vulnerability:', vulnerability);
    setSelectedVulnerability(vulnerability);
  };

  const handleViewExplorer = (txid: string) => {
    const explorerUrl = `https://blockstream.info/tx/${txid}`;
    window.open(explorerUrl, '_blank');
  };

  const handleNewVulnerability = (vulnerability: any) => {
    console.log('New vulnerability detected from live scan:', vulnerability);
    setSelectedVulnerability(vulnerability);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Shield className="w-16 h-16 text-purple-400 mr-4" />
              <Zap className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Advanced ECDSA Security Suite
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Next-generation blockchain security analysis with real-time vulnerability detection, advanced cryptographic recovery, and comprehensive threat intelligence
          </p>
          <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
            <Badge variant="secondary" className="bg-green-600/20 text-green-300 border-green-500/30">
              Live Network Monitoring
            </Badge>
            <Badge variant="secondary" className="bg-red-600/20 text-red-300 border-red-500/30">
              Advanced Cryptanalysis
            </Badge>
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30">
              ML-Enhanced Detection
            </Badge>
            <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
              Real-time Analytics
            </Badge>
          </div>
        </div>

        {/* Warning Alert */}
        <Alert className="mb-8 border-amber-500/30 bg-amber-500/10">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200">
            This advanced security suite analyzes real blockchain data for cryptographic vulnerabilities. Use responsibly and only for legitimate security research and penetration testing.
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="live-blockchain" className="data-[state=active]:bg-purple-600">
              <Globe className="w-4 h-4 mr-2" />
              Live Network
            </TabsTrigger>
            <TabsTrigger value="live-analysis" className="data-[state=active]:bg-purple-600">
              <Activity className="w-4 h-4 mr-2" />
              Real Analysis
            </TabsTrigger>
            <TabsTrigger value="simulation" className="data-[state=active]:bg-purple-600">
              <Calculator className="w-4 h-4 mr-2" />
              Demo Mode
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-purple-600">
              <History className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger value="theory" className="data-[state=active]:bg-purple-600">
              <Shield className="w-4 h-4 mr-2" />
              Theory
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live-blockchain">
            <LiveBlockchain onNewVulnerability={handleNewVulnerability} />
            {selectedVulnerability && (
              <div className="mt-6">
                <VulnerabilityDetails 
                  vulnerability={selectedVulnerability}
                  onViewExplorer={handleViewExplorer}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="live-analysis">
            <RealDataAnalysis onVulnerabilitySelect={handleVulnerabilitySelect} />
            {selectedVulnerability && (
              <div className="mt-6">
                <VulnerabilityDetails 
                  vulnerability={selectedVulnerability}
                  onViewExplorer={handleViewExplorer}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="simulation" className="space-y-6">
            <ParameterPanel 
              parameters={parameters} 
              setParameters={setParameters} 
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Calculator className="w-5 h-5 mr-2 text-purple-400" />
                    Attack Configuration
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure the parameters for the ECDSA nonce attack simulation
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
                        className="bg-slate-700 border-slate-600 text-white mt-2"
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
                        className="bg-slate-700 border-slate-600 text-white mt-2"
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

          <TabsContent value="analytics">
            <AdvancedAnalytics />
          </TabsContent>

          <TabsContent value="history">
            <VulnerabilityHistory onViewDetails={handleVulnerabilitySelect} />
            {selectedVulnerability && (
              <div className="mt-6">
                <VulnerabilityDetails 
                  vulnerability={selectedVulnerability}
                  onViewExplorer={handleViewExplorer}
                />
              </div>
            )}
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
