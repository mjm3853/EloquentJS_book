/*
document.querySelector("input").focus();
console.log(document.activeElement.tagName);
document.querySelector("input").blur();
conosle.log(document.activeElement.tagName);
*/

var form = document.querySelector("form");
console.log(form.elements[1].type);
console.log(form.elements.password.type);
console.log(form.elements.name.form == form);

//-------------------

var textarea = document.querySelector("textarea");
textarea.addEventListener("keydown", function(event){
	//keycode of f2 = 113
	if (event.keyCode == 113){
		replaceSelection(textarea, "bababooey");
	}
});

function replaceSelection(field, word){
	var from = field.selectionStart, to = field.selectionEnd;
	field.value = field.value.slice(0, from) + word + field.value.slice(to);
	//Put the cursor after the word
	field.selectionStart = field.selectionEnd = from + word.length;
}

//-------------------------------

var text = document.querySelector("#lenText");
var output = document.querySelector("#length");
text.addEventListener("input", function(){
	output.textContent = text.value.length;
});

//---------------------------------

var checkbox = document.querySelector("#purple");
checkbox.addEventListener("change", function(){
	document.body.style.background = checkbox.checked ? "mediumpurple" : "";
});

//---------------------------------

var buttons = document.getElementsByName("color");

function setColor(event){
	document.body.style.background = event.target.value;
}

for (var i = 0; i < buttons.length; i++)
	buttons[i].addEventListener("change", setColor);

//--------------------------------------

var select = document.querySelector("select");
var output = document.querySelector("#output");
select.addEventListener("change", function(){
	var number = 0;
	for (var i = 0; i < select.options.length; i++){
		var option = select.options[i];
		if (option.selected)
			number += Number(option.value);
	}
	output.textContent = number;
});

//----------------------------------------

var input = document.querySelector("#fileInput");
input.addEventListener("change", function(){
	if (input.files.length > 0) {
		var file = input.files[0];
		console.log("You chose", file.name);
		if(file.type)
			console.log("It has type", file.type);
	}
});
