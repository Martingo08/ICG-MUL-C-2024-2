class Punto {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
}

// Definir los puntos de la figura
const puntos = [
    new Punto(50, 150),
    new Punto(150, 50),
    new Punto(250, 150),
    new Punto(200, 250),
    new Punto(100, 250)
];

// Calcular el centroide
const centroid = puntos.reduce((acc, p) => {
    return { x: acc.x + p.x, y: acc.y + p.y };
}, { x: 0, y: 0 });
centroid.x /= puntos.length;
centroid.y /= puntos.length;

// Función para calcular el ángulo desde el centroide
function angleFromCentroid(punto) {
    return Math.atan2(punto.y - centroid.y, punto.x - centroid.x);
}

// Ordenar los puntos por el ángulo respecto al centroide
const puntosOrdenados = puntos.slice().sort((a, b) => angleFromCentroid(a) - angleFromCentroid(b));

// Función para calcular el producto cruzado
function crossProduct(o, a, b) {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

// Verificar si la figura es convexa o cóncava
const crossProducts = [];
const n = puntosOrdenados.length;

for (let i = 0; i < n; i++) {
    const o = puntosOrdenados[i];
    const a = puntosOrdenados[(i + 1) % n];
    const b = puntosOrdenados[(i + 2) % n];
    const cp = crossProduct(o, a, b);
    crossProducts.push(cp);
}

const isConvex = crossProducts.every(cp => cp > 0 || cp === 0);

// Mostrar el resultado
const resultText = isConvex ? "La figura es convexa" : "La figura es cóncava";
document.getElementById("result").textContent = resultText;

// Función para dibujar la figura en formato rasterizado (bitmap)
function drawRasterizedFigure() {
    const canvas = document.getElementById("rasterCanvas");
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "lightgray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(puntosOrdenados[0].x, puntosOrdenados[0].y);

    for (let i = 1; i < puntosOrdenados.length; i++) {
        ctx.lineTo(puntosOrdenados[i].x, puntosOrdenados[i].y);
    }

    ctx.closePath();
    ctx.fillStyle = "rgba(0, 128, 255, 0.3)";
    ctx.fill();
    ctx.stroke();
}

// Función para borrar el canvas
function clearCanvas() {
    const canvas = document.getElementById("rasterCanvas");
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Asignar eventos a los botones
document.getElementById("dibujarBtn").addEventListener("click", drawRasterizedFigure);
document.getElementById("borrarBtn").addEventListener("click", clearCanvas);
