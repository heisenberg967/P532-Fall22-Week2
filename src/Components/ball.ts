export class Ball {
    constructor(canvas:HTMLCanvasElement){
        this.x =  canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 10;
        this.color = 'blue';
    }
  x:number;
  y:number; 
  radius: number;
  color: string;
  draw(ctx:CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};