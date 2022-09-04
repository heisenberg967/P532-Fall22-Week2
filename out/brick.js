"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brick = void 0;
class Brick {
    constructor(canvas) {
        this.isalive = false;
        this.color = 'yellow';
        this.left = 0;
        this.top = 0;
        this.width = 30;
        this.height = 10;
        this.isalive = true;
        let tctx;
        if (!(tctx = canvas.getContext('2d'))) {
            throw new Error('2d content not supported or canvas already initialized');
        }
        else {
            this.ctx = tctx;
        }
    }
    update() {
        this.draw(this.ctx);
    }
    draw(ctx) {
        if (this.isalive) {
            this.drawBorder(ctx, this.left, this.top, this.width, this.height);
            ctx.fillStyle = this.color;
            ctx.fillRect(this.left, this.top, this.width, this.height);
        }
    }
    drawBorder(ctx, xPos, yPos, width, height, thickness = 2) {
        if (this.isalive) {
            ctx.fillStyle = '#000';
            ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
        }
    }
}
exports.Brick = Brick;
//# sourceMappingURL=brick.js.map