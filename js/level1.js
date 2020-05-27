/**
 * A single level of the game.
 * You will need multiple copies of this for each level you
 * want to include.
 * Make sure they have different file names and different state names.
 * level2State etc will work fine
 */
var level1State = {

   create: function() {
     game.add.image(0, 0, "sky");

     platforms = game.add.group();

     platforms.enableBody = true;

     ground = platforms.create(0, game.world.height - 64, "platform");

     ground.scale.setTo(2, 2);

     platforms.create(400, 400, "platform");
     platforms.create(-150, 250, "platform");

     platforms.setAll("body.immovable", true);

     player = game.add.sprite(32, game.world.height - 150, "player");

     game.physics.arcade.enable(player);

     player.body.gravity.y = 300;
     player.body.bounce.y = 0.2;
     player.body.collideWorldBounds = true;

     player.animations.add('left', [0, 1, 2, 3], 10, true);
     player.animations.add('right', [5, 6, 7, 8], 10, true);

     healthBar = game.add.image(game.world.width - 20, 20, "healthbar");
     healthBar.anchor.setTo(1, 0);
     healthBar.width = game.global.lives / game.global.maxLives * 200;
     cursors = game.input.keyboard.createCursorKeys();

     stars = game.add.group();
     stars.enableBody = true;

     for (let i = 0; i < 12; i++) {
       star = stars.create(i * 70, -22, "star");
       star.body.gravity.y = 6;

       star.body.bounce.y = 0.7 + Math.random() * 0.3;

     }
     baddie = game.add.sprite(600, 350, "baddie");
     game.physics.arcade.enable(baddie);
     baddie.body.gravity.y = 300;
     baddie.body.bounce.y = 0.2;
     baddie.body.collideWorldBounds = true;
     baddie.animations.add('left', [0, 1], 10, true);
     baddie.animations.add('right', [2, 3], 10, true);

     scoreText = game.add.text(16, 16, "Score: " + game.global.score, {
       fontSize: '32px',
       fill: '#000'
     });

     collectSound = game.add.audio("collect");


   },

   update: function() {

     hitPlatform = game.physics.arcade.collide(player, platforms);
     game.physics.arcade.collide(stars, platforms);
     game.physics.arcade.overlap(player, stars, this.collectStar);

     game.physics.arcade.collide(baddie, platforms);
     game.physics.arcade.overlap(player, baddie, this.hitBaddie);


     if (cursors.left.isDown) {

       player.body.velocity.x = -150;
       player.animations.play('left');
     } else if (cursors.right.isDown) {

       player.body.velocity.x = 150;
       player.animations.play('right');
     } else {

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
       baddie.animations.play("left");
     } else if (distance > 0 && distance < 100 && baddie.x < game.world.width) {
       baddie.body.velocity.x = 100;
       baddie.animations.play("right");
     } else {
       baddie.body.velocity.x = 0;
     }
}
};
