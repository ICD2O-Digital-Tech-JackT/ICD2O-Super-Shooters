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
    this.load.image('titleSceneBackground','newimage')
    this.load.audio()
   
  }
  create(data){
     this.titleSceneBackground.play();
    this.audio = this.add.Sound.play();
  }
  update(time,delta){
  }
}
export default TitleScene