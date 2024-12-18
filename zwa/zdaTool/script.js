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
var dataTypes = ['txt','num','date','auto']

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

    let mst = document.createElement('div'), cbx = document.createElement('input')
    cbx.type = 'checkbox'
    mst.appendChild(cbx)
    
    row.id = `${rowId}`
    atr.id = `${rowId}a`, typ.id = `${rowId}b`
    inp.id = `${rowId}in`
    cbx.id = `${rowId}c`

    atr.classList.add('atribut'), naz.classList.add('nazev'), typ.classList.add('dataTyp'), inp.classList.add('rowNazev'), mst.classList.add('must')

    atr.innerText = TABLES[id].rows.length == 1 ? '#' : '*'
    inp.value = `pole${TABLES[id].rows.length}`, typ.innerText = 'txt'

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
    row.append(atr, naz, typ, mst)
    
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
        updateSql(id)
    })
    typ.addEventListener('click', () => {
        typ.innerText = dataTypes[(dataTypes.indexOf(typ.innerText)+1) % dataTypes.length]
        updateSql(id)
    })
    inp.addEventListener('input', () => {
        updateSql(id)
    })
    cbx.addEventListener('change', () => {
        updateSql(id)
    })
    try{
        updateSql(id)
    }catch(error){}
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

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        Update()
        ctx.fillStyle = 'white'
        circle(TABLES[id].loc[0], TABLES[id].loc[1], 'white', 'red')
    })
    tabulka.addEventListener('mouseleave', () => {
        try{
            TABLES[id].mouse = false
        }catch(error){}
    })
    head.addEventListener('input', () => {
        try{
            updateSql(id)
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

    updateSql(id)
}
function circle(X, Y, color, strokeColor){

    ctx.save()
    ctx.translate(X, Y)
    ctx.lineWidth = 4

    ctx.strokeStyle = strokeColor
    ctx.fillStyle = color
    
    ctx.arc(0, 0, 5, 0, 2*Math.PI)

    ctx.stroke()

    ctx.restore()
}
function updateSql(tableId){

    let sql = ''

    const heading = document.getElementById(`${tableId}-h`)
    const sqlCont = document.getElementById(`${tableId}-sql`)

    heading.innerText = document.getElementById(`${tableId}h`).value

    sql += `create table ${heading.innerText}{\n`
    
    for(let id of TABLES[tableId].rows){

        let atr = document.getElementById(`${id}a`)
        let naz = document.getElementById(`${id}in`)
        let typ = document.getElementById(`${id}b`)
        let cbx = document.getElementById(`${id}c`)

        let varType
        switch(typ.innerText){

            case 'txt':
                varType = 'varchar(255)'
                break
            case 'auto':
                varType = 'counter(255)'
                break
            case 'date':
                varType = 'date'
                break
            case 'num':
                varType = 'int(255)'
        }

        sql += `${naz.value} ${varType}`
        if((cbx).checked) sql += ' not null'
        if(atr.innerText == '#') sql += ' primary key'
        sql += ',\n'

        // row.id = `${rowId}`
        // atr.id = `${rowId}a`, typ.id = `${rowId}bc`
        // inp.id = `${rowId}in`
    }

    sql += '};'
    sqlCont.innerText = sql
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