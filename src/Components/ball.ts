import { Sprite } from "../Observer/observer";
import { MoveBallCommand } from "../Command/command.js";
import { state } from "../Observable/observable";
export class Ball implements Sprite{
    constructor(private readonly canvas:HTMLCanvasElement, x:number, y:number){
        this.x =  x;
        this.y = y;
        this.vx = 4;
        this.vy = 10;
        this.radius = 10;
        this.color = 'blue';
    }
  
  x:number;
  y:number; 
  vx:number;
  vy:number;
  radius: number;
  color: string;
  update(): void {
    console.log('ball update x y');
    console.log(this.x);
    console.log(this.y);
      this.x += this.vx;
      this.y += this.vy;
  }
  draw() {
    
    // console.log('ball draw x and y and canvas x y:');
    // console.log(this.x);
    // console.log(this.y);
    // console.log(this.canvas.height);
    // console.log(this.canvas.width);

    let ctx : CanvasRenderingContext2D = this.canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};