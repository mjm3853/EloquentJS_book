'use strict';

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

getURL("nonsense/data.txt", function(content, url, error){
	if (error != null)
		console.log("@getURL - Failed to fetch " + url + " with: " + error);
	else
		console.log("@getURL - Content of " + url + "is: " + content);
});

//-------------------------------------

function get(url){
	return new Promise(function(succeed, fail){
		var req = new XMLHttpRequest();
		req.open("GET", url, true);
		req.addEventListener("load", function(){
			if (req.status < 400)
				succeed(req.responseText);
			else
				fail(new Error("Request failed: " + req.statusText));
		});
		req.addEventListener("error", function(){
			fail (new Error("Network error"));
		});
		req.send(null);
	});
}

/*
get("example/data.txt").then(function(respURL){
	console.log("@get - Succeeded at: " + respURL);	
}, function(error){
	console.log("@get - Failed with: " + error);
});
*/

//-----------------------------------------

function getJSON(url){
	return get(url).then(JSON.parse);
}

function showMessage(msg){
	var elt = document.createElement("div");
	elt.textContent = msg;
	return document.body.appendChild(elt);
}

var loading = showMessage("Loading...");

getJSON("example/bert.json").then(function(bert){
	return getJSON(bert.spouse);
}).then(function(spouse){
	return getJSON(spouse.mother);
}).then(function(mother){
	showMessage("The name is " + mother.name);
}).catch(function(error){
	showMessage(String(error));
}).then(function(){
	document.body.removeChild(loading);
});
