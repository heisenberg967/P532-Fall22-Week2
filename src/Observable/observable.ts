import { Sprite } from "../Observer/observer";

export enum state{
    do,
    replay,
    undo
}

export class Observable{
    private sprites:Array<Sprite> = [];
    changeState():void{
        
        this.sprites.forEach(spr => spr.update())
    }
    attach(sprite:Sprite){
    if(!this.sprites.some((e)=> e==sprite))
        this.sprites.push(sprite);
    }
    detach(sprite:Sprite){
        for(let i = 0; i < this.sprites.length; i++){
            if(this.sprites[i] == sprite){
                this.sprites.splice(this.sprites.indexOf(this.sprites[i]), 1);
            }
        }
    }
}