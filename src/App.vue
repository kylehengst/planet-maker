<template>
  <div id="planets">
    <button @click="loadPlanet('mercury')">Mercury</button>
    <button @click="loadPlanet('venus')">Venus</button>
    <button @click="loadPlanet('earth')">Earth</button>
    <button @click="loadPlanet('mars')">Mars</button>
    <button @click="loadPlanet('jupiter')">Jupiter</button>
    <button @click="loadPlanet('saturn')">Saturn</button>
    <button @click="loadPlanet('neptune')">Neptune</button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { onBeforeUnmount } from "vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  setup() {
    // scene
    const scene = new THREE.Scene();

    // light
    const ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);

    // planet
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    // planet
    const geo = new THREE.SphereGeometry(1, 32, 32);
    const materialLoader = new THREE.TextureLoader();
    const phong = new THREE.MeshPhongMaterial({
      map: materialLoader.load("img/planets/gallery_earth.jpg"),
    });
    const planet = new THREE.Mesh(geo, phong);
    scene.add(planet);

    // render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // orbit controls
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = -1.0;
    controls.enableDamping = true;

    function animate() {
      requestAnimationFrame(animate);
      planet.rotation.y -= 0.01;
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onBeforeUnmount(() => {
      window.removeEventListener("resize", onWindowResize);
      renderer.domElement.parentElement.removeChild(renderer.domElement);
    });

    return {
      loadPlanet: (planet) => {
        phong.map = materialLoader.load(`img/planets/gallery_${planet}.jpg`);
      },
    };
  },
};
</script>

<style>
body {
  margin: 0;
}
#planets {
  position: absolute;
  z-index: 10;
  right: 10px;
  top: 10px;
}
</style>
