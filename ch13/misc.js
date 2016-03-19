
function talksAbout(node, string){
	if (node.nodeType == document.ELEMENT_NODE){
		for (var i=0; i < node.childNodes.length; i++){
			if (talksAbout(node.childNodes[i], string))
				return true;
		}
		return false;
	} else if (node.nodeType == document.TEXT_NODE){
		return node.nodeValue.indexOf(string) > -1;
	}
}

console.log(talksAbout(document.body, "Blah"));

//---------------

var link = document.body.getElementsByTagName("a")[0];

console.log(link.href);

//---------------

var ostrich = document.getElementById("gertrude");

console.log(ostrich.src);

//----------------

var paragraphs = document.body.getElementsByTagName("p");

document.body.insertBefore(paragraphs[1], paragraphs[0]);

//-----------------

var button = document.getElementById("bostrichButton");

function replaceImages(){
	var images = document.body.getElementsByTagName("img");
		
	for (var i = images.length - 1; i >= 0; i--){
		var image = images[i];
		if (image.alt){
			var text = document.createTextNode(image.alt);
			image.parentNode.replaceChild(text, image);
		}
	}
}

function disableButton(){
	button.disabled = true;
}

button.addEventListener("click", replaceImages, false);
button.addEventListener("click", disableButton, false);

//-------------------





