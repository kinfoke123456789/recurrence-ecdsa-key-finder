
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  PieChart as PieChartIcon, 
  BarChart3, 
  Activity,
  Shield,
  Target,
  Zap
} from 'lucide-react';

const AdvancedAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const vulnerabilityTrends = [
    { month: 'Jan', critical: 12, high: 25, medium: 18, low: 8 },
    { month: 'Feb', critical: 15, high: 28, medium: 22, low: 12 },
    { month: 'Mar', critical: 8, high: 32, medium: 19, low: 15 },
    { month: 'Apr', critical: 18, high: 35, medium: 24, low: 10 },
    { month: 'May', critical: 22, high: 41, medium: 28, low: 18 },
    { month: 'Jun', critical: 16, high: 38, medium: 31, low: 14 }
  ];

  const attackVectors = [
    { name: 'Nonce Reuse', value: 45, color: '#ef4444' },
    { name: 'Weak Randomness', value: 28, color: '#f97316' },
    { name: 'Biased K', value: 18, color: '#eab308' },
    { name: 'Linear Patterns', value: 9, color: '#3b82f6' }
  ];

  const recoverySuccess = [
    { week: 'W1', attempts: 45, successful: 38, rate: 84.4 },
    { week: 'W2', attempts: 52, successful: 44, rate: 84.6 },
    { week: 'W3', attempts: 38, successful: 35, rate: 92.1 },
    { week: 'W4', attempts: 41, successful: 39, rate: 95.1 }
  ];

  const networkStats = {
    totalScanned: 1247893,
    vulnerableFound: 342,
    keysRecovered: 287,
    valueAtRisk: 45.7,
    avgConfidence: 89.2,
    scanEfficiency: 94.8
  };

  const riskLevels = [
    { level: 'Critical', count: 18, percentage: 5.3, trend: '+12%' },
    { level: 'High', count: 65, percentage: 19.0, trend: '+8%' },
    { level: 'Medium', count: 142, percentage: 41.5, trend: '-3%' },
    { level: 'Low', count: 117, percentage: 34.2, trend: '-5%' }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
            Advanced Analytics Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'outline'}
              onClick={() => setActiveTab('overview')}
              className={activeTab === 'overview' ? 'bg-purple-600' : 'border-slate-600 text-white hover:bg-slate-700'}
            >
              <Activity className="w-4 h-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={activeTab === 'trends' ? 'default' : 'outline'}
              onClick={() => setActiveTab('trends')}
              className={activeTab === 'trends' ? 'bg-purple-600' : 'border-slate-600 text-white hover:bg-slate-700'}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Trends
            </Button>
            <Button
              variant={activeTab === 'vectors' ? 'default' : 'outline'}
              onClick={() => setActiveTab('vectors')}
              className={activeTab === 'vectors' ? 'bg-purple-600' : 'border-slate-600 text-white hover:bg-slate-700'}
            >
              <Target className="w-4 h-4 mr-2" />
              Attack Vectors
            </Button>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Card className="bg-slate-900/50 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <Shield className="w-8 h-8 text-blue-400 mr-3" />
                      <div>
                        <div className="text-2xl font-bold text-white">{networkStats.totalScanned.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Total Scanned</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <Zap className="w-8 h-8 text-red-400 mr-3" />
                      <div>
                        <div className="text-2xl font-bold text-white">{networkStats.vulnerableFound}</div>
                        <div className="text-sm text-gray-400">Vulnerable</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <TrendingUp className="w-8 h-8 text-green-400 mr-3" />
                      <div>
                        <div className="text-2xl font-bold text-white">{networkStats.keysRecovered}</div>
                        <div className="text-sm text-gray-400">Keys Recovered</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-900/50 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Risk Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {riskLevels.map((risk, index) => (
                        <div key={risk.level} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white">{risk.level}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400">{risk.count}</span>
                              <Badge variant="secondary" className="text-xs">
                                {risk.trend}
                              </Badge>
                            </div>
                          </div>
                          <Progress value={risk.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Average Confidence</span>
                        <span className="text-white font-semibold">{networkStats.avgConfidence}%</span>
                      </div>
                      <Progress value={networkStats.avgConfidence} className="h-2" />
                      
                      <div className="flex justify-between">
                        <span className="text-gray-400">Scan Efficiency</span>
                        <span className="text-white font-semibold">{networkStats.scanEfficiency}%</span>
                      </div>
                      <Progress value={networkStats.scanEfficiency} className="h-2" />
                      
                      <div className="flex justify-between">
                        <span className="text-gray-400">Value at Risk</span>
                        <span className="text-green-400 font-semibold">{networkStats.valueAtRisk} BTC</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="space-y-6">
              <Card className="bg-slate-900/50 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Vulnerability Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={vulnerabilityTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="critical" stackId="a" fill="#ef4444" />
                      <Bar dataKey="high" stackId="a" fill="#f97316" />
                      <Bar dataKey="medium" stackId="a" fill="#eab308" />
                      <Bar dataKey="low" stackId="a" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Recovery Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={recoverySuccess}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="week" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'vectors' && (
            <div className="space-y-6">
              <Card className="bg-slate-900/50 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Attack Vector Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={attackVectors}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {attackVectors.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="space-y-4">
                      {attackVectors.map((vector, index) => (
                        <div key={vector.name} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div 
                              className="w-4 h-4 rounded mr-3" 
                              style={{ backgroundColor: vector.color }}
                            />
                            <span className="text-white">{vector.name}</span>
                          </div>
                          <div className="text-gray-400">{vector.value}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAnalytics;
