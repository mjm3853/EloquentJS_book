var fs = require("fs");


fs.readFile("graffiti.txt", "utf8", function(error, text){
	if (error)
		throw error;
	console.log("The file contained: " + text);
});

/*
fs.readFile("file.txt", function(error, buffer){
	if (error)
		throw error;
	console.log("The file contained", buffer.length, "bytes.", "The first byte is:", buffer[0]);
});

fs.writeFile("graffiti.txt", "Node was here", function(err){
	if (err)
		console.log("Failed to write file", err);
	else
		console.log("File written");
});
*/