var definatelyNotPong = definatelyNotPong || {};

definatelyNotPong.BallPrefab = function(game,x,y,level){

	Phaser.Sprite.call(this,game,100,100,"Ball");    
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.Alive = true;
    
    /*this.body.velocity.x=0;
    this.body.velocity.y=0;
    this.body.position.x=200;
    this.body.position.y=500;*/
   
   
}


definatelyNotPong.BallPrefab.prototype = Object.create(Phaser.Sprite.prototype);

definatelyNotPong.BallPrefab.prototype.constructor = definatelyNotPong.BallPrefab;

definatelyNotPong.BallPrefab.prototype.update = function(){
        /*this.game.physics.arcade.overlap(this,,
        function(){
                        
                    
        } );
    
    if(this.position.y<=0){
        
        definatelyNotPong.BallPrefab.setVelocity(this.body.velocity.x,-this.body.velocity.y);
    }
    
    if(this.position.y>=definatelyNotPong.game.gameWidth){
        
        definatelyNotPong.BallPrefab.setVelocity(this.body.velocity.x,-this.body.velocity.y);
    }
    
    this.position.x-=this.body.velocity.x;
     this.position.y-=this.body.velocity.y;*/
}

definatelyNotPong.BallPrefab.setVelocity = function(x,y){
    
    this.velocityX=x;
    this.velocityY=y;
    
}