const table = document.getElementById('table')
const velikostPole = document.getElementById('velikostPole'), velikostPoleLabel = document.getElementById('velikostPoleLabel')
// const abeceda = 'ABCDEFGHIJKLMNOPQRSTUVWY'
const abeceda = 'abcdefghijklmnopqrstuvwy'

velikostPole.addEventListener('change', () => {
    velikostPoleLabel.innerText = velikostPole.value

    table.innerHTML = ''
    generateTableCells()
})

const generateTableCells = () => {

    let counter = 0
    for(let y = 0; y<velikostPole.value; y++){

        let row = document.createElement('tr') 
        for(let x = 0; x<=y; x++){

            let cell = document.createElement('td')
            let div = document.createElement('div')
            let txt = document.createElement('div')
            
            cell.id = `td${x}-${y}`
            div.id = `div${x}-${y}`

            div.classList.add('hexagon')
            txt.classList.add('letters')

            txt.innerText = counter>=abeceda.length ? abeceda[Math.floor(Math.random()*abeceda.length)] : abeceda[counter]
            
            div.appendChild(txt)
            cell.appendChild(div)
            row.appendChild(cell)

            div.addEventListener('click', () => {

                fetch('data.json')
                    .then(response => response.json())
                    .then(data => {

                        console.log(data[div.innerText.toUpperCase()].question)
                })
                .catch(error => console.error('Error loading data:', error));
            })
        
            counter++
        }
        table.appendChild(row)
    }
}
generateTableCells()

const dataCheck = () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {

            for(let i of abeceda){
                console.log(i, data[i.toUpperCase()].answer)
            }
    })
    .catch(error => console.error('Error loading data:', error));
}
// dataCheck()