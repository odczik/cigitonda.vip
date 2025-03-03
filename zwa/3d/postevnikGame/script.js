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