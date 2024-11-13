/*
const connection = new WebSocket("ws://localhost:8080");

var ME = {
    ships: [],
    id: Math.floor(Math.random()*1000)
}
var OP = {
    ships: [],
    id: 0
}

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
}
*/
function resetId(){
    // ME.id = Math.floor(Math.random()*1000)
    console.log(ME.id)
}
function generateTable(tableId){

    for(let y = 0; y<10; y++){

        let row = document.createElement('tr')
        row.id = `row${y}`

        for(let x = 0; x<10; x++){

            let cell = document.createElement('td')
            cell.id = `${x}-${y}`

            cell.addEventListener('mousedown', e => {
                if(e.button == 2 && ME.ships.length < 10){
                    ME.ships.push([x, y])
                    console.log(ME.ships)
                }
            })
            if(tableId == 'opTable'){
                cell.addEventListener('mouseover', () => {

                })
            }

            row.appendChild(cell)
        }

        document.getElementById(tableId).appendChild(row)
    }
}
generateTable('myTable')
generateTable('opTable')

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});