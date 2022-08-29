export class Clock {
    constructor(canvas) {
        this.canvas = canvas;
        this.time = 0;
    }
    ;
    // add(x : number){
    // 	this.value =  (parseInt(this.value) + x).toString();
    // };
    update() {
        this.time += 1;
        let secs = (this.time / 10);
        let ctx = this.canvas.getContext('2d');
        let h = Math.floor(secs / 3600);
        let m = Math.floor(secs % 3600 / 60);
        let s = Math.floor(secs % 3600 % 60);
        // let hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        // let mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        // let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.font = "20px Arial";
        ctx.fillText(h + ":" + m + ":" + s, 0, this.canvas.height / 2);
    }
}
