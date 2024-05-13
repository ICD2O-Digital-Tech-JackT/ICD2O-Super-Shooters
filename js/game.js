/*global Phaser*/
import SplashScene from "/js/splashScene.js";
import TitleScene from "/js/titleScene.js";
import MenuScene from "/js/menuScene.js";
import GameScene from "/js/menuScene.js";
// Our Game Scene
const splashScene = new SplashScene();
const titleScene = new TitleScene();
const menuScene = new MenuScene();
const gameScene = new GameScene();
// Game Scene
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  //Set background colour
  backgroundColor: "#000000",
  //Set Scaling for the site
  scale: {
    mode: Phaser.Scale.FIT,
    //Set Position to middle of the page
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}
//Load Scenes
const game = new Phaser.Game(config);
game.scene.add('splashScene', splashScene);
game.scene.add('titleScene', titleScene);
game.scene.add('menuScene', menuScene);
game.scene.add('gameScene', gameScene);

game.scene.start('splashScene');