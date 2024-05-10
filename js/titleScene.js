class TitleScene extends Phaser.Scene {
  constructor(){
    super({key:'titleScene'})
    this.titleSceneBackgroundImage = null;
  }
  init(data){
    this.cameras.main.setBackgroundColor('#000000')
  }
  preload(){
    console.log('Title Scene') 
  }
  create(data){
  }
  update(time,delta){
  }
}
export default TitleScene