var USER = {
    connected: []
}
const size = 4
var divIds = []
for(let i = 0; i<size*size; i++) divIds.push(0)

const fetchData = () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => console.log(data[0]))
        .catch(error => console.error('Error loading data:', error));
}
const tableE = document.getElementById('table')
const generateCells = () => {
    
    for(let y = 0; y<size; y++){

        let row = document.createElement('tr')
        row.id = `r${y}`

        for(let x = 0; x<size; x++){

            let cell = document.createElement('td')
            let div = document.createElement('div')
            let cont = document.createElement('div')
            let blank = document.createElement('div')
            cell.id = `c${x}-${y}`
            div.id = `d${x}-${y}`
            
            cont.classList.add('inner')
            blank.classList.add('front')
            div.classList.add('tableDiv')
            cell.classList.add('tableCell')

            cont.appendChild(blank)
            cont.appendChild(div)
            cell.appendChild(cont)
            row.appendChild(cell)

            cell.onclick = () => {
                USER.connected[USER.connected.length] = div.id

                cont.style.border = '2px solid black'

                
            }

            let index
            do{
                index = Math.floor(Math.random()*25)
            }while(divIds[index]!=0)

            divIds[index] = div.id
        }
        tableE.appendChild(row)
    }
}
generateCells()
const fillCells = () => {

    let czArr = [], ajArr = []

    for(let i of divIds){

        if(Math.floor(Math.random()*2) == 0 && ajArr.length!=size*size/2) ajArr.push(i)
        else if(czArr.length==size*size/2) ajArr.push(i)
        else czArr.push(i)
    }

    fetch('data.json')
        .then(response => response.json())
        .then(data => {

        let used = []
        for(let index = 0; index<size*size/2; index++){

            const div1 = document.getElementById(czArr[index]), div2 = document.getElementById(ajArr[index])

            let idx
            do{
                idx = Math.floor(Math.random()*size*size)
            }while(used.includes(idx))
            used.push(idx)

            div1.innerText = data[idx].czech, div2.innerText = data[idx].english
        }
    })
    .catch(error => console.error('Error loading data:', error));
}
fillCells()