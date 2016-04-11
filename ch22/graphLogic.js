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

function forceDirected_simple(graph){
	graph.forEach(function(node){
		graph.forEach(function(other){
			if (other == node) return;
			var apart = other.pos.minus(node.pos);
			var distance = Math.max(1, apart.length);
			var forceSize = -repulsionStrength / (distance * distance);
			if (node.hasEdge(other))
				forceSize += (distance - springLength) * springStrength;
			var normalized = apart.times(1/distance);
			node.pos = node.pos.plus(normalized.times(forceSize));
		});
	});
}

//--------------------------------

function runLayout(implementation, graph){
	var totalSteps = 0, time = 0;
	function step(){
		var startTime = Date.now();
		for (var i = 0; i < 100; i++)
			implementation(graph);
		totalSteps += 100;
		time += Date.now() - startTime;
		drawGraph(graph);
		if (totalSteps < 4000)
			requestAnimationFrame(step);
		else
			console.log(time);
	}
	step();
}
