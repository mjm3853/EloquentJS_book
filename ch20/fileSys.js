var fs = require("fs");

/*
fs.readFile("file.txt", "utf8", function(error, text){
	if (error)
		throw error;
	console.log("The file contained: " + text);
});
*/

fs.readFile("file.txt", function(error, buffer){
	if (error)
		throw error;
	console.log("The file contained", buffer.length, "bytes.", "The first byte is:", buffer[0]);
});
