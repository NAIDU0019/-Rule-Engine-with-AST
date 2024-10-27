const Rule = require('../models/ruleModel');
const { createAST, evaluateAST, modifyASTNode } = require('../utils/astHelper');
const Node = require('../models/Node');
// Create a new rule
exports.createRule = async (req, res) => {
  const { ruleString, ruleName } = req.body;
  if (!ruleString || !ruleName) {
    return res.status(400).json({ error: 'Rule string and rule name are required' });
  }
  try {
    const ast = createAST(ruleString);
    const rule = new Rule({ ruleName, ast });
    await rule.save();
    res.status(201).json({ message: 'Rule created successfully', rule });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Combine multiple rules
exports.combineRules = async (req, res) => {
  const { ruleStrings } = req.body;
  try {
    const combinedAST = ruleStrings.map(createAST);
    res.json({ combinedAST });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Evaluate a rule against user data
exports.evaluateRule = async (req, res) => {
  const { ruleId, userData } = req.body;
  try {
    const rule = await Rule.findById(ruleId);
    if (!rule) return res.status(404).json({ message: 'Rule not found' });
    const isEligible = evaluateAST(rule.ast, userData);
    res.json({ isEligible });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Modify an existing rule
exports.modifyRule = async (req, res) => {
  const { ruleId, modifications } = req.body;
  try {
    const rule = await Rule.findById(ruleId);
    if (!rule) return res.status(404).json({ message: 'Rule not found' });
    modifyASTNode(rule.ast, modifications);
    rule.modified_at = Date.now();
    await rule.save();
    res.json({ message: 'Rule modified successfully', rule });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
