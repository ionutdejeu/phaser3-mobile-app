
import pow_image_file from '../assets/Powerup_spritesheet.png';
export class PowerupOptions {
    constructor(object){
        this._radius = object.radius||30; 
        this._backgrounColor = object.backgrounColor || 0xDADADA;
        this._borderColor = object.borderColor || 0xFFFFFF;
        this._borderWidth = object.borderWidth || 4;
        this._text = object.Text || '+';
    }
    set radius(value){
        this._radius = value;
    }
    get radius(){
        return this._radius;
    }
    get borderColor(){
        return this._borderColor;
    }
    set borderColor(value){
        this._borderColor = value;
    }
}
export const powerupEvents = {
    ACTIVATED:'POWERUP_ACTIVATED',
    DISTROYED:'POWERUP_DESTROYED',
    LIFETIME_ENDED:'POWERUP_LIFETIME_ENDED'
}
export const requiredAssets = {
    pow:{
        key:'pow_powerup_image',
        file:pow_image_file
    }
}

export class Powerup extends Phaser.GameObjects.Container{ 
    constructor(scene,x,y,options,tapCallback){
        super(scene,x,y);
        scene.add.existing(this);
        this.options = new PowerupOptions(options);
        this.uiGraphics = scene.add.image(-this.options._radius/2,-this.options._radius/2,requiredAssets.pow.key);
        this.uiGraphics.displayWidth = this.options._radius*2;
        this.uiGraphics.displayHeight = this.options._radius*2;
        this.add(this.uiGraphics);

        this.visualUI = new PowerupBaseUI(scene,this,options);
        
        scene.physics.world.enable(this);
        this.setSize(100,100);
        this.body.setCircle(this.options.radius,0,0);
        this.body.setVelocity(Phaser.Math.Between(50, 10), Phaser.Math.Between(50, 100))
        .setBounce(1, 1).setCollideWorldBounds(true);
        this.actionCallback = tapCallback;
        this.setInteractive(
            new Phaser.Geom.Circle(this.options._radius/2,this.options._radius/2, this.options._radius),
            Phaser.Geom.Circle.Contains);
        
        this.on('pointerup',()=>{
            if(this.actionCallback !== undefined) this.actionCallback(this);
            super.destroy();
            this.destroy();
        });
    }

    static loadAssets(scene){
        scene.load.image(requiredAssets.pow.key, 
            requiredAssets.pow.file);
    }

}
export class PowerupBaseUI{
    constructor(scene,powerupContainer,options){
        this.options = options;
        this.uiGraphics = scene.add.image(-this.options._radius/2,-this.options._radius/2,requiredAssets.pow.key);
        this.uiGraphics.displayWidth = this.options._radius*2;
        this.uiGraphics.displayHeight = this.options._radius*2;
        powerupContainer.add(this.uiGraphics);

    }
    static loadAssets(scene){
        scene.load.image(requiredAssets.pow.key, 
            requiredAssets.pow.file);
    }

}