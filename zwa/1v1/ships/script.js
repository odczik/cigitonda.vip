const connection = new WebSocket("ws://localhost:8080");

var ME = {
    ships: [],
    id: Math.floor(Math.random()*1000),
    hover: ['',''],
    bombs: []
}
var OP = {
    ships: [],
    id: 0,
    hover: ['',''],
    bombs: []
}
console.log(ME.id)
connection.onopen = () => {
    console.log("WebSocket is open now.");
};

connection.onclose = () => {
    console.log("WebSocket is closed now.");
};

connection.onerror = (event) => {
    console.error("WebSocket error observed:", event);
};

connection.onmessage = (event) => {
    
    const data = JSON.parse(event.data.toString());

    if(data.id != ME.id) OP = data

    if(ME.ships.length >= 10 && OP.ships.length >= 10){
        document.getElementById('info').style.opacity = '0'
    }

    for(let i of OP.bombs){
        document.getElementById(`cell${i[0]}-${i[1]}`).style.backgroundColor = 'black'
    }
    for(let i of ME.bombs){
        document.getElementById(`img${i[0]}-${i[1]}-o`).src = 'assets\\cross.png'
    }
    console.log(OP)
}
function sendData(){
    
    const data = ME

    try{
        connection.send(JSON.stringify(data));
    }catch(error){}

}
function resetId(){
    ME.id = Math.floor(Math.random()*1000)
    console.log(ME.id)
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
            
                    if(e.button == 0 && ME.ships.length < 10 && !includesArr(ME.ships, [x, y])){
            
                        ME.ships.push([x, y])
                        img.src = 'assets\\ship.png'
                    }
                })
            }else{
                div.addEventListener('mousedown', e => {
                    
                    if(e.button == 0 && ME.ships.length == 10 && OP.ships.length == 10){

                        ME.bombs.push([x, y])
                    }
                })
            }

            div.addEventListener('mouseover', () => {
                div.style.boxShadow = 'inset 5px 5px 0 white, inset -5px -5px 0 white'
                if(tableId == 'myTable') ME.hover[0] = div.id
                else ME.hover[1] = div.id
            })
            div.addEventListener('mouseleave', () => {
                div.style.boxShadow = ''
                if(ME.hover[0] == div.id) ME.hover[0] = ''
                else if(ME.hover[1] == div.id) ME.hover[1] = ''
            })
            div.appendChild(img)
            cell.appendChild(div)
            row.appendChild(cell)
        }

        document.getElementById(tableId).appendChild(row)
    }
}
generateTable('myTable')
generateTable('opTable')

window.addEventListener('mouseup', sendData)

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});