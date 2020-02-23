import Phaser from "phaser";
import {GameScene} from './scenes/game_scene.js';
import { AnimatedSprites } from "./scenes/animated_sprites_scene.js";
import { BootScene } from "./scenes/boot_scene.js";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: {  },
        debug: true
    }
  },
  pixelArt: true,
  roundPixels: true,
  scene: [BootScene,GameScene,AnimatedSprites]
};

const game = new Phaser.Game(config);

 