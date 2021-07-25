// ------------------------------------------------- Canvas
let canvas = document.getElementById('canvas');

// ------------------------------------------------- Set Initial Width and Height for Canvas And Draw all objects
window.onload = function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    drawBackground()
    drawSquare()
}
// ------------------------- Write a function to automatically resize canvas
function resizeCanvas(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    drawBackground()
    drawSquare()
}

// -------------------------- Resize window dynamically with 'resize' event listener and resizeCanvas function
window.addEventListener('resize', resizeCanvas, false)



//------------------------------------------------ Get Context 
let ctx = canvas.getContext('2d')
// console.log(canvas)
// console.log(ctx)

// -------------------------------------------------- Define a new Image for the background
var background = new Image();
background.src = "background.svg";

// ---------------------------------- Make sure the image is loaded onto context first otherwise nothing else will draw.
function drawBackground(){
    ctx.drawImage(background, 0, -500);   
}

//---------------------------------------------- Draw Square on Context
// ctx.fillRect(x, y, width, height)
function drawSquare(){
    ctx.fillRect(500, 200, 100, 100)
    ctx.fillRect(1000, 200, 100, 100)
}

