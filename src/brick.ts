import { Sprite } from "./interfaces/Isprite";

export class Brick implements Sprite{
	constructor(canvas:HTMLCanvasElement){
        this.color = 'yellow';
        this.left = 0;
        this.top = 0;
        this.width = 30;
        this.height = 10;
        this.isalive = true
        
        let tctx : CanvasRenderingContext2D | null;
        if(!(tctx = canvas.getContext('2d'))){
            throw new Error('2d content not supported or canvas already initialized')
        }
        else{
            this.ctx = tctx
        }
    }
    ctx: CanvasRenderingContext2D;
    color: string;
	left : number;
	top : number;
	width :number;
	height : number;
    isalive: boolean = false;

    update(): void {
        this.draw(this.ctx);
    }

    draw(ctx:CanvasRenderingContext2D):void{
        if(this.isalive){
            this.drawBorder(ctx, this.left, this.top, this.width, this.height);
		    ctx.fillStyle = this.color;
            ctx.fillRect(this.left, this.top, this.width, this.height);
        }
    }

    private drawBorder(ctx : CanvasRenderingContext2D, xPos:number, yPos:number, width:number, height:number, thickness : number = 2){
            if(this.isalive){
                ctx.fillStyle='#000';
                ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
            }
        }
}