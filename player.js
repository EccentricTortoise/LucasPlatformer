var Player = function() {
	this.image = document.createElement("img");
	
	//this.x = canvas.width/2;
	//this.y = canvas.height/2;
	
	this.position = new Vector2();
	this.position.set(canvas.width/4, canvas.height/1.5);
	
	this.width = 159;
	this.height = 163;
	
	this.velocity = new Vector2();
	
	this.angularVelocity = 0;
	
	this.rotation = 0;
	
	this.image.src = "hero.png";
};

Player.prototype.update = function(deltaTime)
{
	var acceleration = new Vector2();
	var playerAccel = 1000;
	var playerDrag = 20;
	var playerGravity = TILE * 9.8 * 6;
	
	if ( keyboard .isKeyDown(keyboard.KEY_LEFT) )
	{
		acceleration.x -= playerAccel;
	}
	if ( keyboard .isKeyDown(keyboard.KEY_RIGHT) )
	{
		acceleration.x += playerAccel;
	}	
	if ( keyboard .isKeyDown(keyboard.KEY_UP) )
	{
		acceleration.y -= playerAccel;
	}
	if ( keyboard .isKeyDown(keyboard.KEY_DOWN) )
	{
		acceleration.y += playerAccel;
	}
	
	//acceleration = acceleration.subtract(this.velocity.multiply.Scalar(playerDrag));
	
	this.velocity = this.velocity.add(acceleration.multiplyScalar(deltaTime));
	this.position = this.position.add(this.velocity.multiplyScalar(deltaTime));
		
	
	//var tx = pixelToTile(this.position.x);
	//var ty = pixelToTile(this.position.y);

	//var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
	//var cell_right = cellAtTileCoord(LAYER_PLATFORMS, tx+1, ty);
	//var cell_down = cellAtTileCoord(LAYER_PLATFORMS, tx, ty+1);
	//var cell_diag = cellAtTileCoord(LAYER_PLATFORMS, tx+1, ty+1);
	
	
	
	
}
Player.prototype.draw = function()
{
	context.save();
		context.translate(this.position.x, this.position.y);
		context.rotate(this.rotation);
		context.drawImage(this.image, -this.width/2, -this.height/2);
	
	context.restore();
}