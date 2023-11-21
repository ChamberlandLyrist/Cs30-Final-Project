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

  engine = Matter.Engine.create({enableSleeping: false});
  engine.world.gravity.y = 0;
  Matter.Engine.update(engine, window.requestAnimationFrame, 50);
  Matter.Runner.run(engine);

  player1 = new Player("red", 5/ratio,windowHeight/2/ratio,windowWidth/2/ratio);
  Matter.World.add(engine.world, [player1.body]);

  border1 = new Wall("blue", 6/ratio, windowHeight/ratio, 0, windowHeight/2/ratio);
  border2 = new Wall("blue", windowWidth/ratio, 6/ratio, windowWidth/2/ratio, 0);
  border3 = new Wall("blue", 6/ratio, windowHeight/ratio, windowWidth, windowHeight/2/ratio);
  border4 = new Wall("blue", windowWidth/ratio, 6/ratio, windowWidth/2/ratio, windowHeight);
  Matter.World.add(engine.world, [border1.body,border2.body,border3.body,border4.body]);
  

}

let ratio;
function draw() {
  background(220);
  let smoll = smallest();
  ratio = smoll;
  createCanvas(windowWidth, windowHeight);
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
  constructor(colour, radius,x,y){
    this.colour = colour;
    this.size = radius;
    this.spd = 9*10**-9;
    this.dashcool = 3;
    this.body = Matter.Bodies.circle(x,y,radius*2,{mass:0.001});
    this.maxSpeed = 8*10**-1;
  }

  move(){
    // console.log(this.spd);

    let difx = mouseX - this.body.position.x*ratio ;
    let dify = mouseY - this.body.position.y*ratio ;
    // console.log(difx,dify);
    let vicky = Matter.Vector.normalise({x:difx, y:dify});

    // console.log(vicky);
    let w = keyIsDown(87);
    let s = keyIsDown(83);

    if (w){
      Matter.Body.applyForce(this.body, {x:this.body.position.x, y:this.body.position.y},{x:vicky.x*this.spd, y:vicky.y*this.spd});
    }
    if(s){
      Matter.Body.applyForce(this.body, {x:this.body.position.x, y:this.body.position.y},{x:vicky.x*this.spd*-0.5, y:vicky.y*this.spd*-0.5});
    }

    const velocity = this.body.velocity;
    const speed = Matter.Vector.magnitude(velocity);
    if (w){
      if(speed > this.maxSpeed){
        Matter.Body.setVelocity(this.body,Matter.Vector.mult(Matter.Vector.normalise(velocity),this.maxSpeed));
      }
    }else if (s){
      if(speed > this.maxSpeed*0.5){
        Matter.Body.setVelocity(this.body,Matter.Vector.mult(Matter.Vector.normalise(velocity),this.maxSpeed*0.5));
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