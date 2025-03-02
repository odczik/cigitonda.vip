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
// Create a parent object for the camera
const cameraParent = new THREE.Object3D();
cameraParent.add(camera); // Add the camera to the parent
scene.add(cameraParent); // Add the parent to the scene

camera.position.z = 10
camera.rotation.x = Math.PI/4
cameraParent.rotation.y = Math.PI/4

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
// Update rotations
function updateCameraRotation(deltaYaw, deltaPitch) {
    cameraParent.rotation.y += deltaYaw; // Horizontal rotation (yaw)
    camera.rotation.x += deltaPitch; // Vertical rotation (pitch)

    // Clamp pitch to avoid flipping (look straight up/down issue)
    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
}

function rotateCamera(deltaYaw, deltaPitch) {
    // Create quaternions for pitch (x) and yaw (y)
    const pitchQuaternion = new THREE.Quaternion();
    const yawQuaternion = new THREE.Quaternion();

    // Apply pitch rotation relative to camera's local x-axis
    pitchQuaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), deltaPitch);
    camera.quaternion.multiplyQuaternions(pitchQuaternion, camera.quaternion);

    // Apply yaw rotation relative to world's y-axis
    yawQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), deltaYaw);
    camera.quaternion.multiplyQuaternions(yawQuaternion, camera.quaternion);
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
drawGuideLines()