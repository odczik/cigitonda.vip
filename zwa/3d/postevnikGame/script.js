import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const userNum = document.getElementById('userNum')
var ME = {
    userNum: parseInt(userNum.value),
    position:{
        x: 0, y: 0, z: 0
    },
    rotation:{
        x: 0, y: 0, z: 0
    }
}
var OP = {
    userNum: 0
}
var CURSOR = {
    startX: 0,
    startY: 0,
    down: false
}
//otevreni ws
const connection = new WebSocket("ws://localhost:8080");
userNum.addEventListener('change', () => {
    ME.userNum = parseInt(userNum.value)
    console.log(ME.userNum)

    sendData()
})
//posilani dat na server
connection.onopen = () => {
    console.log("WebSocket is open now.");
};

connection.onclose = () => {
    console.log("WebSocket is closed now.");
};

connection.onerror = (event) => {
    console.error("WebSocket error observed:", event);
};

connection.onmessage = (event) => {
    
    const data = JSON.parse(event.data.toString());
    
    if(data.userNum != ME.userNum){
        OP = data
        window.alert("connection established")
    }
    console.log(data)
}
function sendData(){
    
    const data = ME

    try{
        connection.send(JSON.stringify(data));
    }catch(error){}
}
document.getElementById('reconnect').addEventListener('click', () => {
    sendData()
    console.log(true)
})

const loader3d = new OBJLoader()
//====================================================================================================
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
const cameraCont = new THREE.Object3D()
cameraCont.add(cameraParent)
cameraParent.add(camera); // Add the camera to the parent
scene.add(cameraCont); // Add the parent to the scene

camera.position.z = 10
cameraParent.position.z = 0
cameraCont.position.z = 0

console.log(cameraCont.children)
console.log(cameraParent.children)

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
drawGuideLines()
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

//zahajeni animace + tocici se kostka
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({color: 'rgb(255,0,0)'})
const cube = new THREE.Mesh(geometry, material)
console.log(cube)
scene.add(cube)

function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    renderer.render(scene, camera)
}
animate()

//orientace v prostoru
function getAngle(length, sensitivity){
    return Math.atan(length/sensitivity)
}
window.addEventListener('mousedown', e => {
    CURSOR.startX = e.clientX, CURSOR.startY = e.clientY
    CURSOR.down = true
})
window.addEventListener('mouseup', e => {
    CURSOR.down = false

    ME.rotation.y += getAngle(CURSOR.startX - e.clientX, 250)
    ME.rotation.z += getAngle(CURSOR.startY - e.clientY, 250)
})
window.addEventListener('mousemove', e => {
    
    if(CURSOR.down){

        cameraCont.rotation.y = ME.rotation.y + getAngle(CURSOR.startX - e.clientX, 250)
        cameraParent.rotation.x = ME.rotation.z + getAngle(CURSOR.startY - e.clientY, 250)
    }

})

loader3d.load(
    'assets/panacek.obj',
    function(object){
        scene.add(object)
    },
    function(xhr){
        console.log((xhr.loaded / xhr.total * 100 ) + '% loaded')
    },
    function(error){
        console.log('error')
    }
)