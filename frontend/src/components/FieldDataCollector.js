import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Clock, CheckSquare, AlertTriangle, Upload, Save } from 'lucide-react';

const FieldDataCollector = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [progressData, setProgressData] = useState({});
  const [materialUsage, setMaterialUsage] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);
  const [qualityChecks, setQualityChecks] = useState([]);
  const [safetyIncidents, setSafetyIncidents] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    loadActiveProject();
    loadFieldData();
  }, []);

  const loadActiveProject = async () => {
    try {
      const response = await fetch('/api/field/active-project');
      if (response.ok) {
        const project = await response.json();
        setActiveProject(project);
      }
    } catch (error) {
      console.error('Failed to load active project:', error);
    }
  };

  const loadFieldData = async () => {
    try {
      const [progress, materials, time, quality, safety, projectPhotos] = await Promise.all([
        fetch('/api/field/progress').then(r => r.json()),
        fetch('/api/field/materials').then(r => r.json()),
        fetch('/api/field/time-entries').then(r => r.json()),
        fetch('/api/field/quality-checks').then(r => r.json()),
        fetch('/api/field/safety-incidents').then(r => r.json()),
        fetch('/api/field/photos').then(r => r.json())
      ]);

      setProgressData(progress);
      setMaterialUsage(materials);
      setTimeEntries(time);
      setQualityChecks(quality);
      setSafetyIncidents(safety);
      setPhotos(projectPhotos);
    } catch (error) {
      console.error('Failed to load field data:', error);
    }
  };

  const updateProgress = async (taskId, percentage) => {
    try {
      const response = await fetch('/api/field/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: activeProject?.id,
          taskId,
          percentage,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setProgressData(prev => ({
          ...prev,
          [taskId]: percentage
        }));
      }
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const logMaterialUsage = async (material, quantity) => {
    try {
      const entry = {
        projectId: activeProject?.id,
        material,
        quantity,
        timestamp: new Date().toISOString(),
        location: await getCurrentLocation()
      };

      const response = await fetch('/api/field/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });

      if (response.ok) {
        setMaterialUsage(prev => [...prev, entry]);
      }
    } catch (error) {
      console.error('Failed to log material usage:', error);
    }
  };

  const logTimeEntry = async (workerId, hours, task) => {
    try {
      const entry = {
        projectId: activeProject?.id,
        workerId,
        hours,
        task,
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date().toISOString()
      };

      const response = await fetch('/api/field/time-entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });

      if (response.ok) {
        setTimeEntries(prev => [...prev, entry]);
      }
    } catch (error) {
      console.error('Failed to log time entry:', error);
    }
  };

  const performQualityCheck = async (checklistItem, passed, notes) => {
    try {
      const check = {
        projectId: activeProject?.id,
        item: checklistItem,
        passed,
        notes,
        inspector: 'Current User',
        timestamp: new Date().toISOString()
      };

      const response = await fetch('/api/field/quality-checks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(check)
      });

      if (response.ok) {
        setQualityChecks(prev => [...prev, check]);
      }
    } catch (error) {
      console.error('Failed to log quality check:', error);
    }
  };

  const reportSafetyIncident = async (incident) => {
    try {
      const report = {
        projectId: activeProject?.id,
        ...incident,
        timestamp: new Date().toISOString(),
        location: await getCurrentLocation()
      };

      const response = await fetch('/api/field/safety-incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report)
      });

      if (response.ok) {
        setSafetyIncidents(prev => [...prev, report]);
      }
    } catch (error) {
      console.error('Failed to report safety incident:', error);
    }
  };

  const getCurrentLocation = () => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          () => resolve(null)
        );
      } else {
        resolve(null);
      }
    });
  };

  const renderProgressTracking = () => (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <CheckSquare className="w-6 h-6 mr-2 text-green-600" />
        Progress Tracking
      </h3>
      
      {activeProject?.tasks?.map((task) => (
        <div key={task.id} className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{task.name}</span>
            <span className="text-sm text-gray-600">
              {progressData[task.id] || 0}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressData[task.id] || 0}%` }}
            />
          </div>
          <div className="flex space-x-2 mt-2">
            {[25, 50, 75, 100].map((percentage) => (
              <button
                key={percentage}
                onClick={() => updateProgress(task.id, percentage)}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                {percentage}%
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderMaterialTracking = () => (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Upload className="w-6 h-6 mr-2 text-blue-600" />
        Material Usage
      </h3>
      
      <div className="space-y-3">
        {materialUsage.slice(-5).map((entry, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <span className="font-medium">{entry.material}</span>
              <p className="text-sm text-gray-600">
                Quantity: {entry.quantity} | {new Date(entry.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded">
        <p className="text-center text-gray-600 mb-2">Quick Log Material Usage</p>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Material name"
            className="flex-1 input-field"
            id="material-name"
          />
          <input
            type="number"
            placeholder="Qty"
            className="w-20 input-field"
            id="material-quantity"
          />
          <button
            onClick={() => {
              const material = document.getElementById('material-name').value;
              const quantity = document.getElementById('material-quantity').value;
              if (material && quantity) {
                logMaterialUsage(material, quantity);
                document.getElementById('material-name').value = '';
                document.getElementById('material-quantity').value = '';
              }
            }}
            className="btn-primary"
          >
            Log
          </button>
        </div>
      </div>
    </div>
  );

  const renderTimeTracking = () => (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Clock className="w-6 h-6 mr-2 text-purple-600" />
        Time & Attendance
      </h3>
      
      <div className="space-y-3">
        {timeEntries.slice(-5).map((entry, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <span className="font-medium">Worker {entry.workerId}</span>
              <p className="text-sm text-gray-600">
                {entry.hours}h on {entry.task} | {entry.date}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded">
        <p className="text-center text-gray-600 mb-2">Log Time Entry</p>
        <div className="grid grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="Worker ID"
            className="input-field"
            id="worker-id"
          />
          <input
            type="number"
            placeholder="Hours"
            className="input-field"
            id="hours-worked"
          />
          <input
            type="text"
            placeholder="Task"
            className="input-field"
            id="task-name"
          />
        </div>
        <button
          onClick={() => {
            const workerId = document.getElementById('worker-id').value;
            const hours = document.getElementById('hours-worked').value;
            const task = document.getElementById('task-name').value;
            if (workerId && hours && task) {
              logTimeEntry(workerId, parseFloat(hours), task);
              document.getElementById('worker-id').value = '';
              document.getElementById('hours-worked').value = '';
              document.getElementById('task-name').value = '';
            }
          }}
          className="w-full btn-primary mt-2"
        >
          Log Time
        </button>
      </div>
    </div>
  );

  const renderQualityControl = () => (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <CheckSquare className="w-6 h-6 mr-2 text-green-600" />
        Quality Control
      </h3>
      
      <div className="space-y-3">
        {qualityChecks.slice(-3).map((check, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded">
            <div className="flex items-center justify-between">
              <span className="font-medium">{check.item}</span>
              <span className={`px-2 py-1 rounded text-sm ${
                check.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {check.passed ? 'PASS' : 'FAIL'}
              </span>
            </div>
            {check.notes && (
              <p className="text-sm text-gray-600 mt-1">{check.notes}</p>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded">
        <p className="text-center text-gray-600 mb-2">Quality Check</p>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Checklist item"
            className="w-full input-field"
            id="quality-item"
          />
          <textarea
            placeholder="Notes (optional)"
            className="w-full input-field"
            rows="2"
            id="quality-notes"
          />
          <div className="flex space-x-2">
            <button
              onClick={() => {
                const item = document.getElementById('quality-item').value;
                const notes = document.getElementById('quality-notes').value;
                if (item) {
                  performQualityCheck(item, true, notes);
                  document.getElementById('quality-item').value = '';
                  document.getElementById('quality-notes').value = '';
                }
              }}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              PASS
            </button>
            <button
              onClick={() => {
                const item = document.getElementById('quality-item').value;
                const notes = document.getElementById('quality-notes').value;
                if (item) {
                  performQualityCheck(item, false, notes);
                  document.getElementById('quality-item').value = '';
                  document.getElementById('quality-notes').value = '';
                }
              }}
              className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              FAIL
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSafetyReporting = () => (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />
        Safety Reporting
      </h3>
      
      {safetyIncidents.length > 0 ? (
        <div className="space-y-3 mb-4">
          {safetyIncidents.slice(-3).map((incident, index) => (
            <div key={index} className="p-3 bg-red-50 border border-red-200 rounded">
              <div className="flex items-center justify-between">
                <span className="font-medium text-red-800">{incident.type}</span>
                <span className="text-sm text-red-600">
                  {new Date(incident.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-red-700 mt-1">{incident.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-green-600">
          <CheckSquare className="w-8 h-8 mx-auto mb-2" />
          <p>No safety incidents reported</p>
        </div>
      )}
      
      <button
        onClick={() => {
          const type = prompt('Incident type:');
          const description = prompt('Description:');
          const severity = prompt('Severity (low/medium/high):');
          
          if (type && description && severity) {
            reportSafetyIncident({ type, description, severity });
          }
        }}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Report Safety Incident
      </button>
    </div>
  );

  if (!activeProject) {
    return (
      <div className="text-center py-8">
        <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h2 className="text-xl font-bold text-gray-600">No Active Project</h2>
        <p className="text-gray-500">Select a project to start field data collection</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card bg-blue-50 border-blue-200">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Field Data Collection</h2>
        <p className="text-blue-700">
          Active Project: <span className="font-semibold">{activeProject.name}</span>
        </p>
        <p className="text-blue-600 text-sm">
          Location: {activeProject.location} | Started: {activeProject.startDate}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderProgressTracking()}
        {renderMaterialTracking()}
        {renderTimeTracking()}
        {renderQualityControl()}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {renderSafetyReporting()}
      </div>
    </div>
  );
};

export default FieldDataCollector;
