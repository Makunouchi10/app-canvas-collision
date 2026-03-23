const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = window.innerHeight/2;
const window_width = window.innerWidth/2;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.baseColor = color; // color original
        this.color = color;
        this.text = text;
        this.speed = speed;

        this.dx = (Math.random() * 2 - 1) * this.speed;
        this.dy = (Math.random() * 2 - 1) * this.speed;
    }

    draw(context) {
        context.beginPath();

        context.strokeStyle = this.color;
        context.lineWidth = 2;

        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();

        // texto
        context.fillStyle = "black";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "16px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.closePath();
    }

    update(context) {
        this.draw(context);

        // rebote en paredes
        if ((this.posX + this.radius) > window_width || (this.posX - this.radius) < 0) {
            this.dx = -this.dx;
        }

        if ((this.posY + this.radius) > window_height || (this.posY - this.radius) < 0) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;
    }
}

// -------- CONFIGURACIÓN --------
const N = 10; // número de círculos
let circles = [];

// crear círculos aleatorios
for (let i = 0; i < N; i++) {
    let radius = Math.random() * 40 + 20;
    let x = Math.random() * (window_width - radius * 2) + radius;
    let y = Math.random() * (window_height - radius * 2) + radius;
    let speed = Math.random() * 3 + 1;

    circles.push(new Circle(x, y, radius, "blue", i + 1, speed));
}

// -------- DETECCIÓN DE COLISIONES --------
function detectarColisiones() {
    // primero todos vuelven a azul
    circles.forEach(c => c.color = c.baseColor);

    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {

            let dx = circles[i].posX - circles[j].posX;
            let dy = circles[i].posY - circles[j].posY;
            let distancia = Math.sqrt(dx * dx + dy * dy);

            if (distancia < circles[i].radius + circles[j].radius) {
                // colisión detectada → solo cambiar color
                circles[i].color = "red";
                circles[j].color = "red";
            }
        }
    }
}

// -------- ANIMACIÓN --------
function updateCircle() {
    requestAnimationFrame(updateCircle);

    ctx.clearRect(0, 0, window_width, window_height);

    detectarColisiones();

    circles.forEach(circle => circle.update(ctx));
}

updateCircle();