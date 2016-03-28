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

End Hide
*/

cx.beginPath();
//Parts of a line hook: center=(50,50) radius=40 angle=0 to 7
cx.arc(50,50,40,0,7);
//Parts a circle: center=(150,50) radius=40 angle=0 to 0.5 * PI
cx.arc(150,50,40,0,0.5 * Math.PI);
cx.stroke();