import char_male_brown_hair_spritemap from '../../../assets/char_male_brown_hair.png';
import char_female_red_hair_spritemap from '../../../assets/char_female_red_hair.png';
import char_male_blond_spritemap from '../../../assets/char_male_blond.png';
import character_male_redhair_spritemap from '../../../assets/character_male_redhair.png';


import blank_body_image from '../../../assets/blank_body.png';
import TextFactroy from '../../../services/text_label_factory';
import { CircularHealthBar } from '../../../services/circular_progressbar';
export const required_assets = {
    head:{
        skins:{
            male_brown_hair:{file:char_male_brown_hair_spritemap,key:'male_brown_hair'},
            female_red_hair:{ file: char_female_red_hair_spritemap,key:'female_red_hair'},
            male_blond:{file:char_male_blond_spritemap,key:'male_blond'},
            male_redhair:{file: character_male_redhair_spritemap,key:'male_redhair'}
        },
        key:'char_male_brown_hair',
        file:char_male_brown_hair_spritemap,
        config:{frameWidth: 32, frameHeight: 32},
        anims:{
            idle:{
                frames:[0],
                key:'idle'
            },
            getHit:{
                frames:[1],
                key:'getHit'
            },
            attack:{
                frames:[2],
                key:'attack'
            }
        }
    },
    body:{
        key:'blank_body',
        file:blank_body_image
    }
}

export class AgentBaseUI extends Phaser.GameObjects.Container{
    
    constructor(scene,stats){
        super(scene,0,0);
        this.health = new CircularHealthBar(scene,0,0,stats.getStyleColor()); 
        this.add(this.health.bar);
        this.health.bar.setDepth(-1000);
        this.health.setValue(stats._trust);
        this.visualBody = scene.add.image(0,20,required_assets.body.key).setDepth(10);
        this.add(this.visualBody);
        this.animationConfig = Object.assign({},required_assets.head.anims); // setup the initialc configuration for animation 
        this.spriteConfig = {};// empty object for starts 
        this.head =  this.chooseRandomeFace(scene);
        this.head.anims.play(this.animationConfig.idle.key);
        this.nameLabel = TextFactroy.create_text(scene,0,-50,stats.name);
        this.add(this.nameLabel);
        
    }   
    chooseRandomeFace(scene){
        var faceArray = [];
        for(var skin in required_assets.head.skins){
            faceArray.push(Object.assign({},required_assets.head.skins[skin]));
        }
        var randomFace = faceArray[Phaser.Math.Between(0,faceArray.length-1)];
         
        // update the animation configuration based on the selected face
        this.animationConfig = {};
        for(var animKey in required_assets.head.anims){
            var key  = '' + required_assets.head.anims[animKey].key+'_'+ randomFace.key;
            
            // this.animationConfig[animKey]['key']=key
            // this.animationConfig[animKey]['frames']=required_assets.head.anims[animKey].frames;
        }
        
        console.log(this.animationConfig);
        this.spriteConfig = {...randomFace,anims:{...this.animationConfig}};
        console.log(this.spriteConfig);      
        var face = this.createSpriteWithAnimation(scene,this.spriteConfig);
        
        return face;
    }
    updateUI(trust){
        this.health.setValue(Phaser.Math.Clamp(100-trust,0.01,99.99));
    }
    animate(key){
        this.head.anims.play(this.animationConfig[key].key);
        this.head.anims.chain(this.animationConfig['idle'].key);
    }
    createSpriteWithAnimation(scene,assetObject){
        var sprite = scene.add.sprite(0, 0, assetObject.key)
        .setOrigin(0.5,0.5)
        .setScale(2);
         
        this.add(sprite);
        
        this.createAnimation(scene,sprite,assetObject.key,assetObject.anims.idle.key,0);
        this.createAnimation(scene,sprite,assetObject.key,assetObject.anims.getHit.key,1);
        this.createAnimation(scene,sprite,assetObject.key,assetObject.anims.attack.key,2);
        return sprite;
    }
    createAnimation (scene,spriteInstance,assetKey,animationKey,frameNumber){
         
        var config = {
            key: animationKey,
            frames: scene.anims.generateFrameNumbers(assetKey,{ frames: [ frameNumber ] }),
            frameRate: 1,
            duration:500,
            yoyo: false,
            repeat: 1
        }
        scene.anims.create(config)
        spriteInstance.anims.load(animationKey);
         
    }

    static loadAssets(scene) {
        for(var skin in required_assets.head.skins){
            var s= required_assets.head.skins[skin];
            scene.load.spritesheet(s.key,s.file,required_assets.head.config);
        }
        scene.load.image(required_assets.body.key, 
                required_assets.body.file);
    }

}