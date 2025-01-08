const imgInput = document.getElementById('imgInput'), imgContainer = document.getElementById('picContainer')
const fileInputInfo = document.getElementById('fileInputInfo')
const cursorImg = document.getElementById('cursorImg'), cursorCont = document.getElementById('cursorCont')

var PICS = {
    len: 3,
    dirList: [],
    mouseOver: '',
    hold: false
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
                    PICS.mouseOver = img.id
                    console.log(img.id)
                })
                img.addEventListener('mouseleave', () => {
                    PICS.mouseOver = ''
                })
            }
            reader.readAsDataURL(item);
        }
    })
})
window.addEventListener('mousedown', e => {
    if(PICS.mouseOver != ''){
        PICS.hold = PICS.mouseOver

        console.log(PICS.hold, typeof PICS.hold)
        console.log(PICS.hold.subString(3))
        cursorImg.src = PICS.dirList[PICS.hold.subString(3)]

        cursorCont.style.left = `${e.clientX}px`, cursorCont.style.top = `${e.clientY}px`
    }
})
window.addEventListener('mouseup', () => {
    if(PICS.hold != false){
        PICS.hold = false
        cursorCont.style.top = '-100%'
    }
})
window.addEventListener('mousemove', e => {
    if(PICS.hold != false){
        cursorCont.style.left = `${e.clientX}px`, cursorCont.style.top = `${e.clientY}px`           
    }
})