import { Sprite } from "../sprite/sprite";
import { Command } from "./command";

export class Undo implements Command {
    private sprite!: Sprite;

    constructor(sprite: Sprite) {
        this.sprite = sprite;
    }
    execute(): void {
        this.sprite.undo();
    }
    undo(): void {
        // do nothing
    }
}