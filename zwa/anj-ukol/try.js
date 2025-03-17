function fetchData(){
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            for(let i of data) console.log(i)
            return data        
        })
        .catch(error => console.error('Error loading data:', error));
}

var DATA = fetchData()
setTimeout(() => {

    console.log(DATA)
}, 5000)
    
const cejNazev = document.getElementById('cejNazev'), anjNazev = document.getElementById('anjNazev')
var id = 0
cejNazev.addEventListener('keydown', (e) => {

    const cont = document.getElementById('cont')
    if(e.key.toLowerCase() == 'enter'){

        if(id!=0) cont.innerText+=',\n'
        cont.innerText += `{"id": "${id}", "anjNazev": "${anjNazev.value}", "cejNazev": "${cejNazev.value}"}`
        id++
        anjNazev.value = '', cejNazev.value = ''
    }
})
