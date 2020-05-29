/**
 * Displays a game menu
 * use game.state.start('level1') to go level1State
 */
var menuState = {
   create: function() {
      // create the scene
  background = game.add.image(0, 0, "background");
  background.scale.setTo(800/132,600/132);
  button = game.add.button(game.world.centerX, game.world.centerY, 'button');
  button.anchor.setTo(0.5, 0.5);
  button.onInputUp.add(this.startGame);
  var text = game.add.text(button.x, button.y, 'Start Game');
  text.anchor.setTo(0.5, 0.5);
},


startGame: function() {
 game.global.score = 0;
 game.global.lives = game.global.maxLives;
 game.state.start("level1");

},
};
