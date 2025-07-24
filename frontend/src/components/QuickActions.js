import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, FileText, Users, TrendingUp, Zap, Search } from 'lucide-react';

const QuickActions = () => {
  const quickActions = [
    {
      id: 'quick-estimate',
      name: 'Quick Estimate',
      icon: <Calculator className="w-5 h-5" />,
      description: 'Generate fast estimates',
      link: '/trade/voltbox',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'project-templates',
      name: 'Project Templates',
      icon: <FileText className="w-5 h-5" />,
      description: 'Pre-built project scopes',
      link: '/templates',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'crew-optimizer',
      name: 'Crew Optimizer',
      icon: <Users className="w-5 h-5" />,
      description: 'Optimize crew assignments',
      link: '/crew-optimizer',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'market-insights',
      name: 'Market Insights',
      icon: <TrendingUp className="w-5 h-5" />,
      description: 'Real-time market data',
      link: '/market-data',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      id: 'ai-assistant',
      name: 'BlackBox AI',
      icon: <Zap className="w-5 h-5" />,
      description: 'AI-powered insights',
      link: '/ai-thinking',
      color: 'bg-yellow-500 hover:bg-yellow-600'
    },
    {
      id: 'global-search',
      name: 'Global Search',
      icon: <Search className="w-5 h-5" />,
      description: 'Search all projects',
      link: '/search',
      color: 'bg-indigo-500 hover:bg-indigo-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">⚡ Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.id}
            to={action.link}
            className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex flex-col items-center text-center`}
          >
            <div className="mb-2">
              {action.icon}
            </div>
            <h3 className="font-semibold text-sm mb-1">{action.name}</h3>
            <p className="text-xs opacity-90">{action.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
