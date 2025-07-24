import React from 'react';
import { Link } from 'react-router-dom';

const TradeVerticals = () => {
  const allTrades = [
    { id: 'voltbox', name: 'VoltBox', icon: '⚡', color: 'bg-yellow-500', description: 'Electrical Systems' },
    { id: 'airbox', name: 'AirBox', icon: '❄️', color: 'bg-blue-500', description: 'HVAC Systems' },
    { id: 'flowbox', name: 'FlowBox', icon: '🚰', color: 'bg-cyan-500', description: 'Plumbing Systems' },
    { id: 'floorbox', name: 'FloorBox', icon: '🏗️', color: 'bg-amber-600', description: 'Flooring Systems' },
    { id: 'glazebox', name: 'GlazeBox', icon: '🪟', color: 'bg-sky-400', description: 'Glazing & Windows' },
    { id: 'framebox', name: 'FrameBox', icon: '🔨', color: 'bg-orange-600', description: 'Framing & Drywall' },
    { id: 'signalbox', name: 'SignalBox', icon: '📡', color: 'bg-purple-500', description: 'Low Voltage' },
    { id: 'roofbox', name: 'RoofBox', icon: '🏠', color: 'bg-red-600', description: 'Roofing Systems' },
    { id: 'colorbox', name: 'ColorBox', icon: '🎨', color: 'bg-pink-500', description: 'Painting & Finishing' },
    { id: 'greenbox', name: 'GreenBox', icon: '🌱', color: 'bg-green-500', description: 'Landscaping' },
    { id: 'renobox', name: 'RenoBox', icon: '🔧', color: 'bg-gray-600', description: 'Renovations' },
    { id: 'dockbox', name: 'DockBox', icon: '⚓', color: 'bg-blue-700', description: 'Marine & Docks' },
    { id: 'securebox', name: 'SecureBox', icon: '🔒', color: 'bg-indigo-600', description: 'Security Systems' },
    { id: 'soundbox', name: 'SoundBox', icon: '🔊', color: 'bg-violet-600', description: 'Audio/Visual' },
    { id: 'routebox', name: 'RouteBox', icon: '🚛', color: 'bg-emerald-600', description: 'Logistics' },
    { id: 'signbox', name: 'SignBox', icon: '🪧', color: 'bg-teal-600', description: 'Signage' },
    { id: 'corebox', name: 'CoreBox', icon: '💾', color: 'bg-slate-600', description: 'Data Centers' },
    { id: 'deskbox', name: 'DeskBox', icon: '🪑', color: 'bg-amber-700', description: 'Commercial Furniture' },
    { id: 'autobox', name: 'AutoBox', icon: '🚗', color: 'bg-zinc-600', description: 'Automotive' },
    { id: 'sterilebox', name: 'SterileBox', icon: '🧪', color: 'bg-lime-600', description: 'Cleanroom/Medical' },
    { id: 'forgebox', name: 'ForgeBox', icon: '⚙️', color: 'bg-stone-600', description: 'Industrial' },
    { id: 'shadebox', name: 'ShadeBox', icon: '🪟', color: 'bg-neutral-600', description: 'Window Treatments' },
    { id: 'bluebox', name: 'BlueBox', icon: '🏊', color: 'bg-blue-800', description: 'Pools/Outdoor' },
    { id: 'showbox', name: 'ShowBox', icon: '🎭', color: 'bg-fuchsia-600', description: 'Event Installations' },
    { id: 'poolbox', name: 'PoolBox', icon: '🏊', color: 'bg-blue-600', description: 'Pool Construction' },
    { id: 'securitybox', name: 'SecurityBox', icon: '🔒', color: 'bg-red-600', description: 'Security Systems' },
    { id: 'ffebox', name: 'FFEBox', icon: '🪑', color: 'bg-yellow-600', description: 'Furniture, Fixtures & Equipment' },
    { id: 'insulationbox', name: 'InsulationBox', icon: '🧊', color: 'bg-blue-400', description: 'Insulation Installation' },
    { id: 'framebox', name: 'FrameBox', icon: '🔨', color: 'bg-orange-600', description: 'Framing & Drywall' },
    { id: 'glazebox', name: 'GlazeBox', icon: '🪟', color: 'bg-sky-400', description: 'Glazing & Windows' },
    { id: 'concretebox', name: 'ConcreteBox', icon: '🏗️', color: 'bg-gray-600', description: 'Concrete Construction' },
    { id: 'roofbox', name: 'RoofBox', icon: '🏠', color: 'bg-red-700', description: 'Roofing Systems' },
    { id: 'paintbox', name: 'PaintBox', icon: '🎨', color: 'bg-pink-500', description: 'Interior Finishing' },
    { id: 'carpentrybox', name: 'CarpentryBox', icon: '🔨', color: 'bg-amber-700', description: 'Carpentry & Millwork' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Trade Verticals</h1>
        <p className="text-xl text-gray-600 mt-2">Complete BlackBox ecosystem for all construction trades</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allTrades.map((trade) => (
          <Link
            key={trade.id}
            to={`/trade/${trade.id}`}
            className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-center">
              <div className={`w-20 h-20 ${trade.color} rounded-xl flex items-center justify-center text-4xl mx-auto mb-4`}>
                {trade.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{trade.name}</h3>
              <p className="text-gray-600 text-sm">{trade.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">🤖 AI-Powered Trade Intelligence</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">Shared Core Engine</h3>
            <ul className="space-y-1 text-blue-700 text-sm">
              <li>• Universal estimation algorithms</li>
              <li>• Cross-trade crew optimization</li>
              <li>• Integrated market data</li>
              <li>• Unified project management</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">Trade-Specific Features</h3>
            <ul className="space-y-1 text-blue-700 text-sm">
              <li>• Custom tool libraries</li>
              <li>• Specialized risk assessments</li>
              <li>• Industry-specific materials</li>
              <li>• Trade-focused language</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">AI Enhancements</h3>
            <ul className="space-y-1 text-blue-700 text-sm">
              <li>• Predictive analytics per trade</li>
              <li>• Cross-vertical insights</li>
              <li>• Automated bundling opportunities</li>
              <li>• Real-time optimization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeVerticals;
