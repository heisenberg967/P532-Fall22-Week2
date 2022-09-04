import { Constants } from "../helper/constants";
import { Location } from "../helper/location";
import { Sprite } from "./sprite";

export class Ball implements Sprite {
    private canvas!: HTMLCanvasElement;
    private location!: Location;
    private dx!: number;
    private dy!: number;
    private history!: Array<Location>;
    // add sound

    constructor(x: number, y:number, dx: number, dy: number){
        this.canvas = this.canvas
        this.location = new Location(x, y);
        this.dx = dx;
        this.dy = dy;
        this.history = new Array();
    }

    get posX() {
        return this.location.getXPosition;
    }

    set posX(x: number) {
        this.location.setXPosition = x;
    }

    get posY() {
        return this.location.getXPosition;
    }

    set posY(y: number) {
        this.location.setYPosition = y;
    }

    get speedX() {
        return this.dx;
    }

    set speedX(dx: number) {
        this.dx = dx;
    }

    get speedY() {
        return this.dy;
    }

    set speedY(dy: number) {
        this.dy = dy;
    }

    move(): void {
        this.history.push(this.location);
        this.location.add(this.dx, this.dy);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.location.getXPosition, this.location.getYPosition, Constants.BALL_RADIUS, 0, Math.PI*2);
        ctx.closePath();
        ctx.fillStyle = "#011115"; //move to constants
        ctx.fill();
    }

    update(location: Location): void {
        this.location.add(this.dx, this.dy);
        if (location){
            this.history.push(new Location(location.getXPosition, location.getYPosition));
        }
    }

    undo(): void {
        if (this.history.length > 0){
            let lastLocation = this.history[this.history.length-1];
            this.location = lastLocation;
        }
    }

    replay(stage: number): void {
        if (this.history.length > stage) {
			this.location = this.history[stage];
		}
    }

    checkRightBoundaryCollisions(ball: Ball): boolean {
        if (ball.posX >= (480 - Constants.BALL_RADIUS) || ball.posX <= 0){
            return true;
        }
        else {
            return false;
        }
    }

    checkLeftBoundaryCollisions(ball: Ball): boolean {
        if (ball.posY <= 0){
            return true;
        }
        else {
            return false;
        }
    }
}