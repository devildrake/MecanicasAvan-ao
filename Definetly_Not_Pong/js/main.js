var definetlyNotPong = definetlyNotPong || {};

var GameOptions = {
    gameWidth:800,
    gameHeight:540
};

definetlyNotPong.game = new Phaser.Game(GameOptions.gameWidth,GameOptions.gameHeight,Phaser.AUTO, null, this, false, false);
definetlyNotPong.game.state.add("scene", definetlyNotPong.scene);
definetlyNotPong.game.state.start("scene");