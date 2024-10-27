



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


---

## Adding and Testing Rules

### Step 1: Adding a Rule

1. **Define a Rule String**  
   Create a rule string that specifies the eligibility conditions. For example:
   ```plaintext
   ((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)
   ```

2. **Create a Rule Using `create_rule` API**  
   Send a POST request to the API endpoint for rule creation, providing the rule string in the request payload. This API call converts the rule string into an AST and stores it in MongoDB.

   **Example Request**:
   ```http
   POST /api/rules/create
   Content-Type: application/json

   {
     "ruleString": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"
   }
   ```

3. **Check Rule in Database**  
   Confirm that the rule is saved in MongoDB by checking the `rules` collection. Each rule entry should contain the rule name, AST structure, and timestamps.

### Step 2: Combining Rules

To combine multiple rules, use the `combine_rules` API. This will merge the rules into a single AST, ensuring efficiency by reducing redundancies.

1. **Prepare Rules for Combination**  
   Add the rule names you want to combine into a list.

2. **Combine Rules Using `combine_rules` API**  
   Send a POST request to combine the rules by providing the list of rule names.

   **Example Request**:
   ```http
   POST /api/rules/combine
   Content-Type: application/json

   {
     "rules": ["Rule1", "Rule2"]
   }
   ```

3. **Verify Combined Rule**  
   Check the MongoDB `rules` collection for a new entry or an updated entry with a combined AST representing the merged rules.

### Step 3: Testing Rule Evaluation

You can test rule evaluation by providing JSON data that represents a user profile and submitting it to the `evaluate_rule` API. The API will evaluate the data against the rule's AST and return a boolean indicating eligibility.

1. **Prepare Sample JSON Data**  
   Create JSON data that represents user attributes. For example:
   ```json
   {
     "age": 35,
     "department": "Sales",
     "salary": 60000,
     "experience": 3
   }
   ```

2. **Evaluate Rule Using `evaluate_rule` API**  
   Send a POST request to evaluate the rule against the provided data.

   **Example Request**:
   ```http
   POST /api/rules/evaluate
   Content-Type: application/json

   {
     "ruleName": "Rule1",
     "userData": {
       "age": 35,
       "department": "Sales",
       "salary": 60000,
       "experience": 3
     }
   }
   ```

3. **Interpret API Response**  
   The response will return `true` if the data meets the rule conditions or `false` otherwise.

### Step 4: Running Tests

To ensure the system functions as expected, you can run automated tests for rule creation, combination, and evaluation.

1. **Write Tests**  
   Use the provided test suite or add tests in the `tests` directory. Test cases should include:
   - **Create Rule Test**: Ensures `create_rule` generates the correct AST structure.
   - **Combine Rules Test**: Verifies `combine_rules` merges rules correctly without redundant checks.
   - **Evaluate Rule Test**: Confirms `evaluate_rule` returns correct eligibility based on sample data.

2. **Run Tests**  
   Execute the test suite with the following command:
   ```bash
   npm test
   ```

   The output will display passed or failed tests, helping you confirm that the rule engine logic is functioning correctly.

---



This application provides a robust and flexible framework for implementing and managing complex eligibility rules, suitable for various business applications.
