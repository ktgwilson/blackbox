import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, FileText, Users, TrendingUp, Zap, Search, Settings, BarChart3 } from 'lucide-react';

const ShortcutPanel = () => {
  const shortcuts = [
    {
      key: 'Q',
      action: 'Quick Estimate',
      link: '/trade/voltbox',
      icon: <Calculator className="w-4 h-4" />,
      color: 'bg-blue-500'
    },
    {
      key: 'M',
      action: 'Market Data',
      link: '/market-data',
      icon: <BarChart3 className="w-4 h-4" />,
      color: 'bg-green-500'
    },
    {
      key: 'A',
      action: 'BlackBox AI',
      link: '/ai-thinking',
      icon: <Zap className="w-4 h-4" />,
      color: 'bg-yellow-500'
    },
    {
      key: 'S',
      action: 'Global Search',
      link: '/search',
      icon: <Search className="w-4 h-4" />,
      color: 'bg-purple-500'
    },
    {
      key: 'C',
      action: 'Control Panel',
      link: '/control-panel',
      icon: <Settings className="w-4 h-4" />,
      color: 'bg-red-500'
    },
    {
      key: 'T',
      action: 'All Trades',
      link: '/trades',
      icon: <Users className="w-4 h-4" />,
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-50">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">⚡ Keyboard Shortcuts</h3>
      <div className="space-y-2">
        {shortcuts.map((shortcut, index) => (
          <Link
            key={index}
            to={shortcut.link}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <div className={`${shortcut.color} text-white p-1.5 rounded flex items-center justify-center`}>
              {shortcut.icon}
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-900">{shortcut.action}</span>
            </div>
            <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-mono">
              {shortcut.key}
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">Press Alt + key to activate</p>
      </div>
    </div>
  );
};

export default ShortcutPanel;
