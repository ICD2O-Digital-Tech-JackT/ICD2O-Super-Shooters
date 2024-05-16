class GameScene extends Phaser.Scene {
  constructor(){
    super({key:'gameScene'})
    this.background = null;
    this.background2 = null;
    this.background3 = null;
    this.ship = null;
    this.shipVel = 0;
    this.fireMissile=false
    this.currentzindex = -1;
  }
  init(data){
    this.cameras.main.setBackgroundColor('#000000')
  }
  preload(){
    //images
    this.load.image('starBackground','./assets/starBackground.png')
    this.load.image('ship','./assets/spaceShip.png')
    this.load.image('missile','/assets/missile.png')
    //sound
    this.load.audio('missile','./assets/missile.mp3')
  }
  create(data){
    //background
    this.background = this.add.image(0,0,'starBackground').setScale(2)
    this.background.x = 540*6
    this.background.y = 720
    this.background2 = this.add.image(0,0,'starBackground').setScale(2)
    this.background2.x = 540*4
    this.background2.y = 720
    this.background3 = this.add.image(0,0,'starBackground').setScale(2)
    this.background3.x = 540*1
    this.background3.y = 720
    //ship
    this.ship = this.physics.add.sprite(225,1080/2,'ship').setScale(0.7)
    //misslegroup
    this.missileGroup = this.physics.add.group()
  }
  update(time,delta){
    //updates 60 times a second
    //Keybinds for movement (2 for up 2 for down depending on playstyle)
    const LeftKey = this.input.keyboard.addKey('W')
    const LeftKey2 = this.input.keyboard.addKey('UP')
    const RightKey = this.input.keyboard.addKey('S')
    const RightKey2 = this.input.keyboard.addKey('DOWN')
    const MissileKey = this.input.keyboard.addKey('SPACE')
    //Function to clamp the speed, so its fixed within a certain ranges
    const clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
    //Detect movement, and change velocities
    if (LeftKey.isDown==true||LeftKey2.isDown==true){
      this.shipVel=clampNumber(this.shipVel-2,-9,9)
    } else if (RightKey.isDown==true||RightKey2.isDown==true){
      this.shipVel=clampNumber(this.shipVel+2,-9,9)
    } else{
      this.shipVel=clampNumber(this.shipVel*.9,-9,9)
    }
    //SettingShipDepth
    this.ship.setDepth(5);
    //Move ship by velocity
    this.ship.y+=this.shipVel
    //Rotate ship
    this.RotateShip(90+this.shipVel*2)
    //Wrapping
    if (this.ship.y<0){
      this.ship.y = 1080
    } else if (this.ship.y>1080){
      this.ship.y = 0
    }
    //Missiles
    if (MissileKey.isDown===true){
      if (this.fireMissile == false){
        let LastFired = time;
        //fire Missile
        this.fireMissile=true
        const NewMissile = this.physics.add.sprite(this.ship.x+20,this.ship.y,'missile').setScale(.3)
        NewMissile.rotation = Phaser.Math.DegToRad(90);
        this.missileGroup.add(NewMissile)
        this.sound.play('missile')
      }
    } else {
      this.fireMissile=false
    }

    //Scrolling background
    this.background.x-=10
    this.background2.x-=10
    this.background3.x-=10
    //Checking if backgrounds have moved too far back
    if (this.background.x<-980){
      this.background.x=540*6
      this.currentzindex-=1
      this.background.setDepth(this.currentzindex);
    }
    if (this.background2.x<-980){
      this.background2.x=540*6
      this.currentzindex-=1
      this.background2.setDepth(this.currentzindex);
    }
    if (this.background3.x<-980){
      this.background3.x=540*6
      this.currentzindex-=1
      this.background3.setDepth(this.currentzindex);
    }
  }
  RotateShip(degree) {
    //Rotating in radians so that it doesn't look wonky
    this.ship.rotation = Phaser.Math.DegToRad(degree);
  }
}
export default GameScene