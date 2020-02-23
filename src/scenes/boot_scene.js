import Phaser from "phaser";
import { AgentController } from "../modules/agents/scripts/agent_controller";
import {Powerup} from "../services/powerup_service";
import OfficeSpritemap from '../assets/office_spritemap.png';
import background_extruded from '../assets/background-extruded.png';
import tutorial_map from '../assets/large_level.json';
import OfficeTilemapJson from '../assets/office_tilemap_v2.json';
import {ScenKey as MainSceneKey}  from './game_scene';
export const ScenKey = "BootScene"
export class BootScene extends Phaser.Scene {
    
    constructor() {
        super({
            key: ScenKey
        })
        this.group = {};
        
    }
    

    preload() { 
        
        AgentController.loadAssets(this);
        Powerup.loadAssets(this);
        
        this.loadTileMap();
        
    }

    create(){
        this.scene.launch(MainSceneKey);
    }
    loadTileMap() {
        // load the map tileset image
        this.load.image('office_spritemap',OfficeSpritemap );
 
        
        //this.load.tilemapTiledJSON('map', tutorial_map);
        this.load.tilemapTiledJSON('map',OfficeTilemapJson);
      }
}