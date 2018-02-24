var definetlyNotPong = definetlyNotPong || {};

definetlyNotPong.BarrierPrefab = function(game,x,y,level){

	//Phaser.Sprite.call(this,game,x,y,"Barrier");    
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.Alive = true;
}


definetlyNotPong.BarrierPrefab.prototype = Object.create(Phaser.Sprite.prototype);

definetlyNotPong.BarrierPrefab.prototype.constructor = definetlyNotPong.BarrierPrefab;

definetlyNotPong.BarrierPrefab.prototype.update = function(){
        /*this.game.physics.arcade.overlap(this,,
        function(){
                        
                    
        } );*/
}