var INPUT = {
    startX: 0,
    startY: 0,
    down: false,
    movement:{
        w: false, s: false, a: false, d: false
    }
}
window.addEventListener('keydown', e =>{

    switch(e.key.toLowerCase()){
        case 'w':
            INPUT.movement.w = true
            break
        case 's':
            INPUT.movement.s = true
            break
        case 'a':
            INPUT.movement.a = true
            break
        case 'd':
            INPUT.movement.d = true
            break
    }
})
window.addEventListener('keyup', e =>{

    switch(e.key.toLowerCase()){
        case 'w':
            INPUT.movement.w = true
            break
        case 's':
            INPUT.movement.s = true
            break
        case 'a':
            INPUT.movement.a = true
            break
        case 'd':
            INPUT.movement.d = true
            break
    }
})

function addMovement(angle){

    if(angle<0) angle+=Math.PI*2

    switch(angle){
        case 0: ME.position.z++; break;
    }
}
const controls = () => {
    
    window.addEventListener('keydown', e => {

        switch(e.key.toLowerCase()){
            case 'w':
                ME.position.z--
                break
            case 's':
                ME.position.z++
                break
            case 'a':
                ME.position.x--
                break
            case 'd':
                ME.position.x++
                break
            case ' ':
                ME.position.y++
                break
            case 'shift':
                ME.position.y--
                break
            case 'q':
                action.paused = action.paused ? false : true
                break
        }
        cameraCont.position.x = ME.position.x
        cameraCont.position.y = ME.position.y
        cameraCont.position.z = ME.position.z
    
        sendData()
        playerColor()
        opColor()
    })
}
//orientace v prostoru
function getAngle(length, sensitivity){
    return Math.atan(length/sensitivity)
}
window.addEventListener('mousedown', e => {
    INPUT.startX = e.clientX, INPUT.startY = e.clientY
    INPUT.down = true
})
window.addEventListener('mouseup', e => {
    INPUT.down = false

    ME.rotation.y += getAngle(INPUT.startX - e.clientX, 250)
    ME.rotation.z += getAngle(INPUT.startY - e.clientY, 250)

    ME.rotation.x %= Math.PI*2
    ME.rotation.y %= Math.PI*2
    ME.rotation.z %= Math.PI*2
})
window.addEventListener('mousemove', e => {
    
    if(INPUT.down){

        cameraCont.rotation.y = ME.rotation.y + getAngle(INPUT.startX - e.clientX, 250)
        cameraParent.rotation.x = ME.rotation.z + getAngle(INPUT.startY - e.clientY, 250)
    }

})
var INPUT = {
    startX: 0,
    startY: 0,
    down: false,
    movement:{
        w: false, s: false, a: false, d: false
    }
}