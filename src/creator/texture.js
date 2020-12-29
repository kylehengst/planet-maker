import { XYIterator } from "./iterator";
import { PixelSurface } from "./surface";
import utilites from "./utilties";

////////////////////////////////////////////////////////////////////////////////
// Planet Texture Renderer                                                    //
////////////////////////////////////////////////////////////////////////////////

var PlanetTexture = function (params) {
  this.params = params;
  this.width = params.width;
  this.height = params.width / 2;
  this.iterator = new XYIterator(this.width, this.height);
  this.diffuse = new PixelSurface(this.width, this.height);
  this.normal = new PixelSurface(this.width, this.height);
  this.specular = new PixelSurface(this.width, this.height);
  this.cloud = new PixelSurface(this.width, this.height);
  this.done = false;
};

PlanetTexture.prototype.surfaceHeight = function (x, y, z) {
  return this.params.surfaceNoise.sample(
    x / this.params.spin,
    y / this.params.spin,
    z
  );
};

PlanetTexture.prototype.surfaceColor = function (x, y, z) {
  var c = this.params.landNoise.sample(
    x / this.params.spin,
    y / this.params.spin,
    z
  );
  var q0 = c;
  var q1 = 1 - c;
  var r = this.params.landColor1.r * q0 + this.params.landColor2.r * q1;
  var g = this.params.landColor1.g * q0 + this.params.landColor2.g * q1;
  var b = this.params.landColor1.b * q0 + this.params.landColor2.b * q1;
  return {
    r: r,
    g: g,
    b: b,
  };
};

PlanetTexture.prototype.update = function () {
  if (this.done) {
    return;
  }
  var next = this.iterator.next();
  var p0 = utilites.sphereMap(
    next.x / (this.width - 1),
    next.y / (this.height - 1)
  );
  var c0 = this.surfaceHeight(p0.x, p0.y, p0.z);
  var dr = 0.01;
  if (c0 > this.params.waterLevel) {
    // var c = this.surfaceColor(p0.x, p0.y, p0.z);
    // this.diffuse.setPixel(next.x, next.y, c.r, c.g, c.b, 1);
    this.specular.setPixel(next.x, next.y, 0, 0, 0, 1);
    // var px = sphereMap(
    //   (next.x + dr) / (this.width - 1),
    //   next.y / (this.height - 1)
    // );
    // var py = sphereMap(
    //   next.x / (this.width - 1),
    //   (next.y + dr) / (this.height - 1)
    // );
    // var cx = this.surfaceHeight(px.x, px.y, px.z);
    // var cy = this.surfaceHeight(py.x, py.y, py.z);
    // var n = $V([dr / (this.width - 1), 0, cx - c0])
    //   .cross($V([0, dr / (this.height - 1), cy - c0]))
    //   .toUnitVector();
    // var rgb = normalRGBA(n.elements[0], -n.elements[1], n.elements[2]);
    // this.normal.setPixel(next.x, next.y, rgb.r, rgb.g, rgb.b, 1);
  } else {
    // var q1 = smootherstep(
    //   Math.pow(c0 / this.params.waterLevel, this.params.waterFalloff)
    // );
    // var q0 = 1 - q1;
    // var rgb = {
    //   r: this.params.waterDeep.r * q0 + this.params.waterShallow.r * q1,
    //   g: this.params.waterDeep.g * q0 + this.params.waterShallow.g * q1,
    //   b: this.params.waterDeep.b * q0 + this.params.waterShallow.b * q1,
    // };
    // this.diffuse.setPixel(next.x, next.y, rgb.r, rgb.g, rgb.b, 1);
    this.specular.setPixel(
      next.x,
      next.y,
      this.params.waterSpecular,
      this.params.waterSpecular,
      this.params.waterSpecular,
      1
    );
    // var rgb = normalRGBA(0, 0, 1);
    // this.normal.setPixel(next.x, next.y, rgb.r, rgb.g, rgb.b, 1);
  }
  // var i =
  //   this.params.cloudNoise.sample(
  //     p0.x / this.params.spin,
  //     p0.y / this.params.spin,
  //     p0.z
  //   ) * this.params.cloudOpacity;
  // this.cloud.setPixel(
  //   next.x,
  //   next.y,
  //   this.params.cloudColor.r,
  //   this.params.cloudColor.g,
  //   this.params.cloudColor.b,
  //   i
  // );
  if ((next.x == this.width - 1 && next.y % 32 == 0) || next.done == 1) {
    // this.diffuse.update();
    // this.normal.update();
    this.specular.update();
    // this.cloud.update();
  }
  this.done = next.done == 1;
};

export { PlanetTexture };
