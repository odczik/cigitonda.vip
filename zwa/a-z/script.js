const table = document.getElementById('table')
const abeceda = 'abcdefghijklmnopqhrstuvwxyz'
console.log(abeceda.length)

const generateTableCells = () => {

    for(let y = 0; y < 7; y++){

        let row = document.createElement('tr')
        row.id = `tr${y}`
        for(let x = 0; x<=y; x++){

            let cell = document.createElement('td')
            let div = document.createElement('div')

            cell.id = `td${x}-${y}`
            div.id = `div${x}-${y}`
            div.classList.add('hexagon')
            
            cell.appendChild(div)
            row.appendChild(cell)
        }
        table.appendChild(row)
    }
}
generateTableCells()