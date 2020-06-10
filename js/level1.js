/**
 * A single level of the game.
 * You will need multiple copies of this for each level you
 * want to include.
 * Make sure they have different file names and different state names.
 * level2State etc will work fine
 */
var level1State = {

   create: function() {
     let b = game.add.image(0, 0, "background");
     b.scale.setTo(800/3000, 600/3000);

     platform = game.add.group();

     platform.enableBody = true;

     ground = platform.create(0, game.world.height - 64, "platform");

     ground.scale.setTo(50, 2);

     let p = platform.create(400, 400, "platform");
     p.scale.setTo(8, 1);

     platform.create(-150, 250, "platform");
     let p1 = platform.create(150, 300, "platform");
     p1.scale.setTo(5, 1);

     platform.setAll("body.immovable", true);

     player = game.add.sprite(29, game.world.height - 100, "exterminator");
     player.scale.setTo(1, 1);

     game.physics.arcade.enable(player);

     player.body.gravity.y = 300;
     player.body.bounce.y = 0.2;
     player.body.collideWorldBounds = true;

     healthBar = game.add.image(game.world.width - 20, 20, "healthbar");
     healthBar.anchor.setTo(1, 0);
     healthBar.width = game.global.lives / game.global.maxLives * 200;
     cursors = game.input.keyboard.createCursorKeys();

     baddie = game.add.sprite(600, 250, "ant");
     game.physics.arcade.enable(baddie);
     baddie.body.gravity.y = 300;
     baddie.body.bounce.y = 0.2;
     baddie.body.collideWorldBounds = true;
     //baddie.animations.add('left', [0, 1], 10, true);
     //baddie.animations.add('right', [2, 3], 10, true);

     scoreText = game.add.text(16, 16, "Score: " + game.global.score, {
       fontSize: '32px',
       fill: '#000'
     });
   },

   update: function() {

     hitPlatform = game.physics.arcade.collide(player, platform);
     game.physics.arcade.collide(baddie, platform);
     game.physics.arcade.overlap(player, baddie, this.hitBaddie);

     if (cursors.left.isDown) {

       player.body.velocity.x = -150;
       player.animations.play('left');
     } else if (cursors.right.isDown) {
       player.scale.x = -1;

       player.body.velocity.x = 150;
       player.animations.play('right');
     } else {
       player.scale.x = 1;

       player.body.velocity.x = 0;
       player.animations.stop();
       player.frame = 4;
     }
     if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
       player.body.velocity.y = -350;
     }
     var distance = player.x - baddie.x;
     if (distance < 0 && distance > -100 && baddie.x > 400) {
       baddie.body.velocity.x = -100;
       //baddie.animations.play("left");
       baddie.scale.x = 1;
     } else if (distance > 0 && distance < 100 && baddie.x < game.world.width) {
       baddie.body.velocity.x = 100;
       //baddie.animations.play("right");
       baddie.scale.x = -1;
     } else {
       baddie.body.velocity.x = 0;
     }
   },

   removeLives: function(lives) {
  game.global.lives -= lives;
  if (game.global.lives <= 0) {
    game.state.start("gameover");
  } else {
    healthBar.width = game.global.lives / game.global.maxLives * 200;
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
 };
