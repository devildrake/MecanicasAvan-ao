var definatelyNotPong = definatelyNotPong || {};

definatelyNotPong.BarrierPrefab = function(game,x,y,level){

	if(x<300){
	   Phaser.Sprite.call(this,game,x,y,"Barrier");
    
    }
    else{
        Phaser.Sprite.call(this,game,x,y,"Barrier2");
    }
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.Alive = true;
    
    this.Health = 6;
    this.maxHealth = this.Health;
    this.isTinted = false;
}

definatelyNotPong.BarrierPrefab.prototype = Object.create(Phaser.Sprite.prototype);

definatelyNotPong.BarrierPrefab.prototype.constructor = definatelyNotPong.BarrierPrefab;

definatelyNotPong.BarrierPrefab.prototype.update = function(){    
    if(this.Health<=0){
        this.Alive=false;
		this.level.barrierDestroyed.play();
        this.destroy();
    }
	if(this.Health == 1){
		this.tint = "0x000000"
	}
    else if(this.Health <= this.maxHealth/2){
        this.tint = "0x5f5f5f";
        this.isTinted = true;
    }
}