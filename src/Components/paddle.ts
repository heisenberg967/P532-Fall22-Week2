export class Paddle {
    constructor(canvas : HTMLCanvasElement)
    {
        this.canvas = canvas;
        this.x = canvas.width/2;
        this.y = canvas.height - (canvas.height/20);
        this.width = 80;
        this.height = 10;
    };
   canvas : HTMLCanvasElement;
   x : number;
   y : number;
   width : number;
   height : number; 
   moveLeft(x:number){
    if(this.x > 0)   
        this.x -= x;
   }
   moveRight(x:number){
    if((this.x + this.width) < this.canvas.width)
        this.x += x;
}
   draw(ctx: CanvasRenderingContext2D){
    
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.width, this.height);
   }
}