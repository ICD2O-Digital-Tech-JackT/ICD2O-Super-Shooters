class GameScene extends Phaser.Scene {
  constructor(){
    super({key:'gameScene'})
  }
  init(data){
    this.cameras.main.setBackgroundColor('#000000')
  }
  preload(){
    console.log('Game Scene')
  }
  create(data){
  }
  update(time,delta){
  }
}
export default GameScene