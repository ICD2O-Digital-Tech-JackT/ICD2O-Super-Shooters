class MenuScene extends Phaser.Scene {
  constructor(){
    super({key:'menuScene'})
  }
  init(data){
    this.cameras.main.setBackgroundColor('#000000')
  }
  preload(){
    console.log('Menu Scene')
  }
  create(data){
  }
  update(time,delta){
  }
}
export default MenuScene