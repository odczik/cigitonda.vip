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

const data = ME

try{
    connection.send(JSON.stringify(data));
}catch(error){}