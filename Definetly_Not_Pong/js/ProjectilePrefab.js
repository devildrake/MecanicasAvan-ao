var definatelyNotPong = definatelyNotPong || {};


definatelyNotPong.ProjectilePrefab = function(game,x,y,level){
var speed = 150;

if(x<100){
	Phaser.Sprite.call(this,game,x,y,"GreenLaser");
    	this.game.physics.arcade.enable(this);
        this.body.velocity.x = speed;

}
else{
    Phaser.Sprite.call(this,game,x,y,"RedLaser");
    	this.game.physics.arcade.enable(this);
                this.body.velocity.x = -speed;

}

    this.Alive = true;
    this.scale.setTo(1);
    this.anchor.setTo(.5);
}

definatelyNotPong.ProjectilePrefab.prototype = Object.create(Phaser.Sprite.prototype);

definatelyNotPong.ProjectilePrefab.prototype.constructor = definatelyNotPong.ProjectilePrefab;

definatelyNotPong.ProjectilePrefab.prototype.update = function(){
    
}