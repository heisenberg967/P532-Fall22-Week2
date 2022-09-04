import { Constants } from "../helper/constants";
import { Location } from "../helper/location";
import { Ball } from "./ball";
import { Sprite } from "./sprite";

export class Brick implements Sprite {
    private location!: Location;
    private visible: boolean = true;
    private history!: Array<boolean>;

    constructor(x: number, y:number){
        this.location = new Location(x, y);
        this.history = new Array();
    }

    get posX() {
        return this.location.getXPosition;
    }

    get posY() {
        return this.location.getXPosition;
    }
    
    draw(ctx: CanvasRenderingContext2D): void {
        if (this.visible){
            ctx.beginPath();
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(this.location.getXPosition, this.location.getYPosition, Constants.BRICK_WIDTH, Constants.BRICK_HEIGHT);
            ctx.fillStyle = "#000000";
            ctx.fillRect(this.location.getXPosition + 2 , this.location.getYPosition + 2, Constants.BRICK_WIDTH - 4, Constants.BRICK_HEIGHT - 4);
            ctx.fill();
            ctx.closePath();
        }
    }
    
    update(location: Location): void {
        // brick doesn't move -> do nothing
    }

    undo(): void {
        if (this.history.length > 0){
            let lastLocation = this.history[this.history.length-1];
            this.visible = lastLocation; //check visibility for brick
        }
    }

    replay(stage: number) {
        if (this.history.length > stage) {
			this.visible = this.history[stage];
		}
    }

    hideBrick(): void {
        this.visible = false;
    }

    isBrickVisible(): boolean {
        return this.visible;
    }

    hitBy(ball: Ball): boolean {
        if (this.isBrickVisible()){
            let isHit: boolean = false;

            //check if hits from bottom or top
            // bottom
            if (ball.posX <= (this.posX + Constants.BRICK_HEIGHT) && (ball.posY >= (this.posY + (Constants.BRICK_HEIGHT/2)))){
                ball.speedY = ball.speedY * -1;
                isHit = true;
            }
            // top
            else if ( (ball.posY >= (this.posY - Constants.BALL_RADIUS)) && (ball.posY < (this.posY + (Constants.BALL_RADIUS/3)))){
                ball.speedY = ball.speedY * -1;
                isHit = true;
            }
            // from side
            else if (ball.posY <= (this.posY + Constants.BRICK_HEIGHT) && ball.posY >= this.posY){
                // right
                if (ball.posX <= (this.posX + Constants.BRICK_WIDTH) && ball.posX > (this.posX + (Constants.BRICK_WIDTH - (Constants.BALL_RADIUS/2)))) {
                    ball.speedX = ball.speedX * -1;
                    isHit = true;
                }
                // left
                if (ball.posX >= (this.posX - Constants.BALL_RADIUS) && ball.posX < (this.posX + ((Constants.BALL_RADIUS/2)))) {
                    ball.speedX = ball.speedX * -1;
                    isHit = true;
                }
            }
            this.history.push(!isHit);
            return isHit;
        }
        else {
            this.history.push(this.visible);
            return this.visible;
        }
    }

}