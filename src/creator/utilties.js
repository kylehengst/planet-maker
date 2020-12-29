"use strict";

////////////////////////////////////////////////////////////////////////////////
// Utility functions                                                          //
////////////////////////////////////////////////////////////////////////////////

var rgba = function (r, g, b, a) {
  r = Math.floor(r * 255);
  g = Math.floor(g * 255);
  b = Math.floor(b * 255);
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};

var randomRGB = function () {
  return "#" + Math.round(Math.random() * 0xffffff).toString(16);
};

var normalRGBA = function (x, y, z) {
  return {
    r: x / 2 + 0.5,
    g: y / 2 + 0.5,
    b: z / 2 + 0.5,
  };
};

var smootherstep = function (t) {
  return 6 * Math.pow(t, 5) - 15 * Math.pow(t, 4) + 10 * Math.pow(t, 3);
};

var sphereMap = function (u, v) {
  /*  Returns the 3D cartesian coordinate of a point on
        a sphere that corresponds to the given u,v coordinate. */
  var azimuth = 2 * Math.PI * u;
  var inclination = Math.PI * v;
  var x = Math.sin(inclination) * Math.cos(azimuth);
  var y = Math.sin(inclination) * Math.sin(azimuth);
  var z = Math.cos(inclination);
  return {
    x: x,
    y: y,
    z: z,
  };
};

var datColor = function (color) {
  var s = color.replace("#", "");
  return {
    r: parseInt(s.slice(0, 2), 16) / 255,
    g: parseInt(s.slice(2, 4), 16) / 255,
    b: parseInt(s.slice(4, 6), 16) / 255,
  };
};

var randomSeed = function () {
  return btoa(Math.floor(Math.random() * 9999999999999))
    .replace("=", "")
    .replace("=", "");
};

export default {
  rgba,
  randomRGB,
  normalRGBA,
  smootherstep,
  sphereMap,
  datColor,
  randomSeed,
};
