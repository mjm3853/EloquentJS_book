var http = require("http");
var Router = require("./router");
var ecstatic = require("ecstatic");

var fileServer = ecstatic({root: "./public"});
var router = new Router();
var talksRegEx = /^\/talks\/([^\/]+)$/;

http.createServer(function(request, response){
	if (!router.resolve(request,response))
		fileServer(request,response);
}).listen(8000);

function respond(response, status, data, type){
	response.writeHead(status, {
		"Content-Type": type || "text/plain"
	});
	response.end(data);
}

function respondJSON(response, status, data){
	respond(response, status, JSON.stringify(data), "application/json");
}

//---------------------------

var talks = Object.create(null);

router.add("GET", talksRegEx, function(request, response, title){
	if (title in talks)
		respondJSON(response, 200, talks[title]);
	else
		respond(response, 404, "No talk '" + title + "' found");
});

router.add("DELETE", talksRegEx, function(request, response, title){
	if (title in talks){
		delete talks[title];
		registerChange(title);
	}
	respond(response, 204, null);
});

//-----------------------------

function readStreamAsJSON(stream, callback){
	var data = "";
	stream.on("data", function(chunk){
		data += chunk;
	});
	stream.on("end", function(){
		var result, error;
		try { result = JSON.parse(data); }
		catch (e) { error = e; }
		callback(error, result);
	});
	stream.on("error", function(error){
		callback(error);
	});
}

//------------------------------------

router.add("PUT", talksRegEx, function(request, response, title){
	readStreamAsJSON(request, function(error, talk){
		if (error){
			respond(response, 400, error.toString());
		} else if (!talk || 
					typeof talk.presenter != "string" ||
					typeof talk.summary != "string"){
			respond(response, 400, "Bad talk data");
		} else {
			talks[title] = {title: title,
							presenter: talk.presenter,
							summary: talk.summary,
							comments: []};
			registerChange(title);
			respond(response, 204, null);
		}
	});
});

//-----------------------------------

