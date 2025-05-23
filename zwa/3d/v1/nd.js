//====================================================================================================
/** @type {import('three').Scene} */
/** @type {import('three').PerspectiveCamera} */
/** @type {import('three').WebGLRenderer} */
/** @type {import('three').BoxGeometry} */
/** @type {import('three').MeshBasicMaterial} */
/** @type {import('three').Mesh} */
//====================================================================================================

// Scene, Camera, Renderer
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Create a Cube
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({color: 'rgb(255,0,0)'})
const cube = new THREE.Mesh(geometry, material)
console.log(cube)
scene.add(cube)

// Camera Position
camera.position.y = -200
camera.rotation.x = 1.6

//guide lines
const lineMaterial = new THREE.LineBasicMaterial({color: 'rgb(255,255,255)'})
for(let s = 0; s<2; s++)
    for(let i = 0; i<=20; i++){
        const POINTS = [[], [], [], [], [], []]

        POINTS[0].push(new THREE.Vector3(-100, -100+i*10, -100+200*s))
        POINTS[0].push(new THREE.Vector3(100, -100+i*10, -100+200*s))
        POINTS[0].push(new THREE.Vector3(-100+i*10, -100, -100+200*s))
        POINTS[0].push(new THREE.Vector3(-100+i*10, 100, -100+200*s))        

        POINTS[0].push(new THREE.Vector3(-100+200*s, -100+i*10, -100))
        POINTS[0].push(new THREE.Vector3(-100+200*s, -100+i*10, 100))
        POINTS[0].push(new THREE.Vector3(-100+200*s, -100, -100+i*10))
        POINTS[0].push(new THREE.Vector3(-100+200*s, 100, -100+i*10))

        POINTS[0].push(new THREE.Vector3(-100+i*10, -100+200*s, -100))
        POINTS[0].push(new THREE.Vector3(-100+i*10, -100+200*s, 100))
        POINTS[0].push(new THREE.Vector3(-100, -100+200*s, -100+i*10))
        POINTS[0].push(new THREE.Vector3(100, -100+200*s, -100+i*10))


        for(j of POINTS){
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(j)

            const line = new THREE.Line(lineGeometry, lineMaterial)
            scene.add(line)
        }
}

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
        width = window.innerHeight+2, height = window.innerHeight+2
    }else{
        width = window.innerWidth+2, height = window.innerWidth+2
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
var USER = {
    rotation:{
        z: 0, y: 0
    },
    x: 0, y: 0, z: 0
}

function getAngle(length, sensitivity){
    return Math.atan(length/sensitivity)
}
window.addEventListener('mousedown', e => {
    CURSOR.startX = e.clientX, CURSOR.startY = e.clientY
    CURSOR.down = true
})
window.addEventListener('mouseup', e => {
    CURSOR.down = false

    USER.rotation.y += getAngle(CURSOR.startX - e.clientX, 250)
    USER.rotation.z += getAngle(CURSOR.startY - e.clientY, 250)
})
//pohyb a orientace kamery
window.addEventListener('mousemove', e => {
    
    if(CURSOR.down){

        camera.rotation.y = USER.rotation.y + getAngle(CURSOR.startX - e.clientX, 250)
        camera.rotation.x = USER.rotation.z + getAngle(CURSOR.startY - e.clientY, 250)
    }

})