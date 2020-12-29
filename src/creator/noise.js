import { Perlin } from "./perlin";

////////////////////////////////////////////////////////////////////////////////
// Noise                                                                      //
////////////////////////////////////////////////////////////////////////////////

const Noise = function (params) {
  params = params || {};
  this.seed = params.seed || this.randomSeed();
  this.iScale = params.iScale || 1;
  this.iOctaves = params.iOctaves || 1;
  this.iFalloff = params.iFalloff || 1;
  this.iIntensity = params.iIntensity || 1;
  this.iRidginess = params.iRidginess || 0;
  this.sScale = params.sScale || 1;
  this.sOctaves = params.sOctaves || 0;
  this.sFalloff = params.sFalloff || 1;
  this.sIntensity = params.sIntensity || 1;
  this.perlin = new Perlin(this.seed);
  this.noise = this.perlin.noise;
};

Noise.prototype.randomSeed = function () {
  return btoa(Math.floor(Math.random() * 9999999999999))
    .replace("=", "")
    .replace("=", "");
};

Noise.prototype.octave = function (x, y, z, octaves) {
  var val = 0;
  var scale = 1;
  for (var i = 0; i < octaves; i++) {
    val += this.noise(x * scale, y * scale, z * scale) / scale;
    scale *= 2;
  }
  return val;
};

Noise.prototype.normalizedOctave = function (x, y, z, octaves) {
  var q = 2 - 1 / Math.pow(2, octaves - 1);
  return this.octave(x, y, z, octaves) / q;
};

Noise.prototype.ridgify = function (val) {
  return 1 - 2 * Math.abs(val - 0.5);
};

Noise.prototype.sample = function (x, y, z, params) {
  var offset = 0;
  if (this.sOctaves > 0) {
    offset = this.octave(
      x / this.sScale,
      y / this.sScale,
      z / this.sScale,
      this.sOctaves
    );
    offset = Math.pow(offset, this.sFalloff);
    offset = offset * this.sIntensity;
  }
  var val = this.normalizedOctave(
    x / this.iScale + offset,
    y / this.iScale + offset,
    z / this.iScale + offset,
    this.iOctaves
  );
  if (this.iRidginess > 0) {
    var ridge = this.normalizedOctave(
      x / this.iScale + offset,
      y / this.iScale + offset,
      z / this.iScale + offset + 11,
      this.iOctaves
    );
    val = this.iRidginess * this.ridgify(ridge) + (1 - this.iRidginess) * val;
  }
  val = Math.pow(val, this.iFalloff);
  val = Math.max(0, Math.min(1, val * this.iIntensity));
  return val;
};

export { Noise };
