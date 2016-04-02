
/*
var req = new XMLHttpRequest();
req.open("GET", "example/data.txt", false);
req.send(null);
console.log(req.responseText);
console.log(req.getResponseHeader("content-type"));
*/

//------------------------------

var req2 = new XMLHttpRequest();
req2.open("GET", "example/data.txt", true);
req2.addEventListener("load", function(){
	console.log("Done:", req2.status);
});
req2.send(null);

//---------------------------------

var fruitReq = new XMLHttpRequest();
fruitReq.open("GET", "example/fruits.xml", false);
fruitReq.send(null);
console.log(fruitReq.responseXML.querySelectorAll("fruit").length);

//-----------------------------

var fruitReq2 = new XMLHttpRequest();
fruitReq2.open("GET", "example/fruits.json", false);
fruitReq2.send(null);
console.log(JSON.parse(fruitReq2.responseText));

//------------------------------------------

function backgroundReadFile(url, callback) {
	var req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.addEventListener("load", function(){
		if (req.status < 400)
			callback(req.responseText);
	});
	req.send(null);
}

//--------------------------------------------------

try {
	backgroundReadFile("example/data.txt", function(text){
		if (text != "expected")
			throw new Error("That was unexpected");
	});
} catch(e) {
	console.log("Heyo from the catch block");
}

//------------------------------------

function getURL(url, callback){
	var req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.addEventListener("load", function(){
		if (req.status < 400)
			callback(req.responseText, url);
		else
			callback(null, url, new Error("Request failed: " + req.statusText));
	});
	req.addEventListener("error", function(){
		callback(null, url, new Error("Network error"));
	});
	req.send(null);
}

//----------------------------

getURL("example/data.txt", function(content, url, error){
	if (error != null)
		console.log("Failed to fetch " + url + " with error: " + error);
	else
		console.log("Content of " + url + ": " + content);
});
