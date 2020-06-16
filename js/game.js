var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game-world');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('level1', level1State);
game.state.add('level2', level2State);
game.state.add('gameover', gameoverState);

game.global = {
   score: 0,
   lives: 3,
   maxLives: 5
};

game.state.start('boot');
