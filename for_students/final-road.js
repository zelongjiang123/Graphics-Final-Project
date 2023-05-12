/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let Road1Count = 0;
let Road2Count = 0;
let Road3Count = 0;
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
 * @property {number} [z_size=1]
 */

export class RoadGeometry1 extends GrObject {
  /**
   * @param {Properties} params
   */
  constructor(params = {}) {
    let road = new T.Group();
    // put the object in its place
    road.position.x = Number(params.x) || 0;
    road.position.y = Number(params.y) || 0;
    road.position.z = Number(params.z) || 0;
    road.scale.set(Number(params.x_size) || 1, 1, Number(params.z_size) || 1);
    super(`RoadGeometry1-${++Road1Count}`, road);
    let road_geom = new T.BoxGeometry(1, 0.001, 1);
    let road_tl = new T.TextureLoader().load("./textures/road1.png");
    let road_mat = new T.MeshStandardMaterial({
      color: "grey",
      roughness: 0.75,
      map: road_tl,
    });
    let road_mesh = new T.Mesh(road_geom, road_mat);
    road.add(road_mesh);
    road_mesh.translateY(0.02);
  }
}

export class RoadGeometry2 extends GrObject {
  /**
   * @param {Properties} params
   */
  constructor(params = {}) {
    let road = new T.Group();
    // put the object in its place
    road.position.x = Number(params.x) || 0;
    road.position.y = Number(params.y) || 0;
    road.position.z = Number(params.z) || 0;
    road.scale.set(1, 1, Number(params.z_size) || 1);
    super(`RoadGeometry2-${++Road2Count}`, road);
    //let road_geom = new T.BoxGeometry(1, 0.001, 1);
    let road_geom = new T.BufferGeometry();
    const road_vertices = new Float32Array([
      // right
      1, 0, 0,

      0, 0, -1,

      0, 0, 0,

      1, 0, 0,

      1, 0, -1,

      0, 0, -1,
    ]);
    const road_uvs = new Float32Array([
      1, 0,

      0, 1,

      0, 0,

      1, 0,

      1, 1,

      0, 1,
    ]);
    road_geom.setAttribute("uv", new T.BufferAttribute(road_uvs, 2));

    road_geom.setAttribute("position", new T.BufferAttribute(road_vertices, 3));
    road_geom.computeVertexNormals();
    let road_tl = new T.TextureLoader().load("./textures/road2.jpg");
    let road_mat = new T.MeshStandardMaterial({
      roughness: 0.75,
      map: road_tl,
    });
    let road_mesh = [];
    let length = Number(params.x_size) || 1;
    for (let i = 0; i < length; i++) {
      road_mesh[i] = new T.Mesh(road_geom, road_mat);
      road.add(road_mesh[i]);
      road_mesh[i].translateY(0.021);
      road_mesh[i].translateX(i);
    }
  }
}

export class RoadGeometry3 extends GrObject {
  /**
   * @param {Properties} params
   */
  constructor(params = {}) {
    let road = new T.Group();
    // put the object in its place
    road.position.x = Number(params.x) || 0;
    road.position.y = Number(params.y) || 0;
    road.position.z = Number(params.z) || 0;
    road.scale.set(Number(params.x_size) || 1, 1, 1);
    super(`RoadGeometry3-${++Road3Count}`, road);
    //let road_geom = new T.BoxGeometry(1, 0.001, 1);
    let road_geom = new T.BufferGeometry();
    const road_vertices = new Float32Array([
      // right
      1, 0, 0,

      0, 0, -1,

      0, 0, 0,

      1, 0, 0,

      1, 0, -1,

      0, 0, -1,
    ]);
    const road_uvs = new Float32Array([
      1, 0,

      0, 1,

      0, 0,

      1, 0,

      1, 1,

      0, 1,
    ]);
    road_geom.setAttribute("uv", new T.BufferAttribute(road_uvs, 2));

    road_geom.setAttribute("position", new T.BufferAttribute(road_vertices, 3));
    road_geom.computeVertexNormals();
    let road_tl = new T.TextureLoader().load("./textures/road2.jpg");
    let road_mat = new T.MeshStandardMaterial({
      roughness: 0.75,
      map: road_tl,
    });
    let road_mesh = [];
    let length = Number(params.z_size) || 1;
    for (let i = 0; i < length; i++) {
      road_mesh[i] = new T.Mesh(road_geom, road_mat);
      road.add(road_mesh[i]);
      road_mesh[i].translateY(0.021);
      road_mesh[i].translateZ(i);
    }
  }
}
