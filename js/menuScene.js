class MenuScene extends Phaser.Scene {
  constructor(){
    super({key:'menuScene'})
    this.menuSceneBackgroundImage = null;
    this.startButton = null;
  }
  init(data){
    this.cameras.main.setBackgroundColor('#000000')
  }
  preload(){
    console.log('Menu Scene')
    this.load.image('menuSceneBackgroundImage','./assets/MenuSceneBackground.png');
    this.load.image('startButton','assets/PlayButton.png')
  }
  create(data){
    //Background
    this.menuSceneBackgroundImage = this.add.sprite(0,0,'menuSceneBackgroundImage').setScale(1.75)
    this.menuSceneBackgroundImage.x = 1920/2
    this.menuSceneBackgroundImage.y = 1080/2
    //StartButton
    this.startButton = this.add.sprite(1920/2,1080/2+250,'startButton')
    this.startButton.setInteractive({useHandCursor: true})
    this.startButton.on('pointerdown',() => this.clickButton())
  }
  update(time,delta){
  }
  clickButton(){
    this.scene.start('gameScene')
  }
}
export default MenuScene