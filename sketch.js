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
  constructor(colour, width,length,x,y){
    this.colour = colour;
    this.width = width;
    this.length = length;
    this.spd = 4*10**-5;
    this.dashcool = 3;
    this.body = Matter.Bodies.rectangle(x,y,length,width,{mass:0.1});
    this.maxSpeed = 0.1;
    this.angle = 0;
    this.vector = {x:0, y:0};
    this.handling = 5*10**-6;
    this.spdbar = {x:0, y:0};
  }

  move(){
    // console.log(this.spd);

    // let difx = mouseX - this.body.position.x*ratio ;
    // let dify = mouseY - this.body.position.y*ratio ;
    // // console.log(difx,dify);
    // let vicky = Matter.Vector.normalise({x:difx, y:dify});

    let a = keyIsDown(65);
    let d = keyIsDown(68);

    if(d){
      this.angle += this.handling*map(this.body.speed,0,this.spd,0,1);
    }
    if(a){
      this.angle -= this.handling*map(this.body.speed,0,this.spd,0,1);
    }
    Matter.Body.setAngle(this.body, this.angle,true);
    this.vector = {x:Math.cos(this.angle), y:Math.sin(this.angle)};
    // console.log(this.vector);

    // console.log(vicky);
    let w = keyIsDown(87);
    let s = keyIsDown(83);

    Matter.Body.setInertia(this.body, 1);
    if (w){
      this.spdbar.x += this.vector.x*0.0001;
      this.spdbar.y += this.vector.x*0.0001;
      Matter.Body.applyForce(this.body, {x:this.body.position.x, y:this.body.position.y},{x:this.vector.x*this.spd, y:this.vector.y*this.spd});
    }
    if(s){
      this.go = true;
      this.spdbar.x -= this.vector.x*0.0009;
      this.spdbar.x -= this.vector.x*0.0009;
      Matter.Body.applyForce(this.body, {x:this.body.position.x, y:this.body.position.y},{x:(this.vector.x*this.spd*-0.5), y:(this.vector.y*this.spd*-0.5)});
    }
    Matter.Body.applyForce(this.body, {x:this.body.position.x, y:this.body.position.y},{x:this.spdbar.x*this.spd,y:this.spdbar.y*this.spd});
    if(!s&&!w && this.spdbar.x !== 0 && this.spdbar.y !== 0){
      this.spdbar.x -= this.spdbar.x/Math.abs(this.spdbar.x)*0.0001;
      this.spdbar.y -= this.spdbar.y/Math.abs(this.spdbar.y)*0.0001;
    }
    if (Math.abs(this.spdbar) > this.maxSpeed){
      this.spdbar = this.spdbar/Math.abs(this.spdbar)*this.maxSpeed;
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
    
    push();
    translate(this.body.position.x*ratio,this.body.position.y*ratio);
    rotate(this.angle);
    rectMode(CENTER);
    rect(0,0,this.length*ratio,this.width*ratio);
    pop();
    fill("black");
    circle(this.body.position.x*ratio+this.vector.x*3.5, this.body.position.y*ratio+this.vector.y*3.5, this.length/this.width*5);
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