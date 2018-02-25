var definatelyNotPong = definatelyNotPong || {};

definatelyNotPong.CharPrefab = function(game,x,y,level){

	Phaser.Sprite.call(this,game,x,y,"Nave");    
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.Alive = true;
}


definatelyNotPong.CharPrefab.prototype = Object.create(Phaser.Sprite.prototype);

definatelyNotPong.CharPrefab.prototype.constructor = definatelyNotPong.CharPrefab;

definatelyNotPong.CharPrefab.prototype.update = function(){
        /*this.game.physics.arcade.overlap(this,,
        function(){
                        
                    
        } );*/
}