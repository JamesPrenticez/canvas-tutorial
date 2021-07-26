let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d');
let table = document.getElementById('table');

let startPosition =  {x: 0, y: 0}
let movingPosition =  {x: 0, y: 0}
let endPosition = {x: 0, y: 0}

let isDrawing = false;


//Algebra
//          screenPosition X = (canvasPosistion X - offSet X)
//          Therefore
//          canvasPosisition X = screenPosisiton X + offSet X

//          let screenPosistion = {x: 0, y: 0}
//          let canvasPosistion = {x: 0, y: 0}
//          let offSet = {x:0, y: 0}

//          function screenToCanvasTranslation(){
//              
//          }

//Resize Canvas and Run all the Drawing functions inside here
// function draw() {
//     context.canvas.width = window.innerWidth;
//     context.canvas.height = window.innerHeight;
//     drawStraightLine();
// }

//Get mouse coordinates relative to the canvas element on the users screen
function canvasToScreen (event) {
    let reference = canvas.offsetParent;
    
    const position = {
        x: event.pageX,
        y: event.pageY
    };
    const offset = {
        left: canvas.offsetLeft,
        top: canvas.offsetTop
    };

    while(reference){
        offset.left += reference.offsetLeft;
        offset.top += reference.offsetTop;
        reference = reference.offsetParent;
    }
    return { 
        x: position.x + offset.left,
        y: position.y + offset.top,
    }; 
}
//Scaling from the <div id=centre> <canvas></canvas> </div> 
function screenToCanvas (event) {
    let reference = canvas.offsetParent;
    console.log(reference)

    const position = {
        x: event.pageX,
        y: event.pageY
    };
    console.log("screen position X: " + position.x)
    console.log("screen position: Y:" + position.y)

    const offset = {
        left: reference.offsetLeft,
        top: reference.offsetTop
    };

    console.log("offset left: " + offset.left)
    console.log("offset top: " + offset.top)

    // while(reference){//true
    //     offset.left += reference.offsetLeft;
    //     offset.top += reference.offsetTop;
    //     reference = reference.offsetParent;
    // }
    return { 
        x: position.x - offset.left,
        y: position.y - offset.top,
    }; 
}
//Log start and end coordinated to the table
const logToScreen = (position) => {
    //Get the Table
    let table = document.getElementById("table")
    if(isDrawing === false){
        //Create a new row
        let row = table.insertRow(-1)
        //Create 4 new cells inside that row
        let startX = row.insertCell(0)
        let startY = row.insertCell(1)
        let endX = row.insertCell(2)
        let endY = row.insertCell(3)
        //Write coordinates to the cells
        startX.innerHTML = position.x
        startY.innerHTML = position.y
        endX.innerHTML = ""
        endY.innerHTML = ""
    } else {
        //Get the last row
        let lastRow = table.rows[ table.rows.length - 1 ];
        //Update the last 2 cells on that row    
        let endX = lastRow.cells[2]
        let endY = lastRow.cells[3]
        //Write coordinates to the cells
        endX.innerHTML = position.x
        endY.innerHTML = position.y
    }
}

//Draw Functions
const drawLine = (startPosition, endPosition) => {
    // context.beginPath();
    // context.moveTo(startPosition, startPosition);
    // context.lineTo(endPosition, endPosition);

    // context.stroke();

    context.lineWidth = 26;
    context.strokeStyle = 'orange';
    context.moveTo(startPosition.x, startPosition.y);
    context.lineTo(endPosition.x, endPosition.y);
    console.log(startPosition.x, startPosition.y)
    console.log(endPosition.x, endPosition.y)
    context.stroke();
 }


//Event Listener Functions
function drawStraightLine(){
    //Listens for Mouse Down Clicks & Records the Cordinates
    const mouseDownListener = (event) => {
        if(isDrawing === false){
            startPosition = screenToCanvas(event);
            logToScreen(startPosition)
            isDrawing = true;
        } else {
            endPosition = screenToCanvas(event);
            logToScreen(endPosition)
            drawLine(startPosition, endPosition);
            isDrawing = false;
        }
    //Listens for Mousemouse & Renders a Line 60 times per second

    }
    canvas.addEventListener('mousedown', mouseDownListener);
}

// const mouseMoveListener = (event) => {
//     if(!isDrawStart) return;
//     lineCoordinates = getClientOffset(event);
    
//     clearCanvas();
//     //Can you mock this?
//     drawLine();
//     //wait untill the end
//     console.log(lineCoordinates)
//     //only want to log the last number
//     logToScreen()
//   }

// draw()



