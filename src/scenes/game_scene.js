import Phaser from "phaser";
import { AgentController } from "../modules/agents/scripts/agent_controller";

export const ScenKey = "GameScene"
export class GameScene extends Phaser.Scene {
    
    constructor() {
        super({
            key: ScenKey
        })
        this.agentsPhysicsGroup = {};
    }
    

    preload() { 
        AgentController.loadAssets(this);
    }

    create() {
        
        
        this.createAgent();

         // Loads the spatial tree
        this.physics.world.step(0);
    }

    createAgent(){

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
        });
    }

}
