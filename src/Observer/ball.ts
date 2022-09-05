import { Sprite } from "./observer";

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
      this.x += this.vx;
      this.y += this.vy;
  }
  draw() {
    let ctx : CanvasRenderingContext2D = this.canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};