/**
 * A single level of the game.
 * You will need multiple copies of this for each level you
 * want to include.
 * Make sure they have different file names and different state names.
 * level2State etc will work fine
 */
var level2State = {

   create: function() {
     let b = game.add.image(0, 0, "background");
     b.scale.setTo(800/3000, 600/3000);

     platform = game.add.group();

     platform.enableBody = true;

     ground = platform.create(0, game.world.height - 64, "platform");

     ground.scale.setTo(50, 2);

     platform.create(400, 400, "platform");

     let p = platform.create(0, 300, "platform");
     p.scale.setTo(350/400, 27/32);

     platform.setAll("body.immovable", true);

     player = game.add.sprite(32, game.world.height - 150, "exterminator");

     game.physics.arcade.enable(player);

     player.body.gravity.y = 300;
     player.body.bounce.y = 0.2;
     player.body.collideWorldBounds = true;

     player.animations.add('left', [0], 10, true);
     player.animations.add('right', [2], 10, true);

     heart = game.add.image(game.world.width - 20, 20, "heart");
     heart.anchor.setTo(1, 0);
     heart.width = game.global.lives / game.global.maxLives * 200;
     cursors = game.input.keyboard.createCursorKeys();

     bugsprays = game.add.group();
     bugsprays.enableBody = true;

for (let i = 0; i < 12; i++) {
  bugspray = bugsprays.create(i * 70, -22, "bugspray");
  bugspray.body.gravity.y = 6;

  bugspray.body.bounce.y = 0.7 + Math.random() * 0.3;
}
     baddie = game.add.sprite(600, game.world.height - 250, "ant");
     game.physics.arcade.enable(baddie);
     baddie.body.gravity.y = 300;
     baddie.body.bounce.y = 0.2;
     baddie.body.collideWorldBounds = true;
     baddie.animations.add('left', [0], 10, true);
     baddie.animations.add('right', [2], 10, true);

     scoreText = game.add.text(16, 16, "Score: " + game.global.score, {
       fontSize: '32px',
       fill: '#000'
     });
   },

   update: function() {

     hitPlatform = game.physics.arcade.collide(player, platform);
     game.physics.arcade.collide(baddie, platform);
     //game.physics.arcade.overlap(player, baddie, this.hitBaddie);
     game.physics.arcade.collide(bugsprays, platform);
     game.physics.arcade.overlap(player, bugsprays, this.collectBugspray);

     if (cursors.left.isDown) {

       player.body.velocity.x = -150;
       //player.animations.play('left');
       player.frame = 0;
     } else if (cursors.right.isDown) {

       player.body.velocity.x = 150;
       //player.animations.play('right');
       player.frame = 2;
     } else {

       player.body.velocity.x = 0;
       player.animations.stop();
     }
     if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
       player.body.velocity.y = -350;
     }
     var distance = player.x - baddie.x;
     if (distance < 0 && distance > -100 && baddie.x > 400) {
       baddie.body.velocity.x = -100;
       //baddie.animations.play("left");
       baddie.frame = 0;
     } else if (distance > 0 && distance < 100 && baddie.x < game.world.width) {
       baddie.body.velocity.x = 100;
       //baddie.animations.play("right");
       baddie.frame = 2;
     } else {
       baddie.body.velocity.x = 0;
     }
   },

   removeLives: function(lives) {
  game.global.lives -= lives;
  if (game.global.lives <= 0) {
    game.state.start("gameover");
  } else {
    heart.width = game.global.lives / game.global.maxLives * 200;
  }
},

   hitBaddie: function(player, baddie) {
     if (player.body.touching.right) {
       player.x -= 32;
     } else if (player.body.touching.left) {
       player.x += 32;
     } else {
       player.body.velocity.y = -350;
     }
     level1State.removeLives(1);
   },

   collectBugspray: function(player, bugspray) {

  game.global.score += 10;

  scoreText.text = "Score: " + game.global.score;

  bugspray.kill();
  if (bugsprays.countLiving() == 0) {

    game.time.events.add(1000, () => {
      game.state.start("level2")
    });
  }
},
 };
