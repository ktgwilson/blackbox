const express = require('express');
const router = express.Router();

router.get('/crew-status', async (req, res) => {
  try {
    const crewStatus = {
      totalCrew: 156,
      activeProjects: 24,
      availableCrew: 32,
      crews: [
        {
          id: 'crew-001',
          name: 'Alpha Team',
          trade: 'VoltBox',
          status: 'active',
          location: 'Downtown Office Complex',
          members: 4,
          currentProject: 'PRJ-2024-001',
          estimatedCompletion: '2024-01-25'
        },
        {
          id: 'crew-002',
          name: 'Beta Squad',
          trade: 'AirBox',
          status: 'active',
          location: 'Hotel Renovation Site',
          members: 3,
          currentProject: 'PRJ-2024-002',
          estimatedCompletion: '2024-01-28'
        },
        {
          id: 'crew-003',
          name: 'Gamma Unit',
          trade: 'PoolBox',
          status: 'available',
          location: 'Base Office',
          members: 5,
          currentProject: null,
          estimatedCompletion: null
        }
      ]
    };
    
    res.json(crewStatus);
  } catch (error) {
    console.error('Error fetching crew status:', error);
    res.status(500).json({ error: 'Failed to fetch crew status' });
  }
});

router.get('/field-updates', async (req, res) => {
  try {
    const fieldUpdates = {
      recentUpdates: [
        {
          id: 'update-001',
          crewId: 'crew-001',
          timestamp: '2024-01-20T14:30:00Z',
          type: 'progress',
          message: 'Electrical panel installation 75% complete',
          location: 'Building A, Floor 3',
          photos: ['photo1.jpg', 'photo2.jpg']
        },
        {
          id: 'update-002',
          crewId: 'crew-002',
          timestamp: '2024-01-20T13:15:00Z',
          type: 'issue',
          message: 'HVAC unit delivery delayed by 2 hours',
          location: 'Loading Dock',
          photos: []
        },
        {
          id: 'update-003',
          crewId: 'crew-001',
          timestamp: '2024-01-20T11:45:00Z',
          type: 'completion',
          message: 'Conduit runs completed ahead of schedule',
          location: 'Building A, All Floors',
          photos: ['photo3.jpg']
        }
      ],
      totalUpdates: 47,
      lastSync: '2024-01-20T14:35:00Z'
    };
    
    res.json(fieldUpdates);
  } catch (error) {
    console.error('Error fetching field updates:', error);
    res.status(500).json({ error: 'Failed to fetch field updates' });
  }
});

router.post('/assign-crew', async (req, res) => {
  try {
    const { crewId, projectId, location, estimatedDuration } = req.body;
    
    const assignment = {
      id: `assign-${Date.now()}`,
      crewId,
      projectId,
      location,
      estimatedDuration,
      assignedAt: new Date().toISOString(),
      status: 'assigned',
      notifications: {
        crewNotified: true,
        clientNotified: true,
        supervisorNotified: true
      }
    };
    
    res.json({
      success: true,
      assignment,
      message: 'Crew successfully assigned to project'
    });
  } catch (error) {
    console.error('Error assigning crew:', error);
    res.status(500).json({ error: 'Failed to assign crew' });
  }
});

router.get('/location-tracking', async (req, res) => {
  try {
    const locationData = {
      crews: [
        {
          crewId: 'crew-001',
          name: 'Alpha Team',
          latitude: 40.7128,
          longitude: -74.0060,
          lastUpdate: '2024-01-20T14:30:00Z',
          accuracy: '5m',
          status: 'on-site'
        },
        {
          crewId: 'crew-002',
          name: 'Beta Squad',
          latitude: 40.7589,
          longitude: -73.9851,
          lastUpdate: '2024-01-20T14:25:00Z',
          accuracy: '3m',
          status: 'in-transit'
        }
      ],
      geofences: [
        {
          id: 'site-001',
          name: 'Downtown Office Complex',
          latitude: 40.7128,
          longitude: -74.0060,
          radius: 100,
          active: true
        }
      ]
    };
    
    res.json(locationData);
  } catch (error) {
    console.error('Error fetching location data:', error);
    res.status(500).json({ error: 'Failed to fetch location data' });
  }
});

router.post('/submit-timesheet', async (req, res) => {
  try {
    const { crewId, date, hours, projectId, tasks } = req.body;
    
    const timesheet = {
      id: `timesheet-${Date.now()}`,
      crewId,
      date,
      hours,
      projectId,
      tasks,
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      approvalRequired: hours > 8
    };
    
    res.json({
      success: true,
      timesheet,
      message: 'Timesheet submitted successfully'
    });
  } catch (error) {
    console.error('Error submitting timesheet:', error);
    res.status(500).json({ error: 'Failed to submit timesheet' });
  }
});

module.exports = router;
