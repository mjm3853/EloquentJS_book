function GraphNode(){
	this.pos = new Vector(Math.random() * 1000,
						Math.random() * 1000);
	this.edges = [];
}

GraphNode.prototype.connect = function(other){
	this.edges.push(other);
	this.edges.push(this);
};

GraphNode.prototype.hasEdge = function(other){
	for (var i = 0; i < this.edges.length; i++)
		if (this.edges[i] == other)
			return true;
};

//------------------------------

function treeGraph(depth, branches){
	var graph = [];
	function buildNode(depth){
		var node = new GraphNode();
		graph.push(node);
		if (depth > 1)
			for (var i = 0; i < branches; i++)
				node.connect(buildNode(depth-1));
	}
}

//---------------------------------

var springLength = 40;
var springStrength = 0.1;

var repulsionStrength = 1500;

//-------------------------------


