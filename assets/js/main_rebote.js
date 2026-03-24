const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas3.getContext("2d");

canvas3.width = 300;
canvas3.height = 200;

class Circle3{
    constructor(x,y,r){
        this.x=x; this.y=y; this.r=r;
        this.dx=Math.random()*4-2;
        this.dy=Math.random()*4-2;
        this.color="blue";
    }

    draw(){
        ctx3.beginPath();
        ctx3.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx3.strokeStyle=this.color;
        ctx3.stroke();
    }

    update(){
        this.draw();

        if(this.x+this.r>canvas3.width){ this.x=canvas3.width-this.r; this.dx*=-1;}
        if(this.x-this.r<0){ this.x=this.r; this.dx*=-1;}
        if(this.y+this.r>canvas3.height){ this.y=canvas3.height-this.r; this.dy*=-1;}
        if(this.y-this.r<0){ this.y=this.r; this.dy*=-1;}

        this.x+=this.dx;
        this.y+=this.dy;
    }
}

let circles3=[];
for(let i=0;i<5;i++){
    circles3.push(new Circle3(Math.random()*250,Math.random()*150,20));
}

function colisiones3(){
    circles3.forEach(c=>c.color="blue");

    for(let i=0;i<circles3.length;i++){
        for(let j=i+1;j<circles3.length;j++){

            let c1=circles3[i];
            let c2=circles3[j];

            let dx=c2.x-c1.x;
            let dy=c2.y-c1.y;

            let dist=Math.sqrt(dx*dx+dy*dy);
            let minDist=c1.r+c2.r;

            if(dist<minDist){
                c1.color="red";
                c2.color="red";

                let nx=dx/dist;
                let ny=dy/dist;

                let overlap=minDist-dist;
                let sep=overlap/2+0.5;

                c1.x-=nx*sep;
                c1.y-=ny*sep;
                c2.x+=nx*sep;
                c2.y+=ny*sep;

                let tempDx=c1.dx;
                let tempDy=c1.dy;

                c1.dx=c2.dx;
                c1.dy=c2.dy;

                c2.dx=tempDx;
                c2.dy=tempDy;
            }
        }
    }
}

function animate3(){
    requestAnimationFrame(animate3);
    ctx3.clearRect(0,0,canvas3.width,canvas3.height);
    colisiones3();
    circles3.forEach(c=>c.update());
}
animate3();