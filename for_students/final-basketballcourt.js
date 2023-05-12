/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let BasketballCourtCount1 = 0;
let BasketCount = 0;
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

export class BasketballCourtGeometry1 extends GrObject {
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
    super(`BasketballCourtGeometry1-${++BasketballCourtCount1}`, court);
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
    let court_tl = new T.TextureLoader().load(
      "./textures/basketballcourt1.jpg"
    );
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
export class BasketGeometry1 extends GrObject {
  /**
   * @param {Properties2} params
   */
  constructor(params = {}) {
    let basket = new T.Group();
    // put the object in its place
    basket.position.x = Number(params.x) || 0;
    basket.position.y = Number(params.y) || 0;
    basket.position.z = Number(params.z) || 0;
    basket.scale.set(
      Number(params.x_size) || 1,
      Number(params.y_size) || 1,
      Number(params.z_size) || 1
    );
    super(`BasketGeometry1-${++BasketCount}`, basket);
    let x = 1,
      y = 4.8,
      z = 7.2;
    let board_geom = new T.BufferGeometry();
    const board_vertices = new Float32Array([
      //back
      x,
      0,
      -z,

      x,
      y,
      0,

      x,
      0,
      0,

      x,
      0,
      -z,

      x,
      y,
      -z,

      x,
      y,
      0,

      //right
      x,
      0,
      0,

      0,
      y,
      0,

      0,
      0,
      0,

      x,
      0,
      0,

      x,
      y,
      0,

      0,
      y,
      0,

      //left
      0,
      0,
      -z,

      x,
      y,
      -z,

      x,
      0,
      -z,

      0,
      0,
      -z,

      0,
      y,
      -z,

      x,
      y,
      -z,

      //front
      0,
      0,
      0,

      0,
      y,
      -z,

      0,
      0,
      -z,

      0,
      0,
      0,

      0,
      y,
      0,

      0,
      y,
      -z,

      //top
      x,
      y,
      0,

      0,
      y,
      -z,

      0,
      y,
      0,

      x,
      y,
      0,

      x,
      y,
      -z,

      0,
      y,
      -z,

      //bottom
      0,
      0,
      0,

      x,
      0,
      -z,

      x,
      0,
      0,

      0,
      0,
      0,

      0,
      0,
      -z,

      x,
      0,
      -z,
    ]);
    const board_uvs = new Float32Array([
      1, 0,

      0, 1,

      0, 0,

      1, 0,

      1, 1,

      0, 1,
    ]);
    board_geom.setAttribute("uv", new T.BufferAttribute(board_uvs, 2));

    board_geom.setAttribute(
      "position",
      new T.BufferAttribute(board_vertices, 3)
    );
    board_geom.computeVertexNormals();
    let board_tl = new T.TextureLoader().load("./textures/board.jpg");
    let board_mat = new T.MeshStandardMaterial({
      roughness: 0.75,
      map: board_tl,
    });
    let board_mesh = new T.Mesh(board_geom, board_mat);
    board_mesh.translateZ(z / 2);
    let board = new T.Group();
    board.add(board_mesh);
    basket.add(board);

    let pole_height = 3 * y;
    let pole_geom = new T.BoxGeometry(1, pole_height, 1);
    let pole_mat = new T.MeshStandardMaterial({
      roughness: 0.75,
      color: "blue",
    });
    let pole_mesh = new T.Mesh(pole_geom, pole_mat);
    pole_mesh.translateY(pole_height / 2);
    basket.add(pole_mesh);

    let beam_length = 1.1 * y;
    let beam_geom = new T.BoxGeometry(beam_length, 1, 1);
    let beam_mat = new T.MeshStandardMaterial({
      roughness: 0.75,
      color: "blue",
    });
    let beam_mesh = new T.Mesh(beam_geom, beam_mat);
    beam_mesh.translateY(pole_height - 0.5);
    beam_mesh.translateX(beam_length / 2);
    basket.add(beam_mesh);

    board.translateY(pole_height - 2);
    board.translateX(beam_length);

    let hoop = new T.Group();
    let hoop_geom = new T.TorusGeometry(1, 0.1);
    let hoop_mat = new T.MeshStandardMaterial({
      roughness: 0.75,
      color: "orange",
      side: T.DoubleSide,
    });
    let hoop_mesh = new T.Mesh(hoop_geom, hoop_mat);
    hoop_mesh.rotateX(Math.PI / 2);
    hoop_mesh.translateX(2);
    hoop_mesh.translateZ(-0.5);
    hoop.add(hoop_mesh);
    board.add(hoop);

    const points = [];
    for (let i = 0; i < 10; i++) {
      points.push(new T.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
    }
    let net_geom = new T.LatheGeometry(points);
    let net_tl = new T.TextureLoader().load("./textures/net.jpg");
    let net_material = new T.MeshStandardMaterial({
      map: net_tl,
      roughness: 0.75,
      side: T.DoubleSide,
    });
    let net_mesh = new T.Mesh(net_geom, net_material);
    net_mesh.scale.set(0.07, 0.07, 0.07);
    net_mesh.translateX(2);
    net_mesh.translateY(-0.1);
    board.add(net_mesh);
  }
}
