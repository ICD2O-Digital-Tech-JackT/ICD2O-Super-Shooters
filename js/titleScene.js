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
    this.load.image('titleSceneBackground','./assets/aliens_screen_image.jpg')
    this.load.image('titleSceneText','./assets/SuperShootersTitleText.png')
  }
  create(data){
    //Background
    this.titleSceneBackgroundImage = this.add.sprite(0,0,'titleSceneBackground').setScale(2.75)
    this.titleSceneBackgroundImage.x = 1920/2
    this.titleSceneBackgroundImage.y = 1080/2
    //Text
    this.titleSceneBackgroundImage = this.add.sprite(0,0,'titleSceneText').setScale(1.25)
    this.titleSceneBackgroundImage.x = 1920/4
    this.titleSceneBackgroundImage.y = 1080/3
  }
  update(time,delta){
  }
}
export default TitleScene