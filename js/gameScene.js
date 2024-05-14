class GameScene extends Phaser.Scene {
  constructor(){
    super({key:'gameScene'})
    this.background = null;
    this.ship = null;
  }
  init(data){
    this.cameras.main.setBackgroundColor('#000000')
  }
  preload(){
    //images
    this.load.image('starBackground','./assets/starBackground.png')
    this.load.image('ship','./assets/spaceShip.png')
  }
  create(data){
    //background
    this.background = this.add.image(0,0,'starBackground').setScale(2.0)
    this.background.setOrigin(0,0)
    //ship
    this.ship = this.physics.add.sprite(225,1080/2,'ship').setScale(5.0)
  }
  update(time,delta){
  }
}
export default GameScene