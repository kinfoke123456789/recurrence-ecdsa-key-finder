
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Settings, Cpu, Hash, Key } from 'lucide-react';

interface ParameterPanelProps {
  parameters: any;
  setParameters: (params: any) => void;
}

const ParameterPanel: React.FC<ParameterPanelProps> = ({ parameters, setParameters }) => {
  const curves = [
    { name: 'SECP256k1', bits: 256, description: 'Bitcoin & Ethereum' },
    { name: 'NIST-P256', bits: 256, description: 'NIST Standard' },
    { name: 'NIST-P384', bits: 384, description: 'Higher Security' },
    { name: 'NIST-P521', bits: 521, description: 'Maximum Security' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Settings className="w-5 h-5 mr-2 text-blue-400" />
            Attack Parameters
          </CardTitle>
          <CardDescription className="text-gray-400">
            Configure the signature generation and attack parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="N" className="text-gray-300">Number of Signatures (N)</Label>
            <Input
              id="N"
              type="number"
              value={parameters.N}
              onChange={(e) => setParameters({...parameters, N: parseInt(e.target.value)})}
              className="bg-slate-700 border-slate-600 text-white mt-2"
              min="4"
              max="15"
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum 4 signatures required. Higher N increases polynomial degree.
            </p>
          </div>

          <div>
            <Label className="text-gray-300">Elliptic Curve</Label>
            <Select value={parameters.curve} onValueChange={(value) => setParameters({...parameters, curve: value})}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {curves.map((curve) => (
                  <SelectItem key={curve.name} value={curve.name} className="text-white focus:bg-slate-600">
                    <div className="flex items-center justify-between w-full">
                      <span>{curve.name}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {curve.bits}-bit
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator className="bg-slate-600" />

          <div className="space-y-3">
            <h4 className="font-semibold text-white flex items-center">
              <Hash className="w-4 h-4 mr-2" />
              Derived Parameters
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Polynomial Degree:</span>
                <div className="text-white font-mono">
                  {1 + Array.from({length: parameters.N - 3}, (_, i) => i + 1).reduce((a, b) => a + b, 0)}
                </div>
              </div>
              <div>
                <span className="text-gray-400">Coefficients:</span>
                <div className="text-white font-mono">{parameters.N - 2}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Cpu className="w-5 h-5 mr-2 text-green-400" />
            Curve Information
          </CardTitle>
          <CardDescription className="text-gray-400">
            Details about the selected elliptic curve
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(() => {
            const curve = curves.find(c => c.name === parameters.curve);
            return curve ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Curve Name:</span>
                  <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                    {curve.name}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Security Level:</span>
                  <span className="text-white">{curve.bits} bits</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Common Usage:</span>
                  <span className="text-white">{curve.description}</span>
                </div>
                
                <Separator className="bg-slate-600" />
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-white flex items-center">
                    <Key className="w-4 h-4 mr-2" />
                    Security Analysis
                  </h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Field Size:</span>
                      <span className="text-white font-mono">2^{curve.bits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Attack Complexity:</span>
                      <span className="text-white">O(√n)</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null;
          })()}
        </CardContent>
      </Card>
    </div>
  );
};

export default ParameterPanel;
