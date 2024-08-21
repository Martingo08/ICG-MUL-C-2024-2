// Creamos el canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Definimos la figura geométrica (un rectángulo)
var figura = {
  x: 50, // posición x
  y: 50, // posición y
  ancho: 100, // ancho
  alto: 50, // alto
  color: 'rgba(255, 0, 0, 0.5)' // color
};

// Función para dibujar la figura
function dibujarFigura() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = figura.color;
  ctx.fillRect(figura.x, figura.y, figura.ancho, figura.alto);
}

// Función para actualizar la posición de la figura
function actualizarPosicion(x, y) {
  figura.x = x;
  figura.y = y;
  dibujarFigura();
}

// Función para actualizar el tamaño de la figura
function actualizarTamaño(ancho, alto) {
  figura.ancho = ancho;
  figura.alto = alto;
  dibujarFigura();
}

// Eventos para manejar la interacción del usuario
canvas.addEventListener('mousedown', function(event) {
  var x = event.clientX - canvas.offsetLeft;
  var y = event.clientY - canvas.offsetTop;
  actualizarPosicion(x, y);
});

canvas.addEventListener('mousemove', function(event) {
  var x = event.clientX - canvas.offsetLeft;
  var y = event.clientY - canvas.offsetTop;
  if (event.buttons === 1) { // si se está haciendo clic
    actualizarPosicion(x, y);
  }
});

// Creamos los controles para modificar el tamaño
var inputAncho = document.getElementById('ancho');
var inputAlto = document.getElementById('alto');

inputAncho.addEventListener('input', function() {
  actualizarTamaño(parseInt(inputAncho.value), figura.alto);
});

inputAlto.addEventListener('input', function() {
  actualizarTamaño(figura.ancho, parseInt(inputAlto.value));
});

// Inicializamos la figura
dibujarFigura();