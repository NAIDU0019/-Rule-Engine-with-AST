# -Rule-Engine-with-AST

Sure! Here's the complete `README.md` file with the provided content:

```markdown
# 3-Tier Rule Engine Application

## Objective

Develop a simple 3-tier rule engine application (Simple UI, API, and Backend, Data) to determine user eligibility based on attributes like age, department, income, spend, etc. The system uses an Abstract Syntax Tree (AST) to represent conditional rules and allows for dynamic creation, combination, and modification of these rules.

## Data Structure

### AST Representation

The data structure to represent the AST is defined using a Node with the following fields:
- **type**: A string indicating the node type ("operator" for AND/OR, "operand" for conditions).
- **left**: Reference to another Node (left child).
- **right**: Reference to another Node (right child for operators).
- **value**: Optional value for operand nodes (e.g., number for comparisons).

### Example

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

We use MongoDB to store the rules and application metadata.

### Schema

Here is a sample Mongoose schema for storing the rules:

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

- **Rule 1**: "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"
- **Rule 2**: "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)"

## API Design

### 1. `create_rule(rule_string)`

This function takes a string representing a rule and returns a Node object representing the corresponding AST.

### 2. `combine_rules(rules)`

This function takes a list of rule strings and combines them into a single AST. It considers efficiency and minimizes redundant checks. The function returns the root node of the combined AST.

### 3. `evaluate_rule(JSON data)`

This function takes a JSON representing the combined rule's AST and a dictionary containing attributes (e.g., `{"age": 35, "department": "Sales", "salary": 60000, "experience": 3}`). The function evaluates the rule against the provided data and returns `True` if the user meets the criteria based on the rule, `False` otherwise.

## Test Cases

1. **Create Individual Rules**: Use `create_rule` to create individual rules from the examples and verify their AST representation.
2. **Combine Rules**: Use `combine_rules` to combine the example rules and ensure the resulting AST reflects the combined logic.
3. **Evaluate Rule**: Implement sample JSON data and test `evaluate_rule` for different scenarios.
4. **Additional Rules**: Explore combining additional rules and test the functionality.

## Bonus Features

- **Error Handling**: Implement error handling for invalid rule strings or data formats (e.g., missing operators, invalid comparisons).
- **Validations**: Implement validations for attributes to be part of a catalog.
- **Modify Existing Rules**: Allow for modification of existing rules using additional functionalities within `create_rule` or separate functions. This could involve changing operators, operand values, or adding/removing sub-expressions within the AST.
- **User-Defined Functions**: Extend the system to support user-defined functions within the rule language for advanced conditions.

## Getting Started

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/your-repository.git
    cd your-repository
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the application**:
    ```bash
    npm start
    ```

4. **Run tests**:
    ```bash
    npm test
    ```

## Contributing

Feel free to submit issues, fork the repository, and send pull requests!

## License

This project is licensed under the MIT License.
```

Replace `your-username` and `your-repository` with your actual GitHub username and repository name. This README should provide a comprehensive overview and guide for your project.
