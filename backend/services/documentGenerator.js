const PDFDocument = require('pdf-lib').PDFDocument;
const fs = require('fs').promises;
const path = require('path');

class DocumentGenerator {
  constructor() {
    this.templates = {};
    this.loadTemplates();
  }

  async loadTemplates() {
    try {
      this.templates = {
        estimate: await this.createEstimateTemplate(),
        invoice: await this.createInvoiceTemplate(),
        workOrder: await this.createWorkOrderTemplate()
      };
    } catch (error) {
      console.error('Template loading failed:', error);
    }
  }

  async createEstimateTemplate() {
    return {
      header: 'BlackBox 5000x Professional Estimate',
      sections: ['project_info', 'scope', 'crew', 'materials', 'costs', 'timeline', 'terms']
    };
  }

  async createInvoiceTemplate() {
    return {
      header: 'BlackBox 5000x Invoice',
      sections: ['client_info', 'project_details', 'line_items', 'totals', 'payment_terms']
    };
  }

  async createWorkOrderTemplate() {
    return {
      header: 'BlackBox 5000x Work Order',
      sections: ['project_info', 'crew_assignments', 'materials_list', 'safety_requirements', 'timeline']
    };
  }

  async generateEstimatePDF(estimateData) {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([612, 792]);
      const { width, height } = page.getSize();
      
      let yPosition = height - 50;
      
      page.drawText('BlackBox 5000x Professional Estimate', {
        x: 50,
        y: yPosition,
        size: 24,
        color: { r: 0.2, g: 0.4, b: 0.8 }
      });
      
      yPosition -= 40;
      
      page.drawText(`Project: ${estimateData.projectName || 'Untitled Project'}`, {
        x: 50,
        y: yPosition,
        size: 14
      });
      
      yPosition -= 25;
      page.drawText(`Trade Type: ${estimateData.tradeType?.toUpperCase() || 'GENERAL'}`, {
        x: 50,
        y: yPosition,
        size: 12
      });
      
      yPosition -= 25;
      page.drawText(`Date: ${new Date().toLocaleDateString()}`, {
        x: 50,
        y: yPosition,
        size: 12
      });
      
      yPosition -= 40;
      page.drawText('Project Scope:', {
        x: 50,
        y: yPosition,
        size: 14,
        color: { r: 0.2, g: 0.2, b: 0.2 }
      });
      
      yPosition -= 20;
      const scopeLines = this.wrapText(estimateData.scope || 'No scope provided', 80);
      scopeLines.forEach(line => {
        page.drawText(line, {
          x: 50,
          y: yPosition,
          size: 10
        });
        yPosition -= 15;
      });
      
      yPosition -= 20;
      page.drawText('Cost Breakdown:', {
        x: 50,
        y: yPosition,
        size: 14,
        color: { r: 0.2, g: 0.2, b: 0.2 }
      });
      
      if (estimateData.costBreakdown) {
        Object.entries(estimateData.costBreakdown).forEach(([category, amount]) => {
          yPosition -= 20;
          page.drawText(`${category}: $${amount.toLocaleString()}`, {
            x: 70,
            y: yPosition,
            size: 11
          });
        });
      }
      
      yPosition -= 30;
      page.drawText(`Total Estimate: $${estimateData.totalCost?.toLocaleString() || '0'}`, {
        x: 50,
        y: yPosition,
        size: 16,
        color: { r: 0.8, g: 0.2, b: 0.2 }
      });
      
      if (estimateData.aiInsights) {
        yPosition -= 40;
        page.drawText('AI Insights & Recommendations:', {
          x: 50,
          y: yPosition,
          size: 14,
          color: { r: 0.2, g: 0.2, b: 0.2 }
        });
        
        estimateData.aiInsights.recommendations?.forEach(rec => {
          yPosition -= 20;
          const recText = this.wrapText(`• ${rec.message}`, 70);
          recText.forEach(line => {
            page.drawText(line, {
              x: 70,
              y: yPosition,
              size: 10
            });
            yPosition -= 12;
          });
        });
      }
      
      const pdfBytes = await pdfDoc.save();
      return pdfBytes;
    } catch (error) {
      console.error('PDF generation failed:', error);
      throw error;
    }
  }

  async generateWorkOrder(projectData) {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([612, 792]);
      const { width, height } = page.getSize();
      
      let yPosition = height - 50;
      
      page.drawText('BlackBox 5000x Work Order', {
        x: 50,
        y: yPosition,
        size: 24,
        color: { r: 0.8, g: 0.4, b: 0.2 }
      });
      
      yPosition -= 40;
      page.drawText(`Work Order #: ${projectData.workOrderId || 'WO-' + Date.now()}`, {
        x: 50,
        y: yPosition,
        size: 12
      });
      
      yPosition -= 25;
      page.drawText(`Project: ${projectData.projectName}`, {
        x: 50,
        y: yPosition,
        size: 14
      });
      
      yPosition -= 25;
      page.drawText(`Location: ${projectData.location || 'TBD'}`, {
        x: 50,
        y: yPosition,
        size: 12
      });
      
      yPosition -= 40;
      page.drawText('Crew Assignments:', {
        x: 50,
        y: yPosition,
        size: 14,
        color: { r: 0.2, g: 0.2, b: 0.2 }
      });
      
      if (projectData.crew) {
        Object.entries(projectData.crew).forEach(([role, count]) => {
          yPosition -= 20;
          page.drawText(`${role}: ${count}`, {
            x: 70,
            y: yPosition,
            size: 11
          });
        });
      }
      
      yPosition -= 40;
      page.drawText('Safety Requirements:', {
        x: 50,
        y: yPosition,
        size: 14,
        color: { r: 0.8, g: 0.2, b: 0.2 }
      });
      
      const safetyItems = [
        '• Hard hats and safety glasses required',
        '• High-visibility vests in active areas',
        '• Proper lockout/tagout procedures',
        '• Fall protection for work above 6 feet',
        '• Tool inspection before use'
      ];
      
      safetyItems.forEach(item => {
        yPosition -= 18;
        page.drawText(item, {
          x: 70,
          y: yPosition,
          size: 10
        });
      });
      
      const pdfBytes = await pdfDoc.save();
      return pdfBytes;
    } catch (error) {
      console.error('Work order generation failed:', error);
      throw error;
    }
  }

  wrapText(text, maxLength) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    words.forEach(word => {
      if ((currentLine + word).length <= maxLength) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    });
    
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  async generateReport(reportType, data) {
    switch (reportType) {
      case 'estimate':
        return await this.generateEstimatePDF(data);
      case 'workorder':
        return await this.generateWorkOrder(data);
      default:
        throw new Error(`Unknown report type: ${reportType}`);
    }
  }
}

module.exports = new DocumentGenerator();
