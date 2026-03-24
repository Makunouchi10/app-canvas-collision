const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

canvas2.width = 300;
canvas2.height = 200;

class Circle2{
    constructor(x,y,r){
        this.x=x; this.y=y; this.r=r;
        this.dx=Math.random()*4-2;
        this.dy=Math.random()*4-2;
        this.color="blue";
    }

    draw(){
        ctx2.beginPath();
        ctx2.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx2.strokeStyle=this.color;
        ctx2.stroke();
    }

    update(){
        this.draw();

        if(this.x+this.r>canvas2.width || this.x-this.r<0) this.dx*=-1;
        if(this.y+this.r>canvas2.height || this.y-this.r<0) this.dy*=-1;

        this.x+=this.dx;
        this.y+=this.dy;
    }
}

let circles2=[];
for(let i=0;i<5;i++){
    circles2.push(new Circle2(Math.random()*250,Math.random()*150,20));
}

function colisiones2(){
    circles2.forEach(c=>c.color="blue");

    for(let i=0;i<circles2.length;i++){
        for(let j=i+1;j<circles2.length;j++){
            let dx=circles2[i].x-circles2[j].x;
            let dy=circles2[i].y-circles2[j].y;
            let dist=Math.sqrt(dx*dx+dy*dy);

            if(dist<circles2[i].r+circles2[j].r){
                circles2[i].color="red";
                circles2[j].color="red";
            }
        }
    }
}

function animate2(){
    requestAnimationFrame(animate2);
    ctx2.clearRect(0,0,canvas2.width,canvas2.height);
    colisiones2();
    circles2.forEach(c=>c.update());
}
animate2();