export class Paddle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = canvas.width / 2;
        this.y = canvas.height - (canvas.height / 20);
        this.width = 80;
        this.height = 10;
    }
    ;
    moveLeft(x) {
        if (this.x > 0)
            this.x -= x;
    }
    moveRight(x) {
        if ((this.x + this.width) < this.canvas.width)
            this.x += x;
    }
    update() {
        this.draw(this.canvas.getContext('2d'));
    }
    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
