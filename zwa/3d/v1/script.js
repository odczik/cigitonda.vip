/** @type {HTMLCanvasElement} */
//====================================================================================================
/** @type {import('three').Scene} */
/** @type {import('three').PerspectiveCamera} */
/** @type {import('three').WebGLRenderer} */
/** @type {import('three').BoxGeometry} */
/** @type {import('three').MeshBasicMaterial} */
/** @type {import('three').Mesh} */
//====================================================================================================

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
// Scene, Camera, Renderer
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const cameraParent = new THREE.Object3D();
cameraParent.add(camera); // Add the camera to the parent
scene.add(cameraParent); // Add the parent to the scene

cameraParent.position.z = 10

var MATRIX = [[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]]
for(let y = 1; y<20; y++){
    MATRIX[0][y] = MATRIX[0][0]
}
for(let x = 1; x<20; x++){
    MATRIX[x] = MATRIX[0]
}
console.log(MATRIX)

for(let x = 0; x<20; x++){
    for(let z = 0; z<20; z++){
        MATRIX[19]
    }
}

// Create a Cube
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({color: 'rgb(255,0,0)'})
const cube = new THREE.Mesh(geometry, material)
console.log(cube)
scene.add(cube)

// Camera Position
const drawCrosshair = () => {
    
    for(let i = 0; i<4; i++){
        ctx.save()
        ctx.translate(canvas.width/2, canvas.height/2)
        ctx.rotate(Math.PI/2*i)

        ctx.fillStyle = 'black'
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 2

        ctx.fillRect(-2, 5, 4, 16)
        ctx.strokeRect(-2, 5, 4, 16)
        ctx.restore()
    }
}
const drawGuideLines = () => {
    //guide lines
    const lineMaterial = new THREE.LineBasicMaterial({color: 'rgb(255,255,255)'})
    for(let s = 0; s<2; s++)
        for(let i = 0; i<=20; i++){
            const POINTS = [[], [], [], [], [], []]

            POINTS[0].push(new THREE.Vector3(-100, -100+i*10, -100+200*s))
            POINTS[0].push(new THREE.Vector3(100, -100+i*10, -100+200*s))
            POINTS[1].push(new THREE.Vector3(-100+i*10, -100, -100+200*s))
            POINTS[1].push(new THREE.Vector3(-100+i*10, 100, -100+200*s))        

            POINTS[2].push(new THREE.Vector3(-100+200*s, -100+i*10, -100))
            POINTS[2].push(new THREE.Vector3(-100+200*s, -100+i*10, 100))
            POINTS[3].push(new THREE.Vector3(-100+200*s, -100, -100+i*10))
            POINTS[3].push(new THREE.Vector3(-100+200*s, 100, -100+i*10))

            POINTS[4].push(new THREE.Vector3(-100+i*10, -100+200*s, -100))
            POINTS[4].push(new THREE.Vector3(-100+i*10, -100+200*s, 100))
            POINTS[5].push(new THREE.Vector3(-100, -100+200*s, -100+i*10))
            POINTS[5].push(new THREE.Vector3(100, -100+200*s, -100+i*10))


            for(j of POINTS){
                const lineGeometry = new THREE.BufferGeometry().setFromPoints(j)

                const line = new THREE.Line(lineGeometry, lineMaterial)
                scene.add(line)
            }
    }
}
const drawOutMatrix = () => {

    const blockGeometry = new THREE.BoxGeometry(10,10,10)
    const material = new THREE.MeshBasicMaterial({color: 'rgb(150,32,32)'})

    var all = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
    for(let x = 0; x<20; x++){
        for(let z = 0; z<20; z++){

            all[x][z] = new THREE.Mesh(blockGeometry, material)
            scene.add(all[x][z])
            
            all[x][z].position.x = -100+x*10 + 5
            all[x][z].position.z = -100+z*10 + 5
            all[x][z].position.y = -95
        }
    }
}
drawOutMatrix()
drawGuideLines()

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
drawCrosshair()

window.addEventListener('resize', resizeScene)

window.addEventListener('keydown', e => {
    console.log(e.key)
    switch(e.key.toLocaleLowerCase()){
        case 'd':
            cameraParent.position.x++
            break
        case 'a':
            cameraParent.position.x--
            break
        case 's':
            cameraParent.position.z++
            break
        case 'w':
            cameraParent.position.z--
            break
        case 'control':
            cameraParent.position.y++
            break
        case 'shift':
            cameraParent.position.y--
            break
        case 'q':
            cameraParent.rotation.x+=0.1
            break
        case 'e':
            cameraParent.rotation.x-=0.1
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

        cameraParent.rotation.y = USER.rotation.y + getAngle(CURSOR.startX - e.clientX, 250)
        camera.rotation.x = USER.rotation.z + getAngle(CURSOR.startY - e.clientY, 250)
    }

})