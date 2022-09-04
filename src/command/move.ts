import { Location } from "../helper/location";
import { Sprite } from "../sprite/sprite";
import { Command } from "./command";

export class Move implements Command {
    private sprite!: Sprite;
    private location!: Location | null;

    constructor(sprite: Sprite, location: Location | null){
        this.sprite = sprite;
        this.location = location;
    }

    execute(): void {
        this.sprite.update(this.location);
    }
    undo(): void {
        this.sprite.undo();
    }
}