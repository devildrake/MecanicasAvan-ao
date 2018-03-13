var definatelyNotPong = definatelyNotPong || {};

definatelyNotPong.start = {
	preload:function(){
		this.game.stage.backgroundColor = "#9d9d9d";
		this.load.image("Barrier","img/Barrier.png");
        this.load.image("Barrier2","img/Barrier2.png");
        this.load.image("Nave","img/player.png");
        this.load.image("Nave2","img/player2.png");
		
		this.game.load.bitmapFont("game_font","font/game_font.png","font/game_font.fnt");
	},
	create:function(){
		this.OK1 = false;
		this.OK2 = false;
		
		this.player1 = this.game.add.sprite(20,100, "Nave");
		this.player1.anchor.setTo(.5);
		this.player2 = this.game.add.sprite(GameOptions.gameWidth-20,100, "Nave2");
		this.player2.anchor.setTo(.5);
		
		this.numberOfBarriers = 5;
        for(var i = 0; i<this.numberOfBarriers; i++){
			this.game.add.sprite(100,GameOptions.gameHeight/(this.numberOfBarriers+1) * (i+1),"Barrier").anchor.setTo(.5);
			this.game.add.sprite(700,GameOptions.gameHeight/(this.numberOfBarriers+1) *(i+1),"Barrier2").anchor.setTo(.5);
        }
		
		this.scoreLeft = definatelyNotPong.game.add.bitmapText(GameOptions.gameWidth/10*3, 30, "game_font",""+GameOptions.score.x,50);
		this.scoreLeft.anchor.setTo(.5);
		this.scoreRight = definatelyNotPong.game.add.bitmapText(GameOptions.gameWidth/10*7,30,"game_font",""+GameOptions.score.y,50);
		this.scoreRight.anchor.setTo(.5);
		
		this.text = this.game.add.bitmapText(GameOptions.gameWidth/2,GameOptions.gameHeight/2-100,"game_font","PARTIDO A 10 PUNTOS",40).anchor.setTo(.5);
		this.text2 = this.game.add.bitmapText(GameOptions.gameWidth/2,GameOptions.gameHeight/2+50,"game_font","  Pulsar la tecla de\ndisparar para continuar",30).anchor.setTo(.5);
		this.text2.align = "center";
		
		this.textGreenOK = this.game.add.bitmapText(20,GameOptions.gameHeight-50,"game_font","READY",20);
		this.textRedOK = this.game.add.bitmapText(GameOptions.gameWidth-120,GameOptions.gameHeight-50,"game_font","READY",20);
		
	},
	update:function(){
		this.redOK = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.greenOK = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
		
		if(this.redOK.isDown){
			this.textRedOK.alpha = 1;
			this.OK1 = true;
		}else{
			this.textRedOK.alpha = 0;
			this.OK1 = false;
		}
		if(this.greenOK.isDown){
			this.textGreenOK.alpha = 1;
			this.OK2 = true;
		}else{
			this.textGreenOK.alpha = 0;
			this.OK2 = false;
		}
		
		if(this.OK1 && this.OK2){
			this.game.state.start("scene");
		}
	}
}