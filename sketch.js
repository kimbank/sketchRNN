let drawbot;
let p_pen = 'down';
let x, y;
let newDrawPoint;
let seed = [];
let canvas;

function setup() {
  canvas = createCanvas(640, 480);
  canvas.hide();
  sel = createSelect();
  for(let i=0; i<models.length; i++){
    sel.option(models[i]);
  }
  sel.selected('bus');
  sel.position(10, 65);
  sel.changed(model_reload);
  drawbot = ml5.sketchRNN(sel.value(), modelReady);  
  cls_btn = createButton('다시 그리기');
  cls_btn.mousePressed(clearCanvas);
  background(220);  
}

function modelReady() {
  canvas.show();
  canvas.mouseReleased(startDrawbot);
}

function model_reload(){
  drawbot = ml5.sketchRNN(sel.value(), modelReady);  
}

function clearCanvas() {
  background(220);
  seed = [];
  drawbot.reset();
}

function startDrawbot() {
  x = mouseX;
  y = mouseY;
  drawbot.generate(seed, gotStroke);
}

function draw() {
  if (mouseIsPressed) {
    stroke(255,0,0);
    strokeWeight(10);
    line(pmouseX, pmouseY, mouseX, mouseY);

    let drawPoint = {
      dx: mouseX - pmouseX,
      dy: mouseY - pmouseY,
      pen: 'down'
    };
    seed.push(drawPoint);
  }

  if (newDrawPoint) {
    if (p_pen == 'down') {
      stroke(0);
      strokeWeight(2);
      line(x, y, x + newDrawPoint.dx, y + newDrawPoint.dy);
    }
    x += newDrawPoint.dx;
    y += newDrawPoint.dy;
    p_pen = newDrawPoint.pen;

    if (newDrawPoint !== 'end') {
      newDrawPoint = null;
      drawbot.generate(gotStroke);
    }
  }
}

function gotStroke(err, s) {
  newDrawPoint = s;
}

const models = [
  'alarm_clock',
  'ambulance',
  'angel',
  'ant',
  'antyoga',
  'backpack',
  'barn',
  'basket',
  'bear',
  'bee',
  'beeflower',
  'bicycle',
  'bird',
  'book',
  'brain',
  'bridge',
  'bulldozer',
  'bus',
  'butterfly',
  'cactus',
  'calendar',
  'castle',
  'cat',
  'catbus',
  'catpig',
  'chair',
  'couch',
  'crab',
  'crabchair',
  'crabrabbitfacepig',
  'cruise_ship',
  'diving_board',
  'dog',
  'dogbunny',
  'dolphin',
  'duck',
  'elephant',
  'elephantpig',
  'eye',
  'face',
  'fan',
  'fire_hydrant',
  'firetruck',
  'flamingo',
  'flower',
  'floweryoga',
  'frog',
  'frogsofa',
  'garden',
  'hand',
  'hedgeberry',
  'hedgehog',
  'helicopter',
  'kangaroo',
  'key',
  'lantern',
  'lighthouse',
  'lion',
  'lionsheep',
  'lobster',
  'map',
  'mermaid',
  'monapassport',
  'monkey',
  'mosquito',
  'octopus',
  'owl',
  'paintbrush',
  'palm_tree',
  'parrot',
  'passport',
  'peas',
  'penguin',
  'pig',
  'pigsheep',
  'pineapple',
  'pool',
  'postcard',
  'power_outlet',
  'rabbit',
  'rabbitturtle',
  'radio',
  'radioface',
  'rain',
  'rhinoceros',
  'rifle',
  'roller_coaster',
  'sandwich',
  'scorpion',
  'sea_turtle',
  'sheep',
  'skull',
  'snail',
  'snowflake',
  'speedboat',
  'spider',
  'squirrel',
  'steak',
  'stove',
  'strawberry',
  'swan',
  'swing_set',
  'the_mona_lisa',
  'tiger',
  'toothbrush',
  'toothpaste',
  'tractor',
  'trombone',
  'truck',
  'whale',
  'windmill',
  'yoga',
  'yogabicycle',
  'everything',
];