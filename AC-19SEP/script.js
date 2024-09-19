class Shape {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    draw(svg) {
      // Método abstracto que debe ser implementado por las subclases
    }
  }
  
  class Linea extends Shape {
    constructor(x1, y1, x2, y2) {
      super((x1 + x2) / 2, (y1 + y2) / 2);
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
    }
  
    draw(svg) {
      const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
      linea.setAttribute("x1", this.x1);
      linea.setAttribute("y1", this.y1);
      linea.setAttribute("x2", this.x2);
      linea.setAttribute("y2", this.y2);
      linea.setAttribute("stroke", "black");
      svg.appendChild(linea);
    }
  }
  
  class Circulo extends Shape {
    constructor(cx, cy, r) {
      super(cx, cy);
      this.r = r;
    }
  
    draw(svg) {
      const circulo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circulo.setAttribute("cx", this.x);
      circulo.setAttribute("cy", this.y);
      circulo.setAttribute("r", this.r);
      circulo.setAttribute("fill", "none");
      circulo.setAttribute("stroke", "black");
      svg.appendChild(circulo);
    }
  }
  
  class Elipse extends Shape {
    constructor(cx, cy, a, b) {
      super(cx, cy);
      this.a = a;
      this.b = b;
    }
  
    draw(svg) {
      const elipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      elipse.setAttribute("cx", this.x);
      elipse.setAttribute("cy", this.y);
      elipse.setAttribute("rx", this.a);
      elipse.setAttribute("ry", this.b);
      elipse.setAttribute("fill", "none");
      elipse.setAttribute("stroke", "black");
      svg.appendChild(elipse);
    }
  }
  
  // Crear elemento SVG
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "500");
  svg.setAttribute("height", "500");
  document.body.appendChild(svg);
  
  // Crear y dibujar formas
  const linea = new Linea(50, 50, 200, 200);
linea.draw(svg);

const circulo = new Circulo(300, 100, 50);
circulo.draw(svg);

const elipse = new Elipse(400, 300, 80, 50);
elipse.draw(svg);