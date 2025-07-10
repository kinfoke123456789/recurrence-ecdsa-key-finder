
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookOpen, Formula, Lightbulb, AlertCircle } from 'lucide-react';

const MathematicalBackground = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
            ECDSA Signature Scheme
          </CardTitle>
          <CardDescription className="text-gray-400">
            Understanding the mathematical foundation of the attack
          </CardDescription>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <p>
            The Elliptic Curve Digital Signature Algorithm (ECDSA) generates signatures using the formula:
          </p>
          <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm border border-slate-600">
            <div>r = (k·G)<sub>x</sub> mod n</div>
            <div>s = k<sup>-1</sup>(h + r·d) mod n</div>
          </div>
          <p>
            Where:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>k</strong> is the nonce (must be random and unique)</li>
            <li><strong>G</strong> is the generator point of the elliptic curve</li>
            <li><strong>d</strong> is the private key</li>
            <li><strong>h</strong> is the hash of the message</li>
            <li><strong>n</strong> is the order of the curve</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Formula className="w-5 h-5 mr-2 text-purple-400" />
            Linear Recurrence Vulnerability
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <p>
            When nonces follow a linear recurrence relation:
          </p>
          <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm border border-slate-600">
            k<sub>i+1</sub> = a<sub>0</sub> + a<sub>1</sub>k<sub>i</sub> + a<sub>2</sub>k<sub>i</sub><sup>2</sup> + ... + a<sub>n</sub>k<sub>i</sub><sup>n</sup>
          </div>
          <p>
            We can construct a system of equations that eliminates the unknown coefficients and creates a polynomial in the private key <strong>d</strong>.
          </p>
          
          <Alert className="border-yellow-500/30 bg-yellow-500/10">
            <Lightbulb className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-yellow-200">
              The key insight is that differences between nonces (k<sub>i</sub> - k<sub>j</sub>) can be expressed as linear polynomials in the private key d.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
            Attack Methodology
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="space-y-3">
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-white">Step 1: Nonce Difference Polynomials</h4>
              <p className="text-sm">
                For each pair of signatures, compute k<sub>ij</sub> = k<sub>i</sub> - k<sub>j</sub> as a polynomial in d.
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-white">Step 2: Recursive Construction</h4>
              <p className="text-sm">
                Build higher-degree polynomials using the recurrence relation structure.
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-white">Step 3: Root Finding</h4>
              <p className="text-sm">
                Solve the resulting polynomial equation to recover the private key d.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
            <h4 className="font-semibold text-white mb-2">Polynomial Degree</h4>
            <div className="font-mono text-sm">
              degree = 1 + Σ(i=1 to N-3) i
            </div>
            <p className="text-sm mt-2 text-gray-400">
              For N=7 signatures, the polynomial has degree 8.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MathematicalBackground;
