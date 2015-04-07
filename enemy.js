var enemy = function()
{
	this.image = document.createElement("img");
	
	this.x = canvas.width/1.5;
	this.y = canvas.height/2;
	
	this.width = 159;
	this.height = 163;
	
	this.velocityX = 0;
	this.velocityY = 0;
	
	this.angularVelocity = 0;
	
	this.rotation = 0;
	
	this.image.src = "dragon.png";
};

Player.prototype.update = function(deltaTime)
{
	this.rotation -= deltaTime;
}
Player.prototype.draw = function()
{
	context.save();
		context.translate(this.x, this.y);
		context.rotate(this.rotation);
		context.drawImage(this.image, -this.width/2, -this.height/2);
	
	context.restore();
}