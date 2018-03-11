var definatelyNotPong = definatelyNotPong || {};


definatelyNotPong.SlowEnemyPowerUp = function(owningPlayer,otherPlayer){
    this.owningPlayer = owningPlayer;
    this.otherPlayer = otherPlayer;
}

definatelyNotPong.SlowEnemyPowerUp.prototype.constructor = definatelyNotPong.SlowEnemyPowerUp;

definatelyNotPong.SlowEnemyPowerUp.USE = function(player){
        player.slow = true;
    }
    
