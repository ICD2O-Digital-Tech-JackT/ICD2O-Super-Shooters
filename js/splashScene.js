class SplashScene extends Phaser.Scene{
  constructor(){
    super({key:'splashScene'})
  }
  init(data){
    this.cameras.main.setBackgroundColor('#ededed')
  }
  preload(){
    //Loading Images
    this.load.image('splashSceneBackground','assets/splashSceneImage.jpg')
    //Loading Audio
    this.load.audio("startup","filedirectory")
  }
  create(data){
    //Load titlescreen
    this.splashSceneBackgroundImage = this.add.video(0,0,'splashSceneBackground')
    this.splashSceneBackgroundImage.play(true);
    this.splashSceneBackgroundImage.x=1920/2
    this.splashSceneBackgroundImage.y=1080/2
    //Load audio
    this.sound.play('startup')
  }
  update(time,delta){
    if (time>3000){
      this.scene.switch('titleScene')
    }
  }
}
export default SplashScene