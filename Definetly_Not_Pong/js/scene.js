var definatelyNotPong = definatelyNotPong || {};

definatelyNotPong.scene = {
    preload:function(){
        this.game.stage.backgroundColor = "#7fb0ff";
        this.load.image("RedLaser","img/RedLaser.png");
        this.load.image("GreenLaser","img/GreenLaser.png");
        this.load.image("Barrier","img/Barrier.png");
        this.load.image("Barrier2","img/Barrier2.png");
        this.load.image("Nave","img/player.png");
        this.load.image("Nave2","img/player2.png");
        this.load.image("Ball","img/Ball.png");
		this.game.load.bitmapFont("game_font","font/game_font.png","font/game_font.fnt");
        this.loadProjectiles();
        this.loadBarriers();
    },
    
    inputs:function(){
        if(this.greenShotKey.isDown&&this.greenShotKey.downDuration(1)){
            this.createGreenProjectile(this.player1.body.position.x+40,this.player1.position.y);
        }
        
        if(this.redShotKey.isDown&&this.redShotKey.downDuration(1)){
            this.createRedProjectile(this.player2.body.position.x-5,this.player2.position.y);
        }
        if(!this.player2.dashing){
            if(this.cursors.down.isDown&&this.player2.position.y<GameOptions.gameHeight-this.player2.height/2){
                if(this.player2.slow){
                    this.player2.body.velocity.y = (+this.player2.velocity*0.5);
                }else{
                    this.player2.body.velocity.y = (+this.player2.velocity);
                }
                
            }else if(this.cursors.up.isDown&&this.player2.position.y>this.player2.height){
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
                
            }else if(this.moveUpKey.isDown&&this.player1.position.y>this.player1.height){
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
        
        if(this.greenDashKey.isDown&&this.player2.dashCoolDown){
            if(this.player2.body.velocity.y>0){
                this.player2.body.velocity.y*=3;
                this.player2.dashCoolDown=false;
                this.player2.dashing=true;
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.5,definatelyNotPong.CharPrefab.SetNotDashing, this.level,this.player2);
                    this.game.time.events.add(Phaser.Timer.SECOND * 1.5,definatelyNotPong.CharPrefab.ResetCoolDownDash, this.level,this.player2);

            }else if(this.player2.body.velocity.y<0){
                    this.player2.dashCoolDown=false;
                    this.player2.dashing=true;
                    this.player2.body.velocity.y*=3;
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.5,definatelyNotPong.CharPrefab.SetNotDashing, this.level,this.player2);
                    this.game.time.events.add(Phaser.Timer.SECOND * 1.5,definatelyNotPong.CharPrefab.ResetCoolDownDash, this.level,this.player2);


            }

        }
        
        if(this.redDashKey.isDown&&this.player1.dashCoolDown){
            if(this.player1.body.velocity.y>0){
                this.player1.dashCoolDown=false;
                this.player1.body.velocity.y*=3;
                this.player1.dashing=true;
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.5,definatelyNotPong.CharPrefab.SetNotDashing, this.level,this.player1);
                    this.game.time.events.add(Phaser.Timer.SECOND * 1.5,definatelyNotPong.CharPrefab.ResetCoolDownDash, this.level,this.player1);

            }else if(this.player1.body.velocity.y<0){
                this.player1.body.velocity.y*=3;
                this.player1.dashing=true;
                this.player1.dashCoolDown=false;
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.5,definatelyNotPong.CharPrefab.SetNotDashing, this.level,this.player1);
                    this.game.time.events.add(Phaser.Timer.SECOND * 1.5,definatelyNotPong.CharPrefab.ResetCoolDownDash, this.level,this.player1);
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
        this.greenDashKey = this.game.input.keyboard.addKey(Phaser.Keyboard.INSERT);
        this.redDashKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

        //añadir la pelota al juego    
        this.ball = new definatelyNotPong.BallPrefab(this.game,300,100,this);
        this.game.add.existing(this.ball);

        //añadir jugadores
        this.player1 = new definatelyNotPong.CharPrefab(this.game,20,100);
        this.game.add.existing(this.player1);    

        this.player2 = new definatelyNotPong.CharPrefab(this.game,780,100);
        this.game.add.existing(this.player2); 

        this.createGreenBarrier(100,100);    
        this.createGreenBarrier(100,250);    
        this.createGreenBarrier(100,425);    

        this.createRedBarrier(700,100);    
        this.createRedBarrier(700,250);    
        this.createRedBarrier(700,425);
		
		this.scoreLeft = definatelyNotPong.game.add.bitmapText(GameOptions.gameWidth/10, 30, "game_font",""+GameOptions.score.x,50);
		this.scoreLeft.anchor.setTo(.5);
		this.scoreRight = definatelyNotPong.game.add.bitmapText(GameOptions.gameWidth/10*9,30,"game_font",""+GameOptions.score.y,50);
		this.scoreRight.anchor.setTo(.5);
        
        /*    //añadir barreras player 1   
    this.barrier1 = new definatelyNotPong.BarrierPrefab(this.game,100,100);
    this.game.add.existing(this.barrier1);
    
    this.barrier2 = new definatelyNotPong.BarrierPrefab(this.game,100,250);
    this.game.add.existing(this.barrier2);    
        
    this.barrier3 = new definatelyNotPong.BarrierPrefab(this.game,100,425);
    this.game.add.existing(this.barrier3);      
        
    //añadir barreras player 2  
    this.barrier4 = new definatelyNotPong.BarrierPrefab(this.game,700,100);
    this.game.add.existing(this.barrier4);
    
    this.barrier5 = new definatelyNotPong.BarrierPrefab(this.game,700,250);
    this.game.add.existing(this.barrier5);    
        
    this.barrier6 = new definatelyNotPong.BarrierPrefab(this.game,700,425);
    this.game.add.existing(this.barrier6); */
        


    },
    
    update:function(){
        this.inputs();
        
        this.game.physics.arcade.overlap(this.redProjectiles, this.greenBarriers, function(l,o){
			o.kill();
            l.Health--;
		});
        
        this.game.physics.arcade.overlap(this.greenProjectiles, this.redBarriers, function(l,o){
			o.kill();
            l.Health--;
		});
        /*
        //Collide projectiles with the ball
        this.game.physics.arcade.overlap(this.ball, this.greenProjectiles, function(ball, projectile ){
            //var collisionVec = new Phaser.Point(ball.body.x - projectile.body.x, ball.body.y - projectile.body.y);
            //console.log(collisionVec);
            //collisionVec.normalize();
            //ball.body.velocity.x -= collisionVec.x;
            //ball.body.velocity.y -= collisionVec.y;
			projectile.kill();
		});
        
        this.game.physics.arcade.overlap(this.redProjectiles, this.ball, function(l,o){
			o.kill();
		});
		*/
        //collide barreras-------------
        this.game.physics.arcade.overlap(this.ball, this.greenBarriers, function(l,o){
			o.kill();
            l.body.velocity.x*=-1;
            
		});
        this.game.physics.arcade.overlap(this.ball, this.redBarriers, function(l,o){
			o.kill();
            l.body.velocity.x*=-1;
            
		});
        //collide players with ball
        this.game.physics.arcade.overlap(this.ball, this.player1, function(l,o){
			o.stun=true;
            l.body.velocity.x*=-1;
            
		});
        this.game.physics.arcade.overlap(this.ball, this.player2, function(l,o){
			o.stun=true;
            l.body.velocity.x*=-1;
            
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
        
        //collide red
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
    
        console.log("Bruh");
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
            projectile.reset(posX+8,posY+8);
            console.log("Reset");
            projectile.body.velocity.x=-150;
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
            projectile.reset(posX+8,posY+8);
            projectile.body.velocity.x=150;
        }
    },
    
    UpdateScore:function(){
		this.scoreLeft.text = ""+GameOptions.score.x;
		this.scoreRight.text = ""+GameOptions.score.y;
	}
}