//***Arquivo JS resonsável pela criação da cena do Hall e manipulação dos hotspots
//**

//Cena e controles
const container = document.body
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 200)
const renderer = new THREE.WebGLRenderer({ antialias: true })
const controls = new THREE.OrbitControls(camera, renderer.domElement)
const hotspot = document.querySelector('.hotspot')
let hotspotActive = false
renderer.setSize(window.innerWidth, window.innerHeight)
container.appendChild(renderer.domElement)
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = false
/* controls.autoRotateSpeed = 0.2 */
controls.enableDamping = true

//Posicionando a câmera (nossa visão)
camera.position.set(-1, 0, 0.25)
controls.update()

//Criando a esfera (objeto)
const geometry = new THREE.SphereGeometry(50, 32, 32)
const texture = new THREE.TextureLoader().load('../static/images/auditorio01.jpg')
texture.wrapS = THREE.RepeatWrapping
texture.repeat.x = -1

const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
})

//Adicionando a esfera à cena
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

//Renderizando a cena na tela
function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
}
animate()

//Permitindo a responsividade da tela - mantendo proporções
function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
}

//Raycasting para seleções com o mouse
const rayCaster = new THREE.Raycaster()
function onClick(e) {
    let mouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        - (e.clientY / window.innerHeight) * 2 + 1
    )
    console.log(mouse)
    rayCaster.setFromCamera(mouse, camera)
    const intersects = rayCaster.intersectObjects(texture)
    if (intersects.length < 0) {
        console.log(intersects[0].point);
    }
}
container.addEventListener('click', onClick)

//Funções para mover o mouse 
function onMouseMove(e) {
    let mouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
    )

    rayCaster.setFromCamera(mouse, camera)
    let foundSprite = false
    let intersects = rayCaster.intersectObjects(scene.children)
    intersects.forEach(function (intersect) {
        if (intersect.object.type === 'Sprite') {
            //console.log(intersect.object.name)
            let p = intersect.object.position.clone().project(camera)
            hotspot.style.top = ((-1 * p.y + 1) * window.innerHeight / 2) + 'px'
            hotspot.style.left = ((p.x + 1) * window.innerWidth / 2) + 'px'
            hotspot.classList.add('is-active')
            hotspot.innerHTML = intersect.object.name
            hotspotActive = true
            foundSprite = true
            console.log(intersect.object.scale)
            console.log(hotspot.style.top)
            //Sempre que o hotspot é construído é necessário chamar o atributo link dentro do
            //setAttribute
            hotspot.setAttribute('onclick', 'abreLink("' + intersect.object.link + '")')
        }
    })
    if (foundSprite === false && hotspotActive) {
        hotspot.classList.remove('is-active')
    }
}

function onMouseWheel(event) {
    if (event.wheelDeltaY) { // WebKit
        camera.fov -= event.wheelDeltaY * 0.05
    } else if (event.wheelDelta) { // Opera / IE9
        camera.fov -= event.wheelDelta * 0.05
    } else if (event.detail) { // Firefox
        camera.fov += event.detail * 1.0
    }
    camera.fov = Math.max(40, Math.min(100, camera.fov))
    camera.updateProjectionMatrix()
}

//Criando Hotspots!
function addHotspot(position, name, link, hotspot) {
    let spriteMap = new THREE.TextureLoader().load(hotspot)
    let spriteMaterial = new THREE.SpriteMaterial({
        map: spriteMap
    })
    let sprite = new THREE.Sprite(spriteMaterial)
    sprite.name = name
    sprite.link = link // no objeto sprite foi necessário colocar um atributo pra guardar o link passado como parâmetro 
    sprite.hotspot = hotspot
    sprite.position.copy(position.clone().normalize().multiplyScalar(30))
    sprite.scale.multiplyScalar(12)
    scene.add(sprite)
}

//Adicionando Hotspots na tela

addHotspot(new THREE.Vector3(80, 0.5, -30), rooms_names[0]['name'], rooms_names[0]['url'], '../static/images/hotspots/smoking.png')
addHotspot(new THREE.Vector3(50, 1, -30), rooms_names[0]['name'], rooms_names[0]['url'], '../static/images/hotspots/vestido.png')
addHotspot(new THREE.Vector3(75, -20, -150), rooms_names[1]['name'], rooms_names[1]['url'], '../static/images/hotspots/cafe.png')
addHotspot(new THREE.Vector3(130, -20, 120), rooms_names[3]['name'], rooms_names[3]['url'], '../static/images/hotspots/caderninho.png')
addHotspot(new THREE.Vector3(-30, -5, 60), rooms_names[4]['name'], rooms_names[4]['url'], '../static/images/hotspots/nordeste.png')
addHotspot(new THREE.Vector3(-60, -5, -40), rooms_names[2]['name'], rooms_names[2]['url'], '../static/images/hotspots/logo-familia.png')

//Linkando sites nos hotspots
function abreLink(link) {
    window.open(link)
}

//Chamando as funções
document.addEventListener('mousewheel', onMouseWheel, false)
document.addEventListener('DOMMouseScroll', onMouseWheel, false)
window.addEventListener('resize', onResize)
container.addEventListener('mousemove', onMouseMove)


/* addHotspot(new THREE.Vector3(50, 0.5, 2), rooms_names[0]['name'], rooms_names[0]['url'])
addHotspot(new THREE.Vector3(75, -20, -150), rooms_names[1]['name'], rooms_names[1]['url'])
addHotspot(new THREE.Vector3(120, -20, 120), rooms_names[2]['name'], rooms_names[2]['url'])
addHotspot(new THREE.Vector3(-30, -5, 60), rooms_names[3]['name'], rooms_names[3]['url'])
addHotspot(new THREE.Vector3(-60, -5, -40), rooms_names[4]['name'], rooms_names[4]['url']) */

