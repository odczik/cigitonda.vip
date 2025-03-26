import * as THREE from './node_modules/three/build/three.module.js';
import {GLTFLoader} from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import {FBXLoader} from './node_modules/three/examples/jsm/loaders/FBXLoader.js'

THREE.ColorManagement.enabled = true;
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

const userNum = document.getElementById('userNum')
var MEmodel = null
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

//pridani postavy hrace do sceny
let material = new THREE.MeshBasicMaterial({color: 'blue'});
let geometry = new THREE.BoxGeometry(1, 1, 1);
const OPcube = new THREE.Mesh(geometry, material);
scene.add(OPcube);

material = new THREE.MeshBasicMaterial({color: 'red'});
geometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cameraParent.add(cube)

const loaderGLB = new GLTFLoader();
/*
loaderGBL.load('assets/panacek0.glb', function (gltf){

    MEmodel = gltf.scene
	scene.add(MEmodel);
    cameraParent.add(MEmodel)

}, undefined, function(error){
	console.error(error);
} );
*/

let mixer, action
const loaderFBX = new FBXLoader()
loaderFBX.load('assets/goblin-utok-animace.fbx', (fbx) => {
    fbx.scale.set(0.05,0.05,0.05)
    MEmodel = fbx
    scene.add(MEmodel)

    mixer = new THREE.AnimationMixer(MEmodel)
    action = mixer.clipAction(MEmodel.animations[0])
    action.play()
})

const ambientLight = new THREE.AmbientLight(0xffffff, 10); // Optional
scene.add(ambientLight);

const gbelCont = new THREE.Object3D()
scene.add(gbelCont)
loaderGLB.load('assets/gbel.glb', (glb) => {

    let gbel = glb.scene
    scene.add(gbel)

    gbel.scale.set(5, 5, 5)

    gbelCont.add(gbel)
})
gbelCont.position.x = 5
const playerColor = () => {
    if(ME.userNum == 0) cube.material.color.set('red')
    else cube.material.color.set('blue')
}
const opColor = () => {
    if(OP.userNum == 0) OPcube.material.color.set('red')
    else OPcube.material.color.set('blue')
}

//otevreni ws
const connection = new WebSocket("ws://localhost:8080");
userNum.addEventListener('change', () => {
    ME.userNum = parseInt(userNum.value)
    console.log(ME.userNum)

    sendData()

    playerColor()
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
        opColor()
    
        // console.log(OP, data)
    
        OPcube.position.x = OP.position.x
        OPcube.position.y = OP.position.y
        OPcube.position.z = OP.position.z
    }
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


            for(let j of POINTS){
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


const clock = new THREE.Clock()
function animate() {
    requestAnimationFrame(animate)

    const delta = clock.getDelta()
    if(mixer) mixer.update(delta)

    renderer.render(scene, camera)
}
animate()

//=============================================
//              pohyb hrace
//=============================================
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
const addMovement = (angle) => {

    if(angle<0) angle+=Math.PI*2
    if(angle>=Math.PI*2) angle%=Math.PI*2

    let Z = Math.cos(angle), X = Math.sin(angle)

    if(angle>=0&&angle<=Math.PI/2){
        ME.position.x += X, ME.position.z -= Z
        console.log('w') 

    }else if(angle>Math.PI/2 && angle<Math.PI){
        ME.position.x += Z, ME.position.z += X
        console.log('d')

    }else if(angle>=Math.PI && angle<=Math.PI*3/2){
        ME.position.x += Z, ME.position.z += Xd
        console.log('s')

    }else if(angle>Math.PI*3/2 && angle<Math.PI*2){
        ME.position.x -= Z, ME.position.z -= X
        console.log('aw')
    }
}
const controls = () => {
    
    window.addEventListener('keydown', e => {

        switch(e.key.toLowerCase()){
            case 'w':
                addMovement(0)
                // ME.position.z--
                break
            case 's':
                addMovement(Math.PI+0.1)
                // ME.position.z++
                break
            case 'a':
                addMovement(Math.PI/2*3)
                // ME.position.x--
                break
            case 'd':
                addMovement(Math.PI/2+0.1)
                // ME.position.x++
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
        
        console.log(ME.position, ME.rotation)
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
controls()