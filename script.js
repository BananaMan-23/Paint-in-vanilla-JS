const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const ctx = canvas.getContext("2d");
const mode = document.getElementById("jsMode");
const saveButton = document.getElementById("jsSave");

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 700);

canvas.height = 700;
canvas.width = 700;
let painting = false;
let filling = false;
ctx.lineWidth = 2.5;
ctx.strokeStyle = "black";
ctx.fillStyle = "black";

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  x = event.offsetX;
  y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  painting = true;
}

function changeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  ctx.lineWidth = event.target.value;
}

function handleModeClick() {
  if (filling) {
    filling = false;
    mode.innerText = "Заливка";
  } else {
    filling = true;
    mode.innerText = "Рисование";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, 700, 700);
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL()
  const link = document.createElement('a')
  link.href = image
  link.download = 'PaintJs [Export]';
  link.click()
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColor)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if(saveButton) {
  saveButton.addEventListener('click', handleSaveClick)
}