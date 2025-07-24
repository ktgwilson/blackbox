const aiEngine = require('./aiEngine');
const notificationService = require('./notificationService');

class AutomationEngine {
  constructor() {
    this.workflows = new Map();
    this.triggers = new Map();
    this.initializeWorkflows();
  }

  initializeWorkflows() {
    this.workflows.set('auto_bundling', new AutoBundlingWorkflow());
    this.workflows.set('smart_recommendations', new SmartRecommendationWorkflow());
    this.workflows.set('follow_up_automation', new FollowUpAutomationWorkflow());
    this.workflows.set('dynamic_pricing', new DynamicPricingWorkflow());
    this.workflows.set('crew_optimization', new CrewOptimizationWorkflow());
  }

  async executeWorkflow(workflowName, data) {
    const workflow = this.workflows.get(workflowName);
    if (!workflow) {
      throw new Error(`Workflow ${workflowName} not found`);
    }
    
    return await workflow.execute(data);
  }

  async registerTrigger(triggerName, condition, workflowName) {
    this.triggers.set(triggerName, {
      condition: condition,
      workflow: workflowName,
      active: true
    });
  }

  async evaluateTriggers(eventData) {
    const triggeredWorkflows = [];
    
    for (const [triggerName, trigger] of this.triggers) {
      if (trigger.active && this.evaluateCondition(trigger.condition, eventData)) {
        const result = await this.executeWorkflow(trigger.workflow, eventData);
        triggeredWorkflows.push({
          trigger: triggerName,
          workflow: trigger.workflow,
          result: result
        });
      }
    }
    
    return triggeredWorkflows;
  }

  evaluateCondition(condition, data) {
    try {
      switch (condition.type) {
        case 'project_value':
          return data.totalCost >= condition.threshold;
        case 'completion_percentage':
          return data.completionPercentage >= condition.percentage;
        case 'time_since_estimate':
          const daysSince = (Date.now() - new Date(data.estimateDate)) / (1000 * 60 * 60 * 24);
          return daysSince >= condition.days;
        case 'client_type':
          return data.clientType === condition.value;
        default:
          return false;
      }
    } catch (error) {
      console.error('Condition evaluation failed:', error);
      return false;
    }
  }

  async getWorkflowStatus() {
    const status = {};
    
    for (const [name, workflow] of this.workflows) {
      status[name] = {
        name: workflow.getName(),
        description: workflow.getDescription(),
        lastRun: workflow.getLastRun(),
        executionCount: workflow.getExecutionCount()
      };
    }
    
    return status;
  }
}

class AutoBundlingWorkflow {
  constructor() {
    this.name = 'Auto Bundling';
    this.description = 'Automatically detect and suggest project bundling opportunities';
    this.lastRun = null;
    this.executionCount = 0;
  }

  async execute(data) {
    try {
      this.executionCount++;
      this.lastRun = new Date().toISOString();
      
      const projects = data.projects || [];
      const opportunities = await aiEngine.detectBundlingOpportunities(projects);
      
      const recommendations = opportunities.map(opp => ({
        type: 'bundling',
        projects: opp.projects,
        savings: opp.potentialSavings,
        bundleType: opp.bundleType,
        priority: this.calculatePriority(opp.potentialSavings),
        message: `Bundle projects ${opp.projects.join(', ')} for $${opp.potentialSavings.toLocaleString()} savings`
      }));
      
      if (recommendations.length > 0) {
        await this.notifyStakeholders(recommendations);
      }
      
      return {
        success: true,
        recommendations: recommendations,
        opportunitiesFound: opportunities.length
      };
    } catch (error) {
      console.error('Auto bundling workflow failed:', error);
      return { success: false, error: error.message };
    }
  }

  calculatePriority(savings) {
    if (savings > 10000) return 'high';
    if (savings > 5000) return 'medium';
    return 'low';
  }

  async notifyStakeholders(recommendations) {
    const highPriorityRecs = recommendations.filter(r => r.priority === 'high');
    if (highPriorityRecs.length > 0) {
      await notificationService.sendProjectAlert('bundling_opportunity', {
        recommendations: highPriorityRecs,
        totalSavings: highPriorityRecs.reduce((sum, r) => sum + r.savings, 0)
      }, ['manager@company.com']);
    }
  }

  getName() { return this.name; }
  getDescription() { return this.description; }
  getLastRun() { return this.lastRun; }
  getExecutionCount() { return this.executionCount; }
}

class SmartRecommendationWorkflow {
  constructor() {
    this.name = 'Smart Recommendations';
    this.description = 'Generate intelligent upselling and optimization recommendations';
    this.lastRun = null;
    this.executionCount = 0;
  }

