import { Sprite } from "../Observer/observer";

export class Brick implements Sprite{
	constructor(canvas:HTMLCanvasElement){
        this.color = 'yellow';
        this.left = 0;
        this.top = 0;
        this.width = 30;
        this.height = 10;
        this.ctx = canvas.getContext('2d');
    }
    ctx: CanvasRenderingContext2D;
    color: string;
	left : number;
	top : number;
	width :number;
	height : number;
    update(): void {
        this.draw(this.ctx);
    }
    draw(ctx:CanvasRenderingContext2D):void{
        this.drawBorder(ctx, this.left, this.top, this.width, this.height);
        
		ctx.fillStyle = this.color;
        ctx.fillRect(this.left, this.top, this.width, this.height);
    }
    private drawBorder(ctx : CanvasRenderingContext2D, xPos:number, yPos:number, width:number, height:number, thickness : number = 2){
            ctx.fillStyle='#000';
            ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
        }
}