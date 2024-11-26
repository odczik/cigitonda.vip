/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var SCALE;
var TABLES = {
    all:[]
}
var dataTypes = {
    all: ['txt','num','date']
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
function appendRow(id, tabulka){

    if(TABLES[id].next == undefined) TABLES[id].next = 0
    else TABLES[id].next++

    let row = document.createElement('nav')
    let atr = document.createElement('div'), naz = document.createElement('div'), typ = document.createElement('div')
    let inp = document.createElement('input')
    inp.type = 'text'
    inp.maxLength = '16'

    row.id = `${id}-${TABLES[id].next}`
    atr.id = `${id}a`, naz.id = `${id}b`, typ.id = `${id}c`
    inp.id = `${id}in`

    atr.classList.add('atribut'), naz.classList.add('nazev'), typ.classList.add('dataTyp')

    atr.innerText = '#', inp.value = `pole${TABLES[id].next}`, typ.innerText = 'txt'

    naz.appendChild(inp)
    row.append(atr, naz, typ)

    tabulka.appendChild(row)
    /*
        <nav>
            <div class="atribut">*</div>
            <div class="nazev"><input type="text"></div>
            <div class="dataTyp">txt</div>
        </nav>
    */
    atr.addEventListener('click', () => {
        atr.innerText = atr.innerText == '#' ? '*' : '#'
    })
    typ.addEventListener('click', () => {
        typ.innerText = dataTypes.all[(dataTypes.all.indexOf(typ.innerText)+1) % dataTypes.all.length]
    })
}
function createTable(e){
    let X = e.clientX, Y = e.clientY
    let id
    do{
        id = Math.floor(Math.random()*1000)
    }while(TABLES.all.includes(id))

    let tabulka = document.createElement('div')
    tabulka.id = id
    tabulka.classList.add('tabulka')

    TABLES.all.push(id)
    TABLES[id] = {}
    TABLES[id].loc = [X, Y]
    TABLES[id].mouse = false

    let h3 = document.createElement('h3')
    h3.innerText = `tabulka-${TABLES.all.length}`


    tabulka.appendChild(h3)
    appendRow(id, tabulka)

    document.getElementById('landscape').appendChild(tabulka)
    
    tabulka.addEventListener('mousedown', e => {
        TABLES[id].mouse = true
        TABLES[id].tolerance = [
            e.clientX - TABLES[id].loc[0],
            e.clientY - TABLES[id].loc[1]
        ]
    })
    window.addEventListener('mouseup', () => {
        TABLES[id].mouse = false
    })
    window.addEventListener('mousemove', e => {
        if(TABLES[id].mouse){

            TABLES[id].loc = [
                e.clientX - TABLES[id].tolerance[0],
                e.clientY - TABLES[id].tolerance[1]
            ]

            tabulka.style.top = `${TABLES[id].loc[1]}px`, tabulka.style.left = `${TABLES[id].loc[0]}px`
        }
    })
    tabulka.style.top = `${X}px`, tabulka.style.left = `${Y}px`
}
Update()
window.addEventListener('resize', Update)

window.addEventListener('contextmenu', e => {
    e.preventDefault()
    if(e.button == 2){


    }
})
const menus = document.querySelectorAll('.customMenu')
const lanscapeMenu = document.getElementById('landscapeMenu')

menus.forEach(element => {
    
    element.addEventListener('mouseleave', () => {
        element.style.top = '110%'
    })
})
document.getElementById('landscape').addEventListener('mousedown', e => {

    if(e.button == 2){
        lanscapeMenu.style.top = `${e.clientY}px`, lanscapeMenu.style.left = `${e.clientX}px`        
    }
    console.log('kys')
})