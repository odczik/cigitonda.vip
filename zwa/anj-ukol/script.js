var USER = {
    connected: [],
    pairs: [],
    czArr: [], ajArr: []
}
const colorArr = [
    '#66ffff',
    '#ffff1a',
    '#ff00bf',
    '#ff0000',
    '#ffad33',
    '#0000cc',
    '#6b00b3',
    '#e0b3ff',
    '#00ffff',
    '#ff9999',
    '#b3daff',
    '#d9ff66',
    '#862d59',
    '#84e1e1',
    '#ffccff'
]
const sizeE = document.getElementById('velikostPole')
var size = sizeE.value
var divIds = []
for(let i = 0; i<size*size; i++) divIds.push(0)

const tableE = document.getElementById('table')

const reset = () => {

    size = sizeE.value
    USER = {
        connected: [],
        pairs: [],
        czArr: [], ajArr: []
    }

    divIds = []
    for(let i = 0; i<size*size; i++) divIds.push(0)

    tableE.innerHTML = ''

    generateCells()
    fillCells()
}
sizeE.addEventListener('change', () => {
    console.log(sizeE.value)
    reset()
})
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
                if(USER.connected.length == 2){
                    for(i of USER.connected){
                        const tableCell = document.getElementById('c' + i.substring(1,4))
                        tableCell.style.boxShadow = ''
                        tableCell.style.background = ''
                    }
                    USER.connected = []
                }else{
                    USER.connected.push(div.id)
                    cell.style.boxShadow = '0 0 5px rgb(255,0,0)'
                    cell.style.background = 'rgba(255,0,0,0.4)'
                }
                checkParing()
                checkVictory()
            }
            
            let index
            do{
                index = Math.floor(Math.random()*size*size)
            }while(divIds[index]!=0)

            divIds[index] = div.id
            
        }
        tableE.appendChild(row)
    }
}
generateCells()
const fillCells = () => {

    for(let i of divIds){

        if(Math.floor(Math.random()*2) == 0 && USER.ajArr.length!=size*size/2) USER.ajArr.push(i)
        else if(USER.czArr.length==size*size/2) USER.ajArr.push(i)
        else USER.czArr.push(i)
    }

    fetch('data.json')
        .then(response => response.json())
        .then(data => {

        let used = []
        for(let index = 0; index<size*size/2; index++){

            const div1 = document.getElementById(USER.czArr[index]), div2 = document.getElementById(USER.ajArr[index])

            let idx
            do{
                idx = Math.floor(Math.random()*size*size/2)
            }while(used.includes(idx))
            used.push(idx)

            div1.innerText = data[idx].czech, div2.innerText = data[idx].english
        }
    })
    .catch(error => console.error('Error loading data:', error));
}
fillCells()
const checkParing = () => {
    
    for(let i = 0; i<size*size/2; i++){

        if(USER.connected.includes(USER.czArr[i]) && USER.connected.includes(USER.ajArr[i])){
            USER.pairs.push([USER.connected[0], USER.connected[1]])
            
            const div1E = document.getElementById('c' + USER.connected[0].substring(1,4))
            const div2E = document.getElementById('c' + USER.connected[1].substring(1,4))

            div1E.style.backgroundColor = colorArr[i]
            div2E.style.backgroundColor = colorArr[i]
            
            div1E.style.boxShadow = ''
            div2E.style.boxShadow = ''


            USER.connected = []
            break
        }
    }
}
const checkVictory = () => {
    if(USER.pairs.length==size*size/2){

        window.alert('🤩🙃🥳🥳😻 dokazal(a) jsi to !!!!\nhrat znova?')
        window.location.assign('index.html')
    }
}