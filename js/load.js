/**
 * Use this state to load all of your assets
 */
var loadState = {
   preload: function() {
      loadingLabel = game.add.text(80, 150, 'loading...', {
         font: '30px Courier',
         fill: '#ffffff'
      });
    game.load.image("bee", "assets/bee.png");
    game.load.image("ant", "assets/ant.png");
    game.load.image("snail", "assets/snail.png");
    game.load.image("exterminator", "assets/Exterminator.png", 32, 48);
    game.load.image("platform", "assets/platform.png");
    game.load.image("background", "assets/background.png");
    game.load.image("button", "assets/button.png");
    game.load.image("health box", "assets/health box.png");
    game.load.image("heart", "assets/heart.png");



          // load all assets
   },

   create: function() {
      game.state.start('menu');
   }

};
