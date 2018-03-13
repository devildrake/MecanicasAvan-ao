var definatelyNotPong = definatelyNotPong || {};

var GameOptions = {
    gameWidth:800,
    gameHeight:540,
    ballBaseVelocity:new Phaser.Point(-40,20),
    score:new Phaser.Point(0,0),
	Unpause:function(level){
		definatelyNotPong.game.paused = false;
	}
};


definatelyNotPong.randomDataGen = new Phaser.RandomDataGenerator();
definatelyNotPong.game = new Phaser.Game(GameOptions.gameWidth,GameOptions.gameHeight,Phaser.AUTO, null, this, false, false);
definatelyNotPong.GetPowerUp=function(player,powerUp){
    player.powerUp = powerUp;
    //console.log(powerUp);
    
}
definatelyNotPong.game.state.add("scene", definatelyNotPong.scene);
definatelyNotPong.game.state.add("start", definatelyNotPong.start);
definatelyNotPong.game.state.start("start");
