import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Settings, BarChart3, Hotel, Zap } from 'lucide-react';

const Navigation = ({ searchQuery, setSearchQuery }) => {
  const location = useLocation();

  const tradeTypes = [
    { id: 'voltbox', name: 'VoltBox', icon: '⚡', color: 'bg-yellow-500' },
    { id: 'airbox', name: 'AirBox', icon: '❄️', color: 'bg-blue-500' },
    { id: 'flowbox', name: 'FlowBox', icon: '🚰', color: 'bg-cyan-500' },
    { id: 'floorbox', name: 'FloorBox', icon: '🏗️', color: 'bg-amber-600' },
    { id: 'glazebox', name: 'GlazeBox', icon: '🪟', color: 'bg-sky-400' },
    { id: 'framebox', name: 'FrameBox', icon: '🔨', color: 'bg-orange-600' },
    { id: 'signalbox', name: 'SignalBox', icon: '📡', color: 'bg-purple-500' },
    { id: 'roofbox', name: 'RoofBox', icon: '🏠', color: 'bg-red-600' },
    { id: 'colorbox', name: 'ColorBox', icon: '🎨', color: 'bg-pink-500' },
    { id: 'greenbox', name: 'GreenBox', icon: '🌱', color: 'bg-green-500' },
    { id: 'renobox', name: 'RenoBox', icon: '🔧', color: 'bg-gray-600' },
    { id: 'dockbox', name: 'DockBox', icon: '⚓', color: 'bg-blue-700' }
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

          <div className="flex items-center space-x-4">
            <Link to="/trades" className="btn-secondary flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>All Trades</span>
            </Link>
            <Link to="/market-data" className="btn-secondary flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Market Data</span>
            </Link>
            <Link to="/hotel-finder" className="btn-secondary flex items-center space-x-2">
              <Hotel className="w-5 h-5" />
              <span>Hotels</span>
            </Link>
            <Link to="/control-panel" className="btn-primary flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Control Panel</span>
            </Link>
          </div>
        </div>

        <div className="pb-4">
          <div className="flex flex-wrap gap-2">
            {tradeTypes.map((trade) => (
              <Link
                key={trade.id}
                to={`/trade/${trade.id}`}
                className={`${trade.color} text-white px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity flex items-center space-x-2`}
              >
                <span className="text-lg">{trade.icon}</span>
                <span>{trade.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
