// Función para dibujar un polígono
function dibujarPoligono() {
  // Obtener valores
  let numLados = parseInt(document.getElementById("numLados").value);
  let tamanoLado = parseFloat(document.getElementById("tamanoLado").value);
  let x = parseInt(document.getElementById("x").value);
  let y = parseInt(document.getElementById("y").value);

  // Crear canvas
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  // Limpiar canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // Calcular el apotema a partir del tamaño de los lados y del número de lados
  let apotema = tamanoLado / (2 * Math.tan(Math.PI / numLados));

  // Calcular el radio del polígono
  let radio = apotema / Math.sin(Math.PI / numLados);

  // Origen en el centro del canvas, pero desplazado por la coordenada x e y
  ctx.translate(canvas.width / 2 + x, canvas.height / 2 + y);
  if (numLados % 2 !== 0) {
    ctx.rotate(-Math.PI / 2); // Rotar el canvas 90 grados hacia la izquierda
  }

  // Dibujar polígono
  ctx.beginPath();
  for (let i = 0; i <= numLados; i++) {
    let angulo = (i / numLados) * 2 * Math.PI;
    ctx.lineTo(radio * Math.cos(angulo), radio * Math.sin(angulo));
  }
  ctx.closePath();
  ctx.stroke();
}

// Agregar evento al botón
document.getElementById("dibujar").addEventListener("click", function(event) {
  event.preventDefault();
  dibujarPoligono();
});