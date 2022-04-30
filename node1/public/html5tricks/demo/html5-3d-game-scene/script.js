const portalVertexShader = document.getElementById("portalVertexShader").
textContent;
const portalFragmentShader = document.getElementById("portalFragmentShader").
textContent;

const firefliesVertexShader = document.getElementById("firefliesVertexShader").
textContent;
const firefliesFragmentShader = document.getElementById(
"firefliesFragmentShader").
textContent;

const debugObject = {
  clearColor: "#1e2243",
  portalColorStart: "#b91fac",
  portalColorEnd: "#ffebf3" };


// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader();

// GLTF loader
const gltfLoader = new THREE.GLTFLoader();

const bakedTexture = textureLoader.load(
"https://assets.codepen.io/22914/baked-02.jpg");

bakedTexture.encoding = THREE.sRGBEncoding;

/**
 * Materials
 */

// baked material
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture });

// Do not flip the Y axes of the texture which is on by default for some reason
bakedTexture.flipY = false;

// Pole light material
const poleLightMaterial = new THREE.MeshBasicMaterial({ color: "#f0bf94" });

// PortalLightMaterial
const portalLightMaterial = new THREE.ShaderMaterial({
  vertexShader: portalVertexShader,
  fragmentShader: portalFragmentShader,
  transparent: false,
  blending: THREE.AdditiveBlending,
  uniforms: {
    uTime: { value: 0 },
    uColorStart: { value: new THREE.Color(debugObject.portalColorStart) },
    uColorEnd: { value: new THREE.Color(debugObject.portalColorEnd) } } });



/**
 * Model
 */
gltfLoader.load("https://assets.codepen.io/22914/portal-2.glb", gltf => {
  const bakedMesh = gltf.scene.children.find(child => child.name === "baked");
  bakedMesh.material = bakedMaterial;

  const portalLight = gltf.scene.children.find(
  child => child.name === "portalCircle");

  portalLight.material = portalLightMaterial;
  gltf.scene.children.
  filter(child => child.name.includes("lampLight")).
  forEach(light => {
    light.material = poleLightMaterial;
  });

  scene.add(gltf.scene);
});

/**
 * Fireflies
 */

// Geometry
const firefliesGeometry = new THREE.BufferGeometry();
const firefliesCount = 30;
const positionArray = new Float32Array(firefliesCount * 3);
const scaleArray = new Float32Array(firefliesCount);
for (let i = 0; i < firefliesCount; i++) {
  positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4;
  positionArray[i * 3 + 1] = Math.random() * 1.5;
  positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4;
  scaleArray[i] = Math.random();
}
firefliesGeometry.setAttribute(
"position",
new THREE.BufferAttribute(positionArray, 3));

firefliesGeometry.setAttribute(
"aScale",
new THREE.BufferAttribute(scaleArray, 1));


const firefliesMaterial = new THREE.ShaderMaterial({
  vertexShader: firefliesVertexShader,
  fragmentShader: firefliesFragmentShader,
  transparent: true,
  uniforms: {
    uTime: { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uSize: { value: 100 } },

  blending: THREE.AdditiveBlending,
  depthWrite: false });

const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial);
scene.add(fireflies);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight };


window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /// Update fireflies
  firefliesMaterial.uniforms.uPixelRatio.value = Math.min(
  window.devicePixelRatio,
  2);

});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
45,
sizes.width / sizes.height,
0.1,
100);

camera.position.x = -4;
camera.position.y = 2;
camera.position.z = -4;
scene.add(camera);

// Controls
const controls = new THREE.OrbitControls(camera, canvas);
controls.enableDamping = true;

// Don't go below the ground
controls.maxPolarAngle = Math.PI / 2 - 0.1;

// Clamp panning
const minPan = new THREE.Vector3(-0.2, -0.2, -0.2);
const maxPan = new THREE.Vector3(2, 2, 2);
const _v = new THREE.Vector3();

controls.addEventListener("change", function () {
  _v.copy(controls.target);
  controls.target.clamp(minPan, maxPan);
  _v.sub(controls.target);
  camera.position.sub(_v);
});

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true });

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setClearColor(debugObject.clearColor);
/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  firefliesMaterial.uniforms.uTime.value = elapsedTime;
  portalLightMaterial.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();