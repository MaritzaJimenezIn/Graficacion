export class CanvasLocal {
  protected graphics: CanvasRenderingContext2D;
      
  public constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement){
    this.graphics = g;
  }

  drawLine(x1: number, y1: number, x2: number, y2:number) {
    this.graphics.beginPath();
    this.graphics.moveTo(x1, y1);
    this.graphics.lineTo(x2, y2);
    this.graphics.stroke();
  }

  paint() {
    this.graphics.clearRect(0, 0, 640, 480);

    // centro del canvas
    const maxX = 640;
    const maxY = 480;

    const xCenter = maxX / 2;
    const yCenter = maxY / 2;

    // tamaño inicial del cuadrado
    const side = 0.9 * Math.min(maxX, maxY);
    const half = side / 2;

    // vértices iniciales
    let xA = xCenter - half;
    let yA = yCenter - half;

    let xB = xCenter + half;
    let yB = yCenter - half;

    let xC = xCenter + half;
    let yC = yCenter + half;

    let xD = xCenter - half;
    let yD = yCenter + half;

    // parámetros del espiral
    const q = 0.05;
    const p = 1 - q;

    // espiral
    for(let i = 0; i < 50; i++){

      // dibujar cuadrado
      this.drawLine(xA,yA,xB,yB);
      this.drawLine(xB,yB,xC,yC);
      this.drawLine(xC,yC,xD,yD);
      this.drawLine(xD,yD,xA,yA);

      let xA1 = p*xA + q*xB;
      let yA1 = p*yA + q*yB;

      let xB1 = p*xB + q*xC;
      let yB1 = p*yB + q*yC;

      let xC1 = p*xC + q*xD;
      let yC1 = p*yC + q*yD;

      let xD1 = p*xD + q*xA;
      let yD1 = p*yD + q*yA;

      xA = xA1; yA = yA1;
      xB = xB1; yB = yB1;
      xC = xC1; yC = yC1;
      xD = xD1; yD = yD1;
    }
  }
}