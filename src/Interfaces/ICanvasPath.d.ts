interface ICanvasPath {
    beginPath: () => ICanvasPath;
    clearRect: (x: number, y: number, width: number, height: number) => ICanvasPath;
    rect: (x: number, y: number, width: number, height: number) => ICanvasPath;
    fillStyle: (color: string | CanvasGradient | CanvasPattern) => ICanvasPath;
    fill: () => ICanvasPath;
    closePath: () => ICanvasPath;
    arc: (x: number, y: number, radius: number, startAngle: number, endAngle: number, antiClockwise?: boolean) => ICanvasPath;
    stroke: () => ICanvasPath;
    font: (fontStyle: string) => ICanvasPath;
    fillText: (text: string, x: number, y: number) => ICanvasPath;
}