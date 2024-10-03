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

// Función para generar puntos aleatorios dentro del canvas
function generateRandomPoints(numPoints, width, height) {
    const points = [];
    for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        points.push(new Punto(x, y));
    }
    return points;
}

// Calcular el centroide
function calculateCentroid(points) {
    const centroid = points.reduce((acc, p) => {
        return { x: acc.x + p.x, y: acc.y + p.y };
    }, { x: 0, y: 0 });
    centroid.x /= points.length;
    centroid.y /= points.length;
    return centroid;
}

// Función para calcular el ángulo desde el centroide
function angleFromCentroid(punto, centroid) {
    return Math.atan2(punto.y - centroid.y, punto.x - centroid.x);
}

// Ordenar los puntos en sentido horario
function sortPointsClockwise(points) {
    const centroid = calculateCentroid(points);
    return points.slice().sort((a, b) => angleFromCentroid(b, centroid) - angleFromCentroid(a, centroid)); // Sentido horario
}

// Función para calcular el área del polígono (para verificar sentido horario)
function polygonArea(points) {
    let area = 0;
    for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % points.length];
        area += (p1.x * p2.y - p2.x * p1.y);
    }
    return area / 2;
}

// Función para verificar si la figura es convexa o cóncava
function isConvex(points) {
    const crossProducts = [];
    const n = points.length;

    for (let i = 0; i < n; i++) {
        const o = points[i];
        const a = points[(i + 1) % n];
        const b = points[(i + 2) % n];
        const cp = crossProduct(o, a, b);
        crossProducts.push(cp);
    }

    return crossProducts.every(cp => cp > 0 || cp === 0);
}

// Función para calcular el producto cruzado
function crossProduct(o, a, b) {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

// Función para borrar el canvas
function clearCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Función para dibujar la figura en el canvas (común para vectorizado y rasterizado)
function drawFigure(canvasId, points, fill = false) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.closePath();

    if (fill) {
        ctx.fillStyle = "rgba(0, 128, 255, 0.3)";
        ctx.fill();
    }

    ctx.stroke();
}

// Evento del botón de "Dibujar"
document.getElementById("dibujarBtn").addEventListener("click", () => {
    const canvas = document.getElementById("rasterCanvas"); 
    const width = canvas.width;
    const height = canvas.height;

    const puntosAleatorios = generateRandomPoints(5, width, height); // Generar 5 puntos aleatorios
    const puntosOrdenados = sortPointsClockwise(puntosAleatorios);  // Ordenar en sentido horario

    drawFigure(canvas.id, puntosOrdenados, canvas.id === "rasterCanvas"); // Rellenar si es rasterizado

    const resultText = isConvex(puntosOrdenados) ? "La figura es convexa" : "La figura es cóncava";
    document.getElementById("result").textContent = resultText;
});

// Evento del botón de "Borrar"
document.getElementById("borrarBtn").addEventListener("click", () => {
    clearCanvas("vectorCanvas"); // O "rasterCanvas" según el archivo
    document.getElementById("result").textContent = "";
});
