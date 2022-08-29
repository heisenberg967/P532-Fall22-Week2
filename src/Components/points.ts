export class Points {
	constructor(canvas:HTMLCanvasElement){
        this.value = "0";
    };
    value : string;
	add(x : number){
		this.value =  (parseInt(this.value) + x).toString();
	};
	draw(ctx: CanvasRenderingContext2D){
		ctx.font = "30px Arial";
		ctx.fillText(this.value, 30, 30);
	}	
}