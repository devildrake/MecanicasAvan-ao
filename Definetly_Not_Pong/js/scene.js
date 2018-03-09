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
        this.load.spritesheet("Stun_Feedback", "img/stun_feedback.png",64,64);
        this.load.spritesheet("Slow_Feedback", "img/slow_feedback.png",64,64);
		this.game.load.bitmapFont("game_font","font/game_font.png","font/game_font.fnt");
        this.loadProjectiles();
        this.loadBarriers();
    },
    
    inputs:function(){
        if(this.greenShotKey.isDown&&this.greenShotKey.downDuration(1) && !this.greenShot){
            this.createGreenProjectile(this.player1.body.position.x+5,this.player1.position.y);
			this.greenShot = true;
        }
        
        if(this.redShotKey.isDown&&this.redShotKey.downDuration(1) && !this.redShot){
            this.createRedProjectile(this.player2.body.position.x-5,this.player2.position.y);
			this.redShot = true;
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
        
        //GREEN DASH
        if((this.greenDashKey1.isDown || this.greenDashKey2.isDown) &&this.player2.dashCoolDown){
            if(this.player2.body.velocity.y>0){
                this.player2.body.velocity.y*=this.dashSpeedMultiplier;
                this.player2.dashCoolDown=false;
                this.player2.dashing=true;
                this.game.time.events.add(Phaser.Timer.SECOND * this.dashTime,definatelyNotPong.CharPrefab.SetNotDashing, this.level,this.player2);
                this.game.time.events.add(Phaser.Timer.SECOND * this.dashCD,definatelyNotPong.CharPrefab.ResetCoolDownDash, this.level,this.player2);

            }else if(this.player2.body.velocity.y<0){
                this.player2.dashCoolDown=false;
                this.player2.dashing=true;
                this.player2.body.velocity.y*=this.dashSpeedMultiplier;
                this.game.time.events.add(Phaser.Timer.SECOND * this.dashTime,definatelyNotPong.CharPrefab.SetNotDashing, this.level,this.player2);
                this.game.time.events.add(Phaser.Timer.SECOND * this.dashCD,definatelyNotPong.CharPrefab.ResetCoolDownDash, this.level,this.player2);


            }

        }
        
        //RED DASH
        if(this.redDashKey.isDown&&this.player1.dashCoolDown){
            if(this.player1.body.velocity.y>0){
                this.player1.dashCoolDown=false;
                this.player1.body.velocity.y*=this.dashSpeedMultiplier;
                this.player1.dashing=true;
                this.game.time.events.add(Phaser.Timer.SECOND * this.dashTime,definatelyNotPong.CharPrefab.SetNotDashing, this.level,this.player1);
                this.game.time.events.add(Phaser.Timer.SECOND * this.dashCD,definatelyNotPong.CharPrefab.ResetCoolDownDash, this.level,this.player1);

            }else if(this.player1.body.velocity.y<0){
                this.player1.body.velocity.y*=this.dashSpeedMultiplier;
                this.player1.dashing=true;
                this.player1.dashCoolDown=false;
                this.game.time.events.add(Phaser.Timer.SECOND * this.dashTime,definatelyNotPong.CharPrefab.SetNotDashing, this.level,this.player1);
                this.game.time.events.add(Phaser.Timer.SECOND * this.dashCD,definatelyNotPong.CharPrefab.ResetCoolDownDash, this.level,this.player1);
            }
        }
        
        if(this.redPowerUpKey.isDown&&this.player2.powerUp!=undefined){
            this.player2.powerUp.USE();
        }
        
                
        if(this.greenPowerUpKey.isDown&&this.player1.powerUp!=undefined){
            this.player2.powerUp.USE();
        }
        
    },
    
    create:function(){        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);        
        this.redShotKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.greenShotKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.redPowerUpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.greenPowerUpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.moveUpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.moveDownKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.greenDashKey1 = this.game.input.keyboard.addKey(Phaser.Keyboard.INSERT);
		this.greenDashKey2 = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0);
        this.redDashKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
		
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

        this.numberOfBarriers = 5;
        for(var i = 0; i<this.numberOfBarriers; i++){
            this.createGreenBarrier(100,GameOptions.gameHeight/(this.numberOfBarriers+1) * (i+1));
            this.createRedBarrier(700,GameOptions.gameHeight/(this.numberOfBarriers+1) *(i+1));
        }
        
        //======================================UI================================
        //======================================UI================================
        //======================================UI================================
        //======================================UI================================
        
        this.scoreLeft = definatelyNotPong.game.add.bitmapText(GameOptions.gameWidth/10, 30, "game_font",""+GameOptions.score.x,50);
		this.scoreLeft.anchor.setTo(.5);
		this.scoreRight = definatelyNotPong.game.add.bitmapText(GameOptions.gameWidth/10*9,30,"game_font",""+GameOptions.score.y,50);
		this.scoreRight.anchor.setTo(.5);
        
        this.greenStunUI = this.game.add.sprite(80,GameOptions.gameHeight-30,"Stun_Feedback",1);
        this.greenStunUI.anchor.setTo(.5);
        this.greenStunUI.scale.setTo(0.8);
        this.greenStunUI.alpha = 0.5;
        this.greenSlowUI = this.game.add.sprite(140,GameOptions.gameHeight-30, "Slow_Feedback",1);
        this.greenSlowUI.anchor.setTo(.5);
        this.greenSlowUI.scale.setTo(0.8);
        this.greenSlowUI.alpha = 0.5;
        
        this.redStunUI = this.game.add.sprite(GameOptions.gameWidth-80, GameOptions.gameHeight-30, "Stun_Feedback",1);
        this.redStunUI.anchor.setTo(.5);
        this.redStunUI.scale.setTo(0.8);
        this.redStunUI.alpha = 0.5;
        this.redSlowUI = this.game.add.sprite(GameOptions.gameWidth-140, GameOptions.gameHeight-30, "Slow_Feedback",1);
        this.redSlowUI.anchor.setTo(.5);
        this.redSlowUI.scale.setTo(0.8);
        this.redSlowUI.alpha = 0.5;
        
        
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
        
        
        this.game.physics.arcade.overlap(this.redProjectiles, this.greenBarriers, function(o,l){
			o.kill();
            l.Health--;
            console.log(l);
		});
        
        this.game.physics.arcade.overlap(this.greenProjectiles, this.redBarriers, function(o,l){
			o.kill();
            l.Health--;
		});
        
        //collide barreras con la pelota
        this.game.physics.arcade.overlap(this.ball, this.greenBarriers, function(l,o){
			//o.kill();
            l.body.velocity.x = Math.abs(l.body.velocity.x);
		});
        this.game.physics.arcade.overlap(this.ball, this.redBarriers, function(l,o){
			//o.kill();
            l.body.velocity.x = Math.abs(l.body.velocity.x) * -1;
            
		});
		
        //collide players with ball
        this.game.physics.arcade.overlap(this.ball, this.player1, function(ball,player){
			player.stun=true;
            ball.body.velocity.x = Math.abs(ball.body.velocity.x);
            
		});
        this.game.physics.arcade.overlap(this.ball, this.player2, function(ball,player){
			player.stun=true;
            ball.body.velocity.x =  Math.abs(ball.body.velocity.x) * -1;
            
		});
        
        //collide players with bullet
        this.game.physics.arcade.overlap(this.redProjectiles, this.player1, function(l,o){
			o.kill();
            l.slow=true;
		});
        this.game.physics.arcade.overlap(this.greenProjectiles, this.player2, function(l,o){
			o.kill();
            l.slow=true;
		});
        
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