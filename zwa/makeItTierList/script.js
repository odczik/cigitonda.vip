const imgInput = document.getElementById('imgInput'), imgContainer = document.getElementById('picContainer')
const fileInputInfo = document.getElementById('fileInputInfo')
const cursorImg = document.getElementById('cursorImg'), cursorCont = document.getElementById('cursorCont')
const directory = document.getElementById('directory')

var PICS = {
    len: 0,
    dirList: [],
}
var CURSOR = {
    mouseOver: '',
    hold: false
}
var TIERS = {
    all: ['S', 'A', 'B', 'C', 'D', 'E', 'F'/*,'davidKoval'*/],
    bg: ['rgb(150,0,0)', 'rgb(180,160,0)', 'rgb(200,100,0)', 'rgb(0,180,50)', 'rgb(0,120,200)', 'rgb(180,0,180)', 'rgb(80,0,80)']
}
function transferImg(desContId, imgId){ // destination container

    const srcImg = document.getElementById(imgId)
    let desImg = document.createElement('img')

    desImg.src = srcImg.src
    srcImg.remove()
    desImg.id = imgId
    desImg.classList.add('allImgs')

    document.getElementById(desContId).appendChild(desImg)

    desImg.addEventListener('mousedown', e => {
        e.preventDefault()
    })
    desImg.addEventListener('mouseover', () => {
        CURSOR.mouseOver = desImg.id
        // console.log(desImg.id)
    })
    desImg.addEventListener('mouseleave', () => {
        CURSOR.mouseOver = ''
    })
}
function clearTable(){
    const allImgs = document.querySelectorAll('.allImgs')

    allImgs.forEach(img => {
        img.remove()
    })
}
function countImgs(tierId){

    const tier = document.getElementById(tierId)
    let counter = 0

    for(let i = 0; i < tier.innerHTML.length; i++){

        if((tier.innerHTML[i] + tier.innerHTML[i+1] + tier.innerHTML[i+2] + tier.innerHTML[i+3]) == '<img') counter++
    }
    return counter
}
imgInput.addEventListener('change', () => {
    clearTable()
    const files = imgInput.files

    if(files.length == 0){
        fileInputInfo.innerText('zdane obrazky nebyly nahrany')
        return
    }
    PICS.len = 0
    Array.from(files).forEach(item => {
    
        if(item.type.startsWith('image/')){
            const reader = new FileReader();

            reader.onload = function(e){
    
                const img = document.createElement('img')
                img.src = e.target.result
      
                img.id = `img${PICS.len}`
                img.classList.add('allImgs')
                
                PICS.len++
                PICS.dirList.push(img.src)

                imgContainer.appendChild(img)
                
                img.addEventListener('mousedown', e => {
                    e.preventDefault()
                })
                img.addEventListener('mouseover', () => {
                    CURSOR.mouseOver = img.id
                    console.log(img.id)
                })
                img.addEventListener('mouseleave', () => {
                    CURSOR.mouseOver = ''
                })
            }
            reader.readAsDataURL(item);
        }
    })
})
const DIRS = {
    'assets/kocky/': 14,
    'assets/trida/': 21,
    'assets/starwars/': 47
}
directory.addEventListener('change', () =>{
    clearTable()

    PICS.len = 0
    let counter = 0
    for(let i = 0; i<DIRS[directory.value]; i++){

        try{
            const img = document.createElement('img')
            img.src = `${directory.value}${counter}.png`

            img.id = `img${PICS.len}`
            img.classList.add('allImgs')
            
            PICS.len++
            PICS.dirList.push(img.src)

            imgContainer.appendChild(img)
            
            img.addEventListener('mousedown', e => {
                e.preventDefault()
            })
            img.addEventListener('mouseover', () => {
                CURSOR.mouseOver = img.id
                // console.log(img.id)
            })
            img.addEventListener('mouseleave', () => {
                CURSOR.mouseOver = ''
            })
        }catch(error){
            console.log('kys')
        }

        counter++
    }

})
window.addEventListener('mousedown', e => {
   
    if(CURSOR.mouseOver != ''){
        CURSOR.hold = CURSOR.mouseOver

        cursorImg.src = PICS.dirList[CURSOR.hold.substring(3)]

        cursorCont.style.left = `${e.clientX}px`, cursorCont.style.top = `${e.clientY}px`
    }
})
window.addEventListener('mouseup', e => {
    for(let i of TIERS.all){
        if(document.getElementById(`showcaseImg-${i}`) != null){
            document.getElementById(`showcaseImg-${i}`).remove()

            transferImg(i, CURSOR.hold)
        }
    }

    const imgContRect = imgContainer.getBoundingClientRect()
    const isOverIC = 
        e.clientX >= imgContRect.left &&
        e.clientX <= imgContRect.right &&
        e.clientY >= imgContRect.top &&
        e.clientY <= imgContRect.bottom;

    if(isOverIC && CURSOR.hold != false){

        transferImg('picContainer', CURSOR.hold)
    }

    if(CURSOR.hold != false){
        CURSOR.hold = false
        cursorCont.style.top = '-100%'
    }
})
window.addEventListener('mousemove', e => {
    if(CURSOR.hold != false){
        cursorCont.style.left = `${e.clientX}px`, cursorCont.style.top = `${e.clientY}px`           
    
        for(let i of TIERS.all){

            const tierRow = document.getElementById(i)

            const tierRect = tierRow.getBoundingClientRect()
            const isOver = 
                e.clientX >= tierRect.left &&
                e.clientX <= tierRect.right &&
                e.clientY >= tierRect.top &&
                e.clientY <= tierRect.bottom;
        
            if(isOver){
                
                if(document.getElementById(`showcaseImg-${i}`) == null){
                
                    let showcaseImg = document.createElement('img')
                    showcaseImg.src = PICS.dirList[CURSOR.hold.substring(3)]
                    showcaseImg.id = `showcaseImg-${i}`
                    showcaseImg.style.opacity = '0.5'

                    document.getElementById(i).appendChild(showcaseImg)

                }else{
                    // console.log('kys')
                }
            }else{

                if(document.getElementById(`showcaseImg-${i}`) != null){
                    document.getElementById(`showcaseImg-${i}`).remove()
                }
            }
        }
    }
})
window.addEventListener('keypress', e => {

    console.log(document.getElementById('S').innerHTML)
    let timer = performance.now()
    console.log(countImgs('S'))
    console.log(performance.now() - timer)
})