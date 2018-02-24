var definatelyNotPong = definatelyNotPong || {};

definatelyNotPong.BallPrefab = function(game,x,y,level){

	//Phaser.Sprite.call(this,game,x,y,"Ball");    
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.Alive = true;
    
    this.velocityX=0;
    this.velocityY=0;
}


definatelyNotPong.BallPrefab.prototype = Object.create(Phaser.Sprite.prototype);

definatelyNotPong.BallPrefab.prototype.constructor = definatelyNotPong.BallPrefab;

definatelyNotPong.BallPrefab.prototype.update = function(){
        /*this.game.physics.arcade.overlap(this,,
        function(){
                        
                    
        } );*/
    
    if(this.position.x<=0){
        
        definatelyNotPong.BallPrefab.setVelocity(this.position.x,-this.position.y);
    }
    
    if(this.position.x>=definatelyNotPong.game.gameWidth){
        
        definatelyNotPong.BallPrefab.setVelocity(this.position.x,-this.position.y);
    }
}

definatelyNotPong.BallPrefab.setVelocity = function(x,y){
    
    this.velocityX=x;
    this.velocityY=y;
    
}