const table = document.getElementById('table'), body = document.getElementById('body')
const velikostPole = document.getElementById('velikostPole'), velikostPoleLabel = document.getElementById('velikostPoleLabel')
const question = document.getElementById('question'), answer = document.getElementById('answer')
const displayA = document.getElementById('displayAnswer')

const abeceda = 'ABCDEFGHIJKLMNOPQRSTUVWY'
// const abeceda = 'abcdefghijklmnopqrstuvwy'
var last = null, tah = Math.floor(Math.random()*2) == 0 ? true : false

const naTahu = () => {
    if(tah) body.style.background = 'rgb(200,50,50)'
    else body.style.background = 'rgb(100,100,200)'
}
naTahu()
const checkA = () => {
    if(displayA.checked){
        answer.style.color = 'rgb(0,0,0)'
    }else{
        answer.style.color = 'rgba(0,0,0,0)'
    }
}
const isCorrect = (TF) => {

    let div = document.getElementById(`div${last}`)
    if(TF) div.style.backgroundColor = tah ? 'rgb(255, 102, 0)' : 'rgb(0, 102, 255)'
    else{
        div.style.backgroundColor = 'black'
        div.style.color = 'white'
    }

    if(tah) tah = false
    else tah = true
    naTahu()
}
checkA()
displayA.addEventListener('change', checkA)

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

                        displayA.checked = false
                        answer.style.color = 'rgba(0,0,0,0)'

                        try{
                            document.getElementById(`div${last}`).style.textShadow = ''
                        }catch(error){}
                        div.style.textShadow = '0 0 5px white'

                        question.innerText = data[txt.innerText].question
                        answer.innerText = data[txt.innerText].answer

                        last = `${x}-${y}`
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
                console.log(i, data[i].answer)
            }
    })
    .catch(error => console.error('Error loading data:', error));
}
// dataCheck()
// skap1