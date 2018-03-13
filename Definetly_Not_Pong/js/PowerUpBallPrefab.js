var definatelyNotPong = definatelyNotPong || {};


definatelyNotPong.PowerUpBallPrefab = function(game,x,y,level,lives){
	var speed = 250;

    Phaser.Sprite.call(this,game,x,y,"Ball");
    this.game.physics.arcade.enable(this);
    this.body.velocity.x = speed;
    this.type = 0; //type 0 proyectil verde
	
	this.Alive = true;
	this.scale.setTo(3);
	this.anchor.setTo(.5);
	//this.checkWorldBounds = true;
	//this.outOfBoundsKill = true;
	this.level = level;
    this.speed = 50;
    this.body.gravity.y = 0;
    this.threshold = 5;
	this.destroySoundPlayed = false;

    //this.goalPositionX = GameOptions.gameWidth/2;
    //this.goalPositionY = GameOptions.gameHeight/2;
    this.goal = new Phaser.Point(GameOptions.gameWidth/2,GameOptions.gameHeight/2)
    this.body.velocity.x = 0;
    this.knockBack = new Phaser.Point(0,0);
    this.lives=lives;
    
    var randomValue = definatelyNotPong.randomDataGen.between(0,2);
    
    switch(randomValue){
        case 0:
            this.powerUp = "Slow";
            break;
        case 1:
            this.powerUp = "Barrier";
            break;
        case 2:
            this.powerUp = "KameHame";
            break;
    }
    
}

definatelyNotPong.PowerUpBallPrefab.prototype = Object.create(Phaser.Sprite.prototype);

definatelyNotPong.PowerUpBallPrefab.prototype.constructor = definatelyNotPong.PowerUpBallPrefab;

/*       
SAMPLE DE CÓDIGO PARA METER EN ESCENA Y PROBAR
this.aquamentus = new definatelyNotPong.PowerUpBallPrefab(this.game,GameOptions.gameHeight/2+50,GameOptions.gameWidth/2,this,5,"none");
this.game.add.existing(this.aquamentus);
*/


definatelyNotPong.PowerUpBallPrefab.prototype.update = function(){
    var both = true;
    var desiredVelocity = new Phaser.Point(0,0);
    desiredVelocity.x = this.goal.x-this.position.x;
    desiredVelocity.y = this.goal.y-this.position.y;
    var magnitude = Math.sqrt(desiredVelocity.x*desiredVelocity.x+desiredVelocity.y*desiredVelocity.y);

    desiredVelocity.x/=magnitude;
    desiredVelocity.y/=magnitude;
    
    if(Math.abs(this.goal.x-this.position.x)>this.threshold){
        both=false;
        this.body.velocity.x = desiredVelocity.x * this.speed + this.knockBack.x;
    }else{
        this.body.velocity.x=0;
    }
        
    if(Math.abs(this.goal.y-this.position.y)>this.threshold){
        both=false;
        this.body.velocity.y = desiredVelocity.y * this.speed + this.knockBack.y;

    }else{
        this.body.velocity.y=0;
    }
    
    if(both){
        definatelyNotPong.PowerUpBallPrefab.UpdateGoal(this);
    }
    
    
    var knockBackMagnitude = Math.sqrt(this.knockBack.x*this.knockBack.x + this.knockBack.y * this.knockBack.y);
    if(this.knockBackMagnitude>2){
        this.knockBackMagnitude.x/=1.2;
        this.knockBackMagnitude.y/=1.2;

    }else{
        this.knockBack.x=0;
        this.knockBack.y=0;
    }
    
    this.game.physics.arcade.collide(this, this.level.greenProjectiles, function(ball, projectile){
        ball.knockBack.x = projectile.body.velocity.x/5;
        ball.knockBack.y = projectile.body.velocity.x/5 * definatelyNotPong.randomDataGen.between(-1,1);
        projectile.kill();
        ball.lives--;
        if(ball.lives<=0){
            definatelyNotPong.GetPowerUp(ball.level.player1,(ball.powerUp));
            ball.kill();
			if(!this.destroySoundPlayed){
				this.level.powerupTaken.play();
				this.destroySoundPlayed = true;
			}
        }
		this.level.laserHit.play();
    },null,this);
    
	this.game.physics.arcade.collide(this, this.level.redProjectiles, function(ball, projectile){
        //console.log("BRUH");
        ball.knockBack.x = projectile.body.velocity.x/5;
        ball.knockBack.y = projectile.body.velocity.x/5 * definatelyNotPong.randomDataGen.between(-1,1);

        projectile.kill();
                    ball.lives--;

        if(ball.lives<=0){
            definatelyNotPong.GetPowerUp(ball.level.player2,(ball.powerUp));
            ball.kill();
			if(!this.destroySoundPlayed){
				this.level.powerupTaken.play();
				this.destroySoundPlayed = true;
			}
        }
		this.level.laserHit.play();
    },null,this);
}



definatelyNotPong.PowerUpBallPrefab.UpdateGoal = function(obj){
        obj.goal.x = definatelyNotPong.randomDataGen.between(GameOptions.gameWidth/3,GameOptions.gameWidth/3*2);
        obj.goal.y = definatelyNotPong.randomDataGen.between(GameOptions.gameHeight,0);
}


definatelyNotPong.PowerUpBallPrefab.ReceiveKnockBack = function(obj,x,y){
    obj.knockBack.x = x;
    obj.knockBack.y = y;
}

