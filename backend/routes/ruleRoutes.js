const express = require('express');
const {
  createRule,
  combineRules,
  evaluateRule,
  modifyRule
} = require('../controllers/ruleController');

const router = express.Router();

router.post('/create', createRule);
router.post('/combine', combineRules);
router.post('/evaluate', evaluateRule);
router.put('/modify', modifyRule);

module.exports = router;
