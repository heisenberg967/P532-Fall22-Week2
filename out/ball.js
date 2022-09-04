"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ball = void 0;
class Ball {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 2;
        this.vx = 4;
        this.vy = 4;
        this.radius = 10;
        this.color = 'blue';
    }
    update() {
        this.draw();
    }
    draw() {
        let ctx = this.canvas.getContext('2d');
        if (!(ctx = canvas.getContext("2d"))) {
            throw new Error(`2d context not supported or canvas already initialized`);
        }
        else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
}
exports.Ball = Ball;
;
//# sourceMappingURL=ball.js.map