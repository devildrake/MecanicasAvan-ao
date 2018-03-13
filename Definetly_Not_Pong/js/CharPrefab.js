var definatelyNotPong = definatelyNotPong || {};

definatelyNotPong.CharPrefab = function(game,x,y,level){

	if(x<100){
	   Phaser.Sprite.call(this,game,x,y,"Nave");
    
    }
    else{
        Phaser.Sprite.call(this,game,x,y,"Nave2");
        
    }
    this.dashing=false;
    //this.scale.setTo(.3);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.Alive = true;
    this.velocity=250;
    this.dashCoolDown=true;
    this.powerUp;
    this.stun=false;
    this.countdown1=0;
    this.countdown2=0;
    this.slow=false;
    this.canShot=true;
}


definatelyNotPong.CharPrefab.prototype = Object.create(Phaser.Sprite.prototype);

definatelyNotPong.CharPrefab.prototype.constructor = definatelyNotPong.CharPrefab;

definatelyNotPong.CharPrefab.prototype.update = function(){
    if(this.stun){
        this.countdown1+=1;
        this.body.immovable =true;
        this.body.moves=false;
        console.log("stunned");
        //es una forma cutre pero es la mas efectiva que he encontrado
        //cambiar el numero para aumentar o disminuir el tiempo de stun
        if(this.countdown1>=150){
            this.body.immovable =false;
            this.body.moves=true;
            this.countdown1=0;
            this.stun=false;  
        }
    }    
      
	if(this.slow){  
		this.countdown2+=1;
		//es una forma cutre pero es la mas efectiva que he encontrado
		//cambiar el numero para aumentar o disminuir el tiempo de slow
		if(this.countdown2>=70){
			this.countdown2=0;
			this.slow=false;  
		}
	}
	
    if(this.position.y < 0){
		this.position.y = 0;
	}
	else if(this.position.y > GameOptions.gameHeight){
		this.position.y = GameOptions.gameHeight;
	}
}



definatelyNotPong.CharPrefab.SetNotDashing = function(aPlayer){
    aPlayer.dashing=false;
}

definatelyNotPong.CharPrefab.ResetCoolDownDash = function(aPlayer){
    aPlayer.dashCoolDown=true;
}