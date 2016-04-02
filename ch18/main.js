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
