import Phaser from "phaser";
import { AgentController } from "../modules/agents/scripts/agent_controller";
import mummy_spritesheet from '../assets/mummy37x45.png';
import char_male_brown_hair_spritemap from '../assets/char_male_brown_hair.png';


export const ScenKey = "AnimatedSprites"
export class AnimatedSprites extends Phaser.Scene {
    
    constructor() {
        super({
            key: ScenKey
        })
        this.group = {};
        
    }
    

    preload() { 
        this.load.spritesheet('mummy', mummy_spritesheet, { frameWidth: 37, frameHeight: 45 });
        this.load.spritesheet('character', char_male_brown_hair_spritemap, { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        var config = {
            key: 'walk',
            frames: this.anims.generateFrameNumbers('mummy'),
            frameRate: 6,
            yoyo: true,
            repeat: -1
        };
        var anim = this.anims.create(config);
        var config2 = {
            key: 'attack',
            frames: this.anims.generateFrameNumbers('character',{ frames: [ 2 ] }),
            frameRate: 1,
            yoyo: true,
            repeat: -1
        };
        var anim = this.anims.create(config);
        var anim2 = this.anims.create(config2);

        

        var sprite = this.add.sprite(400, 300, 'mummy').setScale(4);
        var sprite2 = this.add.sprite(500, 400, 'character').setScale(2);
      

        sprite.anims.load('walk');
        sprite.anims.play('walk');
        //sprite2.anims.load('attack');
        sprite2.anims.play('attack');
    }

    

}
