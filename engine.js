var frame = 0;
fps = 60;
var canvas = document.getElementById("canvas");
var g = canvas.getContext("2d");
g.font = "30px Arial";
var keys = [{}];
var mouseB = [{}];
var mouseX = 0;
var mouseY = 0;

var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 400;
Object.freeze(SCREEN_WIDTH);
Object.freeze(SCREEN_HEIGHT);

var running = false;

var backgroundColor;

// Input functions

onmousemove = function(event) {
	mouseX = event.clientX - canvas.getBoundingClientRect().left;
	mouseY = event.clientY - canvas.getBoundingClientRect().top;
	if (running)
		mousemove(mouseX, mouseY);
}

onkeydown = function(event) {
	keys[String.fromCharCode(event.keyCode)] = true;
}

onkeyup = function(event) {
	keys[String.fromCharCode(event.keyCode)] = false;
}

onmousedown = function(event) {
	mouseB[event.which] = true;
	if (running)
		mousedown(event.which);
}

onmouseup = function(event) {
	mouseB[event.which] = false;
	if (running)
		mouseup(event.which);
}

onscroll = function(event) {

}

// Functions to be overriden

draw = function() {}

init = function() {}

mousemove = function(x,y) {}

mousedown = function(button) {}

mouseup = function(button) {}

// Graphics

clearScreen = function() {
	color = backgroundColor;
	g.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
	g.fillRect(0,0,canvas.getBoundingClientRect().right, 
		canvas.getBoundingClientRect().bottom);
}

fillRect = function(x,y,width,height,color) {
	g.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
	g.fillRect(x,y,width,height);
}

drawText = function(x,y,string,color) {
	g.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
	g.fillText(string,x,y);
}

Color = function(r,g,b,a) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}

Color.BLACK = new Color(0,0,0,255);
Color.DARK_GRAY = new Color(50,50,50,255);
Color.GRAY = new Color(120,120,120,255);
Color.LIGHT_GRAY = new Color(200,200,200,255);
Color.WHITE = new Color(255,255,255,255);
Color.RED = new Color(255,0,0,255);
Color.GREEN = new Color(0,255,0,255);
Color.BLUE = new Color(0,0,255,255);
Color.YELLOW = new Color(255,255,0,255);
Color.CYAN = new Color(0,255,255,255);
Color.MAGENTA = new Color(255,0,255,255);

backgroundColor = new Color(0,0,0,255);

var flashFrame = false;
var showFPS = false;
var oldTime = new Date().getTime();

// Game loop
run = function() {
	newTime = new Date().getTime();
	if (newTime - oldTime > 1000) {
		oldTime = newTime;
		fps = frame;
		frame = 0;
	}
	frame++;
	if (running) {
		clearScreen();
		try {
			draw();
			flashFrame = !flashFrame;
		} catch (e) {
			running = false;
			sudoPrintln(e);
		}
		if (showFPS)
			drawText(3,SCREEN_HEIGHT-3,fps,Color.YELLOW);
	}
};

intervalId = setInterval(run, 1000 / fps);