import { Sprite } from "../Observer/observer";

export class Points implements Sprite{
	constructor(private readonly canvas:HTMLCanvasElement){
        this.value = "0";
    };
    value : string;
	add(x : number){
		this.value =  (parseInt(this.value) + x).toString();
	};
	update():void{
		this.draw(this.canvas.getContext('2d'));
	}
	draw(ctx: CanvasRenderingContext2D){
		ctx.font = "30px Arial";
		ctx.fillText(this.value, 30, 30);
	}	
}