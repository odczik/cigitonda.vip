/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var size
var MOVING = {
    x: 0, y: 0,
    matrix: SHAPES[SHAPES.all[0]][0],
    
}
Scale()
function Scale(){
    canvas.height = window.innerHeight/100*95
    canvas.width = window.innerHeight/100*47.5

    size = window.innerHeight/100*95/20
}
window.addEventListener('resize', Scale)

function DisplayShape(X, Y, shapeMatrix, color){

    ctx.fillStyle = color
    ctx.strokeStyle = 'white'
    
    ctx.lineWidth = 2
    for(let y = 0; y<4; y++){
        for(let x = 0; x<4; x++){
            if(shapeMatrix[y][x] == 1){
                ctx.fillRect((X + x)*size, (Y + y)*size, size, size)
                ctx.strokeRect((X + x)*size, (Y + y)*size, size, size)
            }
        }
    }
}
