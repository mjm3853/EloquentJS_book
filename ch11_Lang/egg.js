//parseExpression takes a String as input
//parseExpression returns an Object with: 
// (a) the first data structure in the String 
// (b) the part of the string after the first data structure 

function parseExpression(program) {
  program = skipSpace(program);
  var match, expr;
  
  //exec returns an array of values that match the Reg Exp, or null.
  //1 - exec checks the program against the RegExp and returns an Array to the 'match' variable.
  //2 - if match is null, then the next statement is run
  //3 - if match is an array with values, then expr is set. See the statement information.
  //3a - else, go to the next statement
  
  //Determines if the data structure is a String
  //1 - expr has a 'type' attribute of value, and a 'value' attribute of the 2nd element in the match array
  //2 - go to the return step
  
  if (match = /^"([^"]*)"/.exec(program))
    expr = {type: "value", value: match[1]};
    
  //Determines if the data structure is a Number
  //1 - expr has a 'type' attribute of value, and a 'value' attribute converts the 1st element of the array to a number
  //2 - go to the return step
  
  else if (match = /^\d+\b/.exec(program))
    expr = {type: "value", value: Number(match[0])};
    
  //Determines if the data structure is a Word
  //1 - expr has a 'type' attribute of word, and a 'value' attribute of the 1st element in the match array
  //2 - go to the return step
  
  else if (match = /^[^\s(),"]+/.exec(program))
    expr = {type: "word", name: match[0]};
    
  //Handle error if no part of the 'program' string matches any of the statements above
  else
    throw new SyntaxError("Unexpected syntax: " + program);

  //Returns the outcome of the parseApply function with expr set from this function.
  //Slices away the part of the string used for the expr
  return parseApply(expr, program.slice(match[0].length));
}

//===================

console.log("Parse the String expression 'abc with quotations': " + JSON.stringify(parseExpression('"abc"')));
console.log("Parse the Number expression '123': " + JSON.stringify(parseExpression("123")));
console.log("Parse the Word expression 'abc': " + JSON.stringify(parseExpression("abc")));

//===================
// Slicing the 'first' variable removes all characters that come before that 'first' value  

function skipSpace(string) {
  var first = string.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}

//===================

console.log("Should have leading spaces: " + "     abv");
console.log("Should not have leading spaces: " + skipSpace("   abv"));

//===================

// parseApply checks whether the expression is an application/
// If application, then it parses a parenthesized list of arguments

function parseApply(expr, program){
	// removes any leading spaces from the 'program' argument
	program = skipSpace(program);
	
	//An application has an opening parenthesis, so that condition is checked.
	// If it is not an application, then the expr/rest structure is returned.
	if (program[0] != "(")
		return {expr: expr, rest: program};
		
	//Removes the opening parenthesis and any spaces before the next character	
	program = skipSpace(program.slice(1));
	
	//updates the expr with the application structure
	//puts the original expr argument into the operator
	expr = {type: "apply", operator: expr, args: []};
	
	//iterates until the closing parenthesis
	while (program[0] != ")"){
		
		//Runs parseExpression again, recursively, until the bottom of the structure is found
		var arg = parseExpression(program);
		
		//adds the current data expression to the arguments array
		expr.args.push(arg.expr);
		
		// removes any spaces before the 'rest' attribute
		program = skipSpace(arg.rest);
		
		//It is expected that this will find a comma, so it checks for this condition.
		// If a comma is there as expected, the values after the comma are set to the program variable.
		if (program[0] == ",")
			program = skipSpace(program.slice(1));
		else if (program[0] != ")")
			throw new SyntaxError("Expected ',' or ')' - Actual: " + program);
	}
	return parseApply(expr, program.slice(1));
}


//===================

function parse(program){
	var result = parseExpression(program);
	if (skipSpace(result.rest).length > 0)
		throw new SyntaxError("Unexpected text after program");
	return result.expr;
}

//=============

console.log("Parse a Word: " + JSON.stringify(parse("abc")));
console.log("Parse an Application: " + JSON.stringify(parse("+(a, 10)")));

//=========================

function evaluate(expr, env){
	
	//Checks for each expression type and performs the needed functionality
	switch(expr.type){
		
		//If the expression is a value, then the value is returned.
		case "value":
			return expr.value;
		
		//If the expression is a word, then it is a variable that may or may not be defined in the environment.
		// If the word is in the environment, then the value of the item at the index where that expression resides is returned.
		case "word":
			if (expr.name in env)
				return env[expr.name];
			else
				throw new ReferenceError("Undefined variable: " + expr.name);
		
		//If the expression is an application, then there is a check if the operator type is a word.
		case "apply":
			
			// if it is a word, and it is in the specialForms , then the arguments and environment are passed to that specialForms.
			if (expr.operator.type == "word" && expr.operator.name in specialForms)
				return specialForms[expr.operator.name](expr.args, env);
			
			//the operator is expected to be a function.
			var op = evaluate(expr.operator, env);
			if (typeof op != "function")
				throw new TypeError("Applying a non-function");
			return op.apply(null, expr.args.map(function(arg){
			return evaluate(arg, env);
			}));	
	}
}

