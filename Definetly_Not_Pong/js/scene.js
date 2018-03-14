var definatelyNotPong = definatelyNotPong || {};

definatelyNotPong.scene = {
    preload:function(){
        this.game.stage.backgroundColor = "#9d9d9d";
        this.load.image("RedLaser","img/RedLaser.png");
        this.load.image("GreenLaser","img/GreenLaser.png");
        this.load.image("Barrier","img/Barrier.png");
        this.load.image("Barrier2","img/Barrier2.png");
        this.load.image("Nave","img/player.png");
        this.load.image("Nave2","img/player2.png");
        this.load.image("Ball","img/Ball.png");
		this.load.image("Powerup_Rectangle", "img/powerup_square.png");
        this.load.image("Powerup", "img/powerup.png");
		
		this.load.spritesheet("Powerup_Selected_Feedback", "img/powerup_feedback.png",32,32);
        this.load.spritesheet("Stun_Feedback", "img/stun_feedback.png",64,64);
        this.load.spritesheet("Slow_Feedback", "img/slow_feedback.png",64,64);
		this.load.spritesheet("Dash_Cooldown", "img/dash_cooldown.png",64,64);
		
		this.game.load.bitmapFont("game_font","font/game_font.png","font/game_font.fnt");
		
		this.load.audio("Laser1", "sfx/laser1.mp3");
		this.load.audio("Laser2", "sfx/laser2.mp3");
		this.load.audio("BallHit", "sfx/ball_hit.mp3");
		this.load.audio("LaserHit", "sfx/laser_hit.mp3");
		this.load.audio("BarrierDestroyed", "sfx/barrier_destroyed.mp3");
		this.load.audio("Powerup_Taken", "sfx/powerup_taken.mp3");
		
        this.loadProjectiles();
        this.loadBarriers();
    },
    
    inputs:function(){
        if(this.greenShotKey.isDown&&this.greenShotKey.downDuration(1) && !this.greenShot && !this.greenHasBarrier){
            this.createGreenProjectile(this.player1.body.position.x+5,this.player1.position.y);
			this.greenShot = true;
			this.laser1.play();
        }
        
        if(this.redShotKey.isDown&&this.redShotKey.downDuration(1) && !this.redShot && !this.redHasBarrier){
            this.createRedProjectile(this.player2.body.position.x-5,this.player2.position.y);
			this.redShot = true;
			this.laser2.play();
        }
		
        if(!this.player2.dashing){
            if(this.cursors.down.isDown&&this.player2.position.y<GameOptions.gameHeight-this.player2.height/2){
                if(this.player2.slow){
                    this.player2.body.velocity.y = (+this.player2.velocity*0.5);
                }else{
                    this.player2.body.velocity.y = (+this.player2.velocity);
                }
                
            }else if(this.cursors.up.isDown&&this.player2.position.y>this.player2.height/2){
                 if(this.player2.slow){
                    this.player2.body.velocity.y = (-this.player2.velocity*0.5);
                }else{
                    this.player2.body.velocity.y = (-this.player2.velocity);
                }
            }else{
                this.player2.body.velocity.y = 0;
            }
        }else{
            if(this.player2.position.y>GameOptions.gameHeight-this.player2.height/2){
                this.player2.dashing=false;
            }else if(this.player2.position.y<this.player2.height){
                this.player2.dashing=false;
            }
        }
        
        if(!this.player1.dashing){
            if(this.moveDownKey.isDown&&this.player1.position.y<GameOptions.gameHeight-this.player1.height/2){
                if(this.player1.slow){
                    this.player1.body.velocity.y = (+this.player1.velocity*0.5);
                }else{
                    this.player1.body.velocity.y = (+this.player1.velocity);
                }
                
            }else if(this.moveUpKey.isDown&&this.player1.position.y>this.player1.height/2){
                if(this.player1.slow){
                    this.player1.body.velocity.y = (-this.player1.velocity*0.5);
                }else{
                    this.player1.body.velocity.y = (-this.player1.velocity);
                }
                
            }else{
                this.player1.body.velocity.y = 0;
            }
        }else{
            if(this.player1.position.y>GameOptions.gameHeight-this.player1.height/2){
                this.player1.dashing=false;
            }else if(this.player1.position.y<this.player1.height){
                this.player1.dashing=false;
            }
        }
        
        //REALMENTE ES EL RED DASH
        //REALMENTE ES EL RED DASH
        //REALMENTE ES EL RED DASH
        //REALMENTE ES EL RED DASH
        //REALMENTE ES EL RED DASH
        if((this.greenDashKey1.isDown || this.greenDashKey2.isDown) &&this.player2.dashCoolDown){
            if(this.player2.body.velocity.y>0){
                this.player2.body.velocity.y*=this.dashSpeedMultiplier;
                this.player2.dashCoolDown=false;
                this.player2.dashing=true;
				this.redDashCDUI.frame = 0;
				this.redDashCDUI.alpha = 1;
				this.game.time.events.add(Phaser.Timer.SECOND * this.dashCD/2,function(){
					this.redDashCDUI.frame = 1;
				},this);
				this.game.time.events.add(Phaser.Timer.SECOND * this.dashCD, function(){
					this.redDashCDUI.frame = 2;
					this.redDashCDUI.alpha = 0.5;
				},this);
				this.game.time.events.add(Phaser.Timer.SECOND * this.dashTime,definatelyNotPong.CharPrefab.SetNotDashing, this.level,this.player2);
                this.game.time.events.add(Phaser.Timer.SECOND * this.dashCD,definatelyNotPong.CharPrefab.ResetCoolDownDash, this.level,this.player2);
            }else if(this.player2.body.velocity.y<0){
                this.player2.dashCoolDown=false;
                this.player2.dashing=true;
                this.player2.body.velocity.y*=this.dashSpeedMultiplier;
                this.redDashCDUI.frame = 0;
				this.redDashCDUI.alpha = 1;
				this.game.time.events.add(Phaser.Timer.SECOND * this.dashCD/2,function(){
					this.redDashCDUI.frame = 1;
				},this);
				this.game.time.events.add(Phaser.Timer.SECOND * this.dashCD, function(){
					this.redDashCDUI.frame = 2;
					this.redDashCDUI.alpha = 0.5;
				},this);
				this.game.time.events.add(Phaser.Timer.SECOND * this.dashTime,definatelyNotPong.CharPrefab.SetNotDashing, this.level,this.player2);
                this.game.time.events.add(Phaser.Timer.SECOND * this.dashCD,definatelyNotPong.CharPrefab.ResetCoolDownDash, this.level,this.player2);
            }
        }
        
        //REALMENTE ES EL GREEN DASH
        //REALMENTE ES EL GREEN DASH
        //REALMENTE ES EL GREEN DASH
        //REALMENTE ES EL GREEN DASH
        if(this.redDashKey.isDown&&this.player1.dashCoolDown){
			this.greenDashCDUI.frame = 0;
			this.greenDashCDUI.alpha = 1;
			this.game.time.events.add(Phaser.Timer.SECOND * this.dashCD/2,function(){
					this.greenDashCDUI.frame = 1;
				},this);
				this.game.time.events.add(Phaser.Timer.SECOND * this.dashCD, function(){
					this.greenDashCDUI.frame = 2;
					this.greenDashCDUI.alpha = 0.5;
				},this);
				this.game.time.events.add(Phaser.Timer.SECOND * this.dashTime,definatelyNotPong.CharPrefab.SetNotDashing, this.level,this.player1);
                this.game.time.events.add(Phaser.Timer.SECOND * this.dashCD,definatelyNotPong.CharPrefab.ResetCoolDownDash, this.level,this.player1);
			
            if(this.player1.body.velocity.y>0){
                this.player1.dashCoolDown=false;
                this.player1.body.velocity.y*=this.dashSpeedMultiplier;
                this.player1.dashing=true;
            }else if(this.player1.body.velocity.y<0){
                this.player1.body.velocity.y*=this.dashSpeedMultiplier;
                this.player1.dashing=true;
                this.player1.dashCoolDown=false;
            }
        }
        
        if(this.redPowerUpKey.isDown&&this.player2.powerUp!=undefined){
            if(this.player2.powerUp == "Slow"){
                definatelyNotPong.SlowEnemyPowerUp.USE(this.player1);
                this.player2.powerUp=undefined;
            }

            else if(this.player2.powerUp == "Barrier"){
                this.createRedBarrier(this.player2.position.x-80,this.player2.position.y );
                this.barrieraux2.destroy();
                this.player2.powerUp=undefined;
            }
        }
                
        if(this.greenPowerUpKey.isDown&&this.player1.powerUp!=undefined){
            if(this.player1.powerUp == "Slow"){
                definatelyNotPong.SlowEnemyPowerUp.USE(this.player2);
                this.player2.powerUp=undefined;
            }
            
            else if(this.player1.powerUp == "Barrier"){
                this.createGreenBarrier(this.player1.position.x+80,this.player1.position.y );
                this.barrieraux1.destroy();
                this.player1.powerUp=undefined;
            }
        }
        
    },
    
    create:function(){        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);        
        this.redShotKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.greenShotKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.redPowerUpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.greenPowerUpKey =  this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.moveUpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.moveDownKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.greenDashKey1 = this.game.input.keyboard.addKey(Phaser.Keyboard.INSERT);
		this.greenDashKey2 = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0);
        this.redDashKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        this.restartKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
        
        this.redHasBarrier = false;
        this.greenHasBarrier = false;
        
		///////////////////////////////AÑADIR AUDIOS
		///////////////////////////////AÑADIR AUDIOS
		///////////////////////////////AÑADIR AUDIOS
		///////////////////////////////AÑADIR AUDIOS
		this.laser1 = this.game.add.audio("Laser1");
		this.laser1.volume = 0.6;
		this.laser2 = this.game.add.audio("Laser2");
		this.laser2.volume = 0.6;
		this.ballHit = this.game.add.audio("BallHit");
		this.ballHit.volume = 0.3;
		this.laserHit = this.game.add.audio("LaserHit");
		this.laserHit.volume = 0.5;
		this.barrierDestroyed = this.game.add.audio("BarrierDestroyed");
		this.powerupTaken = this.game.add.audio("Powerup_Taken");
		this.powerupTaken.volume = 0.5;
		
		this.redShot = false;
		this.greenShot = false;
		this.shootCD = 0.2;
		this.redCDTimer = 0;
		this.greenCDTimer = 0;
        
        this.dashTime = 0.1; //tiempo que dura el dash en segundos
        this.dashCD = 1; //cooldown del dash en segundos
        this.dashSpeedMultiplier = 5; //multiplicador de velocidad para el dash

        //añadir la pelota al juego    
        this.ball = new definatelyNotPong.BallPrefab(this.game,300,100,this);
        this.game.add.existing(this.ball);

        //añadir jugadores
        this.player1 = new definatelyNotPong.CharPrefab(this.game,20,100);
        this.game.add.existing(this.player1);    

        this.player2 = new definatelyNotPong.CharPrefab(this.game,780,100);
        this.game.add.existing(this.player2); 

		//Creacion de las barreras
        this.numberOfBarriers = 5;
        for(var i = 0; i<this.numberOfBarriers; i++){
            this.createGreenBarrier(100,GameOptions.gameHeight/(this.numberOfBarriers+1) * (i+1));
            this.createRedBarrier(700,GameOptions.gameHeight/(this.numberOfBarriers+1) *(i+1));
        }
        
        //======================================UI================================
        //======================================UI================================
        //======================================UI================================
        //======================================UI================================
        this.scoreLeft = definatelyNotPong.game.add.bitmapText(GameOptions.gameWidth/10*3, 30, "game_font",""+GameOptions.score.x,50);
		this.scoreLeft.anchor.setTo(.5);
		this.scoreRight = definatelyNotPong.game.add.bitmapText(GameOptions.gameWidth/10*7,30,"game_font",""+GameOptions.score.y,50);
		this.scoreRight.anchor.setTo(.5);
        
        this.greenStunUI = this.game.add.sprite(80,GameOptions.gameHeight-30,"Stun_Feedback",1);
        this.greenStunUI.anchor.setTo(.5);
        this.greenStunUI.scale.setTo(0.8);
        this.greenStunUI.alpha = 0.5;
        this.greenSlowUI = this.game.add.sprite(140,GameOptions.gameHeight-30, "Slow_Feedback",1);
        this.greenSlowUI.anchor.setTo(.5);
        this.greenSlowUI.scale.setTo(0.8);
        this.greenSlowUI.alpha = 0.5;
		this.greenDashCDUI = this.game.add.sprite(190, GameOptions.gameHeight-30,"Dash_Cooldown", 2);
		this.greenDashCDUI.anchor.setTo(.5);
		this.greenDashCDUI.scale.setTo(.8);
		this.greenDashCDUI.alpha = 0.5;
		this.greenPowerupRectangle = this.game.add.sprite(250,GameOptions.gameHeight-30,"Powerup_Rectangle");
		this.greenPowerupRectangle.anchor.setTo(.5);
		this.greenPowerupRectangle.scale.setTo(.8);
		this.greenPowerupRectangle.alpha = 0.5;
		this.greenPowerupSelected = this.game.add.sprite(250,GameOptions.gameHeight-30, "Powerup_Selected_Feedback",0);
		this.greenPowerupSelected.anchor.setTo(.5);
        
        this.redStunUI = this.game.add.sprite(GameOptions.gameWidth-80, GameOptions.gameHeight-30, "Stun_Feedback",1);
        this.redStunUI.anchor.setTo(.5);
        this.redStunUI.scale.setTo(0.8);
        this.redStunUI.alpha = 0.5;
        this.redSlowUI = this.game.add.sprite(GameOptions.gameWidth-140, GameOptions.gameHeight-30, "Slow_Feedback",1);
        this.redSlowUI.anchor.setTo(.5);
        this.redSlowUI.scale.setTo(0.8);
        this.redSlowUI.alpha = 0.5;
		this.redDashCDUI = this.game.add.sprite(GameOptions.gameWidth-190, GameOptions.gameHeight-30, "Dash_Cooldown", 2);
		this.redDashCDUI.anchor.setTo(.5);
		this.redDashCDUI.scale.setTo(.8);
		this.redDashCDUI.alpha = 0.5;
		this.redPowerupRectangle = this.game.add.sprite(GameOptions.gameWidth-250, GameOptions.gameHeight-30,"Powerup_Rectangle");
        this.redPowerupRectangle.anchor.setTo(.5);
		this.redPowerupRectangle.scale.setTo(.8);
		this.redPowerupRectangle.alpha = 0.5;
		this.redPowerupSelected = this.game.add.sprite(GameOptions.gameWidth-250, GameOptions.gameHeight-30, "Powerup_Selected_Feedback", 0);
		this.redPowerupSelected.anchor.setTo(.5);       
    },
    
    update:function(){
        this.inputs();
        
        //======================================UI================================
        //======================================UI================================
        //======================================UI================================
        //======================================UI================================
        //stun
        if(this.player1.stun){
            this.greenStunUI.frame = 0;
            this.greenStunUI.alpha = 1;
        }
        else{
            this.greenStunUI.frame = 1;
            this.greenStunUI.alpha = 0.5;
        }
        if(this.player2.stun){
            this.redStunUI.frame = 0;
            this.redStunUI.alpha = 1;
        }
        else{
            this.redStunUI.frame = 1;
            this.redStunUI.alpha = 0.5;
        }
        //slow
        if(this.player1.slow){
            this.greenSlowUI.frame = 0;
            this.greenSlowUI.alpha = 1;
        }
        else{
            this.greenSlowUI.frame = 1;
            this.greenSlowUI.alpha = 0.5;
        }
        if(this.player2.slow){
            this.redSlowUI.frame = 0;
            this.redSlowUI.alpha = 1;
        }
        else{
            this.redSlowUI.frame = 1;
            this.redSlowUI.alpha = 0.5;
        }
		//feedback de que powerup tienes cogido
		if(this.player1.powerUp == "Barrier"){
			this.greenPowerupSelected.frame = 2;
            this.greenHasBarrier = true;
		}
		else if(this.player1.powerUp == "Slow"){
			this.greenPowerupSelected.frame = 1;
            this.greenHasBarrier = false;
		}
		else{
			this.greenPowerupSelected.frame = 0;
            this.greenHasBarrier = false;
		}
		
		if(this.player2.powerUp == "Barrier"){
			this.redPowerupSelected.frame = 2;
            this.redHasBarrier = true;
		}
		else if(this.player2.powerUp == "Slow"){
			this.redPowerupSelected.frame = 1;
            this.redHasBarrier = false;
		}
		else{
			this.redPowerupSelected.frame = 0;
            this.redHasBarrier = false;
		}
		
        if(this.player1.powerUp == "Barrier"){
            if(this.barrieraux1){
                this.barrieraux1.position.x=this.player1.position.x+65
                this.barrieraux1.position.y=this.player1.position.y-27;
            }else{
                
                this.barrieraux1= this.game.add.sprite(this.player1.position.x+70,this.player1.position.y,"Barrier",0.1);
                this.barrieraux1.alpha=0.7;
            }
            
        }
        if(this.player2.powerUp == "Barrier"){
             if(this.barrieraux2){
                this.barrieraux2.position.x=this.player2.position.x-95;
                this.barrieraux2.position.y=this.player2.position.y-27;
            }else{
                
                this.barrieraux2= this.game.add.sprite(this.player2.position.x-95,this.player2.position.y-27,"Barrier2",1);
                this.barrieraux2.alpha=0.7;
            }
            
        }
        
        this.game.physics.arcade.overlap(this.redProjectiles, this.greenBarriers, function(o,l){
			o.kill();
            l.Health--;
            this.laserHit.play();
		},null,this);
        
        this.game.physics.arcade.overlap(this.greenProjectiles, this.redBarriers, function(o,l){
			o.kill();
            l.Health--;
			this.laserHit.play();
		},null, this);
        
        //collide barreras con la pelota
        this.game.physics.arcade.overlap(this.ball, this.greenBarriers, function(l,o){
            l.body.velocity.x = Math.abs(l.body.velocity.x);
			if(!this.ballHit.isPlaying){
				this.ballHit.play();
			}
		}, null, this);
        this.game.physics.arcade.overlap(this.ball, this.redBarriers, function(l,o){
            l.body.velocity.x = Math.abs(l.body.velocity.x) * -1;
            if(!this.ballHit.isPlaying){
				this.ballHit.play();
			}
		},null, this);
		
        //collide players with ball
        this.game.physics.arcade.overlap(this.ball, this.player1, function(ball,player){
			player.stun=true;
            ball.body.velocity.x = Math.abs(ball.body.velocity.x);
			if(!this.ballHit.isPlaying){
				this.ballHit.play();
			}
            
		},null,this);
        this.game.physics.arcade.overlap(this.ball, this.player2, function(ball,player){
			player.stun=true;
            ball.body.velocity.x =  Math.abs(ball.body.velocity.x) * -1;
			if(!this.ballHit.isPlaying){
				this.ballHit.play();
			}
            
		},null,this);
        
        //collide players with bullet
        this.game.physics.arcade.overlap(this.redProjectiles, this.player1, function(l,o){
			o.kill();
            l.slow=true;
			this.laserHit.play();
		},null, this);
        this.game.physics.arcade.overlap(this.greenProjectiles, this.player2, function(l,o){
			o.kill();
            l.slow=true;
			this.laserHit.play();
		}, null, this);
        
		//CONTROL DE LOS DISPAROS PARA QUE LOS HAGAN LIMITADAMENTE CON COOLDOWN
		//CONTROL DE LOS DISPAROS PARA QUE LOS HAGAN LIMITADAMENTE CON COOLDOWN
		//CONTROL DE LOS DISPAROS PARA QUE LOS HAGAN LIMITADAMENTE CON COOLDOWN
		if(this.greenShot){
			if(this.greenCDTimer <= this.shootCD){
				this.greenCDTimer += this.game.time.physicsElapsed;
			}else{
				this.greenShot = false;
				this.greenCDTimer = 0;
			}
		}
		if(this.redShot){
			if(this.redCDTimer <= this.shootCD){
				this.redCDTimer += this.game.time.physicsElapsed;
			}else{
				this.redShot = false;
				this.redCDTimer = 0;
			}
		}
        
        //CONDICIONES DE FINAL DE PARTIDA
        //CONDICIONES DE FINAL DE PARTIDA
        //CONDICIONES DE FINAL DE PARTIDA
        //CONDICIONES DE FINAL DE PARTIDA
        //CONDICIONES DE FINAL DE PARTIDA
        //CONDICIONES DE FINAL DE PARTIDA
        if(this.scoreLeft.text == "10"){
            console.log("GREEN PLAYER WINS");
            this.game.add.bitmapText(GameOptions.gameWidth/2, GameOptions.gameHeight/2-100,"game_font","VICTORIA DEL\nJUGADOR VERDE",55).anchor.setTo(.5);
            this.game.add.bitmapText(GameOptions.gameWidth/2, GameOptions.gameWidth/2,"game_font", "Pulsa R para volver a jugar", 20).anchor.setTo(.5);
            this.ball.destroy();
            if(this.restartKey.isDown){
                this.game.state.start("start");
            }
        }else if(this.scoreRight.text == "10"){
            console.log("RED PLAYER WINS");
            this.game.add.bitmapText(GameOptions.gameWidth/2, GameOptions.gameHeight/2-100,"game_font","VICTORIA DEL\nJUGADOR ROJO",55).anchor.setTo(.5);
            this.game.add.bitmapText(GameOptions.gameWidth/2, GameOptions.gameWidth/2,"game_font", "Pulsa R para volver a jugar", 20).anchor.setTo(.5);
            this.ball.destroy();
            if(this.restartKey.isDown){
                this.game.state.start("start");
            }
        }
		
    },
    
    CreatePowerup:function(){
        this.game.add.existing(new definatelyNotPong.PowerUpBallPrefab(this.game,GameOptions.gameWidth/2, 40,this,5));
    },
    
    createRedBarrier:function(posX,posY){
        var barrier = this.redBarriers.getFirstExists(false);
        if(!barrier){
            barrier = new definatelyNotPong.BarrierPrefab(this.game,posX,posY,this);
            this.redBarriers.add(barrier);
        }else{
            barrier.Alive = true;
            barrier.reset(posX+8,posY+8);
        }
    },
    
    
    createGreenBarrier:function(posX,posY){
        var barrier = this.greenBarriers.getFirstExists(false);
        if(!barrier){
            barrier = new definatelyNotPong.BarrierPrefab(this.game,posX,posY,this);
            this.greenBarriers.add(barrier);
        }else{
            barrier.Alive = true;
            barrier.reset(posX+8,posY+8);
        }
    },
    
    
    loadProjectiles:function(){
        this.redProjectiles = this.add.group();
        this.redProjectiles.enableBody = true;

        this.greenProjectiles = this.add.group();
        this.greenProjectiles.enableBody = true;

    },
    
    loadBarriers:function(){
    
        this.greenBarriers = this.add.group();
        this.greenBarriers.enableBody = true;
        
        this.redBarriers = this.add.group();
        this.redBarriers.enableBody = true;

    },
        
    createRedProjectile:function(posX,posY){
        var projectile = this.redProjectiles.getFirstExists(false);
        if(!projectile){
            projectile = new definatelyNotPong.ProjectilePrefab(this.game,posX,posY, this);
            this.redProjectiles.add(projectile);
        }else{
            projectile.Alive = true;
            projectile.reset(posX,posY);
            console.log("Reset");
            projectile.body.velocity.x=-definatelyNotPong.ProjectilePrefab.speed;
        }
    },
        
    createGreenProjectile:function(posX,posY){
        var projectile = this.greenProjectiles.getFirstExists(false);
        if(!projectile){
            projectile = new definatelyNotPong.ProjectilePrefab(this.game,posX,posY, this);
            this.greenProjectiles.add(projectile);
        }else{
            projectile.Alive = true;
            console.log("Reset");
            projectile.reset(posX,posY);
            projectile.body.velocity.x=definatelyNotPong.ProjectilePrefab.speed;
        }
    },
    
    UpdateScore:function(){
		this.scoreLeft.text = ""+GameOptions.score.x;
		this.scoreRight.text = ""+GameOptions.score.y;
	}
}