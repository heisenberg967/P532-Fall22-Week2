import { Location } from "../helper/location";

export interface Sprite {
    draw(ctx: CanvasRenderingContext2D): void;
    update(location: Location | null): void;
    undo(): void;
    replay(stage: number): void;
    // maybe move getters/setters here later
}