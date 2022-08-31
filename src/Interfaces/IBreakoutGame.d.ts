import { Sprite } from "./ISprite";

  interface IBreakoutGame extends Sprite{
      collisionDetection(): void;
      drawBall(): void;
      drawPaddle(): void;
      drawBricks(): void;
      createBricks(): void;
      draw(): void;
      keyDown(event: KeyboardEvent): void;
      keyUp(event: KeyboardEvent): void;
      run(): void;
      getScore(): number;
      drawScore(): void;
      checkGameState(): void;
      mouseMoveHandler(event: MouseEvent): void;
  }
  