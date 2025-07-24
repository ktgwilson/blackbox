import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, DollarSign, Clock, Brain, Zap } from 'lucide-react';

const Dashboard = ({ marketData }) => {
  const stats = [
    { label: 'Active Projects', value: '24', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Crew Members', value: '156', icon: Users, color: 'text-blue-600' },
    { label: 'Revenue This Month', value: '$2.4M', icon: DollarSign, color: 'text-purple-600' },
    { label: 'Avg. Project Time', value: '4.2 days', icon: Clock, color: 'text-orange-600' }
  ];

  const recentProjects = [
    { id: 1, name: 'Downtown Office Complex - Electrical', trade: 'VoltBox', status: 'In Progress', value: '$125,000' },
    { id: 2, name: 'Hotel Renovation - HVAC', trade: 'AirBox', status: 'Completed', value: '$89,500' },
    { id: 3, name: 'Retail Store - Flooring', trade: 'FloorBox', status: 'Quoted', value: '$45,200' },
    { id: 4, name: 'Warehouse - Plumbing', trade: 'FlowBox', status: 'In Progress', value: '$67,800' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-xl text-gray-600 mt-2">AI-Powered Construction Estimation Command Center</p>
        </div>
        <div className="flex items-center space-x-3 bg-gradient-to-r from-primary-500 to-purple-600 text-white px-6 py-3 rounded-lg">
          <Brain className="w-6 h-6" />
          <span className="font-semibold">Jarvis AI Active</span>
          <Zap className="w-5 h-5 animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <stat.icon className={`w-12 h-12 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Projects</h2>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-600">{project.trade}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{project.value}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Intelligence</h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800">Labor Market</h3>
              <p className="text-green-700">Skilled electricians: High demand, +12% rates</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800">Material Costs</h3>
              <p className="text-blue-700">Copper prices stable, Steel up 3% this week</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-800">Regional Forecast</h3>
              <p className="text-purple-700">Weather delays expected Thu-Fri</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/trade/voltbox" className="btn-primary text-center">
            ⚡ New Electrical Quote
          </Link>
          <Link to="/trade/airbox" className="btn-primary text-center">
            ❄️ HVAC Estimate
          </Link>
          <Link to="/hotel-finder" className="btn-secondary text-center">
            🏨 Find Crew Hotels
          </Link>
          <Link to="/control-panel" className="btn-secondary text-center">
            ⚙️ System Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
