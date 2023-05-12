/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
let GoalCount = 0;
let SoccerCount = 0;
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

export class SoccerGeometry1 extends GrObject {
  /**
   * @param {Properties} params
   */
  constructor(params = {}) {
    let court = new T.Group();
    // put the object in its place
    court.position.x = Number(params.x) || 0;
    court.position.y = Number(params.y) || 0;
    court.position.z = Number(params.z) || 0;
    court.scale.set(
      2.87 * Number(params.x_size) || 2.87,
      1,
      Number(params.z_size) * 1.52 || 1.52
    );
    super(`SoccerGeometry1-${++SoccerCount}`, court);
    let court_geom = new T.BufferGeometry();
    const court_vertices = new Float32Array([
      // right
      1, 0, 0,

      0, 0, -1,

      0, 0, 0,

      1, 0, 0,

      1, 0, -1,

      0, 0, -1,
    ]);
    const court_uvs = new Float32Array([
      1, 0,

      0, 1,

      0, 0,

      1, 0,

      1, 1,

      0, 1,
    ]);
    court_geom.setAttribute("uv", new T.BufferAttribute(court_uvs, 2));

    court_geom.setAttribute(
      "position",
      new T.BufferAttribute(court_vertices, 3)
    );
    court_geom.computeVertexNormals();
    let court_tl = new T.TextureLoader().load("./textures/soccer_pitch.jpg");
    let court_mat = new T.MeshStandardMaterial({
      roughness: 0.75,
      map: court_tl,
    });
    let court_mesh = new T.Mesh(court_geom, court_mat);
    court_mesh.translateY(0.05);
    court.add(court_mesh);
  }
}
/**
 * we pass a set of properties to a cube to allow for flexible parameters
 *
 * @typedef Properties2
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [x_size=1]
 * @property {number} [y_size=1]
 * @property {number} [z_size=1]
 */
export class GoalGeometry1 extends GrObject {
  /**
   * @param {Properties2} params
   */
  constructor(params = {}) {
    let goal = new T.Group();
    // put the object in its place
    goal.position.x = Number(params.x) || 0;
    goal.position.y = Number(params.y) || 0;
    goal.position.z = Number(params.z) || 0;
    goal.scale.set(
      Number(params.x_size) || 1,
      Number(params.y_size) || 1,
      Number(params.z_size) || 1
    );
    super(`GoalGeometry1-${++GoalCount}`, goal);
    let bar_height = 8,
      width = 24;
    let bar_geom = new T.CylinderGeometry(0.5, 0.5, bar_height);
    let bar_mat = new T.MeshStandardMaterial({
      roughness: 0.75,
    });
    let sphere_geom = new T.SphereGeometry(0.5);
    let bar_mesh = [],
      sphere_mesh = [];
    for (let i = 0; i < 2; i++) {
      bar_mesh[i] = new T.Mesh(bar_geom, bar_mat);
      sphere_mesh[i] = new T.Mesh(sphere_geom, bar_mat);
      goal.add(bar_mesh[i]);
      goal.add(sphere_mesh[i]);
      bar_mesh[i].translateY(bar_height / 2);
      sphere_mesh[i].translateY(bar_height);
    }
    bar_mesh[1].translateZ(-width);
    sphere_mesh[1].translateZ(-width);
    let post_geom = new T.CylinderGeometry(0.5, 0.5, width);
    let post_mesh = new T.Mesh(post_geom, bar_mat);
    goal.add(post_mesh);
    post_mesh.rotateX(Math.PI / 2);
    post_mesh.translateZ(-bar_height);
    post_mesh.translateY(-width / 2);

    let net_geom = new T.BufferGeometry();

    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    let temp = [];
    let r = bar_height,
      n = 12;
    for (let i = 0; i < Math.PI / 2 - Math.PI / n; i += Math.PI / n) {
      temp.push(0);
      temp.push(0);
      temp.push(0);
      temp.push(r * Math.sin(i + Math.PI / n));
      temp.push(r * Math.cos(i + Math.PI / n));
      temp.push(0);
      temp.push(r * Math.sin(i));
      temp.push(r * Math.cos(i));
      temp.push(0);
    }

    for (let i = 0; i < Math.PI / 2 - Math.PI / n; i += Math.PI / n) {
      temp.push(0);
      temp.push(0);
      temp.push(-width);
      temp.push(r * Math.sin(i));
      temp.push(r * Math.cos(i));
      temp.push(-width);
      temp.push(r * Math.sin(i + Math.PI / n));
      temp.push(r * Math.cos(i + Math.PI / n));
      temp.push(-width);
    }
    for (let i = 0; i < Math.PI / 2 - Math.PI / n; i += Math.PI / n) {
      temp.push(r * Math.sin(i + Math.PI / n));
      temp.push(r * Math.cos(i + Math.PI / n));
      temp.push(0);
      temp.push(r * Math.sin(i));
      temp.push(r * Math.cos(i));
      temp.push(-width);
      temp.push(r * Math.sin(i));
      temp.push(r * Math.cos(i));
      temp.push(0);
      temp.push(r * Math.sin(i + Math.PI / n));
      temp.push(r * Math.cos(i + Math.PI / n));
      temp.push(0);
      temp.push(r * Math.sin(i + Math.PI / n));
      temp.push(r * Math.cos(i + Math.PI / n));
      temp.push(-width);
      temp.push(r * Math.sin(i));
      temp.push(r * Math.cos(i));
      temp.push(-width);
    }
    const net_vertices = new Float32Array(temp);
    net_geom.setAttribute("position", new T.BufferAttribute(net_vertices, 3));
    net_geom.computeVertexNormals();

    // give it UVs
    let temp2 = [];
    for (let i = 0; i < Math.PI / 2 - Math.PI / n; i += Math.PI / n) {
      temp2.push(1 / 2);
      temp2.push(1 / 2);
      temp2.push(1 / 2 + Math.sin(i + Math.PI / n) / 2);
      temp2.push(1 / 2 + Math.cos(i + Math.PI / n) / 2);
      temp2.push(1 / 2 + Math.sin(i) / 2);
      temp2.push(1 / 2 + Math.cos(i) / 2);
    }

    for (let i = 0; i < Math.PI / 2 - Math.PI / n; i += Math.PI / n) {
      temp2.push(1 / 2);
      temp2.push(1 / 2);
      temp2.push(1 / 2 + Math.sin(i) / 2);
      temp2.push(1 / 2 + Math.cos(i) / 2);
      temp2.push(1 / 2 + Math.sin(i + Math.PI / n) / 2);
      temp2.push(1 / 2 + Math.cos(i + Math.PI / n) / 2);
    }
    for (let i = 0; i < Math.PI / 2 - Math.PI / n; i += Math.PI / n) {
      temp2.push((i + 1) / n);
      temp2.push(1);
      temp2.push(i / n);
      temp2.push(0);
      temp2.push(i / n);
      temp2.push(1);
      temp2.push((i + 1) / n);
      temp2.push(1);
      temp2.push((i + 1) / n);
      temp2.push(0);
      temp2.push(i / n);
      temp2.push(0);
    }
    const net_uvs = new Float32Array(temp2);
    net_geom.setAttribute("uv", new T.BufferAttribute(net_uvs, 2));

    let net_tl = new T.TextureLoader().load("./textures/net.jpg");
    let net_mat = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: net_tl,
      side: T.DoubleSide,
    });
    let net_mesh = new T.Mesh(net_geom, net_mat);
    goal.add(net_mesh);
  }
}
