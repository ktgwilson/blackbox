const cron = require('node-cron');
const notificationService = require('./notificationService');

class AlertSystem {
  constructor() {
    this.alerts = new Map();
    this.schedules = new Map();
    this.initializeAlerts();
  }

  initializeAlerts() {
    this.schedules.set('equipment_maintenance', cron.schedule('0 8 * * 1', () => {
      this.checkEquipmentMaintenance();
    }, { scheduled: false }));

    this.schedules.set('material_shortage', cron.schedule('0 9 * * *', () => {
      this.checkMaterialShortages();
    }, { scheduled: false }));

    this.schedules.set('weather_alerts', cron.schedule('0 6 * * *', () => {
      this.checkWeatherAlerts();
    }, { scheduled: false }));

    this.schedules.set('permit_expiration', cron.schedule('0 10 * * *', () => {
      this.checkPermitExpirations();
    }, { scheduled: false }));

    this.schedules.set('crew_availability', cron.schedule('0 7 * * *', () => {
      this.checkCrewAvailability();
    }, { scheduled: false }));

    this.startAllSchedules();
  }

  startAllSchedules() {
    for (const [name, schedule] of this.schedules) {
      schedule.start();
      console.log(`Started alert schedule: ${name}`);
    }
  }

  stopAllSchedules() {
    for (const [name, schedule] of this.schedules) {
      schedule.stop();
      console.log(`Stopped alert schedule: ${name}`);
    }
  }

  async checkEquipmentMaintenance() {
    try {
      const equipment = await this.getEquipmentList();
      const maintenanceDue = equipment.filter(item => this.isMaintenanceDue(item));
      
      if (maintenanceDue.length > 0) {
        const alert = {
          type: 'equipment_maintenance',
          severity: 'medium',
          message: `${maintenanceDue.length} equipment items require maintenance`,
          items: maintenanceDue,
          timestamp: new Date().toISOString()
        };
        
        await this.triggerAlert(alert);
      }
    } catch (error) {
      console.error('Equipment maintenance check failed:', error);
    }
  }

  async getEquipmentList() {
    return [
      { id: 'truck_001', name: 'Service Truck #1', lastMaintenance: '2024-01-15', maintenanceInterval: 90 },
      { id: 'generator_001', name: 'Portable Generator', lastMaintenance: '2024-02-01', maintenanceInterval: 60 },
      { id: 'compressor_001', name: 'Air Compressor', lastMaintenance: '2024-01-20', maintenanceInterval: 120 },
      { id: 'lift_001', name: 'Scissor Lift', lastMaintenance: '2024-02-10', maintenanceInterval: 30 }
    ];
  }

  isMaintenanceDue(equipment) {
    const lastMaintenance = new Date(equipment.lastMaintenance);
    const daysSince = (Date.now() - lastMaintenance.getTime()) / (1000 * 60 * 60 * 24);
    return daysSince >= equipment.maintenanceInterval;
  }

  async checkMaterialShortages() {
    try {
      const inventory = await this.getInventoryLevels();
      const shortages = inventory.filter(item => item.quantity <= item.reorderPoint);
      
      if (shortages.length > 0) {
        const alert = {
          type: 'material_shortage',
          severity: 'high',
          message: `${shortages.length} materials are running low`,
          items: shortages,
          timestamp: new Date().toISOString()
        };
        
        await this.triggerAlert(alert);
      }
    } catch (error) {
      console.error('Material shortage check failed:', error);
    }
  }

  async getInventoryLevels() {
    return [
      { item: 'Electrical Wire 12AWG', quantity: 50, reorderPoint: 100, unit: 'feet' },
      { item: 'PVC Pipe 2"', quantity: 25, reorderPoint: 50, unit: 'feet' },
      { item: 'Drywall Screws', quantity: 200, reorderPoint: 500, unit: 'pieces' },
      { item: 'Outlet Boxes', quantity: 15, reorderPoint: 25, unit: 'pieces' },
      { item: 'Duct Tape', quantity: 3, reorderPoint: 10, unit: 'rolls' }
    ];
  }

  async checkCrewAvailability() {
    try {
      const crews = await this.getCrewSchedules();
      const shortages = this.identifyCrewShortages(crews);
      
      if (shortages.length > 0) {
        const alert = {
          type: 'crew_availability',
          severity: 'medium',
          message: `Crew shortages identified for upcoming projects`,
          shortages: shortages,
          timestamp: new Date().toISOString()
        };
        
        await this.triggerAlert(alert);
      }
    } catch (error) {
      console.error('Crew availability check failed:', error);
    }
  }

  async getCrewSchedules() {
    return [
      { trade: 'electrical', available: 3, required: 5, date: '2024-07-26' },
      { trade: 'plumbing', available: 2, required: 2, date: '2024-07-26' },
      { trade: 'hvac', available: 4, required: 3, date: '2024-07-26' }
    ];
  }

  identifyCrewShortages(crews) {
    return crews.filter(crew => crew.available < crew.required);
  }

  async triggerAlert(alert) {
    try {
      this.alerts.set(alert.type + '_' + Date.now(), alert);
      
      console.log(`ALERT [${alert.severity.toUpperCase()}]: ${alert.message}`);
      
      await notificationService.sendAlert(alert);
      
      if (alert.severity === 'high') {
        await this.escalateAlert(alert);
      }
    } catch (error) {
      console.error('Alert trigger failed:', error);
    }
  }

  async escalateAlert(alert) {
    console.log(`ESCALATING HIGH SEVERITY ALERT: ${alert.message}`);
  }

  async getActiveAlerts() {
    const activeAlerts = [];
    const cutoffTime = Date.now() - (24 * 60 * 60 * 1000);
    
    for (const [id, alert] of this.alerts) {
      const alertTime = new Date(alert.timestamp).getTime();
      if (alertTime > cutoffTime) {
        activeAlerts.push({ id, ...alert });
      }
    }
    
    return activeAlerts.sort((a, b) => {
      const severityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    });
  }

  async dismissAlert(alertId) {
    return this.alerts.delete(alertId);
  }

  async getAlertSummary() {
    const alerts = await this.getActiveAlerts();
    
    return {
      total: alerts.length,
      high: alerts.filter(a => a.severity === 'high').length,
      medium: alerts.filter(a => a.severity === 'medium').length,
      low: alerts.filter(a => a.severity === 'low').length,
      recent: alerts.slice(0, 5)
    };
  }
}

module.exports = new AlertSystem();
