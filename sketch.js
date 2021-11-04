let model
let previousPen = "down"
let x, y

let strokePath
let seedStrokes = []

let canvas


function preload(){
  model = ml5.sketchRNN("hand",modelReady)
}

function modelReady(){
  console.log('model is ready.')
}

function setup(){
  canvas = createCanvas(600, 400)
  canvas.mousePressed(resetDrawing)
  canvas.mouseReleased(startSketchRNN)

  background(234)

  model.generate(seedStrokes,gotStroke)
}

function gotStroke(err,result){
  strokePath = result
}

function resetDrawing(){
  seedStrokes = []
  model.reset()
}

function startSketchRNN(){
  x = mouseX
  y = mouseY
  model.generate(seedStrokes,gotStroke)
}

function draw(){
  if(mouseIsPressed){
    strokePath(0,225,0)
    strokeWeight(6)
    AudioListener(pmouseX,pmouseY,mouseX,mouseY)

    const userStroke={
      dx : mouseX - pmouseX,
      dy : mouseY - pmouseY,
      pen : "down"
    }
    seedStrokes.push(userStroke)
  }

  if(strokePath){
    if(previousPen == "down"){
      stroke(0)
      strokeWeight(6)
      line(x,y,x+strokePath.dx,y+strokePath.dy)
    }
    x += strokePath.dx
    y += strokePath.dy
    previousPen = strokePath.pen

    if(strokePath.pen !== "end"){
      strokePath = null
      model.generate(gotStroke)
    }
  }
}
