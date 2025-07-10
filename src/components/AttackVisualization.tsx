
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Zap, Key, Target, Activity } from 'lucide-react';

interface AttackVisualizationProps {
  progress: number;
  isRunning: boolean;
  results: any;
}

const AttackVisualization: React.FC<AttackVisualizationProps> = ({ 
  progress, 
  isRunning, 
  results 
}) => {
  const getStepStatus = (stepProgress: number) => {
    if (progress >= stepProgress) return 'completed';
    if (isRunning && progress >= stepProgress - 20) return 'active';
    return 'pending';
  };

  const steps = [
    { name: 'Generate Signatures', progress: 20, icon: Target },
    { name: 'Build Polynomial', progress: 40, icon: Activity },
    { name: 'Find Roots', progress: 70, icon: Zap },
    { name: 'Recover Key', progress: 100, icon: Key }
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Activity className="w-5 h-5 mr-2 text-green-400" />
          Attack Visualization
        </CardTitle>
        <CardDescription className="text-gray-400">
          Real-time visualization of the ECDSA nonce attack process
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {steps.map((step, index) => {
            const status = getStepStatus(step.progress);
            const StepIcon = step.icon;
            
            return (
              <div key={index} className="flex items-center space-x-4">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${status === 'completed' ? 'bg-green-600' : 
                    status === 'active' ? 'bg-purple-600 animate-pulse' : 
                    'bg-slate-600'}
                `}>
                  {status === 'completed' ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <StepIcon className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${
                    status === 'completed' ? 'text-green-400' :
                    status === 'active' ? 'text-purple-400' :
                    'text-gray-400'
                  }`}>
                    {step.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    Step {index + 1} of {steps.length}
                  </div>
                </div>
                <Badge variant={
                  status === 'completed' ? 'default' :
                  status === 'active' ? 'secondary' :
                  'outline'
                } className={
                  status === 'completed' ? 'bg-green-600 text-white' :
                  status === 'active' ? 'bg-purple-600 text-white' :
                  'text-gray-400'
                }>
                  {status === 'completed' ? 'Complete' :
                   status === 'active' ? 'Running' :
                   'Pending'}
                </Badge>
              </div>
            );
          })}
        </div>

        {results && (
          <div className="mt-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
            <div className="flex items-center mb-3">
              {results.success ? (
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400 mr-2" />
              )}
              <span className={`font-medium ${results.success ? 'text-green-400' : 'text-red-400'}`}>
                {results.success ? 'Attack Successful!' : 'Attack Failed'}
              </span>
            </div>
            
            {results.success && (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Recovered Key:</span>
                  <span className="text-green-400 font-mono text-xs">
                    {results.recoveredKey.substring(0, 20)}...
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Polynomial Degree:</span>
                  <span className="text-white">{results.polynomialDegree}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Roots Found:</span>
                  <span className="text-white">{results.rootsFound}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time Elapsed:</span>
                  <span className="text-white">{results.timeElapsed}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttackVisualization;
