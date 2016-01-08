//parseExpression takes a String as input
//parseExpression returns an Object with: 
// (a) the first data structure in the String 
// (b) the part of the string after the first data structure 

function parseExpression(program) {
  program = skipSpace(program);
  var match, expr;
  
  //exec returns an array of values that match the Reg Exp, or null.
  //1 - exec checks the program against the RegExp and returns an Array to the 'match' variable.
  //2 - if match is null, then the statement is run
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

function parseApply(expr, program){
	program = skipSpace(program);
	if (program[0] != "(")
		return {expr: expr, rest: program};
		
	program = skipSpace(program.slice(1));
	expr = {type: "apply", operator: expr, args: []};
	while (program[0] != ")"){
		var arg = parseExpression(program);
		expr.args.push(arg.expr);
		program = skipSpace(arg.rest);
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
