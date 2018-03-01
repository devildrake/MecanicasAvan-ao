var definatelyNotPong = definatelyNotPong || {};

definatelyNotPong.BallPrefab = function(game,x,y,level){

	Phaser.Sprite.call(this,game,x,y,"Ball");
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.Alive = true;
    
    this.body.velocity.x=GameOptions.ballBaseVelocity.x;
    this.body.velocity.y=GameOptions.ballBaseVelocity.y;
    
   
   
}


definatelyNotPong.BallPrefab.prototype = Object.create(Phaser.Sprite.prototype);

definatelyNotPong.BallPrefab.prototype.constructor = definatelyNotPong.BallPrefab;

definatelyNotPong.BallPrefab.prototype.update = function(){
    //RESET DE LA POSICION CUANDO SE MARCA UN PUNTO E INCREMENTO DEL MARCADOR
    if(this.position.x < -25){
        this.position.x = GameOptions.gameWidth/2 + GameOptions.gameWidth/6;
		this.position.y = 40 + (Math.random() * GameOptions.gameHeight) - 20;
        definatelyNotPong.BallPrefab.setVelocity(this, GameOptions.ballBaseVelocity.x, GameOptions.ballBaseVelocity.y);
		GameOptions.score.y++;
		this.level.UpdateScore();
    }else if(this.position.x > GameOptions.gameWidth + 25){
        this.position.x = GameOptions.gameWidth/2 - GameOptions.gameWidth/6;
		this.position.y = 40 + (Math.random() * GameOptions.gameHeight) - 20;
        definatelyNotPong.BallPrefab.setVelocity(this, -GameOptions.ballBaseVelocity.x, GameOptions.ballBaseVelocity.y);
		GameOptions.score.x++;
		this.level.UpdateScore();
    }
    
    if(this.position.y<=0+this.height/2){
		this.position.y = this.height/2 + 5;
		this.body.velocity.y = Math.abs(this.body.velocity.y);
    }
    //aqui hay que poner el game height, no 540, pero por algun motivo me petaba
    else if(this.position.y>=GameOptions.gameHeight-this.height/2){
		this.position.y = GameOptions.gameHeight-this.height/2 - 5;
		this.body.velocity.y = Math.abs(this.body.velocity.y) * -1;
    }
}

definatelyNotPong.BallPrefab.setVelocity = function(Object,x,y){
    Object.body.velocity.x=x;
    Object.body.velocity.y=y;
    
}