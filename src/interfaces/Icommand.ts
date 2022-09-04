export interface Command{
    execute(arg : object) : void; // do() we can't "do" in code since "do" is a keyword in typescript
    undo(arg : object) : void;
}