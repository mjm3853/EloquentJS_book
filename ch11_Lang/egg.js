function parseExpression(program) {
    program = skipSpace(program);
    
    var isString = new RegExp('^"([^"]*)"');
    var isNumber = new RegExp('^\d+\b');
    var isWord = new RegExp('^[^\s(),"]+');
    
    var match, expr;
    
    // expression is a String
    if (match = isString.exec(program))
        expr = {type: "value", value: match[1]}; 
               
    // expression is a Number
    else if (match = isNumber.exec(program))
        expr = {type: "value", value: Number(match[0])};
        
    //expression is a Word
    else if (match = isWord.exec(program))
        expr = {type: "word", name: match[0]};
        
    //invalid expression
    else
    	throw new Error("Unexpected syntax");
    
    
    return parseApply(expr, program.slice(match[0].length));
}

//====================

function skipSpace(string) {
  var first = string.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}

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
		program.skipSpace(arg.rest);
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

console.log(parse("abc"));

//=============


