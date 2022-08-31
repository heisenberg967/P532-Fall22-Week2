import { Sprite } from "./Interfaces/ISprite";
export class Observable{
    private sprites : Array<Sprite> = [];
    attach(sprite : Sprite): void {
        if(!this.sprites.some((e)=> e==sprite))
        this.sprites.push(sprite);
    }
    detach(sprite : Sprite): void {
        for(let i = 0; i < this.sprites.length; i++){
            if(this.sprites[i] == sprite){
                this.sprites.splice(this.sprites.indexOf(this.sprites[i]), 1);
            }
        }
    }
    changeState(): void {
        this.sprites.forEach(element => {
            element.update();
        });
    }
}