/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let StopsignCount = 0;
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

export class StopsignGeometry1 extends GrObject {
  /**
   * @param {Properties} params
   */
  constructor(params = {}) {
    let stop = new T.Group();
    // put the object in its place
    stop.position.x = Number(params.x) || 0;
    stop.position.y = Number(params.y) || 0;
    stop.position.z = Number(params.z) || 0;
    stop.scale.set(
      Number(params.size) || 1,
      Number(params.size) || 1,
      Number(params.size) || 1
    );
    super(`StopsignGeometry1-${++StopsignCount}`, stop);
    let rod_r = 0.1,
      rod_h = 2;
    let rod_geom = new T.CylinderGeometry(rod_r, rod_r, rod_h);
    let rod_mat = new T.MeshStandardMaterial({
      roughness: 0.75,
      color: "grey",
    });
    let rod_mesh = new T.Mesh(rod_geom, rod_mat);
    stop.add(rod_mesh);

    let sign_geometry = new T.BufferGeometry();
    let temp = [];
    let r = 0.4,
      n = 4;
    let offset = Math.PI / n / 2;
    for (let i = 0; i < Math.PI * 2; i += Math.PI / n) {
      temp.push(0);
      temp.push(0);
      temp.push(0);
      temp.push(r * Math.sin(i + Math.PI / n - offset));
      temp.push(r * Math.cos(i + Math.PI / n - offset));
      temp.push(0);
      temp.push(r * Math.sin(i - offset));
      temp.push(r * Math.cos(i - offset));
      temp.push(0);
    }
    for (let i = 0; i < Math.PI * 2; i += Math.PI / n) {
      temp.push(0);
      temp.push(0);
      temp.push(-0.2);
      temp.push(r * Math.sin(i - offset));
      temp.push(r * Math.cos(i - offset));
      temp.push(-0.2);
      temp.push(r * Math.sin(i + Math.PI / n - offset));
      temp.push(r * Math.cos(i + Math.PI / n - offset));
      temp.push(-0.2);
    }
    for (let i = 0; i < Math.PI * 2; i += Math.PI / n) {
      temp.push(r * Math.sin(i + Math.PI / n - offset));
      temp.push(r * Math.cos(i + Math.PI / n - offset));
      temp.push(0);
      temp.push(r * Math.sin(i - offset));
      temp.push(r * Math.cos(i - offset));
      temp.push(-0.2);
      temp.push(r * Math.sin(i - offset));
      temp.push(r * Math.cos(i - offset));
      temp.push(0);
      temp.push(r * Math.sin(i + Math.PI / n - offset));
      temp.push(r * Math.cos(i + Math.PI / n - offset));
      temp.push(0);
      temp.push(r * Math.sin(i + Math.PI / n - offset));
      temp.push(r * Math.cos(i + Math.PI / n - offset));
      temp.push(-0.2);
      temp.push(r * Math.sin(i - offset));
      temp.push(r * Math.cos(i - offset));
      temp.push(-0.2);
    }
    const sign_vertices = new Float32Array(temp);
    sign_geometry.setAttribute(
      "position",
      new T.BufferAttribute(sign_vertices, 3)
    );
    sign_geometry.computeVertexNormals();

    // give it UVs
    let temp2 = [];
    for (let i = 0; i < Math.PI * 2; i += Math.PI / n) {
      temp2.push(1 / 2);
      temp2.push(1 / 2);
      temp2.push(1 / 2 + Math.sin(i + Math.PI / n - offset) / 2);
      temp2.push(1 / 2 + Math.cos(i + Math.PI / n - offset) / 2);
      temp2.push(1 / 2 + Math.sin(i - offset) / 2);
      temp2.push(1 / 2 + Math.cos(i - offset) / 2);
    }
    const sign_uvs = new Float32Array(temp2);
    sign_geometry.setAttribute("uv", new T.BufferAttribute(sign_uvs, 2));

    let sign_tl = new T.TextureLoader().load("./textures/stopsign.jpg");
    let sign_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: sign_tl,
      //bumpMap: sign_tl,
    });
    let sign_mesh = new T.Mesh(sign_geometry, sign_material);
    sign_mesh.translateZ(0.2);
    sign_mesh.translateY(rod_h);
    stop.add(sign_mesh);
    rod_mesh.translateY(rod_h / 2);
  }
}
