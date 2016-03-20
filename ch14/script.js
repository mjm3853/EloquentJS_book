/*
addEventListener("click", function(){
	console.log("You clicked the document.");
});
*/

//------------------

var simpleButton = document.querySelector("#simpleButton");

simpleButton.addEventListener("click", function(){
	console.log("Button clicked.");
});

//-------------------

var complexButton = document.querySelector("#complexButton");

complexButton.addEventListener("mousedown", function(event){
	if (event.which == 1)
		console.log("Left button");
	else if (event.which == 2)
		console.log("Middle button");
	else if (event.which == 3)
		console.log("Right button");
});

//-------------------------

var containerPara = document.querySelector("#containerPara");
var propButton = document.querySelector("#propButton");

containerPara.addEventListener("mousedown", function(){
	console.log("Handler for paragraph.");
});

propButton.addEventListener("mousedown", function(event){
	console.log("Handler for prop button.");
	if (event.which == 3)
		event.stopPropagation();
});

//--------------------------

var mdnLink = document.querySelector("#mdnLink");
mdnLink.addEventListener("click", function(event){
	console.log("Nope.");
	event.preventDefault();
});

//---------------------------------

addEventListener("keydown", function(event){
	if (event.keyCode == 86)
		document.body.style.background = "violet";	
});

addEventListener("keyup", function(event){
	if (event.keyCode == 86)
		document.body.style.background = "";
});
