/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let BlasterCount = 0;
// define your buildings here - remember, they need to be imported
// into the "main" program
/**
 * we pass a set of properties to a cube to allow for flexible parameters
 *
 * @typedef Properties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */

export class BlasterGeometry1 extends GrObject {
  /**
   * @param {Properties} params
   */
  constructor(params = {}) {
    let blaster = new T.Group();
    // put the object in its place
    blaster.position.x = Number(params.x) || 0;
    blaster.position.y = Number(params.y) || 0;
    blaster.position.z = Number(params.z) || 0;
    /*
    blaster.scale.set(
      Number(params.size) || 1,
      Number(params.size) || 1,
      Number(params.size) || 1
    );*/
    super(`BlasterGeometry1-${++BlasterCount}`, blaster);
    let r = Number(params.size) || 1;
    let sphere_geom = new T.SphereGeometry(r);

    let spheres = [],
      speedX = [],
      speedY = [],
      done = [];
    let color = [
      "red",
      "grey",
      "green",
      "blue",
      "yellow",
      "teal",
      "pink",
      "gold",
      "brown",
    ];
    for (let i = 0; i < 10; i++) {
      let sphere_mat = new T.MeshStandardMaterial({
        color: color[T.MathUtils.randInt(0, color.length - 1)],
        roughness: 0.75,
      });
      spheres[i] = new T.Mesh(sphere_geom, sphere_mat);
      blaster.add(spheres[i]);
      spheres[i].translateY(r);
      speedX[i] = T.MathUtils.randFloat(0.1, 0.5);
      speedY[i] = T.MathUtils.randFloat(0.3, 0.7);
      let angle = T.MathUtils.randFloat(0, Math.PI * 2);
      spheres[i].rotateY(angle);
      done[i] = 0;
    }
    this.spheres = spheres;
    this.speedX = speedX;
    this.speedY = speedY;
    this.count = 5;
    this.done_count = 0;
    this.done = done;
    this.blaster = blaster;
  }
  stepWorld(delta, timeOfDay) {
    if (this.count > 0) this.count--;
    else {
      if (this.done_count == 10) {
        this.blaster.clear();
      } else {
        let gravity = 0.1;
        for (let i = 0; i < this.spheres.length; i++) {
          if (this.spheres[i].position.y < 0 && this.done[i] == 0) {
            this.done[i] = 1;
            this.done_count++;
          } else {
            this.spheres[i].translateX(this.speedX[i]);
            this.spheres[i].translateY(this.speedY[i]);
            this.speedY[i] -= gravity;
          }
        }
      }
    }
  }
}
