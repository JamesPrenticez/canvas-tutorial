// ------------------------------------------------- Canvas
let canvas = document.getElementById('canvas');
let container = document.getElementById('container')

// Define origional canvas size
// 4961 x 3508 px
let origionalX = 1588.006299213
let origionalY = 1122.670866142

canvas.width = origionalX
canvas.height = origionalY


// Restrian canvas in a container Initial Size in a container
function restrainCanvasSize(){
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight
}

// ------------------------------------------------- Deploy our restrained Canvas onto the page when it loads and then draw onto the context with prescaled objects
window.onload = function() {
    restrainCanvasSize()
    drawScaledContext()
    // Console.log
    console.log(canvas.width, canvas.height)
    console.log(window.innerWidth, window.innerHeight)
    console.log(container.clientWidth, container.clientHeight)
    console.log(scaledX, scaledY)
}

// ------------------------- Automatically resize canvas
function resizeCanvas(){
    restrainCanvasSize()
    drawScaledContext()
}

// -------------------------- Resize window dynamically with 'resize' event listener and resizeCanvas function
window.addEventListener('resize', resizeCanvas, false)

//------------------------------------------------ Get Context 
let ctx = canvas.getContext('2d')

//------------------------------------------------ Draw Scaled Context 
// We defined our width of 4961px to match a A3 page
// 4961 - container.clientWidth(say 1200px) = 3761
// 3761 / 4961 = .75%
// 1 -.75 = .25% to convert to how scale() works

function drawScaledContext(){
    // Change divded by origional
    changeX = origionalX - container.clientWidth
    percentageX = changeX / origionalX
    scaledX = 1 - percentageX -.002
    
    changeY = origionalY - container.clientHeight
    percentageY = changeY / origionalY
    scaledY = 1 - percentageY -.002

    // Draw stuff here and pass it the scaled x and y values
    drawBackground(scaledX, scaledY)
    drawCrosshair(scaledX, scaledY)
    drawLineOnMouseDown(event, scaledX, scaledY)
}

// -------------------------------------------------- Define a new Image for the background
var background = new Image();
background.src = "background.svg";

// ---------------------------------- Make sure the image is loaded onto context first otherwise nothing else will draw.
function drawBackground(scaledX, scaledY){
    ctx.save();
    ctx.scale(scaledX, scaledY)
    ctx.drawImage(background, 0, 0);
    ctx.restore()
}

//---------------------------------------------- Draw Crosshair on Context
function drawCrosshair(scaledX, scaledY){
    // Get half way
    // Test half of 4961 x 3508 px should be 2480.5 and 1754 
    var x = origionalX / 2;
    var y = origionalY / 2;

    // remove aliasing
    x = Math.floor(x) + 0.5;
    y = Math.floor(y) + 0.5;
    ctx.strokeWidth = 1;

    // scale
    ctx.save();
    ctx.scale(scaledX, scaledY)

    // draw line 
    ctx.moveTo(x, y - 50);
    ctx.lineTo(x, y + 50);

    // draw line
    ctx.moveTo(x - 50,  y);
    ctx.lineTo(x + 50,  y);

    ctx.lineWidth = 10;
    ctx.strokeStyle = 'white';
    
    ctx.stroke();

    // Restore Scale
    ctx.restore()
}

//----------------------------------------------------- Define the cursor location
let startPosition =  {x: 0, y: 0}
let endPosition = {x: 0, y: 0}
let isDrawing = false;

function getCursorCoordinates (event) {
    const position = {
        x: event.pageX,
        y: event.pageY
    };
    
    const offset = {
        left: canvas.offsetLeft,
        top: canvas.offsetTop
    };
    
    return { 
        x: position.x - offset.left,
        y: position.y - offset.top,
    }; 
    
}

//----------------------------------------------------- Draw a line from point a to point b with mousedown and isDrawing toggle
const drawLineOnMouseDown = (event, scaledX, scaledY) => {
    if(isDrawing === false){
        startPosition = getCursorCoordinates(event);
        isDrawing = true;

        ctx.save();
        ctx.scale(scaledX, scaledY)

        ctx.beginPath();
        ctx.moveTo(startPosition.x, startPosition.y);
        ctx.lineTo(endPosition.x, endPosition.y);
        ctx.stroke();
        
        ctx.restore()
        console.log(startPosition)
    } else {
        endPosition = getCursorCoordinates(event);
        isDrawing = false;
        console.log(endPosition)
    }

}

//Event listeners
canvas.addEventListener('mousedown', drawLineOnMouseDown)

//We need to add a Database and we could use excel
// Now that we have changed the origionalX we need to change the view wdiht ratio in the css

