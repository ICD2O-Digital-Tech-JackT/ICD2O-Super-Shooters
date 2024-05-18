class GameScene extends Phaser.Scene {
  //Create alien function

  createAlien() {
    //function to create an alien and assign a velocity
    const YOffset = Phaser.Math.Between(10, 1080);
    const anAlien = this.physics.add.sprite(2020, YOffset, 'alien');
    anAlien.yVel = Phaser.Math.Between(-5, 5);
    anAlien.setScale(.1)
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
    //missiles
    this.canFire = true;
    //aliens  
    this.hasCollided = false;
    this.currentAliens = 0;
    this.maxAliens = 10;
    //score
    this.score = 0;
    this.scoreText = null;
    this.scoreTextStyle = { fontFamily: '100px Arial', fill: '#ffffff', align: 'center' };
    //endText
    this.endText = null;
    this.endTextStyle = { font: '100px Arial', fill: '#ffffff', align: 'center' };
  }
  init(data) {
    this.cameras.main.setBackgroundColor('#000000')
  }
  preload() {
    //images
    this.load.image('starBackground', './assets/starBackground.png')
    this.load.image('ship', './assets/spaceShip.png')
    this.load.image('missile', '/assets/missile.png')
    this.load.image('smoke', '/assets/SmokePixel.png')
    this.load.image('alien', '/assets/alien.png')
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
      this.score += 1;
      this.scoreText.setText('Score: ' + this.score.toString());
    }.bind(this));

    //End the game
    this.physics.add.collider(this.ship, this.alienGroup, function(shipCollide, alienCollide) {
      stopMusic();
      this.canFire = false;
      const sound = new Audio('./assets/Explosion.mp3');
      sound.loop = false;
      sound.volume = 1;
      sound.play();
      this.physics.pause()
      shipCollide.destroy()
      alienCollide.destroy()
      this.score = 0
      this.currentAliens = 0;
      this.endText = this.add.text(1920 / 4, 1080 / 2.5, 'Game Over!\nClick to try again', this.endTextStyle)
      this.endText.setInteractive(({ useHandCursor: true }))
      this.endText.on('pointerdown', () => this.scene.start('gameScene'))
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
    //updates 60 times a second
    //keybinds for movement (2 for up 2 for down depending on playstyle)
    const LeftKey = this.input.keyboard.addKey('W')
    const LeftKey2 = this.input.keyboard.addKey('UP')
    const RightKey = this.input.keyboard.addKey('S')
    const RightKey2 = this.input.keyboard.addKey('DOWN')
    const MissileKey = this.input.keyboard.addKey('SPACE')
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
    this.background.x -= 10
    this.background2.x -= 10
    this.background3.x -= 10
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
          this.smokeGroup.add(Smoke);
        }
      }
    });

    //smoke Particles for rockets
    this.smokeGroup.children.each(function(item) {
      item.rotation = Phaser.Math.DegToRad(Math.cos(time / 50) * 5 + 90)
      item.alpha -= 0.02
      item.setScale(item.scaleX + .001)
      if (item.alpha <= .05) {
        item.destroy()
      }
    }
    )
    //moving Aliens
    this.alienGroup.children.each(function(alien) {
      alien.y += alien.yVel
      alien.x -= 20
      if (alien.y > 1080) {
        alien.y = 5
      }
      if (alien.y < 0) {
        alien.y = 1075
      }
      if (alien.x < 0) {
        alien.x = 1920
      }
    });
  }
  RotateShip(degree) {
    //rotating in radians so that it doesn't look wonky
    this.ship.rotation = Phaser.Math.DegToRad(degree);
  }
}
export default GameScene