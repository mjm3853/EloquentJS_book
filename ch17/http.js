
var req = new XMLHttpRequest();
req.open("GET", "example/data.txt", false);
req.send(null);
console.log(req.responseText);
console.log(req.getResponseHeader("content-type"));

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
