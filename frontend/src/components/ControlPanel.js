import React, { useState } from 'react';
import { BarChart3, Users, Settings, Database, TrendingUp, Shield, Bell, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const ControlPanel = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  const analyticsData = [
    { month: 'Jan', revenue: 240000, projects: 12, margin: 18 },
    { month: 'Feb', revenue: 280000, projects: 15, margin: 22 },
    { month: 'Mar', revenue: 320000, projects: 18, margin: 25 },
    { month: 'Apr', revenue: 290000, projects: 16, margin: 20 },
    { month: 'May', revenue: 350000, projects: 21, margin: 28 },
    { month: 'Jun', revenue: 380000, projects: 24, margin: 30 }
  ];

  const tradeDistribution = [
    { name: 'Electrical', value: 35, color: '#fbbf24' },
    { name: 'HVAC', value: 25, color: '#3b82f6' },
    { name: 'Plumbing', value: 20, color: '#06b6d4' },
    { name: 'Flooring', value: 12, color: '#f59e0b' },
    { name: 'Other', value: 8, color: '#6b7280' }
  ];

  const users = [
    { id: 1, name: 'John Smith', role: 'Admin', email: 'john@company.com', status: 'Active', lastLogin: '2024-01-22' },
    { id: 2, name: 'Sarah Johnson', role: 'Estimator', email: 'sarah@company.com', status: 'Active', lastLogin: '2024-01-22' },
    { id: 3, name: 'Mike Wilson', role: 'Project Manager', email: 'mike@company.com', status: 'Active', lastLogin: '2024-01-21' },
    { id: 4, name: 'Lisa Brown', role: 'Crew Lead', email: 'lisa@company.com', status: 'Inactive', lastLogin: '2024-01-18' }
  ];

  const systemSettings = [
    { category: 'General', settings: ['Company Information', 'Default Markup Rates', 'Currency Settings', 'Time Zone'] },
    { category: 'AI Configuration', settings: ['Intelligence Level', 'Auto-Update Frequency', 'Market Data Sources', 'Prediction Models'] },
    { category: 'Integrations', settings: ['CRM Connection', 'Accounting Software', 'Material Suppliers', 'Weather Services'] },
    { category: 'Security', settings: ['User Permissions', 'Data Backup', 'API Access', 'Audit Logging'] }
  ];

  const renderAnalytics = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900">$2.4M</h3>
          <p className="text-gray-600">Total Revenue</p>
          <button className="btn-primary mt-4 w-full">Update</button>
        </div>
        <div className="card text-center">
          <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900">106</h3>
          <p className="text-gray-600">Projects Completed</p>
          <button className="btn-primary mt-4 w-full">Update</button>
        </div>
        <div className="card text-center">
          <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900">24%</h3>
          <p className="text-gray-600">Avg Profit Margin</p>
          <button className="btn-primary mt-4 w-full">Update</button>
        </div>
        <div className="card text-center">
          <Shield className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900">87%</h3>
          <p className="text-gray-600">Win Rate</p>
          <button className="btn-primary mt-4 w-full">Update</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
          <button className="btn-secondary mt-4">Auto-Update: ON</button>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Trade Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tradeDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {tradeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <button className="btn-secondary mt-4">Auto-Update: ON</button>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Project Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="projects" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
        <button className="btn-secondary mt-4">Auto-Update: ON</button>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <button className="btn-primary">Add New User</button>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Name</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Role</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Email</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Last Login</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-900">{user.name}</td>
                  <td className="py-4 px-4 text-gray-600">{user.role}</td>
                  <td className="py-4 px-4 text-gray-600">{user.email}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{user.lastLogin}</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-sm">Edit</button>
                      <button className="btn-secondary text-sm">Update</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900">{users.length}</h3>
          <p className="text-gray-600">Total Users</p>
          <button className="btn-primary mt-4 w-full">Update</button>
        </div>
        <div className="card text-center">
          <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'Active').length}</h3>
          <p className="text-gray-600">Active Users</p>
          <button className="btn-primary mt-4 w-full">Update</button>
        </div>
        <div className="card text-center">
          <Bell className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900">3</h3>
          <p className="text-gray-600">Pending Invites</p>
          <button className="btn-primary mt-4 w-full">Update</button>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
        <button className="btn-primary flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Export Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {systemSettings.map((category, index) => (
          <div key={index} className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{category.category}</h3>
            <div className="space-y-4">
              {category.settings.map((setting, settingIndex) => (
                <div key={settingIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">{setting}</span>
                  <button className="btn-secondary text-sm">Configure</button>
                </div>
              ))}
            </div>
            <button className="btn-primary mt-6 w-full">Update All Settings</button>
          </div>
        ))}
      </div>

      <div className="card bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <h3 className="text-xl font-bold text-yellow-900 mb-4">⚠️ System Maintenance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Scheduled Tasks</h4>
            <ul className="space-y-2 text-yellow-700">
              <li>• Database backup: Daily at 2:00 AM</li>
              <li>• Market data sync: Every 30 seconds</li>
              <li>• System health check: Hourly</li>
              <li>• User activity log: Real-time</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">System Status</h4>
            <ul className="space-y-2 text-yellow-700">
              <li>• API Response Time: 120ms ✅</li>
              <li>• Database Performance: Optimal ✅</li>
              <li>• AI Processing: Active ✅</li>
              <li>• Real-time Updates: Functional ✅</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Control Panel</h1>
        <p className="text-xl text-gray-600 mt-2">System management and analytics dashboard</p>
      </div>

      <div className="card">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
              activeTab === 'analytics'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-5 h-5 inline mr-2" />
            System Analytics
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
              activeTab === 'users'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-5 h-5 inline mr-2" />
            User Management
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
              activeTab === 'settings'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Settings className="w-5 h-5 inline mr-2" />
            System Settings
          </button>
        </div>
      </div>

      {activeTab === 'analytics' && renderAnalytics()}
      {activeTab === 'users' && renderUserManagement()}
      {activeTab === 'settings' && renderSystemSettings()}
    </div>
  );
};

export default ControlPanel;
