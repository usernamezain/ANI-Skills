# 3D Cursor Projection & Click Particle Explosion Reference

This guide contains the detailed math, styling rules, setup configurations, and animation updates required to project mouse coordinate vectors and spawn click particle shards in WebGL/Three.js.

---

## 1. Mathematical Concept: 2D-to-3D Projection
In a perspective camera environment, the cursor coordinates on the screen are converted to Normalized Device Coordinates (NDC) ranging from `-1` to `1`:
$$\text{NDC}_x = \left(\frac{\text{Mouse}_x}{\text{Width}}\right) \times 2 - 1$$
$$\text{NDC}_y = -\left(\frac{\text{Mouse}_y}{\text{Height}}\right) \times 2 + 1$$

Using `vector.unproject(camera)`, we trace a ray from the camera position through the screen coordinate, finding where it intersects the target coordinate depth plane.

---

## 2. Interactive Coordinate Mapping Script

```javascript
let cursorCube;
let cursorExplosionParticles = [];

// Initialize 3D mesh:
const cursorCubeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x222222,
    metalness: 0.95,
    roughness: 0.3,
    clearcoat: 1.0,
    clearcoatRoughness: 0.2,
    emissive: 0xffffff,
    emissiveIntensity: 0.35,
    transparent: true,
    opacity: 0.95
});

const cursorCubeGeo = new THREE.BoxGeometry(1, 1, 1);
cursorCube = new THREE.Mesh(cursorCubeGeo, cursorCubeMaterial);
threeScene.add(cursorCube);
```

### Unprojecting in Render Loop
```javascript
function update3DCursor(targetMouseX, targetMouseY, threeCamera, cursorCube) {
    if (!threeCamera || !cursorCube) return;

    let vector = new THREE.Vector3(targetMouseX, targetMouseY, 0.5);
    vector.unproject(threeCamera);
    
    let dir = vector.sub(threeCamera.position).normalize();
    let targetZ = 5;
    let distance = (targetZ - threeCamera.position.z) / dir.z;
    let destPos = threeCamera.position.clone().add(dir.multiplyScalar(distance));

    // Linear Interpolation (lerp) for inertia
    cursorCube.position.x += (destPos.x - cursorCube.position.x) * 0.25;
    cursorCube.position.y += (destPos.y - cursorCube.position.y) * 0.25;
    cursorCube.position.z += (destPos.z - cursorCube.position.z) * 0.25;

    cursorCube.rotation.x += 0.02;
    cursorCube.rotation.y += 0.03;
}
```

---

## 3. Physics Shard Particle Explosion

On `mousedown`, spawn independent physical shards:

```javascript
window.addEventListener('mousedown', () => {
    if (!cursorCube) return;

    const shardGeo = new THREE.BoxGeometry(0.05, 0.05, 0.05);
    const shardCount = 12;

    for (let i = 0; i < shardCount; i++) {
        const shardMesh = new THREE.Mesh(shardGeo, cursorCubeMaterial.clone());
        shardMesh.position.copy(cursorCube.position);

        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const speed = Math.random() * 0.1 + 0.03;

        const vx = Math.sin(phi) * Math.cos(theta) * speed;
        const vy = Math.sin(phi) * Math.sin(theta) * speed;
        const vz = Math.cos(phi) * speed;

        threeScene.add(shardMesh);

        cursorExplosionParticles.push({
            mesh: shardMesh,
            velocity: new THREE.Vector3(vx, vy, vz),
            rotSpeedX: (Math.random() - 0.5) * 0.2,
            rotSpeedY: (Math.random() - 0.5) * 0.2,
            life: 1.0
        });
    }
});
```

### Animation Update & Garbage Collection
```javascript
function updateExplosionParticles(threeScene, cursorExplosionParticles) {
    for (let i = cursorExplosionParticles.length - 1; i >= 0; i--) {
        const p = cursorExplosionParticles[i];
        
        p.mesh.position.add(p.velocity);
        p.velocity.multiplyScalar(0.95); // Drag factor
        
        p.mesh.rotation.x += p.rotSpeedX;
        p.mesh.rotation.y += p.rotSpeedY;

        p.mesh.scale.multiplyScalar(0.92);
        p.mesh.material.opacity -= 0.035;
        p.life -= 0.035;

        // Dispose geometries & materials to prevent GPU leaks
        if (p.life <= 0 || p.mesh.scale.x < 0.005) {
            threeScene.remove(p.mesh);
            p.mesh.geometry.dispose();
            p.mesh.material.dispose();
            cursorExplosionParticles.splice(i, 1);
        }
    }
}
```
