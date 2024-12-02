/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const menus = document.querySelectorAll('.customMenu')
const lanscapeMenu = document.getElementById('landscapeMenu')
const tabMenu = document.getElementById('tabulkaMenu')
const atributMenu = document.getElementById('atributMenu')

var CURSOR = {
    x: 0, y: 0,
    current: null,
    row: null
}
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
    for(let i = 1; i<= (window.innerWidth > window.innerHeight ? 100 : 50); i++){
        ctx.fillRect(i*SCALE-SCALE/32, 0, SCALE/16, window.innerHeight)
        ctx.fillRect(0, i*SCALE-SCALE/32, window.innerWidth, SCALE/16)
    }
}
function Update(){
    Scale()
    Grid()
}
function appendRow(id, tabulka){

    let rowId
    do{
        rowId = Math.floor(Math.random()*1000)
    }while(TABLES[id].rows.includes(rowId))

    TABLES[id].rows.push(rowId)

    let row = document.createElement('nav')
    let atr = document.createElement('div'), naz = document.createElement('div'), typ = document.createElement('div')
    let inp = document.createElement('input')
    inp.type = 'text'
    inp.maxLength = '16'

    row.id = `${rowId}`
    atr.id = `${rowId}a`, naz.id = `${rowId}b`, typ.id = `${rowId}c`
    inp.id = `${rowId}in`

    atr.classList.add('atribut'), naz.classList.add('nazev'), typ.classList.add('dataTyp')

    atr.innerText = '#', inp.value = `pole${TABLES[id].rows.length}`, typ.innerText = 'txt'

    console.log(TABLES)

    row.addEventListener('mousedown', e => {
        if(e.button == 2){
            atributMenu.style.top = `${e.clientY-24}px`, atributMenu.style.left = `${e.clientX-8}px`

            CURSOR.row = row.id

            setTimeout(() => {
                lanscapeMenu.style.top = '110%', tabMenu.style.top = '110%'
            },0.01)
        }
    })
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
function createTable(X, Y){

    let id
    do{
        id = Math.floor(Math.random()*1000)
    }while(TABLES.all.includes(id))

    //vytvorit prehlohu tabulky

    let tabulka = document.createElement('div')
    tabulka.id = id
    tabulka.classList.add('tabulka')

    TABLES.all.push(id)
    TABLES[id] = {
        loc: [X, Y],
        mouse: false,
        rows: []
    }

    let head = document.createElement('input')
    head.value = `tabulka-${TABLES.all.length}`
    head.id = `${id}h`
    head.classList.add('tableHeading')

    tabulka.appendChild(head)
    appendRow(id, tabulka)

    document.getElementById('landscape').appendChild(tabulka)
    
    tabulka.addEventListener('mousedown', e => {
        TABLES[id].mouse = true
        TABLES[id].tolerance = [
            e.clientX - TABLES[id].loc[0],
            e.clientY - TABLES[id].loc[1]
        ]

        CURSOR.current = id

        if(e.button == 2){
            
            tabMenu.style.left = `${e.clientX-8}px`, tabMenu.style.top = `${e.clientY-24}px`
            setTimeout(() => {
                lanscapeMenu.style.top = '110%'
            }, 1)
        }
    })
    tabulka.addEventListener('mouseup', () => {
        try{
            TABLES[id].mouse = false
        }catch(error){}
    })
    tabulka.addEventListener('mouseleave', () => {
        try{
            TABLES[id].mouse = false
        }catch(error){}
    })
    window.addEventListener('mousemove', e => {
        try{
            if(TABLES[id].mouse){

                TABLES[id].loc = [
                    e.clientX - TABLES[id].tolerance[0],
                    e.clientY - TABLES[id].tolerance[1]
                ]

                tabulka.style.top = `${TABLES[id].loc[1]}px`, tabulka.style.left = `${TABLES[id].loc[0]}px`
            }
        }catch(error){}
    })
    window.addEventListener('mouseup', () => {
        updateSql(id)
    })
    tabulka.style.top = `${TABLES[id].loc[1]}px`, tabulka.style.left = `${TABLES[id].loc[0]}px`

    //vytvorit nav s sql pro tabulka

    let heading = document.createElement('h3')
    let container = document.createElement('nav')
    let sqlCont = document.createElement('nav')

    heading.innerText = 'kys ty mocko'

    heading.id = `${id}-h`
    sqlCont.id = `${id}-sql`
    container.id = `${id}-cont`
    container.classList.add('tableSql')

    container.append(heading, sqlCont)
    document.getElementById('output').appendChild(container)

    updateSql()
}
function updateSql(tableId){

    const heading = document.getElementById(`${tableId}-h`)
    const sqlCont = document.getElementById(`${tableId}-sql`)

    heading.innerText = document.getElementById(`${tableId}h`).value
}
function smazatTabulku(){
    
    delete TABLES[CURSOR.current]
    document.getElementById(CURSOR.current).remove()

    tabMenu.style.top = '110%'
}
function pridatAtribut(){
    
    appendRow(CURSOR.current, document.getElementById(CURSOR.current))
}
function smazatAtribut(){

    document.getElementById(CURSOR.row).remove()
    atributMenu.style.top = '110%'
}
Update()
window.addEventListener('resize', Update)

window.addEventListener('contextmenu', e => {
    e.preventDefault() 
    if(e.button == 2){


    }
})
menus.forEach(element => {
    
    element.addEventListener('mouseleave', () => {
        element.style.top = '110%'
    })
})
document.getElementById('landscape').addEventListener('mousedown', e => {

    if(e.button == 2){
        lanscapeMenu.style.top = `${e.clientY-24}px`, lanscapeMenu.style.left = `${e.clientX-8}px`        
    }
    // console.log('kys')
})
createTable(0,0)