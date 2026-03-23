const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = window.innerHeight / 2;
const window_width = window.innerWidth / 2;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.baseColor = color;
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

        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        context.stroke();

        context.fillStyle = "black";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "16px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.closePath();
    }

    update(context) {
        this.draw(context);

        // 🧱 REBOTE EN PAREDES (con corrección de posición)
        if (this.posX + this.radius > window_width) {
            this.posX = window_width - this.radius;
            this.dx *= -1;
        }

        if (this.posX - this.radius < 0) {
            this.posX = this.radius;
            this.dx *= -1;
        }

        if (this.posY + this.radius > window_height) {
            this.posY = window_height - this.radius;
            this.dy *= -1;
        }

        if (this.posY - this.radius < 0) {
            this.posY = this.radius;
            this.dy *= -1;
        }

        this.posX += this.dx;
        this.posY += this.dy;
    }
}

// -------- CONFIG --------
const N = 10;
let circles = [];

for (let i = 0; i < N; i++) {
    let radius = Math.random() * 40 + 20;
    let x = Math.random() * (window_width - radius * 2) + radius;
    let y = Math.random() * (window_height - radius * 2) + radius;
    let speed = Math.random() * 3 + 1;

    circles.push(new Circle(x, y, radius, "blue", i + 1, speed));
}

// -------- COLISIONES REALES --------
function detectarColisiones() {

    circles.forEach(c => c.color = c.baseColor);

    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {

            let c1 = circles[i];
            let c2 = circles[j];

            let dx = c2.posX - c1.posX;
            let dy = c2.posY - c1.posY;

            let distancia = Math.sqrt(dx * dx + dy * dy);
            let minDist = c1.radius + c2.radius;

            if (distancia < minDist) {

                // 🔴 color
                c1.color = "red";
                c2.color = "red";

                // 🔧 normal
                let nx = dx / distancia;
                let ny = dy / distancia;

                // 🔧 SEPARACIÓN FUERTE (clave anti-pegado)
                let overlap = minDist - distancia;

                let separacion = overlap / 2 + 0.5; // 👈 extra evita pegado

                c1.posX -= nx * separacion;
                c1.posY -= ny * separacion;

                c2.posX += nx * separacion;
                c2.posY += ny * separacion;

                // 🔧 INTERCAMBIO DE VELOCIDAD (rebote simple y estable)
                let tempDx = c1.dx;
                let tempDy = c1.dy;

                c1.dx = c2.dx;
                c1.dy = c2.dy;

                c2.dx = tempDx;
                c2.dy = tempDy;
            }
        }
    }
}

// -------- LOOP --------
function updateCircle() {
    requestAnimationFrame(updateCircle);

    ctx.clearRect(0, 0, window_width, window_height);

    detectarColisiones();

    circles.forEach(circle => circle.update(ctx));
}

updateCircle();