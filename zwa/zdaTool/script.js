/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var SCALE;

function Scale(){
    canvas.width = window.innerWidth, canvas.height = window.innerHeight

    SCALE = window.innerWidth > innerHeight ? window.innerWidth/50 : window.innerHeight/50
}
function Grid(){
    ctx.fillStyle = 'rgb(60,60,60)'
    for(let i = 1; i<=50; i++){
        ctx.fillRect(i*SCALE-SCALE/32, 0, SCALE/16, window.innerHeight)
        ctx.fillRect(0, i*SCALE-SCALE/32, window.innerWidth, SCALE/16)
    }
}
function Update(){
    Scale()
    Grid()
}
Update()
window.addEventListener('resize', Update)