  async execute(data) {
    try {
      this.executionCount++;
      this.lastRun = new Date().toISOString();
      
      const recommendations = [];
      
      if (data.tradeType && data.scope) {
        const complementaryServices = this.getComplementaryServices(data.tradeType);
        const seasonalRecommendations = this.getSeasonalRecommendations(data.tradeType);
        const valueAddOns = this.getValueAddOns(data);
        
        recommendations.push(...complementaryServices, ...seasonalRecommendations, ...valueAddOns);
      }
      
      const prioritizedRecs = this.prioritizeRecommendations(recommendations, data);
      
      return {
        success: true,
        recommendations: prioritizedRecs,
        totalValue: prioritizedRecs.reduce((sum, r) => sum + (r.value || 0), 0)
      };
    } catch (error) {
      console.error('Smart recommendation workflow failed:', error);
      return { success: false, error: error.message };
    }
  }

  getComplementaryServices(tradeType) {
    const complementary = {
      'voltbox': [
        { service: 'SignalBox Low Voltage', value: 5000, reason: 'Often needed with electrical work' },
        { service: 'SoundBox Audio/Visual', value: 8000, reason: 'Electrical infrastructure supports A/V' }
      ],
      'airbox': [
        { service: 'FlowBox Plumbing', value: 6000, reason: 'HVAC and plumbing often coordinated' },
        { service: 'VoltBox Electrical', value: 4000, reason: 'HVAC requires electrical connections' }
      ],
      'flowbox': [
        { service: 'AirBox HVAC', value: 7000, reason: 'Plumbing and HVAC coordination' },
        { service: 'FloorBox Flooring', value: 3000, reason: 'Floor work after plumbing' }
      ]
    };
    
    return complementary[tradeType] || [];
  }

  getSeasonalRecommendations(tradeType) {
    const month = new Date().getMonth();
    const seasonal = [];
    
    if (month >= 2 && month <= 5) {
      seasonal.push({
        service: 'Spring Maintenance Package',
        value: 2000,
        reason: 'Preventive maintenance before peak season'
      });
    }
    
    if (month >= 8 && month <= 10) {
      seasonal.push({
        service: 'Winter Preparation Service',
        value: 1500,
        reason: 'Prepare systems for winter conditions'
      });
    }
    
    return seasonal;
  }

  getValueAddOns(data) {
    const addOns = [];
    
    if (data.totalCost > 50000) {
      addOns.push({
        service: 'Extended Warranty',
        value: data.totalCost * 0.05,
        reason: 'Protect investment with extended coverage'
      });
    }
    
    if (data.clientType === 'commercial') {
      addOns.push({
        service: 'Maintenance Contract',
        value: data.totalCost * 0.15,
        reason: 'Ongoing maintenance for commercial properties'
      });
    }
    
    return addOns;
  }

