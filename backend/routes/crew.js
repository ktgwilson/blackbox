const express = require('express');
const Crew = require('../models/Crew');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const { status, specialization, location } = req.query;
    let query = { isActive: true };

    if (status) {
      query['availability.status'] = status;
    }

    if (specialization) {
      query.specializations = { $in: [specialization] };
    }

    const crews = await Crew.find(query)
      .populate('lead', 'firstName lastName email phone')
      .populate('members.user', 'firstName lastName email phone')
      .sort({ createdAt: -1 });

    res.json(crews);
  } catch (error) {
    console.error('Get crews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const crew = await Crew.findById(req.params.id)
      .populate('lead', 'firstName lastName email phone')
      .populate('members.user', 'firstName lastName email phone')
      .populate('availability.currentProject', 'name status');

    if (!crew) {
      return res.status(404).json({ message: 'Crew not found' });
    }

    res.json(crew);
  } catch (error) {
    console.error('Get crew error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, [
  body('name').trim().isLength({ min: 1 }),
  body('lead').isMongoId(),
  body('specializations').isArray({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, lead, members, specializations, location, equipment } = req.body;

    const leadUser = await User.findById(lead);
    if (!leadUser) {
      return res.status(400).json({ message: 'Lead user not found' });
    }

    const crewId = `crew_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const crew = new Crew({
      crewId,
      name,
      lead,
      members: members || [],
      specializations,
      location: location || {},
      equipment: equipment || []
    });

    await crew.save();

    const populatedCrew = await Crew.findById(crew._id)
      .populate('lead', 'firstName lastName email phone')
      .populate('members.user', 'firstName lastName email phone');

    res.status(201).json(populatedCrew);
  } catch (error) {
    console.error('Create crew error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { name, members, specializations, location, equipment, availability } = req.body;

    const crew = await Crew.findById(req.params.id);
    if (!crew) {
      return res.status(404).json({ message: 'Crew not found' });
    }

    if (name) crew.name = name;
    if (members) crew.members = members;
    if (specializations) crew.specializations = specializations;
    if (location) crew.location = { ...crew.location, ...location };
    if (equipment) crew.equipment = equipment;
    if (availability) crew.availability = { ...crew.availability, ...availability };

    await crew.save();

    const populatedCrew = await Crew.findById(crew._id)
      .populate('lead', 'firstName lastName email phone')
      .populate('members.user', 'firstName lastName email phone');

    res.json(populatedCrew);
  } catch (error) {
    console.error('Update crew error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/assign', auth, [
  body('projectId').isMongoId(),
  body('startDate').isISO8601(),
  body('endDate').isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { projectId, startDate, endDate } = req.body;

    const crew = await Crew.findById(req.params.id);
    if (!crew) {
      return res.status(404).json({ message: 'Crew not found' });
    }

    if (crew.availability.status !== 'available') {
      return res.status(400).json({ message: 'Crew is not available' });
    }

    crew.availability.status = 'assigned';
    crew.availability.currentProject = projectId;

    const scheduleEntry = {
      date: new Date(startDate),
      status: 'assigned',
      project: projectId
    };

    crew.availability.schedule.push(scheduleEntry);

    await crew.save();

    res.json({ message: 'Crew assigned successfully', crew });
  } catch (error) {
    console.error('Assign crew error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/complete', auth, async (req, res) => {
  try {
    const crew = await Crew.findById(req.params.id);
    if (!crew) {
      return res.status(404).json({ message: 'Crew not found' });
    }

    crew.availability.status = 'available';
    crew.availability.currentProject = null;
    crew.performance.completedProjects += 1;

    await crew.save();

    res.json({ message: 'Project completed successfully', crew });
  } catch (error) {
    console.error('Complete project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/optimize/:tradeType', auth, async (req, res) => {
  try {
    const { tradeType } = req.params;
    const { location, projectSize, urgency } = req.query;

    let query = {
      isActive: true,
      'availability.status': 'available',
      specializations: { $in: [tradeType] }
    };

    if (location) {
      query['location.baseLocation.coordinates'] = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(location.lng), parseFloat(location.lat)]
          },
          $maxDistance: 80000
        }
      };
    }

    const crews = await Crew.find(query)
      .populate('lead', 'firstName lastName email phone')
      .populate('members.user', 'firstName lastName email phone')
      .sort({ 'performance.averageRating': -1, 'performance.onTimeCompletion': -1 });

    const optimizedCrews = crews.map(crew => {
      let score = 0;
      
      score += crew.performance.averageRating * 20;
      score += crew.performance.onTimeCompletion * 15;
      score += (crew.performance.completedProjects / 10) * 10;
      
      if (crew.performance.safetyRecord.incidents === 0) {
        score += 25;
      } else {
        score -= crew.performance.safetyRecord.incidents * 5;
      }

      const experienceLevel = crew.members.reduce((total, member) => {
        return total + (member.skills ? member.skills.length : 0);
      }, 0);
      score += experienceLevel * 2;

      return {
        ...crew.toObject(),
        optimizationScore: Math.round(score),
        recommendation: score > 80 ? 'Highly Recommended' : 
                      score > 60 ? 'Recommended' : 
                      score > 40 ? 'Consider' : 'Not Recommended'
      };
    });

    optimizedCrews.sort((a, b) => b.optimizationScore - a.optimizationScore);

    res.json(optimizedCrews.slice(0, 5));
  } catch (error) {
    console.error('Optimize crew error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
