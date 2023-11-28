// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player1;
let border1,border2,border3,border4;
let engine;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let smoll = smallest();
  ratio = smoll;

  engine = Matter.Engine.create({enableSleeping: false, enableRestituion:true});
  engine.world.gravity.y = 0;
  Matter.Engine.update(engine, window.requestAnimationFrame, 50);
  Matter.Runner.run(engine);

  player1 = new Player("red", 10/ratio, 20/ratio,windowHeight/2/ratio,windowWidth/2/ratio);
  Matter.World.add(engine.world, [player1.body]);

  border1 = new Wall("blue", 6/ratio, windowHeight/ratio, 0, windowHeight/2/ratio);
  border2 = new Wall("blue", windowWidth/ratio, 6/ratio, windowWidth/2/ratio, 0);
  border3 = new Wall("blue", 6/ratio, windowHeight/ratio, windowWidth, windowHeight/2/ratio);
  border4 = new Wall("blue", windowWidth/ratio, 6/ratio, windowWidth/2/ratio, windowHeight);
  Matter.World.add(engine.world, [border1.body,border2.body,border3.body,border4.body]);
  

}

let ratio;
function draw() {
  // background(220);
  // let smoll = smallest();
  // ratio = smoll;
  // createCanvas(windowWidth, windowHeight);
  player1.move();
  player1.display();
  for (let wally of [border1,border2,border3,border4]){
    wally.display();
  }

}

function smallest(){
  let smoll;
  if (windowHeight/20 < windowWidth/35){
    smoll = windowHeight/20;
  } 
  else{
    smoll = windowWidth/35;
  }
  return smoll;
}

class Player{
  constructor(colour, width,length,x,y){
    this.colour = colour;
    this.body = new Sprite();
    this.width = width;
    this.length = length;
    this.spd = 7*10**-5;
    this.dashcool = 3;
    // this.body = Matter.Bodies.rectangle(x,y,length,width,{mass:0.15});
    this.maxSpeed = 0.1;
    this.angle = 0;
    this.carface = {x:0, y:0};
    this.handling = 1*10**-8;
    this.spdbar = 0;
    this.inert = 1;
    this.inertia = {x:0,y:0};
  }

  // move(){
  //   // console.log(this.spd);

  //   // let difx = mouseX - this.body.position.x*ratio ;
  //   // let dify = mouseY - this.body.position.y*ratio ;
  //   // // console.log(difx,dify);
  //   // let vicky = Matter.Vector.normalise({x:difx, y:dify});

  //   let a = keyIsDown(65);
  //   let d = keyIsDown(68);
  //   let spin= this.handling*map(this.spdbar,0,this.maxSpeed/10000,0,7);
  //   if(d){
  //     this.body.angle += spin;
  //   }
  //   if(a){
  //     this.body.angle -= spin;
  //   }
  //   this.angle = this.body.angle;
  //   // Matter.Body.setAngularSpeed(this.body, this.angle/2,true);
  //   this.carface = {x:Math.cos(this.angle), y:Math.sin(this.angle)};
  //   // console.log(this.vector);

  //   // console.log(vicky);
  //   let w = keyIsDown(87);
  //   let s = keyIsDown(32); //83

  //   // Matter.Body.setInertia(this.body, 10);
  //   // this.spdbar = {x:this.body.force.x, y:this.body.force.y};
  //   let middle = {x: (this.carface.x), y: (this.carface.y)};
  //   middle = Matter.Vector.normalise(middle);
  //   console.log(middle);
  //   this.body.speed = 0;
  //   // this.inertia.x = (this.carface.x+this.inertia.x*2)/3;
  //   // this.inertia.y = (this.carface.y+this.inertia.y*2)/3;
  //   Matter.Body.applyForce(this.body, {x:this.body.position.x, y:this.body.position.y},{x:this.spdbar*this.spd*middle.x,y:this.spdbar*this.spd*middle.y});
    
  //   if (w){
  //     // this.spdbar.x += this.vector.x*1*10**-4;
  //     // this.spdbar.y += this.vector.x*1*10**-4;
  //     // if (this.carface.x/Math.abs(this.carface.x) === -1){
  //     //   this.spdbar -= this.inert;
  //     // }
  //     // else if (this.carface.x/Math.abs(this.carface.x) === 1){
  //     //   this.spdbar += this.inert;
  //     // }
  //     this.spdbar += this.inert;

