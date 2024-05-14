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
  }
  create(data){
    this.background = this.add.image(0,0,'starBackground').setScale(2)
    this.background.setOrigin(0,0)
  }
  update(time,delta){
  }
}
export default GameScene