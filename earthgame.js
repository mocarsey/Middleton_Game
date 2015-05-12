/*var mocanvas = document.createElement('canvas');
ctx = $('#bgcanvas')[0].getContext("2d");

document.body.appendChild(mocanvas);

*/

//library
var ctx = $('#bgcanvas')[0].getContext("2d");
var x = 25;
var y = 250;
var dx = 1.5;
var dy = -4;
var WIDTH;
var HEIGHT;
var paddlex;
var paddleh = 10;
var paddlew = 75;
var rightDown = false;
var leftDown = false;
var upDown = false;
var downDown = false;
var canvasMinX = 0;
var canvasMaxX = 0;
// var bricks=[i];
var NROWS = 5;
var NCOLS = 8;
// var BRICKWIDTH defined as global in initbricks;
var BRICKHEIGHT = 20;
var PADDING = 1;
var intervalId = 0;
var ballr = 10;
var rowcolors = ["#331313", "#331313", "#0f5a08", "#009647", "#009647"];
var paddlecolor = "#009647";
var ballcolor = "#009647";
var backcolor = "#64bae7";
var score = 0;
/*var sound = new Howl({
  urls: ['CarryOn-Kansas.mp3']
}).play();*/

function init() {
	WIDTH = $('#bgcanvas').width();	
	HEIGHT = $('#bgcanvas').height();
	paddlex = WIDTH/2;
	canvasMinX = $("#bgcanvas").offset().left;
	canvasMaxX = canvasMinX + WIDTH;
	intervalId = setInterval(draw, 10);
	
}
/*
function initbricks() {
window.alert ("initbricks");
	var bricks = new Array(NROWS);
	for (i=0; i < NROWS; i++){
		bricks[i] = new Array(NCOLS);
		for (j=0; j < NCOLS; j++) {
			bricks[i][j] = 1;
		}
	}
}
*/
function initbricks() {
  BRICKWIDTH = (WIDTH/NCOLS) - 1;
	bricks = new Array(NROWS);
	for (i=0; i < NROWS; i++) {
		bricks[i] = new Array(NCOLS);
		for (j=0; j < NCOLS; j++) {
		bricks[i][j] = 1;
		}
	}
}

function drawbricks(){
		for (i=0; i < NROWS; i++) {
			ctx.fillStyle = rowcolors[i];
			for (j=0; j < NCOLS; j++){
				if (bricks[i][j] == 1){
					rect((j*(BRICKWIDTH + PADDING)) + PADDING,
						(i*(BRICKHEIGHT + PADDING)) + PADDING,
						BRICKWIDTH, BRICKHEIGHT);
				}
			}
		}
}

function circle(x,y,r) {
	
	ctx.beginPath();
	ctx.arc(x,y,r,0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
}

function rect(x,y,w,h) {
	ctx.beginPath();
	ctx.rect(x,y,w,h);
	ctx.closePath();
	ctx.fill();
}

function clear() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	rect(0,0,WIDTH,HEIGHT);
}

function onKeyDown(evt) {
	if (evt.keyCode == 39) rightDown = true;
	else if (evt.keyCode == 37) leftDown = true;
	else if (evt.keyCode == 38) upDown = true;
	else if (evt.keyCode == 40) downDown = true;
	}
	
function onKeyUp(evt) {
	if (evt.keyCode == 39) rightDown = false;
	else if (evt.keyCode == 37) leftDown = false;
	else if (evt.keyCode == 38) upDown = false;
	else if (evt.keyCode == 40) downDown = false;
	}
	
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

function onMouseMove(evt) {
	if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX){
		paddlex = evt.pageX - canvasMinX - (paddlew/2);}
	}

$(document).mousemove(onMouseMove);

function winner() {
	if (score >= 40){
		window.alert("You've collected the EARTH STAFF!");
	}
}

//end library

function draw() {
	ctx.fillStyle = backcolor;
	clear();
	ctx.fillStyle = ballcolor;
	circle(x, y, ballr);
	
	rowheight = BRICKHEIGHT + PADDING;
	colwidth = BRICKWIDTH + PADDING;
	row = Math.floor(y/rowheight);
	col = Math.floor(x/colwidth);
	
	if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1){
		dy = -dy;
		bricks[row][col] = 0;
		++score;
	}
	
	if (rightDown) paddlex += 5;
	else if (leftDown) paddlex -= 5;
	else if (upDown) paddlex += 5;
	else if (downDown) paddlex -= 5;
	ctx.fillStyle = paddlecolor;
	rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
	
	drawbricks();
	
	if (x + dx > WIDTH || x + dx < 0)
		dx= -dx;
	if (y + dy < 0)
		dy= -dy;
	else if (y + dy > HEIGHT) {
		if (x > paddlex && x < paddlex + paddlew)
			dy = -dy;
		else
			clearInterval(intervalId);
			}

	x += dx;
	y += dy;
	
//ctx.fillStyle = "#FFFFFF"
ctx.font = "20px Century Gothic";
ctx.textAlign = "left";
ctx.fillText("Score:" + score, 20, 380);
winner();


}



init();	
initbricks();
