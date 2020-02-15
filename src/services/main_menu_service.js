export const required_assets = {
    skin:'blank_skin.png'
}
export class MainMenuService {
    constructor(scene){
        
    }

    static loadAssets(scene,loadAssetHandler) {
        for(var asset in required_assets){
            //console.log(propt + ': ' + obj[propt]);
        }
    }
}