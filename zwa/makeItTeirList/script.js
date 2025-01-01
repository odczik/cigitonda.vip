const imgInput = document.getElementById('imgInput'), imgContainer = document.getElementById('picContainer')
const fileInputInfo = document.getElementById('fileInputInfo')

var PICS = {
    len: 3,
    dirList: []
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
            }
            reader.readAsDataURL(item);
        }
    })
    console.log(PICS)
})

window.addEventListener('resize', () => {
    console.log(window.innerWidth, innerHeight)
})