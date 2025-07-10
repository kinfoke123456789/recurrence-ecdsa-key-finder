
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
    
    // Simulate the attack progression
    const steps = [10, 25, 40, 55, 70, 85, 100];
    for (let step of steps) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setAttackProgress(step);
    }
    
    // Simulate successful key recovery
    setResults({
      success: true,
      recoveredKey: '0x2f4a8b3c9d1e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2',
      actualKey: '0x2f4a8b3c9d1e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2',
      polynomialDegree: 8,
      rootsFound: 1,
      timeElapsed: '2.3s'
    });
    
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
            ECDSA Nonce Attack Simulator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore how linear recurrence relations in ECDSA nonces can be exploited to recover private keys through polynomial root finding
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
              Cryptographic Analysis
            </Badge>
            <Badge variant="secondary" className="bg-red-600/20 text-red-300 border-red-500/30">
              Educational Purpose
            </Badge>
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30">
              SageMath Implementation
            </Badge>
          </div>
        </div>

        {/* Warning Alert */}
        <Alert className="mb-8 border-amber-500/30 bg-amber-500/10">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200">
            This tool demonstrates a serious vulnerability in ECDSA implementations. Never use predictable nonces in production cryptographic systems.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="attack" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="attack" className="data-[state=active]:bg-purple-600">Attack Demo</TabsTrigger>
            <TabsTrigger value="theory" className="data-[state=active]:bg-purple-600">Mathematical Background</TabsTrigger>
            <TabsTrigger value="parameters" className="data-[state=active]:bg-purple-600">Parameters</TabsTrigger>
            <TabsTrigger value="results" className="data-[state=active]:bg-purple-600">Results Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="attack" className="space-y-6">
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
                        Launch Attack
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

          <TabsContent value="parameters">
            <ParameterPanel 
              parameters={parameters}
              setParameters={setParameters}
            />
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
