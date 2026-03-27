export class CanvasLocal {
    constructor(g, canvas) {
        this.minWidth = 1; // zoom in
        this.maxWidth = 5; // zoom out
        this.offsetX = 0;
        this.offsetY = 0;
        this.maxOffsetX = 2;
        this.maxOffsetY = 2;
        this.userFunction = (x) => NaN;
        this.color = "red";
        this.graphics = g;
        this.rWidth = 4;
        this.rHeight = 6;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.centerX = this.maxX / 2;
        this.centerY = this.maxY / 2;
        this.updatePixelSize();
    }
    updatePixelSize() {
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
    }
    zoom(factor) {
        const newWidth = this.rWidth * factor;
        const newHeight = this.rHeight * factor;
        // límites
        if (newWidth < this.minWidth || newWidth > this.maxWidth)
            return;
        this.rWidth = newWidth;
        this.rHeight = newHeight;
        this.updatePixelSize();
    }
    setSize(width, height) {
        this.rWidth = width;
        this.rHeight = height;
        this.updatePixelSize();
    }
    iX(x) {
        return Math.round(this.centerX + (x + this.offsetX) / this.pixelSize);
    }
    iY(y) {
        return Math.round(this.centerY - (y + this.offsetY) / this.pixelSize);
    }
    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.stroke();
    }
    fx(x) {
        return this.userFunction(x);
    }
    setFunction(f) {
        this.userFunction = f;
    }
    setColor(c) {
        this.color = c;
    }
    paint() {
        // limpiar
        this.graphics.clearRect(0, 0, this.maxX, this.maxY);
        // ejes
        this.graphics.strokeStyle = 'black';
        this.drawLine(this.iX(-5), this.iY(0), this.iX(5), this.iY(0));
        this.drawLine(this.iX(0), this.iY(5), this.iX(0), this.iY(-5));
        // cuadrícula
        this.graphics.strokeStyle = 'lightgray';
        for (let x = -6; x <= 6; x += 0.5) {
            this.drawLine(this.iX(x), this.iY(-6), this.iX(x), this.iY(6));
        }
        for (let y = -6; y <= 6; y += 0.5) {
            this.drawLine(this.iX(-6), this.iY(y), this.iX(6), this.iY(y));
        }
        this.graphics.strokeStyle = 'black';
        // eje X
        for (let x = -5; x <= 5; x++) {
            this.drawLine(this.iX(x), this.iY(-0.1), this.iX(x), this.iY(0.1));
            this.graphics.strokeText(x + "", this.iX(x - 0.15), this.iY(-0.3));
        }
        // eje Y 
        for (let y = -5; y <= 5; y++) {
            this.drawLine(this.iX(-0.1), this.iY(y), this.iX(0.1), this.iY(y));
            // evitar que el 0 se sobreponga con el eje X
            if (y !== 0) {
                this.graphics.strokeText(y + "", this.iX(0.2), this.iY(y + 0.1));
            }
        }
        // etiquetas
        this.graphics.strokeText("X", this.iX(4.7), this.iY(0.3));
        this.graphics.strokeText("Y", this.iX(-0.4), this.iY(4.7));
        // función
        this.graphics.strokeStyle = this.color;
        this.graphics.strokeStyle = this.color;
        let paso = 0.05;
        let extra = this.rWidth;
        let minX = -this.rWidth / 2 - this.offsetX - extra;
        let maxX = this.rWidth / 2 - this.offsetX + extra;
        let prevValid = false;
        for (let x = minX; x <= maxX; x += paso) {
            let y1 = this.fx(x);
            let y2 = this.fx(x + paso);
            let valid1 = isFinite(y1) && !isNaN(y1);
            let valid2 = isFinite(y2) && !isNaN(y2);
            let saltoGrande = Math.abs(y2 - y1) > this.rHeight * 2;
            if (valid1 && valid2 && !saltoGrande) {
                this.drawLine(this.iX(x), this.iY(y1), this.iX(x + paso), this.iY(y2));
                prevValid = true;
            }
            else {
                prevValid = false;
            }
        }
    }
    move(dx, dy) {
        this.offsetX += dx * this.pixelSize;
        this.offsetY += dy * this.pixelSize;
        //  limitar movimiento en X
        if (this.offsetX > this.maxOffsetX)
            this.offsetX = this.maxOffsetX;
        if (this.offsetX < -this.maxOffsetX)
            this.offsetX = -this.maxOffsetX;
        //  limitar movimiento en Y
        if (this.offsetY > this.maxOffsetY)
            this.offsetY = this.maxOffsetY;
        if (this.offsetY < -this.maxOffsetY)
            this.offsetY = -this.maxOffsetY;
    }
}
