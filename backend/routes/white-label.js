const express = require('express');
const router = express.Router();

router.get('/tenants', async (req, res) => {
  try {
    const tenants = {
      active: [
        {
          id: 'blackbox-main',
          name: 'BlackBox Estimator',
          domain: 'app.blackboxestimator.com',
          branding: {
            logo: 'blackbox-logo.png',
            primaryColor: '#1a1a2e',
            secondaryColor: '#16213e',
            accentColor: '#0f3460'
          },
          features: ['all'],
          subscription: 'enterprise',
          users: 156,
          status: 'active'
        },
        {
          id: 'voltbox-pro',
          name: 'VoltBox Professional',
          domain: 'pro.voltbox.com',
          branding: {
            logo: 'voltbox-logo.png',
            primaryColor: '#FFD700',
            secondaryColor: '#FFA500',
            accentColor: '#FF8C00'
          },
          features: ['voltbox', 'signalbox', 'corebox'],
          subscription: 'professional',
          users: 45,
          status: 'active'
        },
        {
          id: 'poolbox-elite',
          name: 'PoolBox Elite',
          domain: 'elite.poolbox.com',
          branding: {
            logo: 'poolbox-logo.png',
            primaryColor: '#00BFFF',
            secondaryColor: '#87CEEB',
            accentColor: '#4682B4'
          },
          features: ['poolbox', 'bluebox', 'greenbox'],
          subscription: 'premium',
          users: 23,
          status: 'active'
        }
      ],
      pending: [
        {
          id: 'securitybox-corp',
          name: 'SecurityBox Corporate',
          domain: 'corp.securitybox.com',
          status: 'setup-pending',
          requestedFeatures: ['securitybox', 'signalbox'],
          estimatedLaunch: '2024-02-01'
        }
      ]
    };
    
    res.json(tenants);
  } catch (error) {
    console.error('Error fetching tenants:', error);
    res.status(500).json({ error: 'Failed to fetch tenant data' });
  }
});

router.post('/create-tenant', async (req, res) => {
  try {
    const { name, domain, features, branding, subscription } = req.body;
    
    const newTenant = {
      id: `tenant-${Date.now()}`,
      name,
      domain,
      features,
      branding: {
        logo: branding?.logo || 'default-logo.png',
        primaryColor: branding?.primaryColor || '#1a1a2e',
        secondaryColor: branding?.secondaryColor || '#16213e',
        accentColor: branding?.accentColor || '#0f3460'
      },
      subscription: subscription || 'standard',
      users: 0,
      status: 'setup-pending',
      createdAt: new Date().toISOString(),
      setupSteps: {
        domainVerification: 'pending',
        brandingUpload: 'pending',
        userImport: 'pending',
        testing: 'pending',
        launch: 'pending'
      }
    };
    
    res.json({
      success: true,
      tenant: newTenant,
      message: 'White-label tenant created successfully'
    });
  } catch (error) {
    console.error('Error creating tenant:', error);
    res.status(500).json({ error: 'Failed to create tenant' });
  }
});

router.get('/branding/:tenantId', async (req, res) => {
  try {
    const { tenantId } = req.params;
    
    const brandingConfigs = {
      'blackbox-main': {
        logo: 'blackbox-logo.png',
        favicon: 'blackbox-favicon.ico',
        colors: {
          primary: '#1a1a2e',
          secondary: '#16213e',
          accent: '#0f3460',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444'
        },
        fonts: {
          primary: 'Inter',
          secondary: 'Roboto'
        },
        customCSS: '',
        emailTemplates: {
          welcome: 'blackbox-welcome.html',
          notification: 'blackbox-notification.html'
        }
      },
      'voltbox-pro': {
        logo: 'voltbox-logo.png',
        favicon: 'voltbox-favicon.ico',
        colors: {
          primary: '#FFD700',
          secondary: '#FFA500',
          accent: '#FF8C00',
          success: '#32CD32',
          warning: '#FF6347',
          error: '#DC143C'
        },
        fonts: {
          primary: 'Montserrat',
          secondary: 'Open Sans'
        },
        customCSS: '.voltbox-theme { background: linear-gradient(45deg, #FFD700, #FFA500); }',
        emailTemplates: {
          welcome: 'voltbox-welcome.html',
          notification: 'voltbox-notification.html'
        }
      }
    };
    
    const branding = brandingConfigs[tenantId] || brandingConfigs['blackbox-main'];
    res.json(branding);
  } catch (error) {
    console.error('Error fetching branding:', error);
    res.status(500).json({ error: 'Failed to fetch branding configuration' });
  }
});

router.put('/update-branding/:tenantId', async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { logo, colors, fonts, customCSS } = req.body;
    
    const updatedBranding = {
      tenantId,
      logo: logo || 'default-logo.png',
      colors: {
        primary: colors?.primary || '#1a1a2e',
        secondary: colors?.secondary || '#16213e',
        accent: colors?.accent || '#0f3460',
        ...colors
      },
      fonts: {
        primary: fonts?.primary || 'Inter',
        secondary: fonts?.secondary || 'Roboto'
      },
      customCSS: customCSS || '',
      updatedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      branding: updatedBranding,
      message: 'Branding updated successfully'
    });
  } catch (error) {
    console.error('Error updating branding:', error);
    res.status(500).json({ error: 'Failed to update branding' });
  }
});

router.get('/analytics/:tenantId', async (req, res) => {
  try {
    const { tenantId } = req.params;
    
    const analytics = {
      tenantId,
      period: 'last-30-days',
      users: {
        total: 45,
        active: 38,
        newSignups: 7,
        retention: 84.4
      },
      usage: {
        estimates: 234,
        projects: 18,
        apiCalls: 1567,
        storageUsed: '2.3GB'
      },
      revenue: {
        monthly: 4500,
        annual: 54000,
        growth: 12.5
      },
      features: {
        mostUsed: ['VoltBox', 'AirBox', 'FlowBox'],
        leastUsed: ['CoreBox', 'SterileBox'],
        requestedFeatures: ['PoolBox', 'SecurityBox']
      }
    };
    
    res.json(analytics);
  } catch (error) {
    console.error('Error fetching tenant analytics:', error);
    res.status(500).json({ error: 'Failed to fetch tenant analytics' });
  }
});

module.exports = router;
