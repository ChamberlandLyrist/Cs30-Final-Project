// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player1;
let engine;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let smoll = smallest();
  ratio = smoll;

  engine = Matter.Engine.create({enableSleeping: false});
  engine.world.gravity.y = 0;
  Matter.Engine.update(engine, window.requestAnimationFrame, 50);
  Matter.Runner.run(engine);

  player1 = new Player("red", 5/20,windowHeight/2/ratio,windowWidth/2/ratio);
  Matter.World.add(engine.world, [player1.body]);

}

let ratio;
function draw() {
  background(220);
  let smoll = smallest();
  ratio = smoll;
  createCanvas(windowWidth, windowHeight);
  player1.move();
  player1.display();

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
  constructor(colour, radius,x,y){
    this.colour = colour;
    this.size = radius;
    this.spd = 5*(10**-7);
    this.dashcool = 3;
    this.shotcool = 0;
    this.body = Matter.Bodies.circle(x,y,radius*2,{mass:0.001});
    this.maxSpeed = 5*10**-5;
  }

  move(){
    // console.log(this.spd);
    let a = keyIsDown(65);
    let d = keyIsDown(68);
    let w = keyIsDown(87);
    let s = keyIsDown(83);
    if(a){
      Matter.Body.applyForce(this.body, {x: this.body.position.x, y: this.body.position.y}, {x:-1*this.spd, y:0});
    }
    if (d){
      Matter.Body.applyForce(this.body, {x: this.body.position.x, y: this.body.position.y}, {x:this.spd, y:0});
    }
    if (w){
      Matter.Body.applyForce(this.body, {x: this.body.position.x, y: this.body.position.y}, {x:0, y:-1*this.spd});
      // console.log("move up");
    }
    if (s){
      Matter.Body.applyForce(this.body, {x: this.body.position.x, y: this.body.position.y}, {x:0, y:this.spd});
    }

    const velocity = this.body.velocity;
    const speed = Matter.Vector.magnitude(velocity);
    if (a||d||w||s){
      if(speed > this.maxSpeed){
        Matter.Body.setVelocity(this.body,Matter.Vector.mult(Matter.Vector.normalise(velocity),this.maxSpeed));
      }
    }
    // console.log(this.body.position);
  }

  display(){
    fill(this.colour);
    noStroke();
    circle(this.body.position.x*ratio,this.body.position.y*ratio,this.size*2*ratio);
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