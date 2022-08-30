interface IPosition {
    x: number,
    y: number
  }
  
  interface IPaddle {
    height: number,
    width: number,
    x: number
  }
  
  interface IBrick extends IPosition {
    status: boolean
  }
  
  interface IBreakoutGameArgs {
    ctx: IContextPath2D,
    canvas: HTMLCanvasElement,
    ballPosition?: IPosition,
    ballChange?: IPosition,
    ballRadius?: number,
    bricks?: IBrick[][],
    document: HTMLDocument
  }
  