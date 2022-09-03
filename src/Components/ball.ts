import { Sprite } from "../Observer/observer";
import { MoveCommand } from "../Command/command.js";
import { state } from "../Observable/observable";
export class Ball implements Sprite{
    constructor(private readonly canvas:HTMLCanvasElement){
        this.x =  this.canvas.width/2;
        this.y = this.canvas.height/2;
        this.vx = 4;
        this.vy = 4;
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
      this.x += this.vx;
      this.y += this.vy;
      this.draw();
  }
  draw() {
    console.log("ball draw");
    let ctx : CanvasRenderingContext2D = this.canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};