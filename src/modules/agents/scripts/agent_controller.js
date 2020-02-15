import char_male_brown_hair_spritemap from '../../../assets/char_male_brown_hair.png';
import blank_body_image from '../../../assets/blank_body.png';
import { AgentBaseUI } from './agent_ui';

export class AgentController extends Phaser.GameObjects.Container{
    
    constructor(scene,physicsGroup){
        super(scene,0,0,null);
        this.setSize(100,100);
        this.visual = new AgentBaseUI(scene);
        this.add(this.visual);
                
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setCircle(35,15,15);

        var spriteBounds = Phaser.Geom.Rectangle.Inflate(
            Phaser.Geom.Rectangle.Clone(
                scene.physics.world.bounds),
            -100,
            -100);
        var pos = Phaser.Geom.Rectangle.Random(spriteBounds);
        this.setPosition(pos.x, pos.y);
        this.body.setVelocity(Phaser.Math.Between(100, 200), Phaser.Math.Between(100, 200))
        .setBounce(1, 1).setCollideWorldBounds(true);

    }
     
    static loadAssets(scene) {
        AgentBaseUI.loadAssets(scene);
    }
}