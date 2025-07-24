import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Settings, BarChart3, Hotel, Zap, Smartphone, Clipboard } from 'lucide-react';

const Navigation = ({ searchQuery, setSearchQuery }) => {
  const location = useLocation();

  const tradeTypes = [
    { id: 'voltbox', name: 'VoltBox', icon: '⚡', color: 'bg-yellow-500' },
    { id: 'airbox', name: 'AirBox', icon: '❄️', color: 'bg-blue-500' },
    { id: 'flowbox', name: 'FlowBox', icon: '🚰', color: 'bg-cyan-500' },
    { id: 'floorbox', name: 'FloorBox', icon: '🏗️', color: 'bg-amber-600' },
    { id: 'poolbox', name: 'PoolBox', icon: '🏊', color: 'bg-blue-600' },
    { id: 'securitybox', name: 'SecurityBox', icon: '🔒', color: 'bg-red-600' },
    { id: 'ffebox', name: 'FFEBox', icon: '🪑', color: 'bg-yellow-600' },
    { id: 'glazebox', name: 'GlazeBox', icon: '🪟', color: 'bg-sky-400' },
    { id: 'framebox', name: 'FrameBox', icon: '🔨', color: 'bg-orange-600' },
    { id: 'insulationbox', name: 'InsulationBox', icon: '🧊', color: 'bg-blue-400' },
    { id: 'concretebox', name: 'ConcreteBox', icon: '🏗️', color: 'bg-gray-600' },
    { id: 'roofbox', name: 'RoofBox', icon: '🏠', color: 'bg-red-700' },
    { id: 'paintbox', name: 'PaintBox', icon: '🎨', color: 'bg-pink-500' },
    { id: 'carpentrybox', name: 'CarpentryBox', icon: '🔨', color: 'bg-amber-700' }
  ];

  return (
    <nav className="bg-white shadow-lg border-b-2 border-primary-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">BlackBox 5000x</h1>
              <p className="text-sm text-gray-600">AI-Driven Estimator</p>
            </div>
          </Link>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Global search across all systems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
              />
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Link to="/trades" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1">
              <Zap className="w-4 h-4" />
              <span className="hidden md:inline">Trades</span>
            </Link>
            <Link to="/market-data" className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden md:inline">Market</span>
            </Link>
            <Link to="/hotel-finder" className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1">
              <Hotel className="w-4 h-4" />
              <span className="hidden md:inline">Hotels</span>
            </Link>
            <Link to="/mobile" className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1">
              <Smartphone className="w-4 h-4" />
              <span className="hidden md:inline">Mobile</span>
            </Link>
            <Link to="/field-data" className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1">
              <Clipboard className="w-4 h-4" />
              <span className="hidden md:inline">Field</span>
            </Link>
            <Link to="/boardroom" className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1">
              <span>🏢</span>
              <span className="hidden md:inline">Board</span>
            </Link>
            <Link to="/ai-thinking" className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1">
              <span>🧠</span>
              <span className="hidden md:inline">AI</span>
            </Link>
            <Link to="/control-panel" className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1">
              <Settings className="w-4 h-4" />
              <span className="hidden md:inline">Control</span>
            </Link>
          </div>
        </div>

        <div className="pb-3">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {tradeTypes.map((trade) => (
              <Link
                key={trade.id}
                to={`/trade/${trade.id}`}
                className={`${trade.color} text-white px-2.5 py-1 rounded-md font-medium text-xs hover:opacity-90 transition-all hover:scale-105 flex items-center space-x-1 shadow-sm`}
              >
                <span className="text-xs">{trade.icon}</span>
                <span className="hidden sm:inline">{trade.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
