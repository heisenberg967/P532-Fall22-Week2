import { Sprite } from "./observer";

export class Clock implements Sprite{
    constructor(canvas:HTMLCanvasElement){
        this.canvas = canvas;
        this.time = 0;
        
    };
    time : number;
    canvas : HTMLCanvasElement;
	
	update(): void {
    this.time += 1;
	}

    draw(): void {
        let secs = (this.time/10);
        let ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
        let h = Math.floor(secs / 3600);
        let m = Math.floor(secs % 3600 / 60);
        let s = Math.floor(secs % 3600 % 60);
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.font = "20px Arial";
        ctx.fillText(h+":"+m+":"+s, 0, this.canvas.height / 2);
    }
}
