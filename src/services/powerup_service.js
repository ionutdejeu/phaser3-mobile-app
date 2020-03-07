
import pow_image_file from '../assets/Powerup_spritesheet.png';
export class PowerupOptions {
    constructor(object){
        this._radius = object.radius||30; 
        this._backgrounColor = object.backgrounColor || 0xDADADA;
        this._borderColor = object.borderColor || 0xFFFFFF;
        this._borderWidth = object.borderWidth || 4;
        this._type = requiredAssets.pow.anims.action;
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
    set type(value){
        switch (value) {
            case "action":
                this._type = requiredAssets.pow.anims.action;
                break;
            case "information":
                this._type = requiredAssets.pow.anims.information;
                break;
            case "metaphores":
                this._type = requiredAssets.pow.anims.metaphores;
                break;
            default:
                break;
        }
    }
    get type(){
        return this._type.key;    
    }
    random(){
        var typesCollection = ['action','information','metaphores']
        this.type = typesCollection[Phaser.Math.Between(0,3)];
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
        file:pow_image_file,
        config:{frameWidth: 32, frameHeight: 32},
        anims:{
            action:{
                frames:[0],
                key:'action'
            },
            information:{
                frames:[1],
                key:'information'
            },
            metaphores:{
                frames:[2],
                key:'metaphores'
            }
        }
    }
}

export class Powerup extends Phaser.GameObjects.Container{ 
    constructor(scene,x,y,options,tapCallback){
        super(scene,x,y);
        scene.add.existing(this);
        this.options = new PowerupOptions(options);
        this.options.random();
        this.visualUI = new PowerupBaseUI(scene,this,this.options);
        
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
            this.scene.events.emit(powerupEvents.ACTIVATED,this);
            super.destroy();
            this.destroy();
            
             
        });
    }


    static loadAssets(scene){
        scene.load.spritesheet(requiredAssets.pow.key, 
            requiredAssets.pow.file,{frameWidth: 126, frameHeight: 126});
    }

}
export class PowerupBaseUI{
    constructor(scene,powerupContainer,options){
        this.options = options;
        this.createSpriteWithAnimation(scene,powerupContainer,requiredAssets.pow)
        this.uiGraphics.anims.play(options.type);

    }
    createSpriteWithAnimation(scene,powerupContainer,assetObject){
        
        this.uiGraphics = scene.add.sprite(-this.options._radius/2,-this.options._radius/2,requiredAssets.pow.key);
        this.uiGraphics.displayWidth = this.options._radius*2;
        this.uiGraphics.displayHeight = this.options._radius*2;
         
        powerupContainer.add(this.uiGraphics);
        
        this.createAnimation(scene,
            this.uiGraphics,
            assetObject.key,
            assetObject.anims.action.key,
            assetObject.anims.action.frames);
        this.createAnimation(scene,
            this.uiGraphics,
            assetObject.key,
            assetObject.anims.information.key,
            assetObject.anims.information.frames);
        this.createAnimation(scene,
            this.uiGraphics,
            assetObject.key,
            assetObject.anims.metaphores.key,
            assetObject.anims.metaphores.frames);
         
        return this.uiGraphics;
    }
    createAnimation (scene,spriteInstance,assetKey,animationKey,frames){
        var config = {
            key: animationKey,
            frames: scene.anims.generateFrameNumbers(assetKey,{ frames:frames }),
            frameRate: 1,
            duration:500,
            yoyo: false,
            repeat: 1
        }
        scene.anims.create(config)
        spriteInstance.anims.load(animationKey);
         
    }
    
    static loadAssets(scene){
        scene.load.image(requiredAssets.pow.key, 
            requiredAssets.pow.file);
    }


}