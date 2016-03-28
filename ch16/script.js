var cx = document.querySelector("canvas").getContext("2d");

/* Hide Start

//draw two rectangles
cx.strokeStyle = "blue";
cx.strokeRect(5,5,50,50);
cx.lineWidth = 5;
cx.strokeRect(135,5,50,50);

//draw some lines
cx.beginPath();
for (var y=70; y <130; y += 10){
	cx.moveTo(10,y);
	cx.lineTo(90,y);
}
cx.stroke();

//draw triangle
cx.beginPath();
cx.moveTo(50,10);
cx.lineTo(10,70);
cx.lineTo(90,70);
cx.fill();

//draw star trek type symbol
cx.beginPath();
cx.moveTo(10,90);
//Parts of quadratic curve: control=(60,10) goal=(90,90)
cx.quadraticCurveTo(60,10,90,90);
cx.lineTo(60,10);
cx.closePath();
cx.stroke();

//draw pointy pants
cx.beginPath();
cx.moveTo(10,90);
//Parts of bezier curve: control1=(10,10) control2=(90,10) goal=(50,90)
cx.bezierCurveTo(5,10,90,10,50,90);
cx.lineTo(90,10);
cx.lineTo(10,10);
cx.closePath();
cx.stroke();

//draw arcs
cx.beginPath();
cx.moveTo(10,10);
//Parts of an arc: control=(90,10) goal=(90,90) radius=20
cx.arcTo(90,10,90,90,20);
cx.moveTo(10,10);
//Parts of an arc 2: control=(90,10) goal=(90,90) radius=80
cx.arcTo(90,10,90,90,80);
cx.stroke();

cx.beginPath();
//Parts of a line hook: center=(50,50) radius=40 angle=0 to 7
cx.arc(50,50,40,0,7);
//Parts a circle: center=(150,50) radius=40 angle=0 to 0.5 * PI
cx.arc(150,50,40,0,0.5 * Math.PI);
cx.stroke();

//Draw a Pie Chart with labels
var results = [
	{name: "Satisfied", count: 1043, color: "lightblue"},
	{name: "Neutral", count: 563, color: "lightgreen"},
	{name: "Unsatisfied", count: 510, color: "pink"},
	{name: "No Comment", count: 175, color: "silver"}
];

var total = results.reduce(function(sum,choice){
	return sum + choice.count;
},0);

//Start at the top of the circle
var currentAngle = -0.5 * Math.PI;
results.forEach(function(result){
	var sliceAngle = (result.count / total) * 2 * Math.PI;
	cx.beginPath();
	//Circle details: center=(100,100) radius=100
	//from current angle, clockwise by slice's angle
	cx.arc(200,100,100,currentAngle, currentAngle + sliceAngle);
	currentAngle += sliceAngle;
	cx.lineTo(200,100);
	cx.fillStyle = result.color;
	cx.fill();
});

cx.font = "14px Georgia";
cx.fillStyle = "fuchsia";
cx.fillText(results[0].name, 280, 50);
cx.fillText(results[1].name, 120, 200);
cx.fillText(results[2].name, 28, 75);
cx.fillText(results[3].name, 80, 12);

//draw an image dashing to the right
var img = document.createElement("img");
img.src = "img/dog.png";
img.addEventListener("load", function(){
	for (var x=10; x<200; x+=30)
		cx.drawImage(img, x, 10);
});

End Hide
*/

var img = document.createElement("img");
img.src = "img/player.png";
var spriteW = 24, spriteH = 30;
img.addEventListener("load", function(){
	var cycle = 0;
	setInterval(function() {
		cx.clearRect(0,0,spriteW,spriteH);
		cx.drawImage(img,
			//source rectangle
			cycle * spriteW, 0, spriteW, spriteH,
			//destination rectangle
			0, 0, spriteW, spriteH);
		cycle = (cycle + 1) % 8;
		console.log(cycle);
	}, 120);
});
