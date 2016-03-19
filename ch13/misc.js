
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

function replaceImages(){
	var images =document.body.getElementsByTagName("img");

	
}
