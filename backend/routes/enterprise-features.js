const express = require('express');
const router = express.Router();

router.get('/security-metrics', async (req, res) => {
  try {
    const securityMetrics = {
      status: 'secure',
      lastAudit: '2024-01-15',
      vulnerabilities: 0,
      complianceScore: 98,
      encryptionStatus: 'active',
      accessControls: 'enforced',
      backupStatus: 'current',
      monitoringActive: true
    };
    
    res.json(securityMetrics);
  } catch (error) {
    console.error('Error fetching security metrics:', error);
    res.status(500).json({ error: 'Failed to fetch security metrics' });
  }
});

router.get('/business-intelligence', async (req, res) => {
  try {
    const businessIntelligence = {
      revenue: {
        thisMonth: 2400000,
        lastMonth: 2100000,
        growth: 14.3,
        projectedNext: 2650000
      },
      projects: {
        active: 24,
        completed: 156,
        pipeline: 38,
        averageValue: 125000
      },
      performance: {
        onTimeDelivery: 94,
        customerSatisfaction: 4.8,
        profitMargin: 22.5,
        crewUtilization: 87
      },
      trends: {
        topTrades: ['VoltBox', 'AirBox', 'FlowBox'],
        growthAreas: ['PoolBox', 'SecurityBox'],
        seasonalFactors: 'Q2 peak season approaching'
      }
    };
    
    res.json(businessIntelligence);
  } catch (error) {
    console.error('Error fetching business intelligence:', error);
    res.status(500).json({ error: 'Failed to fetch business intelligence' });
  }
});

router.get('/tenant-info', async (req, res) => {
  try {
    const tenantInfo = {
      tenants: [
        {
          id: 'blackbox-main',
          name: 'BlackBox Estimator',
          status: 'active',
          users: 156,
          projects: 24,
          subscription: 'enterprise',
          customBranding: true
        },
        {
          id: 'voltbox-pro',
          name: 'VoltBox Professional',
          status: 'active',
          users: 45,
          projects: 8,
          subscription: 'professional',
          customBranding: true
        },
        {
          id: 'poolbox-elite',
          name: 'PoolBox Elite',
          status: 'active',
          users: 23,
          projects: 12,
          subscription: 'premium',
          customBranding: false
        }
      ],
      totalTenants: 3,
      totalUsers: 224,
      totalRevenue: 45000
    };
    
    res.json(tenantInfo);
  } catch (error) {
    console.error('Error fetching tenant info:', error);
    res.status(500).json({ error: 'Failed to fetch tenant information' });
  }
});

router.get('/reports', async (req, res) => {
  try {
    const reports = {
      available: [
        {
          id: 'revenue-analysis',
          name: 'Revenue Analysis Report',
          description: 'Comprehensive revenue breakdown by trade and time period',
          lastGenerated: '2024-01-20',
          format: 'PDF'
        },
        {
          id: 'project-performance',
          name: 'Project Performance Report',
          description: 'Analysis of project completion times and success rates',
          lastGenerated: '2024-01-19',
          format: 'Excel'
        },
        {
          id: 'crew-utilization',
          name: 'Crew Utilization Report',
          description: 'Detailed crew efficiency and utilization metrics',
          lastGenerated: '2024-01-18',
          format: 'PDF'
        },
        {
          id: 'market-trends',
          name: 'Market Trends Analysis',
          description: 'Regional market analysis and pricing trends',
          lastGenerated: '2024-01-17',
          format: 'PowerPoint'
        }
      ],
      customReports: 12,
      scheduledReports: 5
    };
    
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

router.get('/system-health', async (req, res) => {
  try {
    const systemHealth = {
      overall: 'healthy',
      uptime: '99.8%',
      responseTime: '145ms',
      errorRate: '0.02%',
      services: {
        api: 'healthy',
        database: 'healthy',
        ai: 'healthy',
        notifications: 'healthy',
        integrations: 'healthy'
      },
      resources: {
        cpu: 23,
        memory: 67,
        storage: 45,
        bandwidth: 12
      },
      alerts: [],
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-02-10'
    };
    
    res.json(systemHealth);
  } catch (error) {
    console.error('Error fetching system health:', error);
    res.status(500).json({ error: 'Failed to fetch system health' });
  }
});

module.exports = router;
