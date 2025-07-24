const express = require('express');
const router = express.Router();

router.get('/active-project', async (req, res) => {
  try {
    const activeProject = {
      id: 'proj_001',
      name: 'Office Building Electrical Upgrade',
      location: 'Downtown Business District',
      startDate: '2024-07-20',
      estimatedCompletion: '2024-08-15',
      tasks: [
        { id: 'task_001', name: 'Panel Installation', estimatedHours: 16 },
        { id: 'task_002', name: 'Conduit Runs', estimatedHours: 24 },
        { id: 'task_003', name: 'Outlet Installation', estimatedHours: 12 },
        { id: 'task_004', name: 'Final Testing', estimatedHours: 8 }
      ]
    };
    
    res.json(activeProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/progress', async (req, res) => {
  try {
    const progress = {
      'task_001': 75,
      'task_002': 45,
      'task_003': 0,
      'task_004': 0
    };
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/progress', async (req, res) => {
  try {
    const { projectId, taskId, percentage, timestamp } = req.body;
    
    console.log(`Progress update: Project ${projectId}, Task ${taskId} - ${percentage}% at ${timestamp}`);
    
    res.json({ success: true, message: 'Progress updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/materials', async (req, res) => {
  try {
    const materials = [
      {
        material: 'Electrical Wire 12AWG',
        quantity: 150,
        timestamp: '2024-07-24T08:30:00Z',
        location: { lat: 40.7128, lng: -74.0060 }
      },
      {
        material: 'Outlet Boxes',
        quantity: 25,
        timestamp: '2024-07-24T10:15:00Z',
        location: { lat: 40.7128, lng: -74.0060 }
      }
    ];
    
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/materials', async (req, res) => {
  try {
    const { projectId, material, quantity, timestamp, location } = req.body;
    
    console.log(`Material usage: ${quantity} ${material} used on project ${projectId} at ${timestamp}`);
    
    res.json({ success: true, message: 'Material usage logged successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/time-entries', async (req, res) => {
  try {
    const timeEntries = [
      {
        workerId: 'W001',
        hours: 8,
        task: 'Panel Installation',
        date: '2024-07-24',
        timestamp: '2024-07-24T16:00:00Z'
      },
      {
        workerId: 'W002',
        hours: 6,
        task: 'Conduit Runs',
        date: '2024-07-24',
        timestamp: '2024-07-24T14:00:00Z'
      }
    ];
    
    res.json(timeEntries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/time-entries', async (req, res) => {
  try {
    const { projectId, workerId, hours, task, date, timestamp } = req.body;
    
    console.log(`Time entry: Worker ${workerId} worked ${hours}h on ${task} for project ${projectId} on ${date}`);
    
    res.json({ success: true, message: 'Time entry logged successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/quality-checks', async (req, res) => {
  try {
    const qualityChecks = [
      {
        item: 'Panel Grounding',
        passed: true,
        notes: 'All connections properly grounded',
        inspector: 'John Smith',
        timestamp: '2024-07-24T12:00:00Z'
      },
      {
        item: 'Wire Gauge Compliance',
        passed: true,
        notes: 'All wiring meets code requirements',
        inspector: 'John Smith',
        timestamp: '2024-07-24T13:30:00Z'
      }
    ];
    
    res.json(qualityChecks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/quality-checks', async (req, res) => {
  try {
    const { projectId, item, passed, notes, inspector, timestamp } = req.body;
    
    console.log(`Quality check: ${item} - ${passed ? 'PASS' : 'FAIL'} by ${inspector} on project ${projectId}`);
    
    res.json({ success: true, message: 'Quality check logged successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/safety-incidents', async (req, res) => {
  try {
    const incidents = [];
    
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/safety-incidents', async (req, res) => {
  try {
    const { projectId, type, description, severity, timestamp, location } = req.body;
    
    console.log(`SAFETY INCIDENT [${severity.toUpperCase()}]: ${type} - ${description} on project ${projectId}`);
    
    res.json({ success: true, message: 'Safety incident reported successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/photos', async (req, res) => {
  try {
    const photos = [];
    
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/upload-photo', async (req, res) => {
  try {
    const { id, src, timestamp, location, type } = req.body;
    
    console.log(`Photo uploaded: ${type} photo from ${timestamp} at location ${JSON.stringify(location)}`);
    
    res.json({ success: true, message: 'Photo uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/sync-task', async (req, res) => {
  try {
    const { id, title, description, timestamp, location, status } = req.body;
    
    console.log(`Task synced: ${title} - ${description} from ${timestamp}`);
    
    res.json({ success: true, message: 'Task synced successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
