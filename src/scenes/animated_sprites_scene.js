import Phaser from "phaser";
import { AgentController } from "../modules/agents/scripts/agent_controller";
 
import uv_grid_diag from '../assets/uv-grid-diag.png';
import {ScrollingCamera} from '../modules/levels/ScrollingCamera';

export const ScenKey = "AnimatedSprites"
export class AnimatedSprites extends Phaser.Scene {
    
    constructor() {
        super({
            key: ScenKey
        })
        this.group = {};
        
    }
    

    preload() { 
        this.load.image('bg', uv_grid_diag);
    }

    create() {
         //  Set the camera and physics bounds to be the size of 4x4 bg images
        //this.cameras.main.setBounds(-1024, -1024, 1024 * 2, 1024 * 2);
        //this.physics.world.setBounds(-1024, -1024, 1024 * 2, 1024 * 2);

        this.add.image(1024, 1024, 'bg').setOrigin(0).setScale(1);
        this.add.image(0, 1024, 'bg').setOrigin(0).setScale(1);
        this.add.image(1024, 0, 'bg').setOrigin(0).setScale(1);
        this.add.image(0, 0, 'bg').setOrigin(0).setScale(1);
    
       var camera = new ScrollingCamera(this,{
           x:0,
           y:0,
           bottom:2*1024,
           right:2*1024
       });
       //camera.setBounds(-1024, -1024, 1024 * 2, 1024 * 2);
       
         
    }

    

}
