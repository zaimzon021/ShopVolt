'use client';

import { useState } from 'react';

export default function TestAPIPage() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testProducts = async () => {
    setLoading(true);
    setResult('Testing...');
    try {
      const response = await fetch('http://localhost:3001/products');
      const data = await response.json();
      setResult(`✅ Success! Got ${data.length} products\n\n${JSON.stringify(data[0], null, 2)}`);
    } catch (error) {
      setResult(`❌ Error: ${error.message}\n\n${error.stack}`);
    }
    setLoading(false);
  };

  const testLogin = async () => {
    setLoading(true);
    setResult('Testing login...');
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        })
      });
      const data = await response.json();
      setResult(`✅ Login Success!\n\n${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setResult(`❌ Error: ${error.message}\n\n${error.stack}`);
    }
    setLoading(false);
  };

  const testSignup = async () => {
    setLoading(true);
    setResult('Testing signup...');
    try {
      const response = await fetch('http://localhost:3001/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test User ' + Date.now(),
          email: `test${Date.now()}@example.com`,
          password: 'password123'
        })
      });
      const data = await response.json();
      setResult(`✅ Signup Success!\n\n${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setResult(`❌ Error: ${error.message}\n\n${error.stack}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Connection Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Endpoints</h2>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={testProducts}
              disabled={loading}
              className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Test Products API
            </button>
            <button
              onClick={testLogin}
              disabled={loading}
              className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              Test Login API
            </button>
            <button
              onClick={testSignup}
              disabled={loading}
              className="px-6 py-3 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
            >
              Test Signup API
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-gray-900 text-green-400 rounded-lg p-6 font-mono text-sm whitespace-pre-wrap">
            {result}
          </div>
        )}

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Make sure your backend is running at http://localhost:3001</li>
            <li>Click each button to test the API endpoints</li>
            <li>Check the browser console (F12) for detailed logs</li>
            <li>If you see CORS errors, check your backend CORS configuration</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
