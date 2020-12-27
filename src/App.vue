<template>
  <div id="planets" class="flex flex-col">
    <Button @click="showGallery = !showGallery"
      >{{ showGallery ? "Hide" : "Show" }} Gallery</Button
    >
    <div class="flex flex-col mt-2" v-if="showGallery">
      <Button
        @click="loadPlanet(p.image)"
        v-for="(p, i) in planets"
        :key="i"
        :active="planetImage == p.image"
        >{{ p.name }}</Button
      >
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { onBeforeUnmount, ref } from "vue";
import Button from "./components/Button.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    Button,
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

    // starfield
    const stargeo = new THREE.SphereGeometry(10, 32, 32);
    const starloader = new THREE.TextureLoader();
    const starphong = new THREE.MeshPhongMaterial({
      map: starloader.load("img/tycho-skymap.jpg"),
      side: THREE.BackSide,
    });
    const starmesh = new THREE.Mesh(stargeo, starphong);
    scene.add(starmesh);

    // planet
    const planetgeo = new THREE.SphereGeometry(1, 32, 32);
    const planetloader = new THREE.TextureLoader();
    const planetphong = new THREE.MeshPhongMaterial({
      map: planetloader.load("img/planets/gallery_earth.jpg"),
    });
    const planet = new THREE.Mesh(planetgeo, planetphong);
    scene.add(planet);

    // render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // orbit controls
    let controls = new OrbitControls(camera, renderer.domElement);
    // controls.autoRotate = true;
    // controls.autoRotateSpeed = -1.0;
    controls.enableDamping = true;

    function animate() {
      requestAnimationFrame(animate);
      planet.rotation.y -= 0.001;
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

    const planetImage = ref("earth");
    const showGallery = ref(false);

    return {
      loadPlanet: (image) => {
        planetImage.value = image;
        planetphong.map = planetloader.load(`img/planets/gallery_${image}.jpg`);
      },
      showGallery,
      planetImage,
      planets: [
        { image: "mercury", name: "Mercury" },
        { image: "venus", name: "Venus" },
        { image: "earth", name: "Earth" },
        { image: "mars", name: "Mars" },
        { image: "jupiter", name: "Jupiter" },
        { image: "saturn", name: "Saturn" },
        { image: "neptune", name: "Neptune" },
        { image: "extrasolar1", name: "Gliese 436 b" },
        { image: "extrasolar2", name: "55 Cancri f" },
        { image: "extrasolar3", name: "Gliese 581 c" },
        { image: "extrasolar4", name: "Kepler-7b" },
        { image: "extrasolar4", name: "Kepler-7b" },
      ],
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
#planets .button {
  margin-bottom: 0.25rem;
}
</style>
