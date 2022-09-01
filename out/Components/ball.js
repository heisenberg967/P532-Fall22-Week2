export class Ball {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 2;
        this.vx = 4;
        this.vy = 10;
        this.radius = 10;
        this.color = 'blue';
    }
    draw() {
        let ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
;
