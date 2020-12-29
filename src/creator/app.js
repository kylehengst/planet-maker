import { Alea } from "./alea";
import { Noise } from "./noise";
import { Controls } from "./controls";
import { PlanetTexture } from "./texture";
import utilties from "./utilties";

var Application = function () {
  this.controls = new Controls(this);
  Math.random = Alea(this.controls.seed);
};
Application.prototype.construct = function () {
  var surfaceNoise = new Noise({
    iScale: this.controls.surfaceiScale,
    iOctaves: this.controls.surfaceiOctaves,
    iFalloff: this.controls.surfaceiFalloff,
    iIntensity: this.controls.surfaceiIntensity,
    iRidginess: this.controls.surfaceiRidginess,
    sScale: this.controls.surfacesScale,
    sOctaves: this.controls.surfacesOctaves,
    sFalloff: this.controls.surfacesFalloff,
    sIntensity: this.controls.surfacesIntensity,
  });
  var landNoise = new Noise({
    iScale: this.controls.landiScale,
    iOctaves: this.controls.landiOctaves,
    iFalloff: this.controls.landiFalloff,
    iIntensity: this.controls.landiIntensity,
    iRidginess: this.controls.landiRidginess,
    sScale: this.controls.landsScale,
    sOctaves: this.controls.landsOctaves,
    sFalloff: this.controls.landsFalloff,
    sIntensity: this.controls.landsIntensity,
  });
  var cloudNoise = new Noise({
    iScale: this.controls.cloudiScale,
    iOctaves: this.controls.cloudiOctaves,
    iFalloff: this.controls.cloudiFalloff,
    iIntensity: this.controls.cloudiIntensity,
    iRidginess: this.controls.cloudiRidginess,
    sScale: this.controls.cloudsScale,
    sOctaves: this.controls.cloudsOctaves,
    sFalloff: this.controls.cloudsFalloff,
    sIntensity: this.controls.cloudsIntensity,
  });

  console.log(this.controls.resolution);
  this.planetTexture = new PlanetTexture({
    width: parseInt(this.controls.resolution),
    waterDeep: utilties.datColor(this.controls.waterDeep),
    waterShallow: utilties.datColor(this.controls.waterShallow),
    waterLevel: this.controls.waterLevel,
    waterSpecular: this.controls.waterSpecular,
    waterFalloff: this.controls.waterFalloff,
    surfaceNoise: surfaceNoise,
    landColor1: utilties.datColor(this.controls.landColor1),
    landColor2: utilties.datColor(this.controls.landColor2),
    landNoise: landNoise,
    cloudColor: utilties.datColor(this.controls.cloudColor),
    cloudOpacity: this.controls.cloudOpacity,
    cloudNoise: cloudNoise,
    spin: this.controls.spin,
  });
};
Application.prototype.render = function () {
  this.promise = new Promise((resolve, reject) => {
    this.resolve = resolve;
    this.construct();
    this.update();
  });
  return this.promise;
};
Application.prototype.update = function () {
  if (!this.planetTexture.done) {
    var t0 = Date.now();
    while (!this.planetTexture.done && Date.now() - t0 < 20) {
      this.planetTexture.update();
    }
    if (this.planetTexture.done) {
      console.log("done");
      cancelAnimationFrame(this.update.bind(this));
      this.resolve(true);
    }
  }
  // if (this.controls.animate) {
  //   this.planetRenderer.planetMesh.rotation.y += 0.001;
  //   this.planetRenderer.cloudMesh.rotation.y += 0.002;
  // }
  // this.planetRenderer.render();
  requestAnimationFrame(this.update.bind(this));
};

export { Application };
