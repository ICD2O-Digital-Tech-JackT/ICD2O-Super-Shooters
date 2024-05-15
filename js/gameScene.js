class GameScene extends Phaser.Scene {
  constructor(){
    super({key:'gameScene'})
    this.background = null;
    this.ship = null;
    this.shipVel = 0;
    this.fireMissile=false
  }
  init(data){
    this.cameras.main.setBackgroundColor('#000000')
  }
  preload(){
    //images
    this.load.image('starBackground','./assets/starBackground.png')
    this.load.image('ship','./assets/spaceShip.png')
    this.load.image('missile','/assets/missile.png')
  }
  create(data){
    //background
    this.background = this.add.image(0,0,'starBackground').setScale(2.0)
    this.background.setOrigin(0,0)
    //ship
    this.ship = this.physics.add.sprite(225,1080/2,'ship').setScale(5.0)
    //misslegroup
    this.missileGroup = this.physics.add.group()
  }
  update(time,delta){
    //updates 60 times a second
    const Speed = 5
    //Keybinds for movement (2 for up 2 for down depending on playstyle)
    const LeftKey = this.input.keyboard.addKey('W')
    const LeftKey2 = this.input.keyboard.addKey('UP')
    const RightKey = this.input.keyboard.addKey('S')
    const RightKey2 = this.input.keyboard.addKey('DOWN')
    const MissileKey = this.input.keyboard.addKey('SPACE')
    //Function to clamp the speed, so its fixed within a certain ranges
    const clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
    //Detect movement, and change velocityssw
    if (LeftKey.isDown==true||LeftKey2.isDown==true){
      this.shipVel=clampNumber(this.shipVel-2,-9,9)
    } else if (RightKey.isDown==true||RightKey2.isDown==true){
      this.shipVel=clampNumber(this.shipVel+2,-9,9)
    } else{
      this.shipVel=clampNumber(this.shipVel*.9,-9,9)
    }
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
        //fire Missile
        this.fireMissile=true
        const NewMissile = this.physics.add.sprite(this.ship.x,this.ship.y,'missile').setScale(2)
        NewMissile.rotation = Phaser.Math.DegToRad(90);
        this.missileGroup.add(NewMissile)
      }
    } else {
      this.fireMissile=false
    }
  }
  RotateShip(degree) {
    //Rotating in radians so that it doesn't look wonky
    this.ship.rotation = Phaser.Math.DegToRad(degree);
  }
}
export default GameScene