import { state } from "../Observable/observable";
import { Sprite } from "../Observer/observer";

export enum leftRight{
    left, 
    right, 
    none,
}
export class Paddle implements Sprite{
    constructor(canvas : HTMLCanvasElement, x:number)
    {
        this.canvas = canvas;
        this.x = x;
        this.y = canvas.height - (canvas.height/20);
        this.width = 80;
        this.height = 10;
        this.vx = 10;
    };
   canvas : HTMLCanvasElement;
   x : number;
   y : number;
   width : number;
   height : number; 
   vx : number;
   
   moveLeft(){
    if(this.x > 0)   
        this.x -= this.vx;
   }
   moveRight(){
    if((this.x + this.width) < this.canvas.width)
        this.x += this.vx;
}
    update(): void {
        this.draw();
    }
   draw(){
    let ctx = this.canvas.getContext('2d');
    
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.width, this.height);
   }
}