import { CanvasLocal } from "./canvasLocal.js";

const canvas = document.getElementById("circlechart") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const canvasLocal = new CanvasLocal(ctx, canvas);

canvasLocal.paint();

const input = document.getElementById("funcInput") as HTMLInputElement;
const btn = document.getElementById("drawBtn") as HTMLButtonElement;
const zoomIn = document.getElementById("zoomIn") as HTMLButtonElement;
const zoomOut = document.getElementById("zoomOut") as HTMLButtonElement;
const colorPicker = document.getElementById("colorPicker") as HTMLInputElement;

// boton para graficar
btn.onclick = () => {
  try {
    const f = new Function("x", "return " + input.value) as (x:number)=>number;
    canvasLocal.setFunction(f);
    canvasLocal.paint();
  } catch (e) {
    const errorMsg = document.getElementById("errorMsg") as HTMLDivElement;

btn.onclick = () => {
  try {
    const f = new Function("x", "return " + input.value) as (x:number)=>number;
    canvasLocal.setFunction(f);
    canvasLocal.paint();
    errorMsg.innerText = ""; // limpiar error
  } catch (e) {
    errorMsg.innerText = "⚠️ Función inválida";
  }
};
  }
};

// zoom
zoomIn.onclick = () => {
  canvasLocal.zoom(0.8);
  canvasLocal.paint();
};

zoomOut.onclick = () => {
  canvasLocal.zoom(1.2);
  canvasLocal.paint();
};

colorPicker.oninput = () => {
  canvasLocal.setColor(colorPicker.value);
  canvasLocal.paint();
};

let dragging = false;
let lastX = 0;
let lastY = 0;

canvas.onmousedown = (e) => {
  dragging = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
};

canvas.onmouseup = () => dragging = false;
canvas.onmouseleave = () => dragging = false;

canvas.onmousemove = (e) => {
  if (!dragging) return;

  const dx = e.offsetX - lastX;
  const dy = e.offsetY - lastY;

  canvasLocal.move(dx, -dy);

  lastX = e.offsetX;
  lastY = e.offsetY;

  canvasLocal.paint();
};