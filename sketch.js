var points = [];

var drawing = [];

var currentPath = [];

var isDrawing = false;

var database;

function setup(){
  var canvas = createCanvas(400,400);
  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer');
  canvas.mouseReleased(endPath);

  var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);

  var clearButton = select('#clearButton');
  clearButton.mousePressed(clearDrawing);

  database = firebase.database();
}

function startPath(){
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath(){
  isDrawing = false;
}

function draw(){
  background(0);
  if(isDrawing){
    var point = {
      x: mouseX,
      y: mouseY
    }
    currentPath.push(point);
  }
  beginShape();
  stroke(255);
  strokeWeight(4);
  noFill();
  for(var i = 0; i < drawing.length; i++){
    var path = drawing[i];
    beginShape();
    for(var j = 0; j < path.length; j++){
      vertex(path[j].x, path[j].y);
    }
    endShape();
  }
}

function saveDrawing(){
  var ref = database.ref('drawings');
  var data = {
    name: "Arham",
    drawing: drawing
  }
  var result = ref.push(data, dataSent);
  console.log(result.key);

  function dataSent(err, status){
    console.log(status);
  }
}

function clearDrawing(){
  drawing = [];
}

  