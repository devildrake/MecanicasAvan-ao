var definatelyNotPong = definatelyNotPong || {};

definatelyNotPong.BarrierPrefab = function(game,x,y,level){

	Phaser.Sprite.call(this,game,x,y,"Barrier");    
    this.scale.setTo(3);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.Alive = true;
}


definatelyNotPong.BarrierPrefab.prototype = Object.create(Phaser.Sprite.prototype);

definatelyNotPong.BarrierPrefab.prototype.constructor = definatelyNotPong.BarrierPrefab;

definatelyNotPong.BarrierPrefab.prototype.update = function(){
        /*this.game.physics.arcade.overlap(this,,
        function(){
                        
                    
        } );*/
}