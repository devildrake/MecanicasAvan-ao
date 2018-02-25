var definatelyNotPong = definatelyNotPong || {};

definatelyNotPong.scene = {
    preload:function(){
        this.game.stage.backgroundColor = "#ffffff";
        this.load.image("RedLaser","img/RedLaser.png");
        this.load.image("GreenLaser","img/GreenLaser.png");
         this.load.image("Barrier","img/Barrier.png");
         this.load.image("Nave","img/player.png");
         this.load.image("Ball","img/Ball.png");
        this.loadProjectiles();
        
    },
    
    inputs:function(){
        if(this.greenShotKey.isDown&&this.greenShotKey.downDuration(1)){
            //INSERTAR POSICIÓN PERSONAJES
            this.createGreenProjectile(80,20);
        }
        
        if(this.redShotKey.isDown&&this.redShotKey.downDuration(1)){
            this.createRedProjectile(440,20);
        }
    },
    
    create:function(){
        //this.oktorok = new definatelyNotPong.ProjectilePrefab(this.game,80,20);
        //this.game.add.existing(this.oktorok);

        
    this.cursors = this.game.input.keyboard.createCursorKeys();
	this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);        
    this.redShotKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.greenShotKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.redPowerUpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.greenPowerUpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        
    this.ball = new definatelyNotPong.BallPrefab(this.game,100,100);
    this.ball.enableBody=true;
        //this.ball.x=
        
    },
    
    update:function(){
        this.inputs();
        //this.ball.update();
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
            projectile = new definatelyNotPong.ProjectilePrefab(this.game,posX,posY);
            this.redProjectiles.add(projectile);
        }else{
            particles.Alive = true;
            particles.reset(posX+8,posY+8);
        }
    },
        
    createGreenProjectile:function(posX,posY){
        var projectile = this.greenProjectiles.getFirstExists(false);
        if(!projectile){
            projectile = new definatelyNotPong.ProjectilePrefab(this.game,posX,posY);
            this.greenProjectiles.add(projectile);
        }else{
            particles.Alive = true;
            particles.reset(posX+8,posY+8);
        }
    }
    
    
    
    
    
}