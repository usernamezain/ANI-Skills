---
name: ui:threejs-backgrounds
description: Build WebGL 3D effects with three.js — particle field backgrounds, mouse-reactive 3D objects, scroll-linked 3D scenes, and interactive shader gradients. Use whenever the user asks for "3D background", "particle effect", "webgl", "three.js scene", "3D hover object", or wants a hero section with depth/motion beyond flat CSS/SVG. Always include cleanup/dispose logic and a resize handler — these are the most commonly missed pieces in three.js code.
---

# Three.js Interactive Backgrounds

## Setup

```html
<script type="importmap">
{ "imports": { "three": "https://unpkg.com/three@0.160.0/build/three.module.js" } }
</script>
<script type="module" src="scene.js"></script>
```
In React, `npm i three` and consider `@react-three/fiber` for larger scenes, but plain three.js (below) is fine and lighter for a single background effect.

## 1. Base scene boilerplate (reuse this skeleton for every effect below)

```js
import * as THREE from "three";

const canvas = document.querySelector("#webgl-bg");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // cap at 2 — uncapped DPR tanks perf on 3x+ mobile screens

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
```

## 2. Particle field background (thousands of points, cheap and very common hero effect)

```js
const count = 3000;
const positions = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 10;

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({ size: 0.02, color: 0xffffff, transparent: true, opacity: 0.8 });
const particles = new THREE.Points(geometry, material);
scene.add(particles);

function animate() {
  requestAnimationFrame(animate);
  particles.rotation.y += 0.0008;
  particles.rotation.x += 0.0002;
  renderer.render(scene, camera);
}
animate();
```

## 3. Mouse-reactive 3D object (object tilts/follows cursor — hero centerpiece)

```js
const geo = new THREE.IcosahedronGeometry(1.4, 1);
const mat = new THREE.MeshStandardMaterial({ color: 0x7c3aed, roughness: 0.3, metalness: 0.6, wireframe: false });
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

scene.add(new THREE.AmbientLight(0xffffff, 0.4));
const light = new THREE.PointLight(0xffffff, 1.2);
light.position.set(3, 3, 3);
scene.add(light);

let targetX = 0, targetY = 0;
window.addEventListener("mousemove", e => {
  targetX = (e.clientX / window.innerWidth - 0.5) * 2;
  targetY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.y += (targetX * 0.6 - mesh.rotation.y) * 0.05; // lerp toward target for smooth easing
  mesh.rotation.x += (targetY * 0.6 - mesh.rotation.x) * 0.05;
  renderer.render(scene, camera);
}
animate();
```

## 4. Scroll-linked 3D (rotate/move object as user scrolls — pair with `gsap-scrolltrigger-effects` skill)

```js
gsap.registerPlugin(ScrollTrigger);
gsap.to(mesh.rotation, {
  y: Math.PI * 2,
  scrollTrigger: { trigger: "#webgl-section", start: "top bottom", end: "bottom top", scrub: 1 }
});
```
GSAP can tween any numeric property, including three.js object properties directly — no special plugin needed.

## 5. Interactive shader gradient background (fragment shader driven by time + mouse — most "premium" looking option, more setup cost)

```js
const uniforms = {
  u_time: { value: 0 },
  u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
  u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
};
const shaderMat = new THREE.ShaderMaterial({
  uniforms,
  vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
  fragmentShader: `
    uniform float u_time; uniform vec2 u_mouse; uniform vec2 u_resolution;
    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      float d = distance(uv, u_mouse);
      vec3 color = mix(vec3(0.05,0.0,0.2), vec3(0.5,0.1,0.9), sin(u_time*0.5 + d*6.0)*0.5+0.5);
      gl_FragColor = vec4(color, 1.0);
    }`
});
const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMat);
scene.add(plane);
window.addEventListener("mousemove", e => {
  uniforms.u_mouse.value.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
});
function animate(t) {
  requestAnimationFrame(animate);
  uniforms.u_time.value = t * 0.001;
  renderer.render(scene, camera);
}
animate(0);
```

## Critical correctness rules (three.js-specific — these are the most commonly broken pieces)

1. **Always dispose on teardown** (SPA route change / React unmount): call `geometry.dispose()`, `material.dispose()`, `renderer.dispose()`, and cancel the `requestAnimationFrame` loop (store its ID) — otherwise every navigation leaks a full WebGL context and the browser will eventually throw "too many WebGL contexts."
2. **Cap `setPixelRatio` at 2** — using the raw `window.devicePixelRatio` on high-DPI phones (often 3+) renders far more pixels than needed and destroys frame rate for no visible quality gain.
3. **Pause the render loop when off-screen**: use an `IntersectionObserver` on the canvas and stop calling `requestAnimationFrame` when not visible — background hero effects running full-tilt while scrolled far away waste battery/CPU.
4. In React, create the scene/renderer inside `useEffect`, store refs, and dispose everything in the cleanup function — never create a new `THREE.Scene` on every render.
5. Keep particle counts and shader complexity reasonable on mobile — detect `navigator.hardwareConcurrency` or screen width and reduce `count`/resolution accordingly for a graceful fallback rather than a frozen tab.
