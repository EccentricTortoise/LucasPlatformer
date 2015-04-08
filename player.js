var Player = function() {
	this.image = document.createElement("img");
	
	//this.x = canvas.width/2;
	//this.y = canvas.height/2;
	
	this.pos = new Vector2();
	this.pos.set(canvas.width/2, canvas.height/2);
	
	this.width = 159;
	this.height = 163;
	
	//this.dis = new Vector2();
	//this.dis.set(159, 163);
	
	//this.velocityX = 0;
	//this.velocityY = 0;
	
	this.vel = new Vector2();
	
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
	this.velocity = this.velocity.add(this.velocity.multiplyScalar(deltaTime));
	
}
Player.prototype.draw = function()
{
	context.save();
		context.translate(this.posittion.x, this.position.y);
		context.rotate(this.rotation);
		context.drawImage(this.image, -this.width/2, -this.height/2);
	
	context.restore();
}