  //     // if (this.carface.y/Math.abs(this.carface.y) === -1){
  //     //   this.spdbar.y -= this.inert;
  //     // }
  //     // else if (this.carface.y/Math.abs(this.carface.y) === 1){
  //     //   this.spdbar.y += this.inert;
  //     // }
  //     // Matter.Body.applyForce(this.body, {x:this.body.position.x, y:this.body.position.y},{x:this.carface.x*this.spd, y:this.carface.y*this.spd});
  //   }
  //   if(s){
  //     this.go = true;
  //     // if (this.carface.x/Math.abs(this.carface.x) === -1){
  //     //   this.spdbar += this.inert;
  //     // }
  //     // else if (this.carface.x/Math.abs(this.carface.x) === 1){
  //     //   this.spdbar -= this.inert;
  //     // }
  //     this.spdbar -= this.inert;
  //     // if (this.carface.y/Math.abs(this.carface.y) === -1){
  //     //   this.spdbar.y += this.inert;
  //     // }
  //     // else if (this.carface.y/Math.abs(this.carface.y) === 1){
  //     //   this.spdbar.y -= this.inert;
  //     // }
  //     // this.spdbar.x -= this.vector.x*9*10**-4;
  //     // this.spdbar.x -= this.vector.x*9*10**-4;
  //     // Matter.Body.applyForce(this.body, {x:this.body.position.x, y:this.body.position.y},{x:(this.carface.x*this.spd*-0.5), y:(this.carface.y*this.spd*-0.5)});
  //   }
    
  //   // if (w||s){
  //   //   if (this.vector.x/Math.abs(this.vector.x) === -1){
  //   //     this.spdbar.x -= this.inert;
  //   //   }
  //   //   else if (this.vector.x/Math.abs(this.vector.x) === 1){
  //   //     this.spdbar.x += this.inert;
  //   //   }

  //   //   if (this.vector.y/Math.abs(this.vector.y) === -1){
  //   //     this.spdbar.y -= this.inert;
  //   //   }
  //   //   else if (this.vector.y/Math.abs(this.vector.y) === 1){
  //   //     this.spdbar.y += this.inert;
  //   //   }
  //   // }
  //   if(this.spdbar !== 0 ){
  //     this.spdbar = this.spdbar*8/9;
  //     // this.spdbar -= this.spdbar/Math.abs(this.spdbar)*this.inert/2;
      

  //     if (Math.abs(this.spdbar) > this.maxSpeed){
  //       this.spdbar = this.spdbar/Math.abs(this.spdbar)*this.maxSpeed;
  //     }
    
  //   }
  //   const velocity = this.body.velocity;
  //   const speed = Matter.Vector.magnitude(velocity);
  //   if (w){
  //     if(speed > this.maxSpeed){
  //       Matter.Body.setVelocity(this.body,Matter.Vector.mult(Matter.Vector.normalise(velocity),this.maxSpeed));
  //     }
  //   }else if (s){
  //     if(speed > this.maxSpeed*0.5){
  //       Matter.Body.setVelocity(this.body,Matter.Vector.mult(Matter.Vector.normalise(velocity),this.maxSpeed*0.5));
  //     }
  //   }
  //   // console.log(this.body.position);
  // }


  display(){
    fill(this.colour);
    noStroke();
    
    push();
    translate(this.body.position.x*ratio,this.body.position.y*ratio);
    rotate(this.angle);
    rectMode(CENTER);
    rect(0,0,this.length*ratio,this.width*ratio);
    pop();
    fill("black");
    circle(this.body.position.x*ratio+this.carface.x*3.5, this.body.position.y*ratio+this.carface.y*3.5, this.length/this.width*5);
  }
}

class Wall{
  constructor(colour, width,height,x,y,){
    this.colour = colour;
    this.width = width;
    this.height = height;
    this.body = Matter.Bodies.rectangle(x,y,width,height,{isStatic: true});
  }

  display(){
    fill(this.colour);
    noStroke();
    rectMode(CENTER);
    
    rect(this.body.position.x*ratio,this.body.position.y*ratio,this.width*ratio,this.height*ratio);
  }
}