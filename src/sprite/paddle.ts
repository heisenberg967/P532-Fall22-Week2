import { Sprite } from "./sprite";
import { Constants } from "../helper/constants";
import { Location } from "../helper/location";
import { Ball } from "./ball";

export class Paddle implements Sprite {
    private canvas!: HTMLCanvasElement;
    private location!: Location;
    private lives!: number;
    private history!: Array<Location>;


    constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas;
        this.location = new Location(((this.canvas.width - Constants.PADDLE_WIDTH) / 2), (this.canvas.height-Constants.PADDLE_HEIGHT));
        this.history = new Array();
        this.lives = 1;
    }

    get posX() {
        return this.location.getXPosition;
    }

    set posX(x: number) {
        this.location.setXPosition = x;

        if (x < 0) {
            x = 0;
            this.location.setXPosition = x;
        }

        if (x > (this.canvas.width - Constants.PADDLE_WIDTH)) {
            x = this.canvas.width - Constants.PADDLE_WIDTH;
            this.location.setXPosition = x;
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.rect(this.location.getXPosition, this.location.getYPosition, Constants.PADDLE_WIDTH, Constants.PADDLE_HEIGHT);
        ctx.closePath();
        ctx.fillStyle = "#950000";
        ctx.fill();
    }

    update(location: Location): void {
        this.posX = location.getXPosition;
        this.history.push(new Location(location.getXPosition, location.getYPosition));
    }

    undo(): void {
        if (this.history.length > 0){
            let lastLocation = this.history[this.history.length-1];
            this.posX = lastLocation.getXPosition;
        }
    }

    replay(stage: number): void {
        if (this.history.length > 0) {
            this.location = this.history[stage];
        }
    }

    getLives(): number {
        return this.lives;
    }

    setLives(lives: number): void {
        this.lives = lives;
    } 

    hitPaddle(ball: Ball): boolean {
        if (ball.posX <= this.posX + (Constants.PADDLE_WIDTH + 15)) {
            if (ball.posX >= this.posX - 10) {
                if ( (ball.posY + (Constants.BALL_RADIUS - 1)) >= (this.canvas.height - 30)) {
                    if ( (ball.posY + (Constants.BALL_RADIUS - 1)) <= ((this.canvas.height - 30) + (Constants.PADDLE_HEIGHT - 5)) ) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}