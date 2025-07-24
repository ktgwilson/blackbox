import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, MapPin, Clock } from 'lucide-react';

const MarketData = ({ data }) => {
  const [liveData, setLiveData] = useState({
    laborRates: [
      { name: 'Electrician', rate: 95, trend: 'up', change: '+8%' },
      { name: 'HVAC Tech', rate: 88, trend: 'up', change: '+5%' },
      { name: 'Plumber', rate: 92, trend: 'down', change: '-2%' },
      { name: 'Flooring Installer', rate: 75, trend: 'up', change: '+12%' }
    ],
    materialCosts: [
      { name: 'Copper Wire', price: 3.45, trend: 'up', change: '+3%' },
      { name: 'PVC Pipe', price: 2.89, trend: 'down', change: '-1%' },
      { name: 'Steel Conduit', price: 4.12, trend: 'up', change: '+7%' },
      { name: 'Lumber 2x4', price: 8.95, trend: 'up', change: '+15%' }
    ],
    regions: [
      { name: 'Downtown', multiplier: 1.25, demand: 'High' },
      { name: 'Suburbs', multiplier: 1.0, demand: 'Medium' },
      { name: 'Industrial', multiplier: 1.15, demand: 'High' },
      { name: 'Residential', multiplier: 0.95, demand: 'Low' }
    ]
  });

  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      setLiveData(prev => ({
        ...prev,
        laborRates: prev.laborRates.map(item => ({
          ...item,
          rate: item.rate + (Math.random() - 0.5) * 2
        }))
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Market Data Intelligence</h1>
          <p className="text-xl text-gray-600 mt-2">Real-time pricing and market conditions</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Last Updated</p>
          <p className="text-lg font-semibold">{lastUpdate.toLocaleTimeString()}</p>
          <div className="flex items-center text-green-600 mt-1">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">Auto-updating every 30s</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <DollarSign className="w-6 h-6 mr-2" />
            Labor Rates ($/hour)
          </h2>
          <div className="space-y-3">
            {liveData.laborRates.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{item.name}</span>
                <div className="text-right">
                  <div className="font-bold">${item.rate.toFixed(0)}</div>
                  <div className={`text-sm flex items-center ${
                    item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {item.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2" />
            Material Costs ($/unit)
          </h2>
          <div className="space-y-3">
            {liveData.materialCosts.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{item.name}</span>
                <div className="text-right">
                  <div className="font-bold">${item.price.toFixed(2)}</div>
                  <div className={`text-sm flex items-center ${
                    item.trend === 'up' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {item.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {item.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <MapPin className="w-6 h-6 mr-2" />
          Regional Market Conditions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {liveData.regions.map((region, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900">{region.name}</h3>
              <p className="text-2xl font-bold text-primary-600">{region.multiplier}x</p>
              <p className={`text-sm font-medium ${
                region.demand === 'High' ? 'text-red-600' :
                region.demand === 'Medium' ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {region.demand} Demand
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">🤖 AI Market Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">Trending Insights</h3>
            <ul className="space-y-2 text-blue-700">
              <li>• Electrical work demand up 15% this quarter</li>
              <li>• Material costs stabilizing after recent volatility</li>
              <li>• Labor shortage driving premium rates</li>
              <li>• Weather delays expected next week</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">Recommendations</h3>
            <ul className="space-y-2 text-blue-700">
              <li>• Lock in copper prices before next increase</li>
              <li>• Schedule electrical projects ASAP</li>
              <li>• Consider premium pricing for rush jobs</li>
              <li>• Build weather delays into timelines</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketData;
