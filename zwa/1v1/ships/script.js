const connection = new WebSocket("ws://localhost:8080");
const myTable = document.getElementById('myTable')
const opTable = document.getElementById('opTable')
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
function resetId(){
    ME.id = Math.floor(Math.random()*1000)
}
function generateTable(table){

    for(let y = 0; y<10; y++){

        let row = document.createElement('tr')
        row.id = `row${y}`

        for(let x = 0; x<10; x++){

            let cell = document.createElement('th')
            cell.id = `${x}-${y}`

            cell.addEventListener('click', e => {
                if(e.button == 2 && ME.ships.length < 10){
                    ME.ships.push([x, y])
                    console.log(ME.ships)
                }
            })

            row.appendChild(cell)
        }

        table.appendChild(row)
    }
}
generateTable(myTable)
generateTable(opTable)
var mainInterval = setInterval(() => {
    
    const data = ME

    try{
        connection.send(JSON.stringify(data));
    }catch(error){}

}, 15)