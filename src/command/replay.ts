import { Sprite } from "../sprite/sprite";
import { Command } from "./command";

export class Replay implements Command {
    private sprite!: Sprite;
    private stage!: number;

    constructor(sprite: Sprite, stage: number) {
        this.sprite = sprite;
        this.stage = stage;
    }

    execute(): void {
        this.sprite.replay(this.stage);
    }
    undo(): void {
        // do nothing
    }
}