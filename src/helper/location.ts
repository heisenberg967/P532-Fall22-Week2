export class Location {
    private posX!: number;
    private posY!: number;

    constructor(x: number, y: number){
        this.posX = x;
        this.posY = y;
    }

    get getXPosition() {
        //console.log('getXposition called');
        return this.posX;
    }

    set setXPosition(posX: number) {
        this.posX = posX;
    }

    get getYPosition() {
        return this.posY;
    }

    set setYPosition(posY: number) {
        this.posY = posY;
    }

    add(posX: number, posY: number) {
        this.posX += posX;
        this.posY += posY;
    }
}