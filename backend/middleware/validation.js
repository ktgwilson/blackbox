const { body, validationResult } = require('express-validator');

const validateEstimate = [
  body('scope').notEmpty().withMessage('Project scope is required'),
  body('tradeType').isIn(['voltbox', 'airbox', 'flowbox', 'floorbox', 'glazebox', 'framebox', 'signalbox', 'roofbox', 'colorbox', 'greenbox', 'renobox', 'dockbox']).withMessage('Invalid trade type'),
  body('location').optional().isString(),
  body('timeline').optional().isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateUser = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('role').optional().isIn(['admin', 'manager', 'estimator', 'viewer']).withMessage('Invalid role'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateEstimate,
  validateUser
};
