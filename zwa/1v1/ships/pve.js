const connection = new WebSocket("ws://localhost:8080");
var ME = {
    ships: [],
    hover: ['',''],
    bombs: []
}
var OP = {
    ships: [],
    bombs: []
}

function includesArr(arrToSearch, arr){

    for(let i of arrToSearch){
        if(JSON.stringify(i) == JSON.stringify(arr)) return true
    }
    return false
}
function victory(){
    let counter = 0
    for(let i of ME.ships){
        if(includesArr(OP.bombs, i)) counter++        
    }
    if(counter >= 10) return true
    return false
}
function generateOpShips(){
    for(let i = 0; i<10; i++){
        let loc
        do{
            loc = [Math.floor(Math.random()*5), Math.floor(Math.random()*5)]
        }while(includesArr(OP.ships, loc))
        
        OP.ships.push(loc)
    }
}
function generateTable(tableId){

    for(let y = 0; y<10; y++){

        let row = document.createElement('tr')
        row.id = `row${y}`

        for(let x = 0; x<10; x++){

            let cell = document.createElement('td')
            let div = document.createElement('div')
            let img = document.createElement('img')
            
            img.id = tableId == 'myTable' ? `img${x}-${y}` : `img${x}-${y}-o`
            div.id = tableId == 'myTable' ? `cell${x}-${y}`: `cell${x}-${y}-o`

            if(tableId == 'myTable'){
                div.addEventListener('mousedown', e => {
            
                    if(!victory() && e.button == 0 && ME.ships.length < 10 && !includesArr(ME.ships, [x, y])){
            
                        ME.ships.push([x, y])
                        img.src = 'assets\\ship.png'
                    }
                })
            }else{
                div.addEventListener('mousedown', e => {
                    ME.bombs.push([x, y])
                    
                    let loc
                    do{
                        loc = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)]
                    }while(includesArr(OP.bombs, loc))
                    
                    OP.bombs.push(loc)
                })
            }

            div.addEventListener('mouseover', () => {
                if(!victory()){
                    div.style.boxShadow = 'inset 5px 5px 0 white, inset -5px -5px 0 white'
                    if(tableId == 'myTable') ME.hover[0] = div.id
                    else ME.hover[1] = div.id
                }
            })
            div.addEventListener('mouseleave', () => {
                if(!victory()){
                    div.style.boxShadow = ''
                    if(ME.hover[0] == div.id) ME.hover[0] = ''
                    else if(ME.hover[1] == div.id) ME.hover[1] = ''
                }
            })
            div.appendChild(img)
            cell.appendChild(div)
            row.appendChild(cell)
        }

        document.getElementById(tableId).appendChild(row)
    }
}
window.addEventListener('mouseup', e => {
    for(let i of OP.bombs){

        if(!includesArr(ME.ships, i)) document.getElementById(`img${i[0]}-${i[1]}`).src = 'assets\\cross.png'
        else document.getElementById(`cell${i[0]}-${i[1]}`).style.backgroundColor = 'black'
    }

    for(let i of ME.bombs){

        if(includesArr(OP.ships, i)){
            document.getElementById(`cell${i[0]}-${i[1]}-o`).style.backgroundColor = 'black'

            let element = document.getElementById(`img${i[0]}-${i[1]}-o`)
            element.src = 'assets\\ship.png'
            element.style.transform = 'translate(-50%, -50%) rotate(180deg)'
        }else{

            document.getElementById(`img${i[0]}-${i[1]}-o`).src = 'assets\\cross.png'
        }
    }
    for(let i of ME.ships){

        if(includesArr(OP.bombs, i)){
            document.getElementById(`img${i[0]}-${i[1]}`).style.transform = 'translate(-50%, -50%) rotate(180deg)'
        }
    }
    if(ME.ships.length >= 10) document.getElementById('info').innerText = ''
})
generateTable('myTable')
generateTable('opTable')

window.addEventListener('mouseup', sendData)

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});