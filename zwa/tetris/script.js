/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var block = 0
const setBlock = () => {
    if(window.innerWidth > window.innerHeight){
        block = window.innerHeight/20
    }else{
        block = window.innerWidth/20
    }
    canvas.height = block*20, canvas.width = block*10
}
setBlock()
window.addEventListener('resize', setBlock)

const update = () => {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    drawShape()

    console.log(USER.x, USER.y)
}

const drawShape = () => {

    let countX = 0, countY = 0

    ctx.fillStyle = USER.color
    for(let Y of SHAPES[USER.name][USER.rotation]){

        for(let X of Y){
            
            if(X == 1) ctx.fillRect((USER.x+countX)*block, (USER.y+countY)*block, block, block)

            countX++
        }
        countY++
        countX = 0
    }
}

var DELAY = {
    left: false, right: false
}
window.addEventListener('keydown', e => {
    switch(e.key.toLowerCase()){
        case 'a':
            if(!DELAY.left) DELAY.left = true
            break
        case 'd':
            if(!DELAY.right) DELAY.right = true
            break
    }
})

var USER = {
    x: 0, y: 0, rotation: 0, name: 'L', color: 'red',
    left: false, right: false, down: false
}
var fallInterval = setInterval(() => {
    USER.y++
    update()
}, 1000)


drawShape()