var definetlyNotPong = definetlyNotPong || {};

definetlyNotPong.BallPrefab = function(game,x,y,level){

	//Phaser.Sprite.call(this,game,x,y,"llave");    
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.Alive = true;
}


definetlyNotPong.BallPrefab.prototype = Object.create(Phaser.Sprite.prototype);

definetlyNotPong.BallPrefab.prototype.constructor = definetlyNotPong.BallPrefab;

definetlyNotPong.BallPrefab.prototype.update = function(){
        /*this.game.physics.arcade.overlap(this,,
        function(){
                        
                    
        } );*/
}