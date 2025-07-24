import React, { useState, useEffect } from 'react';
import { Search, FileText, Users, DollarSign, Calendar, MapPin } from 'lucide-react';

const GlobalSearch = ({ query }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  const sampleResults = [
    {
      id: 1,
      type: 'project',
      title: 'Downtown Office Complex - Electrical',
      description: 'VoltBox project for 50,000 sq ft office building',
      value: '$125,000',
      status: 'In Progress',
      icon: FileText,
      date: '2024-01-15'
    },
    {
      id: 2,
      type: 'crew',
      title: 'Mike Johnson - Lead Electrician',
      description: 'Journeyman with 15 years experience, available next week',
      value: '$95/hour',
      status: 'Available',
      icon: Users,
      date: '2024-01-20'
    },
    {
      id: 3,
      type: 'quote',
      title: 'Hotel Renovation HVAC Quote #2024-0156',
      description: 'AirBox estimate for 120-room hotel HVAC upgrade',
      value: '$89,500',
      status: 'Pending',
      icon: DollarSign,
      date: '2024-01-18'
    },
    {
      id: 4,
      type: 'material',
      title: 'Copper Wire 12 AWG',
      description: 'Current market price and availability',
      value: '$3.45/ft',
      status: 'In Stock',
      icon: MapPin,
      date: '2024-01-22'
    }
  ];

  useEffect(() => {
    if (query && query.length > 2) {
      setLoading(true);
      setTimeout(() => {
        const filtered = sampleResults.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setLoading(false);
      }, 500);
    } else {
      setResults([]);
    }
  }, [query]);

  const filteredResults = filter === 'all' ? results : results.filter(r => r.type === filter);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'available': return 'bg-green-100 text-green-800';
      case 'in stock': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'project': return 'bg-blue-500';
      case 'crew': return 'bg-green-500';
      case 'quote': return 'bg-purple-500';
      case 'material': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Global Search</h1>
        <p className="text-xl text-gray-600 mt-2">Search across all system data and resources</p>
      </div>

      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={query}
              readOnly
              placeholder="Search projects, crew, quotes, materials..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-lg"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg text-lg"
          >
            <option value="all">All Results</option>
            <option value="project">Projects</option>
            <option value="crew">Crew</option>
            <option value="quote">Quotes</option>
            <option value="material">Materials</option>
          </select>
        </div>

        {query && query.length <= 2 && (
          <div className="text-center py-8 text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Enter at least 3 characters to search</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching...</p>
          </div>
        )}

        {!loading && query && query.length > 2 && filteredResults.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No results found for &ldquo;{query}&rdquo;</p>
          </div>
        )}

        {!loading && filteredResults.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>
            {filteredResults.map((result) => (
              <div key={result.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${getTypeColor(result.type)} rounded-lg flex items-center justify-center`}>
                    <result.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{result.title}</h3>
                        <p className="text-gray-600 mt-1">{result.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-500 flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(result.date).toLocaleDateString()}
                          </span>
                          <span className="text-sm font-medium text-gray-900">{result.value}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                          {result.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getTypeColor(result.type)}`}>
                          {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!loading && filteredResults.length > 0 && (
        <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <h3 className="text-xl font-bold text-blue-900 mb-4">🤖 AI Search Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Related Suggestions</h4>
              <ul className="space-y-1 text-blue-700 text-sm">
                <li>• Similar projects in your area</li>
                <li>• Crew members with matching skills</li>
                <li>• Alternative material suppliers</li>
                <li>• Historical pricing trends</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Quick Actions</h4>
              <ul className="space-y-1 text-blue-700 text-sm">
                <li>• Export search results to PDF</li>
                <li>• Create new project from template</li>
                <li>• Schedule crew assignments</li>
                <li>• Generate comparative quotes</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
