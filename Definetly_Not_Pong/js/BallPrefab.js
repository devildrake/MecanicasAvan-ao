var definetlyNotPong = definetlyNotPong || {};

definetlyNotPong.BallPrefab = function(game,x,y,level){

	//Phaser.Sprite.call(this,game,x,y,"Ball");    
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.Alive = true;
    
    this.velocityX=0;
    this.velocityY=0;
}


definetlyNotPong.BallPrefab.prototype = Object.create(Phaser.Sprite.prototype);

definetlyNotPong.BallPrefab.prototype.constructor = definetlyNotPong.BallPrefab;

definetlyNotPong.BallPrefab.prototype.update = function(){
        /*this.game.physics.arcade.overlap(this,,
        function(){
                        
                    
        } );*/
    
    if(this.position.x<=0){
        
        definetlyNotPong.BallPrefab.setVelocity(this.position.x,-this.position.y);
    }
    
    if(this.position.x>=definetlyNotPong.game.gameWidth){
        
        definetlyNotPong.BallPrefab.setVelocity(this.position.x,-this.position.y);
    }
}

definetlyNotPong.BallPrefab.setVelocity = function(x,y){
    
    this.velocityX=x;
    this.velocityY=y;
    
}