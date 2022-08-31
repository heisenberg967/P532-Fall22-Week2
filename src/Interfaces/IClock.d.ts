import { Sprite } from "./ISprite";

interface IClock implements Sprite{
    update() : void;
    runClock: () => void;
    setTime: () => void;
    updateTimeVal: (val: number) => string;
}