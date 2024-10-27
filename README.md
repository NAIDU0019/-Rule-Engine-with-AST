Here's a README for the **3-Tier Rule Engine Application**:

---

# 3-Tier Rule Engine Application

## Objective

This project implements a 3-tier rule engine application to evaluate user eligibility based on attributes like age, department, income, spend, etc. The application features:
- A simple UI for rule creation and evaluation.
- An API layer to handle rule processing.
- A backend database to store and manage rules.
  
The system employs an Abstract Syntax Tree (AST) to represent complex conditional rules, enabling dynamic rule creation, combination, and modification.

## Data Structure

### Abstract Syntax Tree (AST)

The AST is represented using a Node structure with fields to define:
- **type**: The node type, such as "operator" (AND/OR) or "operand" (for specific conditions).
- **left**: A reference to the left child Node.
- **right**: A reference to the right child Node for operator nodes.
- **value**: Optional, used for operand nodes, like numbers or department names.

### Node Class Example (JavaScript)

```javascript
class Node {
  constructor(node_type, value = null, left = null, right = null) {
    this.type = node_type;
    this.value = value;
    this.left = left;
    this.right = right;
  }
}
```

## Data Storage

### Database Choice
MongoDB is used to store rule configurations and application metadata.

### Schema
A sample Mongoose schema for rule storage:

```javascript
const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
  ruleName: { type: String, required: true, unique: true },
  ast: { type: Object, required: true },
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Rule', ruleSchema);
```

## Sample Rules

1. **Rule 1**: `((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)`
2. **Rule 2**: `((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)`

## API Design

### 1. `create_rule(rule_string)`
Parses a rule string to construct and return a Node object representing the AST.

### 2. `combine_rules(rules)`
Accepts multiple rule strings, combining them into a single AST efficiently, minimizing redundant checks, and returning the root node of the combined AST.

### 3. `evaluate_rule(jsonData)`
Evaluates the combined rule's AST against provided user attributes (e.g., `{"age": 35, "department": "Sales", "salary": 60000, "experience": 3}`) and returns a boolean indicating if the criteria are met.

## Testing

- **Create Individual Rules**: Use `create_rule` to create ASTs for example rules and verify their structure.
- **Combine Rules**: Use `combine_rules` on sample rules and confirm the combined AST reflects the intended logic.
- **Evaluate Rule**: Provide sample JSON data to `evaluate_rule` and test with various scenarios to ensure accuracy.
- **Additional Rules**: Test the system's ability to handle and evaluate additional rule combinations.

## Bonus Features

- **Error Handling**: Validates rule syntax and data format for compatibility (e.g., missing operators, incorrect comparisons).
- **Attribute Validation**: Verifies attributes against a predefined catalog for accurate rule evaluation.
- **Modify Existing Rules**: Supports rule updates through the `create_rule` function or custom functions, enabling modifications like changing operators or values.
- **User-Defined Functions**: Allows for custom function integration within the rule language for more advanced conditions.

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repository.git
    cd your-repository
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the application:**
    ```bash
    npm start
    ```

4. **Run tests:**
    ```bash
    npm test
    ```

---

This application provides a robust and flexible framework for implementing and managing complex eligibility rules, suitable for various business applications.
