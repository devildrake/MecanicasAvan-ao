var definatelyNotPong = definatelyNotPong || {};

definatelyNotPong.BallPrefab = function(game,x,y,level){

	Phaser.Sprite.call(this,game,x,y,"Ball");    
    this.scale.setTo(.5);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.Alive = true;
    
    this.body.velocity.x=0;
    this.body.velocity.y=1;
    
   
   
}


definatelyNotPong.BallPrefab.prototype = Object.create(Phaser.Sprite.prototype);

definatelyNotPong.BallPrefab.prototype.constructor = definatelyNotPong.BallPrefab;

definatelyNotPong.BallPrefab.prototype.update = function(){
        /*this.game.physics.arcade.overlap(this,,
        function(){
                        
                    
        } );
    */
    
    if(this.position.y<=0+this.height/2){
        
        definatelyNotPong.BallPrefab.setVelocity(this,this.body.velocity.x,-this.body.velocity.y);
    }
    //aqui hay que poner el game height, no 540, pero por algun motivo me petaba
    else if(this.position.y>=540-this.height/2){
        
        definatelyNotPong.BallPrefab.setVelocity(this,this.body.velocity.x,-this.body.velocity.y);
    }
    
    this.position.x-=this.body.velocity.x;
     this.position.y-=this.body.velocity.y;
}

definatelyNotPong.BallPrefab.setVelocity = function(Object,x,y){
    
    Object.body.velocity.x=x;
    Object.body.velocity.y=y;
    
}