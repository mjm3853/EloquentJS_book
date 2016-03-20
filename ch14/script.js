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

//--------------------------------

addEventListener("click", function(event) {
	var dot = document.createElement("div");
	dot.className = "dot";
	dot.style.left = (event.pageX - 4) + "px";
	dot.style.top = (event.pageY - 4) + "px";
	document.body.appendChild(dot);
});

//--------------------

var lastX;
var rect = document.querySelector("#dragBar");
rect.addEventListener("mousedown", function(event){
	if (event.which == 1){
		lastX = event.pageX;
		addEventListener("mousemove", moved);
		event.preventDefault(); //Prevent Selection
	}
});

function butttonPressed(event) {
	if (event.buttons == null)
		return event.which != 0;
	else
		return event.buttons !=0;
}
