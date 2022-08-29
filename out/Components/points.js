export class Points {
    constructor(canvas) {
        this.value = "0";
    }
    ;
    add(x) {
        this.value = (parseInt(this.value) + x).toString();
    }
    ;
    draw(ctx) {
        ctx.font = "30px Arial";
        ctx.fillText(this.value, 30, 30);
    }
}
