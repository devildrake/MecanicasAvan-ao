var definatelyNotPong = definatelyNotPong || {};

var GameOptions = {
    gameWidth:800,
    gameHeight:540
};

definatelyNotPong.game = new Phaser.Game(GameOptions.gameWidth,GameOptions.gameHeight,Phaser.AUTO, null, this, false, false);
definatelyNotPong.game.state.add("scene", definatelyNotPong.scene);
definatelyNotPong.game.state.start("scene");