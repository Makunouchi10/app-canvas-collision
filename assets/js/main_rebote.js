const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = window.innerHeight / 2;
const window_width = window.innerWidth / 2;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

// Genera color base
function randomColor() {
    return {
        r: Math.floor(Math.random() * 255),
        g: Math.floor(Math.random() * 255),
        b: Math.floor(Math.random() * 255)
    };
}

// Convierte a string RGB
function toRGB(c) {
    return `rgb(${c.r}, ${c.g}, ${c.b})`;
}

// Hace el color más oscuro (para el borde)
function darkerColor(c, factor = 0.5) {
    return `rgb(${Math.floor(c.r * factor)},
                ${Math.floor(c.g * factor)},
                ${Math.floor(c.b * factor)})`;
}

class Circle {
    constructor(x, y, radius, baseColor, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.baseColor = baseColor;
        this.text = text;
        this.speed = speed;

        this.fillColor = toRGB(baseColor);
        this.strokeColor = darkerColor(baseColor, 0.5);

        this.dx = (Math.random() * 2 - 1) * this.speed;
        this.dy = (Math.random() * 2 - 1) * this.speed;
    }

    setColor(newBase) {
        this.baseColor = newBase;
        this.fillColor = toRGB(newBase);
        this.strokeColor = darkerColor(newBase, 0.5);
    }

    draw(context) {
        context.beginPath();

        // Relleno
        context.fillStyle = this.fillColor;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        context.fill();

        // Contorno más fuerte
        context.strokeStyle = this.strokeColor;
        context.lineWidth = 3;
        context.stroke();

        // Texto
        context.fillStyle = "black";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.closePath();
    }

    update(context) {
        // Rebote SOLO con paredes
        if ((this.posX + this.radius) > window_width || (this.posX - this.radius) < 0) {
            this.dx = -this.dx;
        }

        if ((this.posY + this.radius) > window_height || (this.posY - this.radius) < 0) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;

        this.draw(context);
    }
}

// ----------- CREAR N CÍRCULOS -----------
const N = 10;
let circles = [];

for (let i = 0; i < N; i++) {
    let radius = Math.random() * 30 + 20;
    let x = Math.random() * (window_width - radius * 2) + radius;
    let y = Math.random() * (window_height - radius * 2) + radius;

    circles.push(new Circle(x, y, radius, randomColor(), i + 1, 3));
}

// ----------- COLISIONES (SIN REBOTE) -----------
function detectCollisions() {
    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {

            let dx = circles[i].posX - circles[j].posX;
            let dy = circles[i].posY - circles[j].posY;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < circles[i].radius + circles[j].radius) {

                // Solo cambio de color (NO rebote)
                let newColor = randomColor();

                circles[i].setColor(newColor);
                circles[j].setColor(newColor);
            }
        }
    }
}

// ----------- ANIMACIÓN -----------
function updateCircle() {
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, window_width, window_height);

    detectCollisions();
    circles.forEach(circle => circle.update(ctx));
}

updateCircle();