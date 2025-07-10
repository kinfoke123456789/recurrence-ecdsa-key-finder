
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  Zap,
  Globe,
  Clock,
  Database
} from 'lucide-react';

interface LiveBlockchainProps {
  onNewVulnerability?: (vulnerability: any) => void;
}

const LiveBlockchain: React.FC<LiveBlockchainProps> = ({ onNewVulnerability }) => {
  const [liveStats, setLiveStats] = useState({
    currentBlock: 870945,
    mempool: 12847,
    hashRate: '542.3 EH/s',
    difficulty: '72.72T',
    avgBlockTime: '9.8 min',
    networkNodes: 15234,
    vulnerabilitiesFound: 0,
    scanningSpeed: 2340
  });

  const [isLiveScanning, setIsLiveScanning] = useState(false);
  const [recentBlocks, setRecentBlocks] = useState([
    { height: 870945, txCount: 3456, vulnerable: 2, timestamp: Date.now() - 600000 },
    { height: 870944, txCount: 2891, vulnerable: 1, timestamp: Date.now() - 1200000 },
    { height: 870943, txCount: 4123, vulnerable: 0, timestamp: Date.now() - 1800000 }
  ]);

  useEffect(() => {
    if (isLiveScanning) {
      const interval = setInterval(() => {
        setLiveStats(prev => ({
          ...prev,
          currentBlock: prev.currentBlock + (Math.random() > 0.9 ? 1 : 0),
          mempool: Math.floor(prev.mempool + (Math.random() - 0.5) * 200),
          vulnerabilitiesFound: prev.vulnerabilitiesFound + (Math.random() > 0.95 ? 1 : 0),
          scanningSpeed: Math.floor(prev.scanningSpeed + (Math.random() - 0.5) * 100)
        }));

        if (Math.random() > 0.98) {
          const newVuln = {
            type: 'nonce_reuse',
            severity: 'critical',
            txid: 'live_' + Date.now(),
            blockHeight: liveStats.currentBlock,
            confidence: 0.98
          };
          if (onNewVulnerability) {
            onNewVulnerability(newVuln);
          }
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isLiveScanning, liveStats.currentBlock, onNewVulnerability]);

  const toggleLiveScanning = () => {
    setIsLiveScanning(!isLiveScanning);
    console.log('Live scanning toggled:', !isLiveScanning);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const getTimeAgo = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000);
    return `${minutes}m ago`;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-white">
              <Globe className="w-5 h-5 mr-2 text-green-400" />
              Live Bitcoin Network
            </CardTitle>
            <Button
              onClick={toggleLiveScanning}
              variant={isLiveScanning ? "destructive" : "default"}
              className={isLiveScanning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
            >
              {isLiveScanning ? (
                <>
                  <Activity className="w-4 h-4 mr-2 animate-pulse" />
                  Stop Live Scan
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Start Live Scan
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{formatNumber(liveStats.currentBlock)}</div>
              <div className="text-sm text-gray-400">Current Block</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{formatNumber(liveStats.mempool)}</div>
              <div className="text-sm text-gray-400">Mempool</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{liveStats.hashRate}</div>
              <div className="text-sm text-gray-400">Hash Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{formatNumber(liveStats.scanningSpeed)}</div>
              <div className="text-sm text-gray-400">Tx/min Scanned</div>
            </div>
          </div>

          {isLiveScanning && (
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Live Vulnerability Scan</span>
                <span className="text-green-400">Active</span>
              </div>
              <Progress value={75} className="h-2 mb-2" />
              <div className="text-xs text-gray-400">
                Scanning {formatNumber(liveStats.scanningSpeed)} transactions per minute
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white">Recent Blocks</h4>
            {recentBlocks.map((block, index) => (
              <div key={block.height} className="flex items-center justify-between bg-slate-900/50 p-3 rounded">
                <div className="flex items-center gap-4">
                  <div className="text-white font-mono">#{block.height}</div>
                  <div className="text-sm text-gray-400">
                    {formatNumber(block.txCount)} transactions
                  </div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {getTimeAgo(block.timestamp)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {block.vulnerable > 0 ? (
                    <Badge variant="destructive" className="text-xs">
                      {block.vulnerable} Vulnerable
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs bg-green-600/20 text-green-300">
                      Clean
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveBlockchain;
