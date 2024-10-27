// backend/models/ruleModel.js
const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
  ruleName: { type: String, required: true, unique: true },
  ast: { type: Object, required: true },
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Rule', ruleSchema);