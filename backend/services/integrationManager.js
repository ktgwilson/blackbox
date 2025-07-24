const axios = require('axios');

class IntegrationManager {
  constructor() {
    this.integrations = new Map();
    this.initializeIntegrations();
  }

  initializeIntegrations() {
    this.integrations.set('salesforce', new SalesforceIntegration());
    this.integrations.set('quickbooks', new QuickBooksIntegration());
    this.integrations.set('procore', new ProcoreIntegration());
    this.integrations.set('buildertrend', new BuildertrendIntegration());
    this.integrations.set('weather', new WeatherIntegration());
    this.integrations.set('suppliers', new SupplierIntegration());
  }

  async getIntegration(name) {
    return this.integrations.get(name);
  }

  async testConnection(integrationName) {
    const integration = this.integrations.get(integrationName);
    if (!integration) {
      throw new Error(`Integration ${integrationName} not found`);
    }
    
    return await integration.testConnection();
  }

  async syncData(integrationName, dataType, data) {
    const integration = this.integrations.get(integrationName);
    if (!integration) {
      throw new Error(`Integration ${integrationName} not found`);
    }
    
    return await integration.syncData(dataType, data);
  }

  async getAllIntegrationStatus() {
    const status = {};
    
    for (const [name, integration] of this.integrations) {
      try {
        status[name] = await integration.getStatus();
      } catch (error) {
        status[name] = { connected: false, error: error.message };
      }
    }
    
    return status;
  }
}

class SalesforceIntegration {
  constructor() {
    this.baseUrl = process.env.SALESFORCE_URL;
    this.accessToken = process.env.SALESFORCE_TOKEN;
  }

  async testConnection() {
    try {
      const response = await axios.get(`${this.baseUrl}/services/data/v52.0/`, {
        headers: { 'Authorization': `Bearer ${this.accessToken}` }
      });
      return { connected: true, version: response.data.version };
    } catch (error) {
      return { connected: false, error: error.message };
    }
  }

  async syncData(dataType, data) {
    switch (dataType) {
      case 'lead':
        return await this.createLead(data);
      case 'opportunity':
        return await this.createOpportunity(data);
      case 'account':
        return await this.createAccount(data);
      default:
        throw new Error(`Unsupported data type: ${dataType}`);
    }
  }

