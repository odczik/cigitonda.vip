/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const resizeCanvas = () => {
    if(window.innerHeight>window.innerWidth){
        canvas.width = window.innerWidth, canvas.height = window.innerWidth
    }else{
        canvas.width = window.innerHeight, canvas.height = window.innerHeight
    }
}
window.addEventListener('resize', () => {resizeCanvas})
