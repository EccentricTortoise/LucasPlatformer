var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame
function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

		// Find the delta time (dt) - the change in time since the last drawFrame
		// We need to modify the delta time to something we can use.
		// We want 1 to represent 1 second, so if the delta is in milliseconds
		// we divide it by 1000 (or multiply by 0.001). This will make our 
		// animations appear at the right speed, though we may need to use
		// some large values to get objects movement and rotation correct
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
		// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}

//-------------------- Don't modify anything above here

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var keyboard = new Keyboard();
var player = new Player();
var enemy = new Enemy();

// some variables to calculate the Frames Per Second (FPS - this tells use
// how fast our game is running, and allows us to make the game run at a 
// constant speed)
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;

var LAYER_COUNT = 3;
var MAP = { tw:60, th:15};
var TILE = 35;
var TILESET_TILE = 70;
var TILESET_PADDING = 2;
var TILESET_SPACING = 2;
var TILESET_COUNT_X = 14;
var TILESET_COUNT_Y = 14;

var tileset = document.createElement("img");
tileset.src = "tileset.png";

function drawMap()
{
	//this loops over all the layers in our tilemap
	for(var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++ )
	{
		//render everything in the current layer (layerIdx)
		//look at every tile in the layer in turn and render them
		
		var idx = 0;
		//look at each row
		for ( var y = 0 ; y < level1.layers[layerIdx].height ; ++y )
		{
			//look at each tile in the row
			for ( var x = 0 ; x < level1.layers[layerIdx].width ; ++x )
			{
				var tileIndex = level1.layers[layerIdx].data[idx] - 1;
				
				//if there's actually a tile here
				if ( tileIndex != -1 )
				{
					//draw the current tile at the current location
					
					//where in the tilemap is the current tile?
					//where in the world should the current tile go?
					
					//source x in the tileset
					var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * 
										(TILESET_TILE + TILESET_SPACING);
							
					//source y in the tileset		
					var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_Y)) * 
												(TILESET_TILE + TILESET_SPACING);
					
					//destination x on the canvas
					var dx = x * TILE;
					//destination y on the canvas
					var dy = (y-17) * TILE;
					
					context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE,
												dx, dy, TILESET_TILE, TILESET_TILE);
				}
				++idx;
			}
		}
	}
}

function run()
{
	context.fillStyle = "#8ebbeb";		
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	var deltaTime = getDeltaTime();
	
	//context.drawImage(chuckNorris, SCREEN_WIDTH/2 - chuckNorris.width/2, SCREEN_HEIGHT/2 - chuckNorris.height/2);
	player.update(deltaTime);
	player.draw();
		
	// update the frame counter 
	fpsTime += deltaTime;
	fpsCount++;
	if(fpsTime >= 1)
	{
		fpsTime -= 1;
		fps = fpsCount;
		fpsCount = 0;
	}		
		
	// draw the FPS
	context.fillStyle = "#f00";
	context.font="14px Arial";
	context.fillText("FPS: " + fps, 5, 20, 100);
}

var cells = [];
function initialize() {
	for ( var layeridx = 0; layeridx < LAYER_COUNT; ++layeridx )
	{
		for ( var y = 0 ; y < level1.layers[layeridx].height ; ++y)
		{
			
			cells[layeridx][y] = [];
			
			for ( var x = 0 ; x < level1.layers[layeridx].width ; ++x)
			{
				if ( level1.layers[layerIdx].data[idx] != 0 )
				{
					cells[layerIdx][y][x] = 1;
					cells[layerIdx][y][x+1] = 1;
					cells[layerIdx][y-1][x+1] = 1;
					cells[layerIdx][y-1][x] = 1;
				}
				
				else if (cells[layerIdx][y][x] !=0 )
				{
					cells[layerIdx][y][x] = 0;
				}
				
				++idx;
			}
		}
	}
}

//-------------------- Don't modify anything below here


// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.
(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