  prioritizeRecommendations(recommendations, data) {
    return recommendations
      .map(rec => ({
        ...rec,
        priority: this.calculateRecommendationPriority(rec, data)
      }))
      .sort((a, b) => {
        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
  }

  calculateRecommendationPriority(recommendation, data) {
    if (recommendation.value > data.totalCost * 0.2) return 'high';
    if (recommendation.value > data.totalCost * 0.1) return 'medium';
    return 'low';
  }

  getName() { return this.name; }
  getDescription() { return this.description; }
  getLastRun() { return this.lastRun; }
  getExecutionCount() { return this.executionCount; }
}

class FollowUpAutomationWorkflow {
  constructor() {
    this.name = 'Follow-up Automation';
    this.description = 'Automated follow-up scheduling and client communication';
    this.lastRun = null;
    this.executionCount = 0;
  }

  async execute(data) {
    try {
      this.executionCount++;
      this.lastRun = new Date().toISOString();
      
      const followUps = [];
      const daysSinceEstimate = this.calculateDaysSince(data.estimateDate);
      
      if (daysSinceEstimate >= 3 && !data.clientResponse) {
        followUps.push({
          type: 'initial_follow_up',
          scheduledDate: this.addDays(new Date(), 1),
          message: 'Initial follow-up on estimate',
          priority: 'medium'
        });
      }
      
      if (daysSinceEstimate >= 7 && !data.clientResponse) {
        followUps.push({
          type: 'value_reinforcement',
          scheduledDate: this.addDays(new Date(), 1),
          message: 'Reinforce value proposition and address concerns',
          priority: 'high'
        });
      }
      
      if (daysSinceEstimate >= 14 && !data.clientResponse) {
        followUps.push({
          type: 'final_follow_up',
          scheduledDate: this.addDays(new Date(), 2),
          message: 'Final follow-up with special offer',
          priority: 'high'
        });
      }
      
      for (const followUp of followUps) {
        await this.scheduleFollowUp(followUp, data);
      }
      
      return {
        success: true,
        followUpsScheduled: followUps.length,
        nextFollowUp: followUps.length > 0 ? followUps[0].scheduledDate : null
      };
    } catch (error) {
      console.error('Follow-up automation workflow failed:', error);
      return { success: false, error: error.message };
    }
  }

  calculateDaysSince(dateString) {
    const estimateDate = new Date(dateString);
    const now = new Date();
    return Math.floor((now - estimateDate) / (1000 * 60 * 60 * 24));
  }

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  async scheduleFollowUp(followUp, data) {
    console.log(`Scheduling ${followUp.type} for ${data.clientEmail} on ${followUp.scheduledDate}`);
  }

  getName() { return this.name; }
  getDescription() { return this.description; }
  getLastRun() { return this.lastRun; }
  getExecutionCount() { return this.executionCount; }
}

class DynamicPricingWorkflow {
  constructor() {
    this.name = 'Dynamic Pricing';
    this.description = 'Automatically adjust pricing based on market conditions and demand';
    this.lastRun = null;
    this.executionCount = 0;
  }

  async execute(data) {
    try {
      this.executionCount++;
      this.lastRun = new Date().toISOString();
      
      const adjustments = [];
      const marketFactors = await this.getMarketFactors(data.location, data.tradeType);
      const demandLevel = await this.calculateDemandLevel(data.tradeType);
      const competitionLevel = await this.assessCompetition(data.location, data.tradeType);
      
      let priceAdjustment = 1.0;
      
      if (marketFactors.materialCostIncrease > 0.05) {
        priceAdjustment += marketFactors.materialCostIncrease;
        adjustments.push({
          factor: 'Material Cost Increase',
          adjustment: marketFactors.materialCostIncrease,
          reason: 'Material costs have increased significantly'
        });
      }
      
      if (demandLevel === 'high') {
        priceAdjustment += 0.08;
        adjustments.push({
          factor: 'High Demand',
          adjustment: 0.08,
          reason: 'High demand for this trade type'
        });
      }
      
      if (competitionLevel === 'low') {
        priceAdjustment += 0.05;
        adjustments.push({
          factor: 'Low Competition',
          adjustment: 0.05,
          reason: 'Limited competition in this area'
        });
      }
      
      const adjustedPrice = data.basePrice * priceAdjustment;
      
      return {
        success: true,
        originalPrice: data.basePrice,
        adjustedPrice: adjustedPrice,
        adjustmentFactor: priceAdjustment,
        adjustments: adjustments,
        recommendation: this.generatePricingRecommendation(priceAdjustment)
      };
    } catch (error) {
      console.error('Dynamic pricing workflow failed:', error);
      return { success: false, error: error.message };
    }
  }

  async getMarketFactors(location, tradeType) {
    return {
      materialCostIncrease: Math.random() * 0.1,
      laborRateChange: Math.random() * 0.05 - 0.025,
      fuelCostChange: Math.random() * 0.08 - 0.04
    };
  }

  async calculateDemandLevel(tradeType) {
    const demandLevels = ['low', 'medium', 'high'];
    return demandLevels[Math.floor(Math.random() * demandLevels.length)];
  }

  async assessCompetition(location, tradeType) {
    const competitionLevels = ['low', 'medium', 'high'];
    return competitionLevels[Math.floor(Math.random() * competitionLevels.length)];
  }

  generatePricingRecommendation(adjustmentFactor) {
    if (adjustmentFactor > 1.15) {
      return 'Consider premium pricing strategy due to favorable market conditions';
    } else if (adjustmentFactor > 1.05) {
      return 'Moderate price increase recommended based on market factors';
    } else if (adjustmentFactor < 0.95) {
      return 'Consider competitive pricing to win market share';
    } else {
      return 'Current pricing is appropriate for market conditions';
    }
  }

  getName() { return this.name; }
  getDescription() { return this.description; }
  getLastRun() { return this.lastRun; }
  getExecutionCount() { return this.executionCount; }
}

class CrewOptimizationWorkflow {
  constructor() {
    this.name = 'Crew Optimization';
    this.description = 'Optimize crew assignments and scheduling automatically';
    this.lastRun = null;
    this.executionCount = 0;
  }

  async execute(data) {
    try {
      this.executionCount++;
      this.lastRun = new Date().toISOString();
      
      const projects = data.projects || [];
      const crews = data.crews || [];
      
      const optimization = await aiEngine.optimizeCrewScheduling(projects, crews);
      
      const recommendations = [];
      
      if (optimization.efficiency < 70) {
        recommendations.push({
          type: 'efficiency_improvement',
          message: 'Crew utilization is below optimal - consider rebalancing assignments',
          priority: 'high'
        });
      }
      
      if (optimization.recommendations.length > 0) {
        recommendations.push(...optimization.recommendations.map(rec => ({
          type: 'crew_adjustment',
          message: rec,
          priority: 'medium'
        })));
      }
      
      return {
        success: true,
        efficiency: optimization.efficiency,
        schedule: optimization.schedule,
        recommendations: recommendations,
        optimizationScore: this.calculateOptimizationScore(optimization)
      };
    } catch (error) {
      console.error('Crew optimization workflow failed:', error);
      return { success: false, error: error.message };
    }
  }

  calculateOptimizationScore(optimization) {
    let score = optimization.efficiency;
    
    if (optimization.recommendations.length === 0) score += 10;
    if (optimization.efficiency > 85) score += 5;
    
    return Math.min(100, score);
  }

  getName() { return this.name; }
  getDescription() { return this.description; }
  getLastRun() { return this.lastRun; }
  getExecutionCount() { return this.executionCount; }
}

module.exports = new AutomationEngine();