  async createLead(leadData) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/services/data/v52.0/sobjects/Lead/`,
        {
          FirstName: leadData.firstName,
          LastName: leadData.lastName,
          Company: leadData.company,
          Email: leadData.email,
          Phone: leadData.phone,
          LeadSource: 'BlackBox Estimator'
        },
        {
          headers: { 'Authorization': `Bearer ${this.accessToken}` }
        }
      );
      return { success: true, id: response.data.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createOpportunity(opportunityData) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/services/data/v52.0/sobjects/Opportunity/`,
        {
          Name: opportunityData.name,
          Amount: opportunityData.amount,
          CloseDate: opportunityData.closeDate,
          StageName: 'Prospecting',
          LeadSource: 'BlackBox Estimator'
        },
        {
          headers: { 'Authorization': `Bearer ${this.accessToken}` }
        }
      );
      return { success: true, id: response.data.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createAccount(accountData) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/services/data/v52.0/sobjects/Account/`,
        {
          Name: accountData.name,
          Type: 'Customer',
          Industry: 'Construction',
          Phone: accountData.phone,
          Website: accountData.website
        },
        {
          headers: { 'Authorization': `Bearer ${this.accessToken}` }
        }
      );
      return { success: true, id: response.data.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getStatus() {
    const connection = await this.testConnection();
    return {
      name: 'Salesforce',
      connected: connection.connected,
      lastSync: new Date().toISOString(),
      features: ['Leads', 'Opportunities', 'Accounts']
    };
  }
}

class QuickBooksIntegration {
  constructor() {
    this.baseUrl = process.env.QUICKBOOKS_URL;
    this.accessToken = process.env.QUICKBOOKS_TOKEN;
  }

  async testConnection() {
    try {
      return { connected: false, error: 'QuickBooks integration not configured' };
    } catch (error) {
      return { connected: false, error: error.message };
    }
  }

  async syncData(dataType, data) {
    switch (dataType) {
      case 'invoice':
        return await this.createInvoice(data);
      case 'customer':
        return await this.createCustomer(data);
      default:
        throw new Error(`Unsupported data type: ${dataType}`);
    }
  }

  async createInvoice(invoiceData) {
    return { success: false, error: 'QuickBooks integration not implemented' };
  }

  async createCustomer(customerData) {
    return { success: false, error: 'QuickBooks integration not implemented' };
  }

  async getStatus() {
    return {
      name: 'QuickBooks',
      connected: false,
      lastSync: null,
      features: ['Invoices', 'Customers', 'Payments']
    };
  }
}

class ProcoreIntegration {
  constructor() {
    this.baseUrl = process.env.PROCORE_URL;
    this.accessToken = process.env.PROCORE_TOKEN;
  }

  async testConnection() {
    return { connected: false, error: 'Procore integration not configured' };
  }

  async syncData(dataType, data) {
    return { success: false, error: 'Procore integration not implemented' };
  }

  async getStatus() {
    return {
      name: 'Procore',
      connected: false,
      lastSync: null,
      features: ['Projects', 'RFIs', 'Submittals']
    };
  }
}

class BuildertrendIntegration {
  constructor() {
    this.baseUrl = process.env.BUILDERTREND_URL;
    this.accessToken = process.env.BUILDERTREND_TOKEN;
  }

  async testConnection() {
    return { connected: false, error: 'Buildertrend integration not configured' };
  }

  async syncData(dataType, data) {
    return { success: false, error: 'Buildertrend integration not implemented' };
  }

  async getStatus() {
    return {
      name: 'Buildertrend',
      connected: false,
      lastSync: null,
      features: ['Projects', 'Leads', 'Scheduling']
    };
  }
}

class WeatherIntegration {
  constructor() {
    this.apiKey = process.env.WEATHER_API_KEY;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  async testConnection() {
    try {
      const response = await axios.get(`${this.baseUrl}/weather?q=New York&appid=${this.apiKey}`);
      return { connected: true, status: 'Weather API active' };
    } catch (error) {
      return { connected: false, error: error.message };
    }
  }

  async syncData(dataType, data) {
    switch (dataType) {
      case 'forecast':
        return await this.getForecast(data.location);
      case 'current':
        return await this.getCurrentWeather(data.location);
      default:
        throw new Error(`Unsupported data type: ${dataType}`);
    }
  }

  async getForecast(location) {
    try {
      const response = await axios.get(`${this.baseUrl}/forecast?q=${location}&appid=${this.apiKey}&units=imperial`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getCurrentWeather(location) {
    try {
      const response = await axios.get(`${this.baseUrl}/weather?q=${location}&appid=${this.apiKey}&units=imperial`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getStatus() {
    const connection = await this.testConnection();
    return {
      name: 'Weather Service',
      connected: connection.connected,
      lastSync: new Date().toISOString(),
      features: ['Current Weather', 'Forecasts', 'Alerts']
    };
  }
}

class SupplierIntegration {
  constructor() {
    this.suppliers = {
      'home_depot': { url: process.env.HOME_DEPOT_API, key: process.env.HOME_DEPOT_KEY },
      'lowes': { url: process.env.LOWES_API, key: process.env.LOWES_KEY },
      'ferguson': { url: process.env.FERGUSON_API, key: process.env.FERGUSON_KEY }
    };
  }

  async testConnection() {
    return { connected: false, error: 'Supplier integrations not configured' };
  }

  async syncData(dataType, data) {
    switch (dataType) {
      case 'pricing':
        return await this.getPricing(data.items);
      case 'availability':
        return await this.checkAvailability(data.items);
      default:
        throw new Error(`Unsupported data type: ${dataType}`);
    }
  }

  async getPricing(items) {
    const mockPricing = items.map(item => ({
      item: item,
      price: Math.random() * 100 + 10,
      supplier: 'Mock Supplier',
      availability: 'In Stock'
    }));
    
    return { success: true, data: mockPricing };
  }

  async checkAvailability(items) {
    const mockAvailability = items.map(item => ({
      item: item,
      available: Math.random() > 0.2,
      quantity: Math.floor(Math.random() * 1000),
      leadTime: Math.floor(Math.random() * 14) + 1
    }));
    
    return { success: true, data: mockAvailability };
  }

  async getStatus() {
    return {
      name: 'Material Suppliers',
      connected: false,
      lastSync: null,
      features: ['Pricing', 'Availability', 'Ordering']
    };
  }
}

module.exports = new IntegrationManager();
