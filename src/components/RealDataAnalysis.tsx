
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Database, 
  Search, 
  Zap,
  ExternalLink,
  Clock
} from 'lucide-react';
import { blockchainService } from '@/services/blockchainService';
import { cryptoAnalysisService } from '@/services/cryptoAnalysisService';

interface AnalysisResult {
  sessionId: string;
  blocksAnalyzed: number;
  transactionsAnalyzed: number;
  vulnerabilitiesFound: number;
  status: 'running' | 'completed' | 'error';
  progress: number;
  vulnerabilities: any[];
}

const RealDataAnalysis = () => {
  const [analysisParams, setAnalysisParams] = useState({
    startBlock: 850000,
    endBlock: 850010,
    curve: 'secp256k1'
  });
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [recentVulnerabilities, setRecentVulnerabilities] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [liveStats, setLiveStats] = useState({
    totalScanned: 0,
    vulnerabilitiesFound: 0,
    criticalIssues: 0,
    lastUpdate: Date.now()
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (isAnalyzing && currentAnalysis) {
        setCurrentAnalysis(prev => {
          if (!prev) return null;
          return {
            ...prev,
            progress: Math.min(prev.progress + Math.random() * 10, 100),
            blocksAnalyzed: prev.blocksAnalyzed + Math.floor(Math.random() * 3),
            transactionsAnalyzed: prev.transactionsAnalyzed + Math.floor(Math.random() * 50),
          };
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAnalyzing, currentAnalysis]);

  const startRealAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      console.log('Starting real blockchain analysis...');
      
      // Initialize analysis session
      const sessionId = await cryptoAnalysisService.startAnalysis(analysisParams);
      
      setCurrentAnalysis({
        sessionId,
        blocksAnalyzed: 0,
        transactionsAnalyzed: 0,
        vulnerabilitiesFound: 0,
        status: 'running',
        progress: 0,
        vulnerabilities: []
      });

      // Poll for updates
      const pollInterval = setInterval(async () => {
        const session = cryptoAnalysisService.getSessionStatus(sessionId);
        if (session) {
          const progress = session.status === 'completed' ? 100 : 
            Math.min((session.blocksAnalyzed / (analysisParams.endBlock - analysisParams.startBlock + 1)) * 100, 95);
          
          setCurrentAnalysis({
            sessionId: session.id,
            blocksAnalyzed: session.blocksAnalyzed,
            transactionsAnalyzed: session.transactionsAnalyzed,
            vulnerabilitiesFound: session.vulnerabilitiesFound,
            status: session.status,
            progress,
            vulnerabilities: session.results
          });

          if (session.status === 'completed' || session.status === 'error') {
            clearInterval(pollInterval);
            setIsAnalyzing(false);
            
            if (session.results.length > 0) {
              setRecentVulnerabilities(session.results);
              setLiveStats(prev => ({
                ...prev,
                vulnerabilitiesFound: prev.vulnerabilitiesFound + session.results.length,
                criticalIssues: prev.criticalIssues + session.results.filter(r => r.severity === 'critical').length,
                lastUpdate: Date.now()
              }));
            }
          }
        }
      }, 2000);

    } catch (error) {
      console.error('Analysis failed:', error);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Database className="w-5 h-5 mr-2 text-blue-400" />
            Real Blockchain Analysis
          </CardTitle>
          <CardDescription className="text-gray-400">
            Analyze real Bitcoin blockchain data for ECDSA vulnerabilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="startBlock" className="text-gray-300">Start Block</Label>
              <Input
                id="startBlock"
                type="number"
                value={analysisParams.startBlock}
                onChange={(e) => setAnalysisParams({
                  ...analysisParams, 
                  startBlock: parseInt(e.target.value)
                })}
                className="bg-slate-700 border-slate-600 text-white"
                disabled={isAnalyzing}
              />
            </div>
            <div>
              <Label htmlFor="endBlock" className="text-gray-300">End Block</Label>
              <Input
                id="endBlock"
                type="number"
                value={analysisParams.endBlock}
                onChange={(e) => setAnalysisParams({
                  ...analysisParams, 
                  endBlock: parseInt(e.target.value)
                })}
                className="bg-slate-700 border-slate-600 text-white"
                disabled={isAnalyzing}
              />
            </div>
            <div>
              <Label htmlFor="curve" className="text-gray-300">Curve</Label>
              <Input
                id="curve"
                value={analysisParams.curve}
                className="bg-slate-700 border-slate-600 text-white"
                readOnly
              />
            </div>
          </div>

          {currentAnalysis && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Analysis Progress</span>
                <span className="text-blue-400">{currentAnalysis.progress.toFixed(1)}%</span>
              </div>
              <Progress value={currentAnalysis.progress} className="h-2" />
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{currentAnalysis.blocksAnalyzed}</div>
                  <div className="text-gray-400">Blocks Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{currentAnalysis.transactionsAnalyzed}</div>
                  <div className="text-gray-400">Transactions</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-400">{currentAnalysis.vulnerabilitiesFound}</div>
                  <div className="text-gray-400">Vulnerabilities</div>
                </div>
              </div>
            </div>
          )}

          <Button 
            onClick={startRealAnalysis}
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isAnalyzing ? (
              <>
                <Activity className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Blockchain...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Start Real Analysis
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {recentVulnerabilities.length > 0 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
              Live Vulnerabilities Found
            </CardTitle>
            <CardDescription className="text-gray-400">
              Real vulnerabilities detected in blockchain data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentVulnerabilities.slice(0, 5).map((vuln, index) => (
                <Alert key={index} className="border-red-500/30 bg-red-500/10">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">
                          {vuln.type.replace('_', ' ').toUpperCase()} - Block {vuln.blockHeight}
                        </div>
                        <div className="text-sm mt-1">
                          Transaction: {vuln.txid?.substring(0, 16)}...
                        </div>
                        {vuln.recoveredKey && (
                          <div className="text-xs mt-1 font-mono">
                            Recovered Key: {vuln.recoveredKey.substring(0, 20)}...
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive" className="text-xs">
                          {vuln.severity?.toUpperCase()}
                        </Badge>
                        <Button size="sm" variant="outline" className="h-6 text-xs">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Database className="w-8 h-8 text-blue-400 mr-3" />
              <div>
                <div className="text-2xl font-bold text-white">{liveStats.totalScanned.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Transactions Scanned</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-yellow-400 mr-3" />
              <div>
                <div className="text-2xl font-bold text-white">{liveStats.vulnerabilitiesFound}</div>
                <div className="text-sm text-gray-400">Total Vulnerabilities</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Zap className="w-8 h-8 text-red-400 mr-3" />
              <div>
                <div className="text-2xl font-bold text-white">{liveStats.criticalIssues}</div>
                <div className="text-sm text-gray-400">Critical Issues</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-green-400 mr-3" />
              <div>
                <div className="text-2xl font-bold text-white">Live</div>
                <div className="text-sm text-gray-400">Real-time Analysis</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealDataAnalysis;
