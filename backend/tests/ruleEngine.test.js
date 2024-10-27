const { createAST, evaluateAST } = require('../utils/astHelper');
const { combineRules } = require('../controllers/ruleController');
const Rule = require('../models/ruleModel');
const mongoose = require('mongoose');

// Connect to the test database
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/ruleEngineTest', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Rule Engine Tests', () => {
  test('Create individual rule AST', () => {
    const ruleString = "age > 30 AND department = 'Sales'";
    const ast = createAST(ruleString);
    expect(ast).toMatchObject({
      type: "operator",
      value: "AND",
      left: { type: "operand", value: { attribute: "age", operator: ">", value: 30 } },
      right: { type: "operand", value: { attribute: "department", operator: "=", value: "Sales" } }
    });
  });

  test('Evaluate rule against user data', () => {
    const ruleString = "age > 30 AND department = 'Sales'";
    const ast = createAST(ruleString);
    const userData = { age: 35, department: 'Sales' };
    const result = evaluateAST(ast, userData);
    expect(result).toBe(true);
  });

  test('Combine multiple rules', async () => {
    const ruleStrings = [
      "age > 30 AND department = 'Sales'",
      "age < 25 AND department = 'Marketing'"
    ];
    const combinedAST = ruleStrings.map(createAST);
    expect(combinedAST.length).toBe(2);
  });

  test('Evaluate combined rule against user data', () => {
    const ruleString1 = "age > 30 AND department = 'Sales'";
    const ruleString2 = "age < 25 AND department = 'Marketing'";
    const combinedAST = [createAST(ruleString1), createAST(ruleString2)];
    const userData = { age: 35, department: 'Sales' };
    const result1 = evaluateAST(combinedAST[0], userData);
    const result2 = evaluateAST(combinedAST[1], userData);
    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });
});