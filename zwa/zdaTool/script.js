/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var SCALE;
var TABLES = {
    all:[]

}

function Scale(){
    canvas.width = window.innerWidth, canvas.height = window.innerHeight

    SCALE = window.innerWidth > innerHeight ? window.innerWidth/100 : window.innerHeight/50
}
function Grid(){
    ctx.fillStyle = 'rgb(60,60,60)'
    for(let i = 1; i<=100; i++){
        ctx.fillRect(i*SCALE-SCALE/32, 0, SCALE/16, window.innerHeight)
        ctx.fillRect(0, i*SCALE-SCALE/32, window.innerWidth, SCALE/16)
    }
}
function Update(){
    Scale()
    Grid()
}
function createTable(X, Y){
    let id
    do{
        id = Math.floor(Math.random()*1000)
    }while(TABLES.all.includes(id))

    let tabulka = document.createElement('div')
    tabulka.id = id
    tabulka.classList.add('tabulka')

    tabulka.innerHTML = `<nav><div class="atribut">*</div><div class="nazev"><input type="text"></div><div class="dataTyp">txt</div></nav>`
    /*
        <nav>
            <div class="atribut">*</div>
            <div class="nazev"><input type="text"></div>
            <div class="dataTyp">txt</div>
        </nav>
    */

    TABLES.all.push(id)
    TABLES[id].loc = [X, Y]

    tabulka.addEventListener('mousedown')
}
Update()
window.addEventListener('resize', Update)