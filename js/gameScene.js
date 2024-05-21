class GameScene extends Phaser.Scene {
  //Create alien function

  createAlien() {
    //function to create an alien and assign a velocity
    const YOffset = Phaser.Math.Between(10, 1080);
    const anAlien = this.physics.add.sprite(2020, YOffset, 'alien');
    anAlien.yVel = Phaser.Math.Between(-5, 5);
    anAlien.setScale(.1)
    anAlien.tex = 1;
    this.alienGroup.add(anAlien);
  }
  constructor() {
    super({ key: 'gameScene' })
    //background
    this.background = null;
    this.background2 = null;
    this.background3 = null;
    this.currentzindex = -1;
    //ship
    this.ship = null;
    this.shipVel = 0;
    this.superSpeed = false;
    this.canZoom = true;
    //missiles
    this.canFire = true;
    //aliens  
    this.hasCollided = false;
    this.currentAliens = 0;
    this.maxAliens = 10;
    // this.alienSpeed = 10;
    //score
    this.score = 0;
    this.scoreText = null;
    this.scoreTextStyle = { fontFamily: '100px Arial', fill: '#ffffff', align: 'center' };
    this.highscore = 0;
    this.highscoreText = null;
    this.highscoreTextStyle = { fontFamily: '100px Arial', fill: '#ffffff', align: 'center' };
    //endText
    this.endText = null;
    this.endTextStyle = { font: '100px Arial', fill: '#ffffff', align: 'center' };
    //other
    this.health = 3;
    this.currentTime = 0;
    this.lastDamaged = 0;
  }
  init(data) {
    this.cameras.main.setBackgroundColor('#000000')
  }
  preload() {
    //images
    this.load.image('starBackground', './assets/starBackground.png')
    this.load.image('ship', './assets/spaceShip.png')
    this.load.image('missile', './assets/missile.png')
    this.load.image('smoke', './assets/SmokePixel.png')
    this.load.image('alien', './assets/alien.png')
    this.load.image('alien2', './assets/alien2.png')
    //HealthbarImages
    this.load.image('HB_Empty', './assets/Healthbar/EmptyHealthbar.png')
    this.load.image('HB_Full', './assets/Healthbar/HealthbarFull.png')
    this.load.image('HB_Half', './assets/Healthbar/HealthbarHalf.png')
    this.load.image('HB_Low', './assets/Healthbar/HealthbarLow.png')
    //sound
    this.load.audio('missile', './assets/missile.mp3')
  }
  create(data) {
    //setup
    this.canFire = true;
    //scoreText
    this.scoreText = this.add.text(10, 10, 'Score: 0', this.scoreTextStyle);
    this.scoreText.setDepth(100)
    this.scoreText.setScale(5)
    this.highscoreText = this.add.text(10, 70, 'Highscore: '+this.highscore.toString(), this.scoreTextStyle);
    this.highscoreText.setDepth(100)
    this.highscoreText.setScale(5)
    //background
    this.background = this.add.image(0, 0, 'starBackground').setScale(2)
    this.background.x = 540 * 6
    this.background.y = 720
    this.background2 = this.add.image(0, 0, 'starBackground').setScale(2)
    this.background2.x = 540 * 4
    this.background2.y = 720
    this.background3 = this.add.image(0, 0, 'starBackground').setScale(2)
    this.background3.x = 540 * 1
    this.background3.y = 720
    //healthbar
    this.healthBar = this.add.image(0, 0, 'HB_Full').setScale(.6)
    this.healthBar.x = 500
    this.healthBar.y = 75
    //ship
    this.ship = this.physics.add.sprite(225, 1080 / 2, 'ship').setScale(0.7)
    //misslegroup
    this.missileGroup = this.physics.add.group()
    //alienGroup
    this.alienGroup = this.physics.add.group()
    this.createAlien()
    // Stop music when player dies
    const stopMusic = () => {
      audio.pause();
      audio.currentTime = 0;
    };
    //alien destroy
    this.physics.add.collider(this.missileGroup, this.alienGroup, function(missileCollide, alienCollide) {
      this.Explosion(missileCollide.x, missileCollide.y, 'Small')
      this.createAlien()
      const sound = new Audio('./assets/Explosion.mp3');
      sound.loop = false;
      sound.volume = .5;
      sound.play();
      this.hasCollided = true;
      missileCollide.destroy();
      alienCollide.destroy();
      if (this.currentAliens < this.maxAliens) {
        this.createAlien();
        this.currentAliens += 1;
        console.log(this.currentAliens);
      }
      if (this.superSpeed == true){
        this.score += 2;
      } else{
        this.score += 1;
      }
      this.scoreText.setText('Score: ' + this.score.toString());
      if (this.score>this.highscore){
        this.highscore = this.score;
        this.highscoreText.setText('Highscore: ' + this.highscore.toString());
      }
    }.bind(this));

    //End the game
    this.physics.add.collider(this.ship, this.alienGroup, function(shipCollide, alienCollide) {
      //Checking to see if the ship can be damaged
      if (this.currentTime - this.lastDamaged > 1000) {
        //Explosion Effect
        this.Explosion(this.ship.x, this.ship.y, "Big")
        //Sound
        const sound = new Audio('./assets/Explosion.mp3');
        sound.loop = false;
        sound.volume = 1;
        sound.play();
        //Damage cooldown
        this.lastDamaged = this.currentTime;
        //lower health
        this.health -= 1
        //Set healthsprite
        if (this.health >= 3) {
          this.healthBar.setTexture('HB_Full')
        }
        if (this.health == 2) {
          this.healthBar.setTexture('HB_Half')
        }
        if (this.health == 1) {
          this.healthBar.setTexture('HB_Low')
        }
        if (this.health <= 0) {
          this.healthBar.setTexture('HB_Empty')
        }
        //Death
        if (this.health <= 0) {
          //Stop music
          stopMusic();
          //Stop player from shooting
          this.canFire = false;
          //Stop player from moving
          this.physics.pause()
          //Destroy alien and ship
          shipCollide.destroy()
          alienCollide.destroy()
          //Reset Score
          this.score = 0
          this.currentAliens = 0;
          //GameOver Text
          this.health = 3
          this.endText = this.add.text(1920 / 4, 1080 / 2.5, 'Game Over!\nClick to try again', this.endTextStyle)
          this.endText.setInteractive(({ useHandCursor: true }))
          this.endText.on('pointerdown', () => this.scene.start('gameScene'))
        }
      }
    }.bind(this));

    //smokegroup
    this.smokeGroup = this.physics.add.group()

    //music
    const audio = new Audio('./assets/mainTheme.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audio.play();
  }
  update(time, delta) {
    this.currentTime = time
    //updates 60 times a second
    //keybinds for movement (2 for up 2 for down depending on playstyle)
    const LeftKey = this.input.keyboard.addKey('W')
    const LeftKey2 = this.input.keyboard.addKey('UP')
    const RightKey = this.input.keyboard.addKey('S')
    const RightKey2 = this.input.keyboard.addKey('DOWN')
    const MissileKey = this.input.keyboard.addKey('SPACE')
    const SuperSpeedKey = this.input.keyboard.addKey('SHIFT')
    //function to clamp the speed, so its fixed within a certain range
    const clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
    //detect movement, and change velocities
    if (LeftKey.isDown == true || LeftKey2.isDown == true) {
      this.shipVel = clampNumber(this.shipVel - 2, -9, 9)
    } else if (RightKey.isDown == true || RightKey2.isDown == true) {
      this.shipVel = clampNumber(this.shipVel + 2, -9, 9)
    } else {
      this.shipVel = clampNumber(this.shipVel * .9, -9, 9)
    }
    //super Speed
    if (SuperSpeedKey.isDown == true){
      if (this.canZoom == true&&this.canFire == true){
        this.canZoom = false;
        this.superSpeed = true;
        const sound = new Audio('./assets/SuperSpeed.mp3');
        sound.loop = false;
        sound.volume = .5;
        sound.play();
      }
    } else{
      this.canZoom = true;
      this.superSpeed = false;
    }
    //setting ship depth
    this.ship.setDepth(5);
    //move ship by velocity
    this.ship.y += this.shipVel
    //rotate ship
    this.RotateShip(90 + this.shipVel * 2)
    //wrapping
    if (this.ship.y < 0) {
      this.ship.y = 1080
    } else if (this.ship.y > 1080) {
      this.ship.y = 0
    }
    //missiles
    if (MissileKey.isDown === true) {
      if (this.fireMissile == false && this.canFire == true) {
        //fire Missile
        this.fireMissile = true
        const NewMissile = this.physics.add.sprite(this.ship.x + 20, this.ship.y, 'missile').setScale(.3)
        NewMissile.rotation = Phaser.Math.DegToRad(90);
        this.missileGroup.add(NewMissile)
        this.sound.play('missile')
      }
    } else {
      this.fireMissile = false
    }

    //scrolling background
    if (this.superSpeed==true){
      this.background.x -= 20
      this.background2.x -= 20
      this.background3.x -= 20
    } else{
      this.background.x -= 10
      this.background2.x -= 10
      this.background3.x -= 10
    }
    //checking if backgrounds have moved too far back
    if (this.background.x < -980) {
      this.background.x = 540 * 6
      this.currentzindex -= 1
      this.background.setDepth(this.currentzindex);
    }
    if (this.background2.x < -980) {
      this.background2.x = 540 * 6
      this.currentzindex -= 1
      this.background2.setDepth(this.currentzindex);
    }
    if (this.background3.x < -980) {
      this.background3.x = 540 * 6
      this.currentzindex -= 1
      this.background3.setDepth(this.currentzindex);
    }
    //move missiles
    this.missileGroup.children.each((item) => {
      item.x += 10;
      item.rotation = Phaser.Math.DegToRad(Math.sin(time / 50) * 7 + 90);
      item.y = item.y - Math.sin(time / 50) * 4;
      if (item.x >= 1980) {
        item.destroy();
      } else {
        if (Math.random() < .2) {
          const Smoke = this.physics.add.sprite(item.x - 15, item.y, 'smoke').setScale(0.1);
          Smoke.alpha = .5
          Smoke.Xv = 0
          Smoke.Yv = 0
          this.smokeGroup.add(Smoke);
        }
      }
    });

    //smoke Particles for rockets
    this.smokeGroup.children.each(function(item) {
      item.rotation = Phaser.Math.DegToRad(Math.cos(time / 50) * 5 + 90)
      item.alpha -= 0.02
      item.setScale(item.scaleX + .001)
      item.x += item.Xv
      item.y += item.Yv
      if (item.alpha <= .05) {
        item.destroy()
      }
    }
    )
    //moving Aliens
    this.alienGroup.children.each(function(alien) {
      alien.y += alien.yVel
      if (Phaser.Math.Between(1, 100) == 1){
        if (alien.tex == 1){
          alien.tex = 2
        } else{
          alien.tex = 1
        }
      }
      if (alien.tex == 1){
        alien.setTexture('alien')
      } else{
        alien.setTexture('alien2')
      }
      if (this.superSpeed==true){
         alien.x -= 30
      } else{
         alien.x -= 15
      }
      if (alien.y > 1080) {
        alien.y = 5;
      }
      if (alien.y < 0) {
        alien.y = 1075;
      }
      if (alien.x < 0) {
        alien.x = 1920;
      }
    }.bind(this));
  }
  RotateShip(degree) {
    //rotating in radians so that it doesn't look wonky
    this.ship.rotation = Phaser.Math.DegToRad(degree);
  }
  Explosion(x, y, size) {
    for (let i = 0; i < 5; i++) {
      const Explosion = this.physics.add.sprite(x, y, 'smoke')
      if (size == "Big") {
        Explosion.setScale(0.3);
      } else {
        Explosion.setScale(0.1);
      }
      Explosion.alpha = .8
      Explosion.Xv = Phaser.Math.Between(0, 10)
      Explosion.Yv = Phaser.Math.Between(-10, 10)
      this.smokeGroup.add(Explosion);
    }
  }
}
export default GameScene