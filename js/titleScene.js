class TitleScene extends Phaser.Scene {
  constructor(){
    super({key:'titleScene'})
    this.titleSceneBackgroundImage = null;
    this.titleSceneText = null;
  }
  init(data){
    this.cameras.main.setBackgroundColor('#000000')
  }
  preload(){
    console.log('Title Scene') 
    this.load.video('titleSceneBackground','./assets/SpaceShipEnter.mp4')
    this.load.image('titleSceneText','./assets/SuperShootersTitleText.png')
  }
  create(data){
    //Background
    this.titleSceneBackgroundVideo = this.add.video(0,0,'titleSceneBackground')
    this.titleSceneBackgroundVideo.play(false);
    this.titleSceneBackgroundVideo.x = 1920/2
    this.titleSceneBackgroundVideo.y = 1080/2
    //Text
    this.titleSceneBackgroundImage = this.add.sprite(0,0,'titleSceneText').setScale(2.25)
    this.titleSceneBackgroundImage.x = 1920/3
    this.titleSceneBackgroundImage.y = 1080/3
  }
  update(time,delta){
    if (time>9000){
      this.scene.switch('menuScene')
    }
  }
}
export default TitleScene