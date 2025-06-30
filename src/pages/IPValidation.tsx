import React, { useState, useEffect } from 'react';
import { Network, Globe, Shield, Wifi, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface ValidationResult {
  isValid: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

interface IPInfo {
  ip: string;
  type: string;
  format: string;
  isValid: boolean;
  details: string;
}

const IPValidation: React.FC = () => {
  const [ipInput, setIpInput] = useState('');
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [ipHistory, setIpHistory] = useState<IPInfo[]>([]);
  const [currentIP, setCurrentIP] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [tunnelStatus, setTunnelStatus] = useState<'connected' | 'disconnected' | 'checking'>('disconnected');
  const [networkInfo, setNetworkInfo] = useState<any>(null);
  const [selectedValidationType, setSelectedValidationType] = useState<string>('all');

  // IP Validation Functions
  const validateIPv4 = (ip: string): boolean => {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ip);
  };

  const validateIPv6 = (ip: string): boolean => {
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
    return ipv6Regex.test(ip);
  };

  const validatePrivateIP = (ip: string): boolean => {
    const privateRanges = [
      /^10\./,
      /^172\.(1[6-9]|2[0-9]|3[01])\./,
      /^192\.168\./,
      /^127\./,
      /^169\.254\./,
      /^::1$/,
      /^fe80:/
    ];
    return privateRanges.some(range => range.test(ip));
  };

  const validatePublicIP = (ip: string): boolean => {
    return validateIPv4(ip) && !validatePrivateIP(ip);
  };

  const validateCIDR = (cidr: string): boolean => {
    const cidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/([0-9]|[1-2][0-9]|3[0-2])$/;
    return cidrRegex.test(cidr);
  };

  const validateDomain = (domain: string): boolean => {
    const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return domainRegex.test(domain);
  };

  const validateURL = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validatePort = (port: string): boolean => {
    const portNum = parseInt(port);
    return portNum >= 1 && portNum <= 65535;
  };

  // Comprehensive validation
  const validateIP = (input: string): ValidationResult[] => {
    const results: ValidationResult[] = [];
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      results.push({
        isValid: false,
        message: 'Input cannot be empty',
        type: 'error'
      });
      return results;
    }

    // IPv4 Validation
    if (validateIPv4(trimmedInput)) {
      results.push({
        isValid: true,
        message: 'Valid IPv4 address',
        type: 'success'
      });

      if (validatePrivateIP(trimmedInput)) {
        results.push({
          isValid: true,
          message: 'Private IP address detected',
          type: 'info'
        });
      } else {
        results.push({
          isValid: true,
          message: 'Public IP address detected',
          type: 'info'
        });
      }
    }

    // IPv6 Validation
    if (validateIPv6(trimmedInput)) {
      results.push({
        isValid: true,
        message: 'Valid IPv6 address',
        type: 'success'
      });
    }

    // CIDR Validation
    if (validateCIDR(trimmedInput)) {
      results.push({
        isValid: true,
        message: 'Valid CIDR notation',
        type: 'success'
      });
    }

    // Domain Validation
    if (validateDomain(trimmedInput)) {
      results.push({
        isValid: true,
        message: 'Valid domain name',
        type: 'success'
      });
    }

    // URL Validation
    if (validateURL(trimmedInput)) {
      results.push({
        isValid: true,
        message: 'Valid URL',
        type: 'success'
      });
    }

    // Port Validation
    if (validatePort(trimmedInput)) {
      results.push({
        isValid: true,
        message: 'Valid port number',
        type: 'success'
      });
    }

    // If no validations passed
    if (results.length === 0) {
      results.push({
        isValid: false,
        message: 'Invalid IP address, domain, URL, or port',
        type: 'error'
      });
    }

    return results;
  };

  // Handle validation
  const handleValidation = () => {
    setIsLoading(true);
    const results = validateIP(ipInput);
    setValidationResults(results);

    // Add to history if valid
    if (results.some(r => r.isValid)) {
      const ipInfo: IPInfo = {
        ip: ipInput,
        type: results[0].message,
        format: getIPFormat(ipInput),
        isValid: true,
        details: results.map(r => r.message).join(', ')
      };
      setIpHistory(prev => [ipInfo, ...prev.slice(0, 9)]); // Keep last 10
    }

    setIsLoading(false);
  };

  const getIPFormat = (input: string): string => {
    if (validateIPv4(input)) return 'IPv4';
    if (validateIPv6(input)) return 'IPv6';
    if (validateCIDR(input)) return 'CIDR';
    if (validateDomain(input)) return 'Domain';
    if (validateURL(input)) return 'URL';
    if (validatePort(input)) return 'Port';
    return 'Unknown';
  };

  // Get current IP
  const getCurrentIP = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setCurrentIP(data.ip);
      
      // Validate current IP
      const results = validateIP(data.ip);
      setValidationResults(results);
    } catch (error) {
      setValidationResults([{
        isValid: false,
        message: 'Failed to get current IP address',
        type: 'error'
      }]);
    }
    setIsLoading(false);
  };

  // Simulate tunnel connection
  const testTunnelConnection = async () => {
    setTunnelStatus('checking');
    setIsLoading(true);
    
    // Simulate tunnel testing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const isConnected = Math.random() > 0.3; // 70% success rate
    setTunnelStatus(isConnected ? 'connected' : 'disconnected');
    
    if (isConnected) {
      setNetworkInfo({
        tunnelIP: '10.0.0.1',
        publicIP: currentIP || '192.168.1.1',
        latency: Math.floor(Math.random() * 100) + 10,
        bandwidth: Math.floor(Math.random() * 100) + 50
      });
    }
    
    setIsLoading(false);
  };

  // Get network information
  const getNetworkInfo = async () => {
    setIsLoading(true);
    try {
      // Simulate network info gathering
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNetworkInfo({
        userAgent: navigator.userAgent,
        connection: (navigator as any).connection?.effectiveType || 'unknown',
        online: navigator.onLine,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });
    } catch (error) {
      console.error('Failed to get network info:', error);
    }
    setIsLoading(false);
  };

  // Clear results
  const clearResults = () => {
    setValidationResults([]);
    setIpHistory([]);
  };

  // Filter results by type
  const filteredResults = selectedValidationType === 'all' 
    ? validationResults 
    : validationResults.filter(r => r.type === selectedValidationType);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4" data-testid="ip-validation-title">
          IP Validation & Tunnel Testing
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Test IP address validation, network connectivity, and tunnel configurations. 
          Supports IPv4, IPv6, CIDR, domains, URLs, and port validation.
        </p>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* IP Input */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">IP Validation</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter IP Address, Domain, URL, or Port
              </label>
              <input
                type="text"
                value={ipInput}
                onChange={(e) => setIpInput(e.target.value)}
                placeholder="e.g., 192.168.1.1, example.com, https://example.com, 8080"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                data-testid="ip-input"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleValidation}
                disabled={isLoading || !ipInput.trim()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                data-testid="validate-button"
              >
                <CheckCircle className="h-4 w-4" />
                Validate
              </button>
              
              <button
                onClick={getCurrentIP}
                disabled={isLoading}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                data-testid="get-current-ip"
              >
                <Globe className="h-4 w-4" />
                Get My IP
              </button>
              
              <button
                onClick={clearResults}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                data-testid="clear-results"
              >
                <XCircle className="h-4 w-4" />
                Clear
              </button>
            </div>

            {currentIP && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Current IP:</strong> {currentIP}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tunnel Testing */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tunnel Testing</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Tunnel Status</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${
                  tunnelStatus === 'connected' ? 'bg-green-500' :
                  tunnelStatus === 'checking' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="text-sm font-medium">
                  {tunnelStatus === 'connected' ? 'Connected' :
                   tunnelStatus === 'checking' ? 'Checking...' : 'Disconnected'}
                </span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={testTunnelConnection}
                  disabled={isLoading}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  data-testid="test-tunnel"
                >
                  <Network className="h-4 w-4" />
                  Test Tunnel
                </button>
                
                <button
                  onClick={getNetworkInfo}
                  disabled={isLoading}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  data-testid="get-network-info"
                >
                  <Wifi className="h-4 w-4" />
                  Network Info
                </button>
              </div>
            </div>

            {networkInfo && (
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Network Information</h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(networkInfo).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-medium">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Validation Results */}
      {validationResults.length > 0 && (
        <div className="bg-white border rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Validation Results</h2>
            <select
              value={selectedValidationType}
              onChange={(e) => setSelectedValidationType(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
              data-testid="filter-results"
            >
              <option value="all">All Results</option>
              <option value="success">Success</option>
              <option value="error">Errors</option>
              <option value="warning">Warnings</option>
              <option value="info">Info</option>
            </select>
          </div>

          <div className="space-y-3">
            {filteredResults.map((result, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  result.type === 'success' ? 'bg-green-50 border-green-200' :
                  result.type === 'error' ? 'bg-red-50 border-red-200' :
                  result.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-blue-50 border-blue-200'
                }`}
                data-testid={`validation-result-${index}`}
              >
                {result.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
                {result.type === 'error' && <XCircle className="h-5 w-5 text-red-600" />}
                {result.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                {result.type === 'info' && <Shield className="h-5 w-5 text-blue-600" />}
                <span className={`text-sm ${
                  result.type === 'success' ? 'text-green-800' :
                  result.type === 'error' ? 'text-red-800' :
                  result.type === 'warning' ? 'text-yellow-800' :
                  'text-blue-800'
                }`}>
                  {result.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* IP History */}
      {ipHistory.length > 0 && (
        <div className="bg-white border rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Validation History</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ipHistory.map((ipInfo, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                data-testid={`ip-history-${index}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-800">{ipInfo.ip}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{ipInfo.type}</p>
                <p className="text-xs text-gray-500">Format: {ipInfo.format}</p>
                <p className="text-xs text-gray-500 mt-2">{ipInfo.details}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testing Features */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Testing Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold text-gray-800 mb-2">IP Validation</h3>
            <p className="text-sm text-gray-600">
              Test IPv4, IPv6, CIDR, domains, URLs, and port validation
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold text-gray-800 mb-2">Tunnel Testing</h3>
            <p className="text-sm text-gray-600">
              Test tunnel connections and network status
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold text-gray-800 mb-2">Network Info</h3>
            <p className="text-sm text-gray-600">
              Get current network information and connection details
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold text-gray-800 mb-2">Validation History</h3>
            <p className="text-sm text-gray-600">
              Track validation results and IP history
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold text-gray-800 mb-2">Real-time Validation</h3>
            <p className="text-sm text-gray-600">
              Instant validation feedback with detailed results
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold text-gray-800 mb-2">Error Handling</h3>
            <p className="text-sm text-gray-600">
              Test various error scenarios and edge cases
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPValidation; 