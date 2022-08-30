export class CanvasPath implements ICanvasPath {
    private  ctx!: CanvasRenderingContext2D | undefined | null;

    constructor(ctx?: CanvasRenderingContext2D | null) {
        this.ctx = ctx;
    }

    beginPath = (): ICanvasPath => {
        this.ctx?.beginPath()
        return this;
    }

    clearRect = (x: number, y: number, width: number, height: number): ICanvasPath => {
        this.ctx?.clearRect(x,y,width,height);
        return this;
    }

    rect = (x: number, y: number, width: number, height: number): ICanvasPath => {
        this.ctx?.rect(x,y,width,height);
        return this;
    }

    fillStyle = (color: string | CanvasGradient | CanvasPattern): ICanvasPath => {
        if (this.ctx) {
            this.ctx.fillStyle = color;
        }
        return this;
    }

    fill = (): ICanvasPath => {
        this.ctx?.fill();
        return this;
    }

    closePath = (): ICanvasPath => {
        this.ctx?.closePath();
        return this;
    }

    arc = (x: number, y: number, radius: number, startAngle: number, endAngle: number, antiClockwise: boolean | undefined): ICanvasPath => {
        this.ctx?.arc(x,y,radius,startAngle,endAngle,antiClockwise);
        return this;
    }

    stroke = (): ICanvasPath => {
        this.ctx?.stroke();
        return this;
    }

    font = (fontStyle: string): ICanvasPath => {
        if(this.ctx) {
            this.ctx.font = fontStyle;
        }
        return this;
    }

    fillText = (text: string, x: number, y: number): ICanvasPath => {
        this.ctx?.fillText(text, x, y);
        return this;
    }
}