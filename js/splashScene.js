class SplashScene extends Phaser.Scene{
  constructor(){
    super({key:'splashScene'})
  }
  init(data){
    this.cameras.main.setBackgroundColor('#ededed')
  }
  preload(){
    //Loading Images
    this.load.video('splashSceneBackground','./assets/IMHSplashScene.mp4')
  }
  create(data){
    //Load titlescreen
    this.splashSceneBackgroundVideo = this.add.video(0,0,'splashSceneBackground')
    this.splashSceneBackgroundVideo.play(false);
    this.splashSceneBackgroundVideo.x=1920/2
    this.splashSceneBackgroundVideo.y=1080/2
  }
  update(time,delta){
    if (time>5000){
      this.scene.switch('titleScene')
    }
  }
}
export default SplashScene