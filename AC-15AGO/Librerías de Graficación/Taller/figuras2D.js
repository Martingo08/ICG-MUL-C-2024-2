// Obtenemos el canvas y los controles
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var posicionX = document.getElementById('posicion-x');
var posicionY = document.getElementById('posicion-y');
var ancho = document.getElementById('ancho');
var alto = document.getElementById('alto');
var numLados = document.getElementById('num-lados');
var actualizar = document.getElementById('actualizar');

// Definimos la figura geométrica plana
var figura = {
  x: 50,
  y: 50,
  ancho: 100,
  alto: 50,
  numLados: 4,
  color: 'rgba(255, 0, 0, 0.5)'
};

// Función para dibujar la figura
function dibujarFigura() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = figura.color;
  
  // Dibujamos la figura según el número de lados
  if (figura.numLados === 3) {
    ctx.beginPath();
    ctx.moveTo(figura.x, figura.y);
    ctx.lineTo(figura.x + figura.ancho, figura.y);
    ctx.lineTo(figura.x + figura.ancho / 2, figura.y + figura.alto);
    ctx.fill();
  } else if (figura.numLados === 4) {
    ctx.fillRect(figura.x, figura.y, figura.ancho, figura.alto);
  } else {
    ctx.beginPath();
    ctx.arc(figura.x + figura.ancho / 2, figura.y + figura.alto / 2, figura.ancho / 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}

// Función para actualizar la posición y tamaño de la figura
function actualizarFigura() {
  figura.x = parseInt(posicionX.value);
  figura.y = parseInt(posicionY.value);
  figura.ancho = parseInt(ancho.value);
  figura.alto = parseInt(alto.value);
  figura.numLados = parseInt(numLados.value);
  dibujarFigura();
}

// Evento para actualizar la figura al hacer clic en el botón
actualizar.addEventListener('click', actualizarFigura);

// Dibujamos la figura inicial
dibujarFigura();