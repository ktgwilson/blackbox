const express = require('express');
const router = express.Router();

router.get('/analytics', (req, res) => {
  const analytics = {
    revenue: {
      total: 2400000,
      monthly: [
        { month: 'Jan', revenue: 240000, projects: 12, margin: 18 },
        { month: 'Feb', revenue: 280000, projects: 15, margin: 22 },
        { month: 'Mar', revenue: 320000, projects: 18, margin: 25 },
        { month: 'Apr', revenue: 290000, projects: 16, margin: 20 },
        { month: 'May', revenue: 350000, projects: 21, margin: 28 },
        { month: 'Jun', revenue: 380000, projects: 24, margin: 30 }
      ]
    },
    projects: {
      total: 106,
      active: 24,
      completed: 82
    },
    trades: [
      { name: 'Electrical', value: 35, projects: 37 },
      { name: 'HVAC', value: 25, projects: 27 },
      { name: 'Plumbing', value: 20, projects: 21 },
      { name: 'Flooring', value: 12, projects: 13 },
      { name: 'Other', value: 8, projects: 8 }
    ],
    performance: {
      avgMargin: 24,
      winRate: 87,
      avgProjectTime: 4.2
    }
  };
  
  res.json(analytics);
});

router.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Smith', role: 'Admin', email: 'john@company.com', status: 'Active', lastLogin: '2024-01-22' },
    { id: 2, name: 'Sarah Johnson', role: 'Estimator', email: 'sarah@company.com', status: 'Active', lastLogin: '2024-01-22' },
    { id: 3, name: 'Mike Wilson', role: 'Project Manager', email: 'mike@company.com', status: 'Active', lastLogin: '2024-01-21' },
    { id: 4, name: 'Lisa Brown', role: 'Crew Lead', email: 'lisa@company.com', status: 'Inactive', lastLogin: '2024-01-18' }
  ];
  
  res.json(users);
});

router.get('/settings', (req, res) => {
  const settings = {
    general: {
      companyName: 'BlackBox Construction',
      defaultMarkup: 20,
      currency: 'USD',
      timezone: 'America/New_York'
    },
    ai: {
      intelligenceLevel: 'medium',
      autoUpdateFrequency: 30,
      marketDataSources: ['internal', 'external'],
      predictionModels: ['standard', 'advanced']
    },
    integrations: {
      crm: 'connected',
      accounting: 'pending',
      suppliers: 'connected',
      weather: 'connected'
    },
    security: {
      userPermissions: 'role-based',
      dataBackup: 'daily',
      apiAccess: 'restricted',
      auditLogging: 'enabled'
    }
  };
  
  res.json(settings);
});

module.exports = router;
