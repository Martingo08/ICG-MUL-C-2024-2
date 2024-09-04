// Función para calcular el radio del polígono
function calcularRadio(apotema, numLados) {
  return apotema / Math.sin(Math.PI / numLados);
}

// Función para dibujar un polígono
function dibujarPoligono(x, y, numLados, medida, valorMedida, sistemaCoordenadas) {
  // Crear canvas
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  // Limpiar canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  let radio;
  if (medida === "lado") {
    // Calcular el apotema y el radio
    let apotema = valorMedida / (2 * Math.tan(Math.PI / numLados));
    radio = calcularRadio(apotema, numLados);
  } else if (medida === "apotema") {
    radio = calcularRadio(valorMedida, numLados);
  }

  // Origen en el centro del canvas, pero desplazado por la coordenada x e y
  ctx.translate(canvas.width / 2 + x, canvas.height / 2 + y);

  // Dibujar polígono
  ctx.beginPath();
  for (let i = 0; i <= numLados; i++) {
    let angulo = (i / numLados) * 2 * Math.PI;
    if (sistemaCoordenadas === "polares") {
      ctx.lineTo(radio * Math.cos(angulo), radio * Math.sin(angulo));
    } else if (sistemaCoordenadas === "cartesianas") {
      ctx.lineTo(x + radio * Math.cos(angulo), y + radio * Math.sin(angulo));
    }
  }
  ctx.closePath();
  ctx.stroke();
}

// Función para manejar el evento del botón
function manejarEventoDibujar() {
  // Obtener valores
  let numLados = parseInt(document.getElementById("numLados").value);
  let medida = document.getElementById("medida").value;
  let valorMedida;
  if (medida === "lado") {
    valorMedida = parseFloat(document.getElementById("tamanoLado").value);
  } else if (medida === "apotema") {
    valorMedida = parseFloat(document.getElementById("apotemaValor").value);
  }
  let x = parseInt(document.getElementById("x").value);
  let y = parseInt(document.getElementById("y").value);
  let sistemaCoordenadas = document.getElementById("sistemaCoordenadas").value;

  // Dibujar polígono
  dibujarPoligono(x, y, numLados, medida, valorMedida, sistemaCoordenadas);
}

// Agregar evento al botón
document.getElementById("dibujar").addEventListener("click", function(event) {
  event.preventDefault();
  manejarEventoDibujar();
});