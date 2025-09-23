// Import Three.js and dependencies via CDN URLs
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { FontLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/geometries/TextGeometry.js';
import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/index.js';

// DOM Elements
const loader = document.getElementById('loader');
const mainContent = document.getElementById('mainContent');

// Three.js Setup
const canvas = document.getElementById('loaderCanvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.7));
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Rotating TorusKnot behind
const torusMesh = new THREE.Mesh(
  new THREE.TorusKnotGeometry(5, 1.2, 100, 16),
  new THREE.MeshStandardMaterial({ color: 0xf7a51d, wireframe: true })
);
scene.add(torusMesh);

// Load font and create 3D text
const fontLoader = new FontLoader();
fontLoader.load(
  'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
  (font) => {
    const textMesh = new THREE.Mesh(
      new TextGeometry('Sanskar Realty\nA Venture Of Yatharth Group', {
        font: font,
        size: 2.5,
        height: 1,
        bevelEnabled: true,
        bevelThickness: 0.3,
        bevelSize: 0.2,
        bevelSegments: 5
      }),
      new THREE.MeshStandardMaterial({ color: 0x151515, metalness: 0.5, roughness: 0.3 })
    );

    // Center text
    textMesh.geometry.computeBoundingBox();
    const centerOffset = -0.5 * (textMesh.geometry.boundingBox.max.x - textMesh.geometry.boundingBox.min.x);
    textMesh.position.x = centerOffset;
    scene.add(textMesh);

    // GSAP animations
    gsap.to(textMesh.rotation, { y: "+=6.28", duration: 3 });
    gsap.to(textMesh.scale, { x:1.1, y:1.1, z:1.1, repeat:1, yoyo:true, duration:1.5 });
  }
);

// Animate loop
function animate() {
  requestAnimationFrame(animate);
  torusMesh.rotation.x += 0.005;
  torusMesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Hide loader after 3 seconds
setTimeout(() => {
  gsap.to(loader, { opacity: 0, duration: 1, onComplete: () => {
    loader.style.display = 'none';
    mainContent.classList.remove('hidden');
  }});
}, 3000);

// Responsive
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
