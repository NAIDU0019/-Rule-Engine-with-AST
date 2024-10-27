const operators = ['AND', 'OR', '>', '<', '='];

// Helper to validate rule strings
function validateRuleString(ruleString) {
  const valid = operators.some(op => ruleString.includes(op));
  if (!valid) throw new Error('Invalid rule string format');
  return ruleString;
}

// Function to parse rule strings and generate an AST
// Function to parse rule strings and generate an AST
function createAST(ruleString) {
  console.log(`Creating AST for rule: ${ruleString}`); // Add logging

  validateRuleString(ruleString);

  // Simple parser for basic logical and comparison operations
  const parseExpression = (expr) => {
    const operators = ['AND', 'OR'];
    for (const op of operators) {
      const parts = expr.split(new RegExp(`\\s+${op}\\s+`, 'i'));
      if (parts.length === 2) {
        return {
          type: "operator",
          value: op,
          left: parseExpression(parts[0]),
          right: parseExpression(parts[1])
        };
      }
    }

    const match = expr.match(/(.+?)\s*(=|>|<)\s*(.+)/);
    if (match) {
      let attributeValue = match[3].trim();
      if (isNaN(attributeValue)) {
        // Remove surrounding single quotes from string values
        if (attributeValue.startsWith("'") && attributeValue.endsWith("'")) {
          attributeValue = attributeValue.slice(1, -1);
        }
      } else {
        attributeValue = Number(attributeValue);
      }
      return {
        type: "operand",
        value: {
          attribute: match[1].trim(),
          operator: match[2],
          value: attributeValue
        }
      };
    }

    throw new Error('Unsupported rule string format');
  };

  return parseExpression(ruleString);
}

// Function to evaluate an AST against user data
const validAttributes = ['age', 'department', 'salary', 'experience'];


function evaluateAST(node, userData) {
  console.log(`Evaluating AST node: ${JSON.stringify(node)} with userData: ${JSON.stringify(userData)}`); // Add logging

  if (node.type === 'operand') {
    const { attribute, operator, value } = node.value;
    if (!validAttributes.includes(attribute)) throw new Error(`Invalid attribute: ${attribute}`);
    if (!(attribute in userData)) throw new Error(`Attribute ${attribute} missing in user data`);
    switch (operator) {
      case '>': return userData[attribute] > value;
      case '<': return userData[attribute] < value;
      case '=': return userData[attribute] === value;
      default: throw new Error(`Unsupported operator: ${operator}`);
    }
  }
  
  if (node.type === 'operator') {
    const leftEval = evaluateAST(node.left, userData);
    const rightEval = evaluateAST(node.right, userData);
    return node.value === 'AND' ? leftEval && rightEval : leftEval || rightEval;
  }
}

// Function to modify AST nodes for rule modification
function modifyASTNode(ast, modifications) {
  // Traverse and modify AST based on modifications provided (new values, operators, etc.)
  if (modifications.attribute) ast.value.attribute = modifications.attribute;
  if (modifications.operator) ast.value.operator = modifications.operator;
  if (modifications.value) ast.value.value = modifications.value;
}

module.exports = { createAST, evaluateAST, modifyASTNode, validateRuleString, validAttributes };
