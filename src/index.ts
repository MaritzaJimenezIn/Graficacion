import { CanvasLocal } from './canvasLocal.js';

let miCanvas: CanvasLocal;

window.onload = () => {

  const canvas = document.getElementById('circlechart') as HTMLCanvasElement;
  const graphics = canvas.getContext('2d') as CanvasRenderingContext2D;

  if (!canvas || !graphics) {
    console.error("Canvas no encontrado");
    return;
  }

  miCanvas = new CanvasLocal(graphics, canvas);
};

(window as any).graficar = () => {

  const input = (document.getElementById('datos') as HTMLInputElement).value;

  const datos = input
    .split(',')
    .map(n => Number(n.trim()))
    .filter(n => !isNaN(n));

  if (datos.length === 0) {
    alert("Ingresa datos válidos");
    return;
  }
  if (datos.length > 5) {
  alert("Solo puedes ingresar máximo 5 valores");
  return;
  }
  if (datos.some(n => n < 0)) {
  alert("No se permiten valores negativos");
  return;
  }
  miCanvas.paintHorizontal(datos);
};