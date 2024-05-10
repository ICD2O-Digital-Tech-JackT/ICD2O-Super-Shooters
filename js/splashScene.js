class SplashScene extends Phaser.Scene{
  constructor(){
    super({key:'splashScene'})
  }
  init(data){
    this.cameras.main.setBackgroundColor('#ededed')
  }
  preload(){
    //Loading Images
    this.load.video('splashSceneBackground','/assets/IMHSplashScene.mp4')
    //Loading Audio
    
  }
  create(data){
    //Load titlescreen
    this.splashSceneBackgroundImage = this.add.video(0,0,'splashSceneBackground')
    this.splashSceneBackgroundImage.play(false);
    this.splashSceneBackgroundImage.x=1920/2
    this.splashSceneBackgroundImage.y=1080/2
    //Load audio
  }
  update(time,delta){
    if (time>5000){
      this.scene.switch('titleScene')
    }
  }
}
export default SplashScene