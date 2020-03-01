import Phaser from "phaser";
import { AgentController } from "../modules/agents/scripts/agent_controller";
import {Powerup} from "../services/powerup_service";
import {ScrollingCamera} from '../modules/levels/ScrollingCamera';

export const ScenKey = "GameScene"
export class GameScene extends Phaser.Scene {
    
    constructor() {
        super({
            key: ScenKey
        })
        this.agentsPhysicsGroup = {};
        this.mapScaleFactor = 6;
    }
    

    preload() {
        AgentController.loadAssets(this);
        Powerup.loadAssets(this);
    }

    create() {
        
        this.createMap();
        this.createAgents();

        // Loads the spatial tree
        this.physics.world.step(0);

       
    }

    createAgents(){

        var spriteBounds = Phaser.Geom.Rectangle.Inflate(Phaser.Geom.Rectangle.Clone(this.physics.world.bounds), -100, -100);

        this.agentsPhysicsGroup = this.physics.add.group({repeat: 10});
        
        var agents = [];
        
        for (var i = 0; i < 5; i++)
        {
            var agent = new AgentController(this,this.agentsPhysicsGroup)
            agents.push(agent);
        }
        
        this.physics.add.collider(agents,null,(object1,object2)=>{
             
            object1.visual.animate('attack');
            object2.visual.animate('getHit');

            var diff = object1.body.position.clone().subtract(object2.body.position).add(object1.body.position);
             
            this.crearePowerup(diff);
        });
        this.physics.add.collider(agents,this.furniture);
        this.physics.add.collider(agents,this.charis);
        this.physics.add.collider(agents,this.furniture);
        
        
    }
    createLayer(layerName,tileSet,setCollsion){
        var newLayer = this.map.createStaticLayer(layerName, tileSet, 0, 0);
        newLayer.setScale(this.mapScaleFactor);
        if(setCollsion === true){
            newLayer.setCollisionByExclusion([-1]);
        }
        return newLayer;
    }
    createMap() {
        // create the tile map
        this.map = this.make.tilemap({ key: 'map' });
        console.log(this.map)
        // add the tileset image to our map
        this.tiles = this.map.addTilesetImage('office_spritemap', 'office_spritemap', 8, 8, 0, 0);
        // create our background
        this.backgroundLayer = this.map.createStaticLayer('background', this.tiles, 0, 0);
        this.backgroundLayer.setScale(this.mapScaleFactor);

        // create our walltp 
        this.walltop = this.map.createStaticLayer('walltops', this.tiles, 0, 0);
        this.walltop.setScale(this.mapScaleFactor);
        

        // create our furniture 
        this.furniture = this.map.createStaticLayer('furniture', this.tiles, 0, 0);
        this.furniture.setScale(this.mapScaleFactor);
        this.furniture.setCollisionByExclusion([-1]);

        // create our charis 
        this.charis = this.map.createStaticLayer('charis', this.tiles, 0, 0);
        this.charis.setScale(this.mapScaleFactor);
        this.charis.setCollisionByExclusion([-1]);

        console.log(this.physics.world.bounds);
        //update the world bounds
        this.physics.world.bounds.width = this.map.widthInPixels * this.mapScaleFactor;
        this.physics.world.bounds.height = this.map.heightInPixels * this.mapScaleFactor;

        //limit the camera to the size of our map
        //this.cameras.main.setBounds(0, 0, this.map.widthInPixels * 4, this.map.heightInPixels * 4);
        var camera = new ScrollingCamera(this,{
            x:0,
            y:0,
            bottom:this.map.widthInPixels *this.mapScaleFactor,
            right:this.map.heightInPixels * this.mapScaleFactor
        });
      }
    crearePowerup(position){
        var p = new Powerup(this,position.x,position.y,{ });
        return p;
    }

}
