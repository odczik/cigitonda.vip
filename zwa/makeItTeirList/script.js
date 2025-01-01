const imgInput = document.getElementById('imgInput'), imgContainer = document.getElementById('picContainer')
const fileInputInfo = document.getElementById('fileInputInfo')

imgInput.addEventListener('change', () => {
    const files = imgInput.files
    imgContainer.innerHTML = ''

    if(files.length == 0){
        fileInputInfo.innerText('zdane obrazky nebyly nahrany')
        return
    }

    Array.from(files).forEach(item => {
        if(item.type.startsWith('image/')){
            const reader = new FileReader();

            reader.onload = function(e){
                const img = document.createElement('img')
                img.src = e.target.result
                imgContainer.appendChild(img)
            }
            reader.readAsDataURL(item);
        }
    })
})