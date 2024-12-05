/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var size, fallItrv
var MOVING = {
    x: 4, y: -4,
    matrix: SHAPES[SHAPES.all[0]][0],

    left: false, right: false, down: false, rotate: false,
    fast: false,
    speed: 500
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
function startCycle(){

    setInterval(() => {

        if(MOVING.left) MOVING.x--
        if(MOVING.right) MOVING.x++
    
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        DisplayShape(MOVING.x, MOVING.y, MOVING.matrix, 'red')

    }, MOVING.speed/4)

    fallItrv = setInterval(fallInterval, MOVING.speed)
}
function DisplayMatrix(){
    for(let y = 0; y<20; y++){
        for(let x = 0; x<10; x++){

            if(MATRIX[y][x] != 0){
                ctx.fillStyle = MATRIX[y][x]
                ctx.fillRect(x*size, y*size, size, size)
            }
        }
    }
}
function fallInterval(){
    
    if(MOVING.y < 16){
        MOVING.y++
    }else{
        MOVING.y = 0
        MOVING.x = 4
    }

    if(MOVING.down && !MOVING.fast){

        MOVING.fast = true
        MOVING.speed /= 4
        clearInterval(fallItrv)
        fallItrv = setInterval(fallInterval, MOVING.speed)
    
    }else if(!MOVING.down && MOVING.fast){
        MOVING.fast = false
        MOVING.speed *= 4
        clearInterval(fallItrv)
        fallItrv = setInterval(fallInterval, MOVING.speed)
    }
}
window.addEventListener('keydown', e => {
    switch(e.key.toLowerCase()){
        case 'a':
            MOVING.left = true
            break
        case 'd':
            MOVING.right = true
            break
        case 's':
            MOVING.down = true
            break
        case 'q':
            MOVING.rotate = true
            break
    }
})

window.addEventListener('keyup', e => {
    switch(e.key.toLowerCase()){
        case 'a':
            MOVING.left = false
            break
        case 'd':
            MOVING.right = false
            break
        case 's':
            MOVING.down = false
            break
        case 'q':
            MOVING.rotate = false
            break
    }
})
startCycle()