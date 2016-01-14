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
//  When you want to know whether a pattern is found and also its index in a string use search() 
//  So first becomes either -1 if there is no white space.
//  Or it becomes the index of \S.

// function skipSpace(string) {
//   var first = string.search(/\S/);
//   if (first == -1) return "";
//  return string.slice(first);
// }

//===================

function skipSpace(string) {
	
  //Creates a skippable variable that is either white space or a comment
  var skippable = string.match(/^(\s|#.*)*/);
  
  //slices to take anything after the skippable part
  return string.slice(skippable[0].length);
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

//=============================================

//Global specialForms object
var specialForms = Object.create(null);

specialForms["if"] = function(args, env){
	
	// ensures that 3 arguments are passed to if
	if (args.length != 3)
		throw new SyntaxError("Bad number of args to if");
	
	//checks the first argument and evalutes if it is not false (true)
	// if true, evaluates the 2nd argument.
	// if false, evaluates the, 3rd argument.
	if (evaluate(args[0], env) !== false)
		return evaluate(args[1], env);
	else
		return evaluate(args[2], env);
};

specialForms["while"] = function(args, env){
	if (args.length != 2)
		throw new SyntaxError("Bad number if args to while");
	
	while (evaluate(args[0], env) !== false)
		evaluate(args[1], env);
		
	//Since undefined does not exist, return false
	return false;
};

specialForms["do"] = function(args, env){
	var value = false;
	args.forEach(function(arg){
		value = evaluate(arg, env);
	});
	return value;
};

specialForms["define"] = function(args, env){
	if (args.length !=2 || args[0].type != "word")
		throw new SyntaxError("Bad use of define");
	var value = evaluate(args[1], env);
	env[args[0].name] = value;
	return value;
};

//=============================

var topEnv = Object.create(null);

topEnv["true"] = true;
topEnv["false"] = false;

["+", "-", "*", "/", "==", "<", ">"].forEach(function(op){
	topEnv[op] = new Function("a", "b", "return a " + op + "b;");
});

topEnv["print"] = function(value){
	console.log(value);
	return value;
};

console.log(topEnv);

//==============================

var prog = parse("if(true, false, true)");

console.log("Return the output of parsing the if statement: " + JSON.stringify(prog));
console.log("Expect to return false: " + evaluate(prog, topEnv));

//==============================

function run() {
	var env = Object.create(topEnv);
	var program = Array.prototype.slice.call(arguments, 0).join("\n");
	return evaluate(parse(program), env);
}

//===========================

run("do(define(total, 0),",
	"   define(count, 1),",
	"   while(<(count,11),",
	"         do(define(total, +(total, count)),",
	"            define(count, +(count, 1)))),",
	"   print(total))");

//===========================

specialForms["fun"] = function(args, env){
	
	//checks that there are arguments for the function
	if (!args.length)
		throw new SyntaxError("Functions need a body");
		
	//The name function takes the argument expr
	// Ensures that the expr type is a word, and if yes, returns the expr's 'name' value
	function name(expr) {
		if (expr.type != "word")
			throw new SyntaxError("Arg names must be words");
		return expr.name;
	}
	
	//The argNames variable creates a new array with all the name values for the args except the last one in the original array. 
	var argNames = args.slice(0, args.length - 1).map(name);
	
	//The body variable gets the value of the item at the end of the array.
	var body = args[args.length -1];
	
	return function(){
		//makes sure that the number of arguments is correct.
		if (arguments.length != argNames.length)
			throw new TypeError("Wrong number of arguments");
		
		//Creates a local environment object from the env argument passed in to the fun specialForm
		var localEnv = Object.create(env);
		
		//For all the args, adds them to the local environment.
		for (var i = 0; i < arguments.length; i++)
			localEnv[argNames[i]] = arguments[i];
		
		//Evaluates the function based on the body and local environment.
		return evaluate(body, localEnv);
	};
};

//===============================

run("do(define(plusOne, fun(a, +(a, 1))),",
    "   print(plusOne(10)))");
    
run("do(define(pow, fun(base, exp,",
    "     if(==(exp, 0),",
    "       1,",
    "       *(base, pow(base, -(exp,1)))))),",
    "   print(pow(2, 10)))");
    
//===============================

topEnv["array"] = function(){
	return Array.prototype.slice.call(arguments, 0);
};

//===============================

topEnv["length"] = function(array){
	return array.length;
};

//===============================

topEnv["element"] = function(array, i){
	return array[i];
};

//==============================

run("do(define(sum, fun(array,",
    "     do(define(i, 0),",
    "        define(sum, 0),",
    "        while(<(i, length(array)),",
    "          do(define(sum, +(sum, element(array, i))),",
    "             define(i, +(i, 1)))),",
    "        sum))),",
    "   print(sum(array(1, 2, 3))))");
    
//===============================

specialForms["set"] = function(args, env) {
	
  //Throws an error if there are not 2 args or the first arg type is not word
  if (args.length != 2 || args[0].type != "word")
    throw new SyntaxError("Bad use of set");
  
  //sets the variable name as the name value of the first argument
  var varName = args[0].name;
  
  //evaluates the second argument with the environment
  var value = evaluate(args[1], env);

  //wtf
  for (var scope = env; scope; scope = Object.getPrototypeOf(scope)) {
    if (Object.prototype.hasOwnProperty.call(scope, varName)) {
      scope[varName] = value;
      return value;
    }
  }
  throw new ReferenceError("Setting undefined variable " + varName);
};

//==================================

run("do(define(x, 4),",
    "   define(setx, fun(val, set(x, val))),",
    "   setx(50),",
    "   print(x))");
// → 50
run("set(quux, true)");