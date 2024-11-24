
import * as THREE from 'three';

// Create the view and renderer
const div = document.querySelector('.webgl');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, div.offsetWidth / div.offsetHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(div.offsetWidth, div.offsetHeight);
div.appendChild(renderer.domElement);

// Cube geometry
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// Earth's
const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('earth.png');
const sphereMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const earth = new THREE.Mesh(sphereGeometry, sphereMaterial);
earth.position.x = 3;
scene.add(earth);

// Lights
const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(hemisphereLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Camera's
camera.position.z = 5;

// Animation
function animate() {
    requestAnimationFrame(animate);

    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    earth.rotation.y += 0.005;

    renderer.render(scene, camera);
}

animate();

// Responsiveness
window.addEventListener('resize', () => {
    camera.aspect = div.offsetWidth / div.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(div.offsetWidth, div.offsetHeight);
});