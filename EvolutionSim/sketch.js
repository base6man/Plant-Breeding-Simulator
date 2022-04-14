let peashooterImg, wallnutImg, cabbageImg, sunflowerImg, moonflowerImg, crossbreedImg;
let bulletImg;
let plants = [];
let reproductionManager, mouse, time;
let gridWidth = 10, gridHeight = 5, borderWidth = 50, plantSize = 100;
let sun = 0;

let random = {
  choices: [false, null],

  rand: function(){
    let choices = this.choices;
    let bool;
    if(choices[0] == choices[1]){

      if(!choices[0]){ bool = true; }
      else{ bool = false; }
    }
    else{
      if(Math.random() > 0.5){ bool = true; }
      else{ bool = false; }
    }

    choices[0] = choices[1];
    choices[1] = bool;
    //this.choices = choices;
    console.log(bool);
    return bool;
  }
}


function preload() {
  peashooterImg = loadImage('Images/Peashooter.webp');
  wallnutImg = loadImage('Images/Wallnut.png');
  cabbageImg = loadImage('Images/Cabbage.jpg');
  sunflowerImg = loadImage('Images/Sunflower.webp');
  crossbreedImg = loadImage('Images/Crossbreed.png');
  bulletImg = loadImage('Images/Bullet.png');
  punchImg = loadImage('Images/Punch.jpg');
}

function setup() {
  
  let _height = windowHeight;
  let squareSize = (_height - borderWidth) / gridHeight;
  let _width = gridWidth * squareSize + borderWidth;
  createCanvas(_width, _height);

  reproductionManager = new ReproductionManager();
  mouse = new Mouse();
  time = new Time(null);
  setupPlants();

}

function draw(){
  background(200);

  // Update everything in the correct order
  time.update();
  mouse.update();
  reproductionManager.update();
  for(i in plants){
    plants[i].update();
  }
  for(i in plants){
    plants[i].updateImage();
  }
  for(i in plants){
    plants[i].updateChildren();
  }
  mouse.updateImage();
  reproductionManager.updateImage();

  push();
    let myHeight = 24;
    textSize(myHeight);
    let myText = 'Sun: ' + sun;
    let myWidth = textWidth(myText);

    fill(0, 127);
    noStroke();
    rect(25 - 2, 25 - myHeight + 2, myWidth + 4, myHeight + 1);

    fill(255);
    text(myText, 25, 25);
  pop();
}

function mapToGrid(x, y, w=0, h=0){
  coords = {}
  coords.x = map(x, 1, gridWidth, borderWidth + plantSize/2, width - borderWidth - plantSize/2);
  coords.y = map(y, 1, gridHeight, height - borderWidth - plantSize/2, borderWidth + plantSize/2);
  coords.x -= w / 2;
  coords.y -= h / 2;
  return coords;
}

function mapFromGrid(x, y, w=0, h=0){
  // The mouse has a version of this that will give integers
  // However, I wanted to have a version that was the exact inverse of the other one
  // I'm not using this right now
  coords = {}
  coords.x = map(x, borderWidth + plantSize/2, width - borderWidth - plantSize/2, 1, gridWidth);
  coords.y = map(y, height - borderWidth - plantSize/2, borderWidth + plantSize/2, 1, gridHeight);
  coords.x += w / 2;
  coords.y += h / 2;
  return coords;
}

function setupPlants(){
  
  function createTemplates(){

    let templates = {}
  
    let peashooter = new PlantTemplate;
    peashooter.p = 2;
    peashooter.img = peashooterImg;
    templates.p = peashooter;
  
    let wallnut = new PlantTemplate;
    wallnut.t = 2;
    wallnut.img = wallnutImg;
    templates.t = wallnut;
  
    let cabbage = new PlantTemplate;
    cabbage.m = 2;
    cabbage.img = cabbageImg;
    templates.m = cabbage;
  
    let sunflower = new PlantTemplate;
    sunflower.s = 2;
    sunflower.img = sunflowerImg;
    templates.s = sunflower;
  
    let moonflower = new PlantTemplate;
    moonflower.b = 2;
    moonflower.img = moonflowerImg;
    templates.b = moonflower;
  
    let crossbreed = new PlantTemplate;
    crossbreed.p = 1;
    crossbreed.t = 1;
    crossbreed.m = 1;
    crossbreed.s = 1;
    crossbreed.b = 1;
    crossbreed.img = crossbreedImg;
    templates.c = crossbreed;
  
    return templates;
  }

  let templates = createTemplates();

  let p1;
  p1 = new Plant(templates.p);
  p1.x = 1;
  p1.y = 1;
  plants.push(p1);

  let p2;
  p2 = new Plant(templates.t);
  p2.x = 1;
  p2.y = 2;
  plants.push(p2);

  let s1;
  s1 = new Plant(templates.m);
  s1.x = 1;
  s1.y = 3;
  plants.push(s1);

  let s2;
  s2 = new Plant(templates.s);
  s2.x = 1;
  s2.y = 4;
  plants.push(s2);
}
