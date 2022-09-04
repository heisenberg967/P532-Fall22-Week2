import { Command } from "./interfaces/Icommand";
import { Constant } from "./Constants";
import { Ball } from "./ball";
import { Brick } from "./brick";

class BrickBlowCommand implements Command{

    execute(brick : Brick): void {
      brick.isalive = false
      // undohistory.append(brick)
    }
    undo(brick : Brick): void {
        brick.isalive = !brick.isalive
    }
}
