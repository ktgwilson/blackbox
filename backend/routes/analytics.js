const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const analytics = {
      overview: {
        totalProjects: 156,
        activeProjects: 23,
        completedProjects: 133,
        totalRevenue: 2847500,
        avgProjectValue: 18253,
        profitMargin: 24.8,
        winRate: 87.3
      },
      revenueByMonth: [
        { month: 'Jan', revenue: 245000, projects: 12 },
        { month: 'Feb', revenue: 289000, projects: 15 },
        { month: 'Mar', revenue: 312000, projects: 18 },
        { month: 'Apr', revenue: 298000, projects: 16 },
        { month: 'May', revenue: 334000, projects: 19 },
        { month: 'Jun', revenue: 367000, projects: 21 }
      ],
      tradeDistribution: [
        { trade: 'VoltBox', projects: 34, revenue: 687000, avgMargin: 26.2 },
        { trade: 'AirBox', projects: 28, revenue: 542000, avgMargin: 23.8 },
        { trade: 'FlowBox', projects: 25, revenue: 478000, avgMargin: 25.1 },
        { trade: 'FloorBox', projects: 22, revenue: 398000, avgMargin: 22.4 },
        { trade: 'GlazeBox', projects: 18, revenue: 324000, avgMargin: 24.7 },
        { trade: 'FrameBox', projects: 16, revenue: 287000, avgMargin: 21.9 },
        { trade: 'Other', projects: 13, revenue: 231500, avgMargin: 23.5 }
      ],
      performanceMetrics: {
        estimateAccuracy: 94.2,
        onTimeDelivery: 91.7,
        customerSatisfaction: 4.6,
        crewUtilization: 87.3,
        materialWaste: 3.2,
        safetyScore: 98.1
      },
      topPerformers: [
        { name: 'Mike Rodriguez', trade: 'VoltBox', projects: 12, revenue: 234000, rating: 4.9 },
        { name: 'Sarah Chen', trade: 'AirBox', projects: 10, revenue: 198000, rating: 4.8 },
        { name: 'David Thompson', trade: 'FlowBox', projects: 9, revenue: 176000, rating: 4.7 },
        { name: 'Lisa Johnson', trade: 'GlazeBox', projects: 8, revenue: 154000, rating: 4.8 }
      ],
      riskAnalysis: {
        highRiskProjects: 3,
        mediumRiskProjects: 8,
        lowRiskProjects: 12,
        riskFactors: [
          { factor: 'Weather Delays', frequency: 23, impact: 'Medium' },
          { factor: 'Material Shortages', frequency: 18, impact: 'High' },
          { factor: 'Permit Delays', frequency: 15, impact: 'Medium' },
          { factor: 'Site Access', frequency: 12, impact: 'Low' }
        ]
      },
      predictiveInsights: {
        nextMonthRevenue: 389000,
        crewDemand: {
          voltbox: 8,
          airbox: 6,
          flowbox: 5,
          other: 4
        },
        marketTrends: [
          { trend: 'Commercial HVAC demand increasing', impact: '+12%' },
          { trend: 'Electrical upgrade projects rising', impact: '+8%' },
          { trend: 'Material costs stabilizing', impact: '+2%' }
        ]
      }
    };

    res.json(analytics);
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

router.get('/projects/:timeframe', authenticateToken, async (req, res) => {
  try {
    const { timeframe } = req.params;
    
    const projectAnalytics = {
      summary: {
        total: 156,
        completed: 133,
        active: 23,
        avgDuration: 12.5,
        successRate: 94.2
      },
      byStatus: [
        { status: 'Planning', count: 5, percentage: 21.7 },
        { status: 'In Progress', count: 12, percentage: 52.2 },
        { status: 'Review', count: 4, percentage: 17.4 },
        { status: 'Completed', count: 2, percentage: 8.7 }
      ],
      timeline: [
        { week: 'Week 1', planned: 8, actual: 7, completed: 6 },
        { week: 'Week 2', planned: 10, actual: 9, completed: 8 },
        { week: 'Week 3', planned: 12, actual: 11, completed: 10 },
        { week: 'Week 4', planned: 9, actual: 8, completed: 7 }
      ]
    };

    res.json(projectAnalytics);
  } catch (error) {
    console.error('Project analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch project analytics' });
  }
});

router.get('/crew-performance', authenticateToken, async (req, res) => {
  try {
    const crewPerformance = {
      utilization: {
        overall: 87.3,
        byTrade: [
          { trade: 'VoltBox', utilization: 92.1, efficiency: 94.5 },
          { trade: 'AirBox', utilization: 88.7, efficiency: 91.2 },
          { trade: 'FlowBox', utilization: 85.3, efficiency: 89.8 },
          { trade: 'FloorBox', utilization: 83.9, efficiency: 87.4 }
        ]
      },
      productivity: [
        { metric: 'Tasks per Day', current: 8.4, target: 8.0, trend: '+5%' },
        { metric: 'Quality Score', current: 94.2, target: 90.0, trend: '+2%' },
        { metric: 'Safety Score', current: 98.1, target: 95.0, trend: '+1%' },
        { metric: 'Customer Rating', current: 4.6, target: 4.5, trend: '+3%' }
      ],
      training: {
        completionRate: 94.7,
        upcomingCertifications: 12,
        skillGaps: [
          { skill: 'Advanced Electrical', gap: 15, priority: 'High' },
          { skill: 'HVAC Controls', gap: 8, priority: 'Medium' },
          { skill: 'Safety Protocols', gap: 3, priority: 'Low' }
        ]
      }
    };

    res.json(crewPerformance);
  } catch (error) {
    console.error('Crew performance error:', error);
    res.status(500).json({ error: 'Failed to fetch crew performance data' });
  }
});

module.exports = router;
