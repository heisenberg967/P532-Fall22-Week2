export class Brick {
	constructor(canvas:HTMLCanvasElement){
        this.color = 'yellow';
        this.left = 0;
        this.top = 0;
        this.width = 30;
        this.height = 10;
    }
    color: string;
	left : number;
	top : number;
	width :number;
	height : number;
}