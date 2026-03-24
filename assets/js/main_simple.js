const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext("2d");

canvas1.width = 300;
canvas1.height = 200;

class Circle1 {
    constructor(x,y,r,speed){
        this.x=x; this.y=y; this.r=r;
        this.dx=speed; this.dy=speed;
    }

    draw(){
        ctx1.beginPath();
        ctx1.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx1.strokeStyle="blue";
        ctx1.stroke();
    }

    update(){
        this.draw();

        if(this.x+this.r>canvas1.width || this.x-this.r<0) this.dx*=-1;
        if(this.y+this.r>canvas1.height || this.y-this.r<0) this.dy*=-1;

        this.x+=this.dx;
        this.y+=this.dy;
    }
}

let c1=new Circle1(50,50,20,2);
let c2=new Circle1(150,80,30,2);

function animate1(){
    requestAnimationFrame(animate1);
    ctx1.clearRect(0,0,canvas1.width,canvas1.height);
    c1.update();
    c2.update();
}
animate1();