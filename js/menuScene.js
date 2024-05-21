class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'menuScene' })
    this.menuSceneBackgroundImage = null;
    this.startButton = null;
    this.tutorialMenu = null;
    this.audio = new Audio('./assets/menuTheme.mp3');
  }
  init(data) {
    this.cameras.main.setBackgroundColor('#000000')
  }
  preload() {
    this.load.image('tutorial', './assets/TutorialScreen.png');
    this.load.image('menuSceneBackgroundImage', './assets/MenuSceneBackground.png');
    this.load.image('startButton', './assets/PlayButton.png')
  }
  create(data) {
    //Background
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackgroundImage').setScale(1.75)
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2
    //StartButton
    this.startButton = this.add.sprite(1920 / 2, 1080 / 2 + 250, 'startButton')
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())
    //TutorialMenu
    this.tutorialMenu = this.add.sprite(1920 / 2, 1080 / 2, 'tutorial').setScale(1)
    this.tutorialMenu.setDepth(100)
    this.tutorialMenu.setInteractive({ useHandCursor: true })
    this.tutorialMenu.on('pointerdown', () => this.tutorialClose())
    //Music
    this.audio.loop = true;
    this.audio.volume = 0.5;
    this.audio.play();
  }
  update(time, delta) {
  }
  //function to toggle tutorial menu
  tutorialClose() {
    this.tutorialMenu.destroy()
  }
  //function to start the game
  clickButton() {
    this.audio.pause();
    this.scene.start('gameScene')
  }
}
export default MenuScene