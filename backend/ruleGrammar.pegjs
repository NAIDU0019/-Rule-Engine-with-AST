// me/backend/ruleGrammar.pegjs
start
  = expression

expression
  = left:term _ operator:("AND" / "OR") _ right:term {
      return {
        type: "operator",
        value: operator,
        left: left,
        right: right
      };
    }
  / term

term
  = "(" _ expr:expression _ ")" { return expr; }
  / condition

condition
  = attribute:[a-zA-Z]+ _ operator:(">" / "<" / "=") _ value:[0-9]+ {
      return {
        type: "operand",
        value: {
          attribute: attribute.join(""),
          operator: operator,
          value: parseInt(value.join(""), 10)
        }
      };
    }

_ "whitespace"
  = [ \t\n\r]*;