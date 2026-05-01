export class CanvasLocal {

  protected graphics: CanvasRenderingContext2D;
  protected rWidth: number;
  protected rHeight: number;
  protected maxX: number;
  protected maxY: number;
  protected pixelSize: number;
  protected centerX: number;
  protected centerY: number;

  public constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.graphics = g;
    this.rWidth = 12;
    this.rHeight = 8;
    this.maxX = canvas.width - 1;
    this.maxY = canvas.height - 1;
    this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
    this.centerX = this.maxX / 12;
    this.centerY = this.maxY / 8 * 7;
  }

  iX(x: number): number { return Math.round(this.centerX + x / this.pixelSize); }
  iY(y: number): number { return Math.round(this.centerY - y / this.pixelSize); }

  drawLine(x1: number, y1: number, x2: number, y2: number) {
    this.graphics.beginPath();
    this.graphics.moveTo(x1, y1);
    this.graphics.lineTo(x2, y2);
    this.graphics.stroke();
  }

  maxH(h: number[]): number {
    let max = h[0];
    for (let i = 1; i < h.length; i++) {
      if (max < h[i]) max = h[i];
    }

    let pot = 10;
    while (pot < max) pot *= 10;
    pot /= 10;

    return Math.ceil(max / pot) * pot;
  }

 //barra horizontal
  drawBarraHorizontal3D(x: number, y: number, largo: number, alto: number, color: string) {

    const d = 0.4;

    this.graphics.fillStyle = color;
    this.graphics.strokeStyle = 'black';

    // frente
    this.graphics.beginPath();
    this.graphics.moveTo(this.iX(x), this.iY(y));
    this.graphics.lineTo(this.iX(x + largo), this.iY(y));
    this.graphics.lineTo(this.iX(x + largo), this.iY(y + alto));
    this.graphics.lineTo(this.iX(x), this.iY(y + alto));
    this.graphics.closePath();
    this.graphics.fill();
    this.graphics.stroke();

    // arriba
    this.graphics.beginPath();
    this.graphics.moveTo(this.iX(x), this.iY(y));
    this.graphics.lineTo(this.iX(x + d), this.iY(y - d));
    this.graphics.lineTo(this.iX(x + largo + d), this.iY(y - d));
    this.graphics.lineTo(this.iX(x + largo), this.iY(y));
    this.graphics.closePath();
    this.graphics.fill();
    this.graphics.stroke();

    // lado
    this.graphics.beginPath();
    this.graphics.moveTo(this.iX(x + largo), this.iY(y));
    this.graphics.lineTo(this.iX(x + largo + d), this.iY(y - d));
    this.graphics.lineTo(this.iX(x + largo + d), this.iY(y + alto - d));
    this.graphics.lineTo(this.iX(x + largo), this.iY(y + alto));
    this.graphics.closePath();
    this.graphics.fill();
    this.graphics.stroke();
  }

  drawGrid3D(maxEsc: number) {

  let niveles = 4;

  for (let i = 1; i <= niveles; i++) {

    let valor = (maxEsc * i) / niveles;
    let x = 6 * valor / maxEsc;

    // línea principal
    this.drawLine(this.iX(x+.4), this.iY(0), this.iX(x+.4), this.iY(6));

    // profundidad
    this.drawLine(this.iX(x+.4), this.iY(6), this.iX(x - 0.1), this.iY(6.5));
  }
  // base 
    this.drawLine(this.iX(0.4), this.iY(6), this.iX(0), this.iY(6.5));
    this.drawLine(this.iX(0.4), this.iY(0), this.iX(0.4), this.iY(6));
}

  // metodo principal
  paintHorizontal(h: number[]) {
    

    const maxEsc = this.maxH(h);
    const colors = ['magenta', 'red', 'green', 'yellow', 'blue'];
    const labels = ['magenta', 'red', 'green', 'yellow', 'blue'];

    this.graphics.clearRect(0, 0, this.maxX, this.maxY);
    this.graphics.font = "12px Arial";
    this.graphics.strokeStyle = 'gray';
    this.drawGrid3D(maxEsc);
    this.graphics.strokeStyle = 'black';

    // ejes
    this.drawLine(this.iX(0), this.iY(6.5), this.iX(6.3), this.iY(6.5));
    this.drawLine(this.iX(0), this.iY(0), this.iX(0), this.iY(6.5));

    this.graphics.fillText(
    "0",
    this.iX(0-.4),
    this.iY(6.7)
    );

    // escala inferior
    let divisiones = 4;
    for (let i = 1; i <= divisiones; i++) {

      let valor = (maxEsc * i) / divisiones;
      let x = 6 * valor / maxEsc;

      this.graphics.fillText(
        valor.toString(),
        this.iX(x-.5),
        this.iY(6.7)
      );
    }
    
    // barras
    let alto = 0.7;
    let espacio = 1.3;
    let y = 6 - alto;

    for (let i = 0; i < h.length; i++) {

      let largo = 6 * h[i] / maxEsc;

      this.drawBarraHorizontal3D(
        0,
        y,
        largo,
        alto,
        colors[i % colors.length]
      );

      // etiquetas 
      this.graphics.fillText(
        labels[i % labels.length],
        this.iX(-1),
        this.iY(y + 0.4)
      );

      y -= espacio;
    }


    const coloresUsados: string[] = [];

     for (let i = 0; i < h.length; i++) {
     const color = colors[i % colors.length];

     if (coloresUsados.indexOf(color)=== -1) {
       coloresUsados.push(color);
      }
     }

    // colores
    let yLeyenda = 6;

for (let i = 0; i < coloresUsados.length; i++) {

  this.graphics.fillStyle = coloresUsados[i];

  // cuadrito de color
  this.graphics.fillRect(
    this.iX(7.5),
    this.iY(yLeyenda+.5),
    12,
    12
  );

  // texto color
  this.graphics.fillStyle = 'black';
  this.graphics.fillText(
    coloresUsados[i],
    this.iX(7.8),
    this.iY(yLeyenda + 0.3)
  );

  yLeyenda -= 0.8;
}
  }
}