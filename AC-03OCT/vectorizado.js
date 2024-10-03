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

class FiguraPoligonal {
    constructor(svgId) {
        this._svgId = svgId;
        this._points = [];
        this._svgElement = document.getElementById(this._svgId);
    }

    // Generar puntos aleatorios dentro del SVG
    generateRandomPoints(numPoints, width, height) {
        this._points = [];
        for (let i = 0; i < numPoints; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            this._points.push(new Punto(x, y));
        }
        this._points = this.sortPointsClockwise(this._points); // Ordenar en sentido horario
    }

    // Calcular el centroide
    calculateCentroid(points) {
        const centroid = points.reduce((acc, p) => {
            return { x: acc.x + p.x, y: acc.y + p.y };
        }, { x: 0, y: 0 });
        centroid.x /= points.length;
        centroid.y /= points.length;
        return centroid;
    }

    // Calcular el ángulo desde el centroide
    angleFromCentroid(punto, centroid) {
        return Math.atan2(punto.y - centroid.y, punto.x - centroid.x);
    }

    // Ordenar los puntos en sentido horario
    sortPointsClockwise(points) {
        const centroid = this.calculateCentroid(points);
        return points.slice().sort((a, b) => this.angleFromCentroid(b, centroid) - this.angleFromCentroid(a, centroid));
    }

    // Verificar si la figura es convexa o cóncava
    isConvex(points) {
        const crossProducts = [];
        const n = points.length;

        for (let i = 0; i < n; i++) {
            const o = points[i];
            const a = points[(i + 1) % n];
            const b = points[(i + 2) % n];
            const cp = this.crossProduct(o, a, b);
            crossProducts.push(cp);
        }

        return crossProducts.every(cp => cp > 0 || cp === 0);
    }

    // Calcular el producto cruzado
    crossProduct(o, a, b) {
        return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
    }

    // Borrar el SVG
    clearSVG() {
        while (this._svgElement.firstChild) {
            this._svgElement.removeChild(this._svgElement.firstChild);
        }
        document.getElementById("result").textContent = "";
    }

    // Dibujar la figura en el SVG
    drawFigureSVG() {
        this.clearSVG();

        // Crear un elemento <polygon> en SVG
        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

        // Convertir los puntos a la cadena que necesita el atributo "points" de SVG
        const pointsString = this._points.map(p => `${p.x},${p.y}`).join(" ");
        polygon.setAttribute("points", pointsString);
        polygon.setAttribute("stroke", "black");
        polygon.setAttribute("fill", "rgba(0, 128, 255, 0.3)");

        this._svgElement.appendChild(polygon);

        // Verificar si la figura es convexa o cóncava
        const resultText = this.isConvex(this._points) ? "La figura es convexa" : "La figura es cóncava";
        document.getElementById("result").textContent = resultText;
    }
}

// Crear instancia de la clase FiguraPoligonal
const figura = new FiguraPoligonal("vectorSVG");

// Evento del botón de "Dibujar"
document.getElementById("dibujarBtn").addEventListener("click", () => {
    const svg = document.getElementById("vectorSVG");
    const width = svg.clientWidth;
    const height = svg.clientHeight;

    figura.generateRandomPoints(5, width, height); // Generar 5 puntos aleatorios
    figura.drawFigureSVG(); // Dibujar la figura en el SVG
});

// Evento del botón de "Borrar"
document.getElementById("borrarBtn").addEventListener("click", () => {
    figura.clearSVG();
});
