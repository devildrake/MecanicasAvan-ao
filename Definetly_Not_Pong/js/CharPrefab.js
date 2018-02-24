var definetlyNotPong = definetlyNotPong || {};

definetlyNotPong.CharPrefab = function(game,x,y,level){

	//Phaser.Sprite.call(this,game,x,y,"Nave");    
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.Alive = true;
}


definetlyNotPong.CharPrefab.prototype = Object.create(Phaser.Sprite.prototype);

definetlyNotPong.CharPrefab.prototype.constructor = definetlyNotPong.CharPrefab;

definetlyNotPong.CharPrefab.prototype.update = function(){
        /*this.game.physics.arcade.overlap(this,,
        function(){
                        
                    
        } );*/
}