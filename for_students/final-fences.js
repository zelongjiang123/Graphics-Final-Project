/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let FenceCount1 = 0;
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
 * @property {number} [x_size=1]
 * @property {number} [y_size=1]
 * @property {number} [z_size=1]
 */

export class FenceGeometry1 extends GrObject {
  /**
   * @param {Properties} params
   */
  constructor(params = {}) {
    let fence = new T.Group();
    // put the object in its place
    fence.position.x = Number(params.x) || 0;
    fence.position.y = Number(params.y) || 0;
    fence.position.z = Number(params.z) || 0;
    fence.scale.set(
      Number(params.x_size) || 1,
      Number(params.y_size) || 1,
      Number(params.z_size) || 1
    );
    super(`FenceGeometry1-${++FenceCount1}`, fence);
    let x = 2,
      y = 1,
      z = 0.5;
    let wall_geom = new T.BoxGeometry(x, y, z);
    //let wall_tl = new T.TextureLoader().load("./textures/wall1.png");
    let wall_mat = new T.MeshStandardMaterial({
      color: "grey",
      roughness: 0.75,
      //map: wall_tl,
    });
    let wall_mesh = new T.Mesh(wall_geom, wall_mat);
    let cyl_geom = new T.CylinderGeometry(z / 2, z / 2, x);
    let cyl_mat = new T.MeshStandardMaterial({
      color: "grey",
      roughness: 0.75,
      //map: wall_tl,
    });
    let cyl_mesh = new T.Mesh(cyl_geom, cyl_mat);
    let cyl_geom2 = new T.CylinderGeometry(z / 2, z / 2, y);
    let cyl_mesh2 = new T.Mesh(cyl_geom2, cyl_mat);
    let sphere_geom = new T.SphereGeometry(z / 2);
    let sphere_mesh = new T.Mesh(sphere_geom, cyl_mat);
    fence.add(cyl_mesh);
    cyl_mesh.rotateZ(Math.PI / 2);
    cyl_mesh.translateX(y);
    fence.add(wall_mesh);
    fence.add(cyl_mesh2);
    cyl_mesh2.translateX(-x / 2);
    cyl_mesh2.translateY(y / 2);
    wall_mesh.translateY(y / 2);
    fence.add(sphere_mesh);
    sphere_mesh.translateX(-x / 2);
    sphere_mesh.translateY(y);
  }
}
