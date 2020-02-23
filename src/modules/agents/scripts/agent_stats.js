export const typesOfCommunication ={ 
    information:0,
    direct:0,
    methaphores: 0
}
export class AgentsStats{
    
    constructor(){
        this.stats = {};
        this._trust = 0; 
        this._communicationStyles = Object.assign({},typesOfCommunication);
    }
    
    set name(value){
        this.stats['name'] = value;
    }
    get name(){
        return this.stats['name'];
    }

    setCommunicationStyle(informationFactor,directFactor,metaphoresFactor){
        this._communicationStyles.direct = directFactor;
        this._communicationStyles.methaphores = metaphoresFactor;
        this._communicationStyles.information = informationFactor;
    }

    generateRandomStyle(){
        this.setCommunicationStyle(
            Phaser.Math.Between(0,1),
            Phaser.Math.Between(0,1),
            Phaser.Math.Between(0,1));
    }
    
}