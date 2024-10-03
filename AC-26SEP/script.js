const svgElement = document.getElementById('svg');

class Coordenada {
    #coordX;
    #coordY;

    constructor(x, y) {
        this.#coordX = x;
        this.#coordY = y;
    }

    obtenerX() {
        return this.#coordX;
    }

    obtenerY() {
        return this.#coordY;
    }

    actualizarX(x) {
        this.#coordX = x;
    }

    actualizarY(y) {
        this.#coordY = y;
    }
}

class Segmento {
    #inicio;
    #fin;

    constructor(x1, y1, x2, y2) {
        this.#inicio = new Coordenada(x1, y1);
        this.#fin = new Coordenada(x2, y2);
    }

    renderizar() {
        let x1 = this.#inicio.obtenerX();
        let y1 = this.#inicio.obtenerY();
        let x2 = this.#fin.obtenerX();
        let y2 = this.#fin.obtenerY();

        // Algoritmo de Bresenham para trazar líneas
        const diferenciaX = Math.abs(x2 - x1);
        const diferenciaY = Math.abs(y2 - y1);
        const signoX = (x1 < x2) ? 1 : -1;
        const signoY = (y1 < y2) ? 1 : -1;
        let error = diferenciaX - diferenciaY;

        while (true) {
            this.#renderizarPunto(x1, y1);  // Dibujar cada punto del segmento

            if (x1 === x2 && y1 === y2) break;
            const errorDoble = 2 * error;

            if (errorDoble > -diferenciaY) {
                error -= diferenciaY;
                x1 += signoX;
            }
            if (errorDoble < diferenciaX) {
                error += diferenciaX;
                y1 += signoY;
            }
        }
    }

    #renderizarPunto(x, y) {
        const puntoSVG = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        puntoSVG.setAttribute("cx", x);
        puntoSVG.setAttribute("cy", y);
        puntoSVG.setAttribute("r", 1);  // Representar píxeles con pequeños círculos
        puntoSVG.setAttribute("fill", "black");
        svgElement.appendChild(puntoSVG);
    }
}

class Circunferencia {
    #centro;
    #radio;

    constructor(cx, cy, r) {
        this.#centro = new Coordenada(cx, cy);
        this.#radio = r;
    }

    renderizar() {
        let x = 0;
        let y = this.#radio;
        let decision = 3 - 2 * this.#radio;
        this.#dibujarOctantes(this.#centro.obtenerX(), this.#centro.obtenerY(), x, y);

        while (y >= x) {
            x++;
            if (decision > 0) {
                y--;
                decision += 4 * (x - y) + 10;
            } else {
                decision += 4 * x + 6;
            }
            this.#dibujarOctantes(this.#centro.obtenerX(), this.#centro.obtenerY(), x, y);
        }
    }

    #dibujarOctantes(cx, cy, x, y) {
        this.#renderizarPunto(cx + x, cy + y);
        this.#renderizarPunto(cx - x, cy + y);
        this.#renderizarPunto(cx + x, cy - y);
        this.#renderizarPunto(cx - x, cy - y);
        this.#renderizarPunto(cx + y, cy + x);
        this.#renderizarPunto(cx - y, cy + x);
        this.#renderizarPunto(cx + y, cy - x);
        this.#renderizarPunto(cx - y, cy - x);
    }

    #renderizarPunto(x, y) {
        const puntoSVG = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        puntoSVG.setAttribute("cx", x);
        puntoSVG.setAttribute("cy", y);
        puntoSVG.setAttribute("r", 1);
        puntoSVG.setAttribute("fill", "black");
        svgElement.appendChild(puntoSVG);
    }
}

class Elipse {
    #centro;
    #radioX;
    #radioY;

    constructor(cx, cy, a, b) {
        this.#centro = new Coordenada(cx, cy);
        this.#radioX = a;
        this.#radioY = b;
    }

    renderizar() {
        let x = 0;
        let y = this.#radioY;
        const a2 = this.#radioX ** 2;
        const b2 = this.#radioY ** 2;
        let decision1 = b2 - (a2 * this.#radioY) + (0.25 * a2);
        let deltaX = 2 * b2 * x;
        let deltaY = 2 * a2 * y;

        while (deltaX < deltaY) {
            this.#dibujarCuadrantes(this.#centro.obtenerX(), this.#centro.obtenerY(), x, y);
            if (decision1 < 0) {
                x++;
                deltaX += 2 * b2;
                decision1 += deltaX + b2;
            } else {
                x++;
                y--;
                deltaX += 2 * b2;
                deltaY -= 2 * a2;
                decision1 += deltaX - deltaY + b2;
            }
        }

        let decision2 = (b2 * (x + 0.5) ** 2) + (a2 * (y - 1) ** 2) - (a2 * b2);

        while (y >= 0) {
            this.#dibujarCuadrantes(this.#centro.obtenerX(), this.#centro.obtenerY(), x, y);
            if (decision2 > 0) {
                y--;
                deltaY -= 2 * a2;
                decision2 += a2 - deltaY;
            } else {
                y--;
                x++;
                deltaX += 2 * b2;
                deltaY -= 2 * a2;
                decision2 += deltaX - deltaY + a2;
            }
        }
    }

    #dibujarCuadrantes(cx, cy, x, y) {
        this.#renderizarPunto(cx + x, cy + y);
        this.#renderizarPunto(cx - x, cy + y);
        this.#renderizarPunto(cx + x, cy - y);
        this.#renderizarPunto(cx - x, cy - y);
    }

    #renderizarPunto(x, y) {
        const puntoSVG = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        puntoSVG.setAttribute("cx", x);
        puntoSVG.setAttribute("cy", y);
        puntoSVG.setAttribute("r", 1);
        puntoSVG.setAttribute("fill", "black");
        svgElement.appendChild(puntoSVG);
    }
}

// Crear instancias y renderizar las figuras utilizando los algoritmos de Bresenham
const segmento = new Segmento(50, 50, 200, 200);
segmento.renderizar();

const circunferencia = new Circunferencia(300, 100, 50);
circunferencia.renderizar();

const elipse = new Elipse(400, 300, 80, 50);
elipse.renderizar();
