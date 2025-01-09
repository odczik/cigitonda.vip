const imgInput = document.getElementById('imgInput'), imgContainer = document.getElementById('picContainer')
const fileInputInfo = document.getElementById('fileInputInfo')
const cursorImg = document.getElementById('cursorImg'), cursorCont = document.getElementById('cursorCont')
const directory = document.getElementById('directory')

var PICS = {
    len: 3,
    dirList: [],
}
var CURSOR = {
    mouseOver: '',
    hold: false
}
var TIERS = {
    all: ['S', 'A', 'B', 'C', 'D', 'E', 'F'/*,'davidKoval'*/]
}

function transferImg(desContId, imgId){ // destination container

    const srcImg = document.getElementById(imgId)
    let desImg = document.createElement('img')

    desImg.src = srcImg.src
    srcImg.remove()
    desImg.id = imgId

    document.getElementById(desContId).appendChild(desImg)

    desImg.addEventListener('mousedown', e => {
        e.preventDefault()
    })
    desImg.addEventListener('mouseover', () => {
        CURSOR.mouseOver = desImg.id
        console.log(desImg.id)
    })
    desImg.addEventListener('mouseleave', () => {
        CURSOR.mouseOver = ''
    })
}

imgInput.addEventListener('change', () => {
    const files = imgInput.files
    imgContainer.innerHTML = ''

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
    'assets/trida/': 9
}
directory.addEventListener('change', () =>{
    console.log(directory.value)
    imgContainer.innerHTML = ''

    let counter = 0
    for(let i = 0; i<DIRS[directory.value]; i++){

        try{
            const img = document.createElement('img')
            img.src = `${directory.value}${counter}.png`

            img.id = `img${PICS.len}`
            
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
        }catch(error){
            console.log('kys')
        }

        counter++
    }

})
uploudFromAssets()
window.addEventListener('mousedown', e => {
   
    if(CURSOR.mouseOver != ''){
        CURSOR.hold = CURSOR.mouseOver

        cursorImg.src = PICS.dirList[CURSOR.hold.substring(3)]
        console.log(cursorImg.src)

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
                    console.log('kys')
                }
            }else{

                if(document.getElementById(`showcaseImg-${i}`) != null){
                    document.getElementById(`showcaseImg-${i}`).remove()
                }
            }
        }
    }
})
/*
for(let i of tiers){

    let tierRow = document.getElementById(i)

    tierRow.addEventListener('mouseover', () => {
        
        CURSOR.mouseOver = i
        if(CURSOR.hold != false){

            let placeHolderImg = document.createElement('img')
            placeHolderImg.src = CURSOR.hold
            placeHolderImg.id = 'placeHolderImg'
            placeHolderImg.style.opacity = '0.5'

            document.getElementById(i).appendChild(placeHolderImg)
        }
        console.log(i)
    })
    tierRow.addEventListener('mouseleave', () => {

        CURSOR.mouseOver = ''

        try{
            delete document.getElementById('placeHolderImg')
        }catch(error){}
    })
}
*/