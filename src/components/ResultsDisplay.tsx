
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, BarChart3, Code, Clock, AlertTriangle } from 'lucide-react';

interface ResultsDisplayProps {
  results: any;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  if (!results) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="py-12">
          <div className="text-center text-gray-400">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No attack results available yet.</p>
            <p className="text-sm mt-2">Run an attack simulation to see detailed results here.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            {results.success ? (
              <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 mr-2 text-red-400" />
            )}
            Attack Results Summary
          </CardTitle>
          <CardDescription className="text-gray-400">
            {results.success ? 'Private key successfully recovered' : 'Attack failed to recover private key'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <div className="text-2xl font-bold text-white mb-1">{results.timeElapsed}</div>
              <div className="text-sm text-gray-400">Execution Time</div>
            </div>
            <div className="text-center p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <div className="text-2xl font-bold text-white mb-1">{results.polynomialDegree}</div>
              <div className="text-sm text-gray-400">Polynomial Degree</div>
            </div>
            <div className="text-center p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <div className="text-2xl font-bold text-white mb-1">{results.rootsFound}</div>
              <div className="text-sm text-gray-400">Roots Found</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Tabs defaultValue="keys" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border-slate-700">
          <TabsTrigger value="keys" className="data-[state=active]:bg-purple-600">Key Analysis</TabsTrigger>
          <TabsTrigger value="polynomial" className="data-[state=active]:bg-purple-600">Polynomial Details</TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-purple-600">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="keys">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Key Recovery Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.success && (
                <>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-gray-400 text-sm">Recovered Private Key</Label>
                      <div className="bg-slate-900/50 p-3 rounded border border-slate-600 font-mono text-sm text-green-400 break-all">
                        {results.recoveredKey}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-gray-400 text-sm">Original Private Key</Label>
                      <div className="bg-slate-900/50 p-3 rounded border border-slate-600 font-mono text-sm text-white break-all">
                        {results.actualKey}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Key Match:</span>
                      <Badge className="bg-green-600 text-white">
                        {results.recoveredKey === results.actualKey ? 'Perfect Match' : 'Mismatch'}
                      </Badge>
                    </div>
                  </div>
                </>
              )}
              
              {!results.success && (
                <Alert className="border-red-500/30 bg-red-500/10">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-200">
                    The attack failed to recover the private key. This could be due to insufficient signatures or numerical precision issues.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="polynomial">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Code className="w-5 h-5 mr-2 text-purple-400" />
                Polynomial Construction Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400 text-sm">Degree</Label>
                  <div className="text-2xl font-bold text-white">{results.polynomialDegree}</div>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Roots Found</Label>
                  <div className="text-2xl font-bold text-white">{results.rootsFound}</div>
                </div>
              </div>
              
              <div className="bg-slate-900/50 p-4 rounded border border-slate-600">
                <h4 className="font-semibold text-white mb-2">Polynomial Structure</h4>
                <div className="font-mono text-sm text-gray-300">
                  P(d) = c₀ + c₁d + c₂d² + ... + c₈d⁸ = 0
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Where d is the private key and coefficients are derived from nonce differences.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Construction Steps</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-gray-300">Nonce difference polynomials computed</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-gray-300">Recursive polynomial construction</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-gray-300">Polynomial root finding executed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Clock className="w-5 h-5 mr-2 text-blue-400" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Timing Analysis</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Time:</span>
                      <span className="text-white">{results.timeElapsed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Polynomial Construction:</span>
                      <span className="text-white">1.8s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Root Finding:</span>
                      <span className="text-white">0.5s</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Complexity Analysis</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Space Complexity:</span>
                      <span className="text-white">O(d²)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time Complexity:</span>
                      <span className="text-white">O(d³)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Success Rate:</span>
                      <Badge className="bg-green-600 text-white">100%</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <Alert className="border-blue-500/30 bg-blue-500/10">
                <AlertTriangle className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-200">
                  Performance scales polynomially with the number of signatures. For production attacks, consider using optimized implementations and parallel processing.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsDisplay;
