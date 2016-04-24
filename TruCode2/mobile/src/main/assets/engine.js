
importPackage(java.lang)

var frame = 0;
fps = 30;
var g = function(){}
g.font = "30px Arial";
var keys = [{}];
var mouseB = [{}];
var mouseX = 0;
var mouseY = 0;

var enableClear = true;

var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 400;
Object.freeze(SCREEN_WIDTH);
Object.freeze(SCREEN_HEIGHT);

var running = false;

var backgroundColor;

// Functions to be overriden

draw = function() {}

init = function() {}

mousemove = function(x,y) {}

mousedown = function(button) {}

mouseup = function(button) {}

// Graphics

clearScreen = function() {
}

fillRect = function(x,y,width,height,color) {
}

drawText = function(x,y,string,color) {
}

Color = function(r,g,b,a) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}

Button = function(x,y,width,height,background,text,color,callback) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.background = background;
	this.text = text;
	this.color = color;
	this.draw = function() {
		fillRect(this.x,this.y,this.width,this.height,background);
		drawText(x,y,text,color);
		if (this.isClicked()) {
			callback();
		}
	}
	this.isClicked = function() {
		if (mouseB[0]) {
			if (mouseX >= x && mouseY >= y && mouseX < x + width && mouseY < y + height) {
				return true;
			}
		}
		return false;
	}
}

CheckBox = function(x,y) {
	this.x = x;
	this.y = y;
	this.width = 16;
	this.height = 16;
	this.padding = 2;
	this.checked = false;
	this.background = Color.DARK_GRAY;
	this.uncheckedColor = Color.BLACK;
	this.checkedColor = Color.LIGHT_GRAY;
	this.callback = function(checked){};
	this.isWasMouseClicked = false;
	this.draw = function() {
		if (mouseB[0]) {
			if (!isWasMouseClicked) {
				if (mouseX >= x && mouseY >= y && mouseX < x + width && mouseY < y + height) {
					checked = !checked;
				}
			}
			isWasMouseClicked = true;
		}
		fillRect(x,y,width,height,background);
		fillRect(x+padding,y+padding,width-padding*2,height-padding*2,checked?checkedColor:uncheckedColor);
	}
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
		if (enableClear)
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

println = function(string) {
	System.out.println('>>> ' + string);
}

sudoPrintln = function(string) {
	System.out.println(string);
}

clearPrint = function() {
}

runcode = function(script) {
	try {
		var document = undefined;
		var window = undefined;
		var setInterval = undefined;
		eval("var eval = undefined;" + script);
		sudoPrintln("Running...");
		init();
	} catch (e) {
		sudoPrintln(e);
		return;
	}
	running = false;
	clearScreen();
	pausecode();
}
pausecode = function() {
	running = !running;
	if (running) {
		document.getElementById("buttonPause").innerHTML = "Pause";
	} else {
		document.getElementById("buttonPause").innerHTML = "Play";
	}
}

// Returns a random number between 0 (inclusive) and 1 (exclusive)
function getRandom() {
  return Math.random();
}

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Enum(constantsList) {
    for (var i in constantsList) {
        this[constantsList[i]] = i;
    }
}


