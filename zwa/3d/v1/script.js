// Scene, Camera, Renderer
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Create a Cube
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({color: 'rgb(255,0,0)'})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// Camera Position
camera.position.z = 10

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
}
animate()

function resizeScene(){
    let width = 0, height = 0
    if(window.innerWidth > window.innerHeight){
        width = window.innerHeight+1, height = window.innerHeight+1
    }else{
        width = window.innerWidth+1, height = window.innerWidth+1
    }
    
    renderer.setSize(width, height)
    camera.aspect = 1
    camera.updateProjectionMatrix()
}
resizeScene()
window.addEventListener('resize', resizeScene)

window.addEventListener('keydown', e => {
    console.log(e.key)
    switch(e.key.toLocaleLowerCase()){
        case 'd':
            camera.position.x++
            break
        case 'a':
            camera.position.x--
            break
        case 'w':
            camera.position.y++
            break
        case 's':
            camera.position.y--
            break
        case 'control':
            camera.position.z++
            break
        case 'shift':
            camera.position.z--
            break
        case 'q':
            camera.rotation.x+=0.1
            break
        case 'e':
            camera.rotation.x-=0.1
            break
    }
})

var CURSOR = {
    startX: 0,
    startY: 0,
    down: false
}
function getAngle(length){
    console.log(Math.atan(length/100))
    return Math.atan(length/100)
}
window.addEventListener('mousedown', e => {
    CURSOR.startX = e.clientX, CURSOR.startY = e.clientY
    CURSOR.down = true
})
window.addEventListener('mouseup', () => {
    CURSOR.down = false
})
//pohyb a orientace kamery
window.addEventListener('mousemove', e => {
    
    if(CURSOR.down){

        camera.rotation.y = getAngle(CURSOR.startX - e.clientX)
        camera.rotation.x = getAngle(CURSOR.startY - e.clientY)
    }

})