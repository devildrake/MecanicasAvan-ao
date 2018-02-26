var definatelyNotPong = definatelyNotPong || {};

definatelyNotPong.BarrierPrefab = function(game,x,y,level){

	if(x<300){
	   Phaser.Sprite.call(this,game,x,y,"Barrier");
    
    }
    else{
        Phaser.Sprite.call(this,game,x,y,"Barrier2");
        
    }
    this.scale.setTo(2);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.Alive = true;
    
    this.Health=5;
}

definatelyNotPong.BarrierPrefab.prototype = Object.create(Phaser.Sprite.prototype);

definatelyNotPong.BarrierPrefab.prototype.constructor = definatelyNotPong.BarrierPrefab;

definatelyNotPong.BarrierPrefab.prototype.update = function(){    
    if(this.Health>=0){
        this.Alive=false;
    }
}