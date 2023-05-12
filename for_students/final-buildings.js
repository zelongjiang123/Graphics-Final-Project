/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let House1Count = 0;
let House2Count = 0;
let House3Count = 0;
let TreeCount = 0;
let TowerCount = 0;
// define your buildings here - remember, they need to be imported
// into the "main" program
/**
 * we pass a set of properties to a cube to allow for flexible parameters
 *
 * @typedef HouseProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */

export class HouseGeometry1 extends GrObject {
  /**
   * @param {HouseProperties} params
   */
  constructor(params = {}) {
    let body_geometry = new T.BufferGeometry();
    //
    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    const body_vertices = new Float32Array([
      //right
      2, 0, 0,

      0, 2, 0,

      0, 0, 0,

      2, 0, 0,

      2, 2, 0,

      0, 2, 0,

      //left
      0, 0, -2,

      2, 2, -2,

      2, 0, -2,

      0, 0, -2,

      0, 2, -2,

      2, 2, -2,

      //front
      0, 0, 0,

      0, 2, -2,

      0, 0, -2,

      0, 0, 0,

      0, 2, 0,

      0, 2, -2,

      //back
      2, 0, -2,

      2, 2, 0,

      2, 0, 0,

      2, 0, -2,

      2, 2, -2,

      2, 2, 0,

      //top
      2, 2, 0,

      0, 2, -2,

      0, 2, 0,

      2, 2, 0,

      2, 2, -2,

      0, 2, -2,
    ]);
    body_geometry.setAttribute(
      "position",
      new T.BufferAttribute(body_vertices, 3)
    );

    body_geometry.computeVertexNormals();

    // give it UVs
    let wall_temp = [];
    for (let i = 0; i < 5; i++) {
      wall_temp.push(1);
      wall_temp.push(0);
      wall_temp.push(0);
      wall_temp.push(1);
      wall_temp.push(0);
      wall_temp.push(0);
      wall_temp.push(1);
      wall_temp.push(0);
      wall_temp.push(1);
      wall_temp.push(1);
      wall_temp.push(0);
      wall_temp.push(1);
    }
    const body_uvs = new Float32Array(wall_temp);
    body_geometry.setAttribute("uv", new T.BufferAttribute(body_uvs, 2));

    let body_tl = new T.TextureLoader().load(
      "./textures/Red_brick_texture_house_wall.jpg"
    );
    let body_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: body_tl,
    });

    let body_mesh = new T.Mesh(body_geometry, body_material);

    let roof_geometry = new T.BufferGeometry();
    //
    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    const roof_vertices = new Float32Array([
      //right
      2, 0, 0,

      1, 1, -1,

      0, 0, 0,

      //left
      0, 0, -2,

      1, 1, -1,

      2, 0, -2,

      //front
      0, 0, 0,

      1, 1, -1,

      0, 0, -2,

      //back
      2, 0, -2,

      1, 1, -1,

      2, 0, 0,

      //bottom
      2, 0, -2,

      0, 0, 0,

      0, 0, -2,

      2, 0, -2,

      2, 0, 0,

      0, 0, 0,
    ]);
    roof_geometry.setAttribute(
      "position",
      new T.BufferAttribute(roof_vertices, 3)
    );

    roof_geometry.computeVertexNormals();

    // give it UVs
    let roof_temp = [];
    for (let i = 0; i < 4; i++) {
      roof_temp.push(1);
      roof_temp.push(0);
      roof_temp.push(0.5);
      roof_temp.push(1);
      roof_temp.push(0);
      roof_temp.push(0);
    }
    const roof_uvs = new Float32Array(roof_temp);
    roof_geometry.setAttribute("uv", new T.BufferAttribute(roof_uvs, 2));

    let roof_tl = new T.TextureLoader().load("./textures/roof1.jpg");
    let roof_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: roof_tl,
    });

    let roof_mesh = new T.Mesh(roof_geometry, roof_material);

    let window_geometry = new T.BufferGeometry();
    const window_vertices = new Float32Array([
      // right
      0.5, 0, 0,

      0, 1, 0,

      0, 0, 0,

      0.5, 0, 0,

      0.5, 1, 0,

      0, 1, 0,
    ]);
    const window_uvs = new Float32Array([
      1, 0,

      0, 1,

      0, 0,

      1, 0,

      1, 1,

      0, 1,
    ]);
    window_geometry.setAttribute("uv", new T.BufferAttribute(window_uvs, 2));

    let window_tl = new T.TextureLoader().load("./textures/windows.jpg");
    let window_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: window_tl,
      side: T.DoubleSide,
    });
    window_geometry.setAttribute(
      "position",
      new T.BufferAttribute(window_vertices, 3)
    );
    window_geometry.computeVertexNormals();

    let door_geometry = new T.BufferGeometry();
    const door_vertices = new Float32Array([
      // right
      1, 0, 0,

      0, 1, 0,

      0, 0, 0,

      1, 0, 0,

      1, 1, 0,

      0, 1, 0,
    ]);
    const door_uvs = new Float32Array([
      1, 0,

      0, 1,

      0, 0,

      1, 0,

      1, 1,

      0, 1,
    ]);
    door_geometry.setAttribute("uv", new T.BufferAttribute(window_uvs, 2));

    let door_tl = new T.TextureLoader().load("./textures/door.jpg");
    let door_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: door_tl,
      side: T.DoubleSide,
    });
    door_geometry.setAttribute(
      "position",
      new T.BufferAttribute(door_vertices, 3)
    );
    door_geometry.computeVertexNormals();

    let house = new T.Group();
    // put the object in its place
    house.position.x = Number(params.x) || 0;
    house.position.y = Number(params.y) || 0;
    house.position.z = Number(params.z) || 0;
    house.scale.set(
      Number(params.size) || 1,
      Number(params.size) || 1,
      Number(params.size) || 1
    );

    house.add(body_mesh);
    house.add(roof_mesh);
    roof_mesh.translateY(2);
    let door = new T.Mesh(door_geometry, door_material);
    door.scale.set(0.7, 0.7, 0.7);
    house.add(door);
    door.translateZ(0.001);
    door.translateX(0.7);
    let windows1 = [],
      windows2 = [],
      windows3 = [],
      windows4 = [];
    for (let i = 0; i < 5; i++) {
      windows1[i] = new T.Mesh(window_geometry, window_material);
      windows1[i].scale.set(0.7, 0.7, 0.7);
      house.add(windows1[i]);

      if (i % 2 == 0) windows1[i].translateY(1.25);
      else windows1[i].translateY(0.3);

      windows1[i].translateZ(0.001);
    }

    windows1[0].translateX(0.2);
    windows1[1].translateX(0.2);
    windows1[2].translateX(1.5);
    windows1[3].translateX(1.5);
    windows1[4].translateX(0.9);

    for (let i = 0; i < 4; i++) {
      windows2[i] = new T.Mesh(window_geometry, window_material);
      windows2[i].scale.set(0.7, 0.7, 0.7);
      house.add(windows2[i]);

      if (i % 2 == 0) windows2[i].translateY(1.25);
      else windows2[i].translateY(0.3);

      windows2[i].translateZ(-2 - 0.001);
    }
    windows2[0].translateX(0.2);
    windows2[1].translateX(0.2);
    windows2[2].translateX(1.5);
    windows2[3].translateX(1.5);

    for (let i = 0; i < 4; i++) {
      windows3[i] = new T.Mesh(window_geometry, window_material);
      windows3[i].rotateY(Math.PI / 2);
      windows3[i].scale.set(0.7, 0.7, 0.7);
      house.add(windows3[i]);

      if (i % 2 == 0) windows3[i].translateY(1.25);
      else windows3[i].translateY(0.3);

      windows3[i].translateZ(-0.001);
    }
    windows3[0].translateX(0.2);
    windows3[1].translateX(0.2);
    windows3[2].translateX(1.5);
    windows3[3].translateX(1.5);

    for (let i = 0; i < 4; i++) {
      windows4[i] = new T.Mesh(window_geometry, window_material);
      windows4[i].rotateY(Math.PI / 2);
      windows4[i].scale.set(0.7, 0.7, 0.7);
      house.add(windows4[i]);

      if (i % 2 == 0) windows4[i].translateY(1.25);
      else windows4[i].translateY(0.3);

      windows4[i].translateZ(2 + 0.001);
    }
    windows4[0].translateX(0.2);
    windows4[1].translateX(0.2);
    windows4[2].translateX(1.5);
    windows4[3].translateX(1.5);
    super(`HouseGeometry1-${++House1Count}`, house);
  }
}

export class HouseGeometry2 extends GrObject {
  /**
   * @param {HouseProperties} params
   */
  constructor(params = {}) {
    let body_geometry = new T.BufferGeometry();
    //
    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    const body_vertices = new Float32Array([
      //right
      2, 0, 0,

      0, 2, 0,

      0, 0, 0,

      2, 0, 0,

      2, 2, 0,

      0, 2, 0,

      //left
      0, 0, -2,

      2, 2, -2,

      2, 0, -2,

      0, 0, -2,

      0, 2, -2,

      2, 2, -2,

      //front-bottom
      0, 0, 0,

      0, 2, -2,

      0, 0, -2,

      0, 0, 0,

      0, 2, 0,

      0, 2, -2,

      //back-bottom
      2, 0, -2,

      2, 2, 0,

      2, 0, 0,

      2, 0, -2,

      2, 2, -2,

      2, 2, 0,
      //front-top
      0, 2, 0, 0, 2.5, -1, 0, 2, -2,
      //front-top
      2, 2, -2, 2, 2.5, -1, 2, 2, 0,
    ]);
    body_geometry.setAttribute(
      "position",
      new T.BufferAttribute(body_vertices, 3)
    );

    body_geometry.computeVertexNormals();

    // give it UVs
    let wall_temp = [];
    for (let i = 0; i < 4; i++) {
      wall_temp.push(1);
      wall_temp.push(0);
      wall_temp.push(0);
      wall_temp.push(1);
      wall_temp.push(0);
      wall_temp.push(0);
      wall_temp.push(1);
      wall_temp.push(0);
      wall_temp.push(1);
      wall_temp.push(1);
      wall_temp.push(0);
      wall_temp.push(1);
    }
    for (let i = 0; i < 2; i++) {
      wall_temp.push(1);
      wall_temp.push(0);
      wall_temp.push(0.5);
      wall_temp.push(0.25);
      wall_temp.push(0);
      wall_temp.push(0);
    }
    const body_uvs = new Float32Array(wall_temp);
    body_geometry.setAttribute("uv", new T.BufferAttribute(body_uvs, 2));

    let body_tl = new T.TextureLoader().load("./textures/wall2.jpg");
    let body_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: body_tl,
    });

    let body_mesh = new T.Mesh(body_geometry, body_material);

    let roof_geometry = new T.BufferGeometry();
    //
    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    const roof_vertices = new Float32Array([
      //right
      2, 0, 0,

      0, 0.5, -1,

      0, 0, 0,

      2, 0, 0,

      2, 0.5, -1,

      0, 0.5, -1,

      //left
      0, 0, -2,

      2, 0.5, -1,

      2, 0, -2,

      0, 0, -2,

      0, 0.5, -1,

      2, 0.5, -1,
    ]);
    roof_geometry.setAttribute(
      "position",
      new T.BufferAttribute(roof_vertices, 3)
    );

    roof_geometry.computeVertexNormals();

    // give it UVs
    let roof_temp = [];
    for (let i = 0; i < 2; i++) {
      roof_temp.push(1);
      roof_temp.push(0);
      roof_temp.push(0);
      roof_temp.push(1);
      roof_temp.push(0);
      roof_temp.push(0);
      roof_temp.push(1);
      roof_temp.push(0);
      roof_temp.push(1);
      roof_temp.push(1);
      roof_temp.push(0);
      roof_temp.push(1);
    }
    const roof_uvs = new Float32Array(roof_temp);
    roof_geometry.setAttribute("uv", new T.BufferAttribute(roof_uvs, 2));

    let roof_tl = new T.TextureLoader().load("./textures/roof2.jpg");
    let roof_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: roof_tl,
      side: T.DoubleSide,
    });

    let roof_mesh = new T.Mesh(roof_geometry, roof_material);

    let window_geometry = new T.BufferGeometry();
    const window_vertices = new Float32Array([
      // right
      0.5, 0, 0,

      0, 1, 0,

      0, 0, 0,

      0.5, 0, 0,

      0.5, 1, 0,

      0, 1, 0,
    ]);
    const window_uvs = new Float32Array([
      1, 0,

      0, 1,

      0, 0,

      1, 0,

      1, 1,

      0, 1,
    ]);
    window_geometry.setAttribute("uv", new T.BufferAttribute(window_uvs, 2));

    let window_tl = new T.TextureLoader().load("./textures/windows.jpg");
    let window_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: window_tl,
      side: T.DoubleSide,
    });
    window_geometry.setAttribute(
      "position",
      new T.BufferAttribute(window_vertices, 3)
    );
    window_geometry.computeVertexNormals();

    let door_geometry = new T.BufferGeometry();
    const door_vertices = new Float32Array([
      // right
      1, 0, 0,

      0, 1, 0,

      0, 0, 0,

      1, 0, 0,

      1, 1, 0,

      0, 1, 0,
    ]);
    const door_uvs = new Float32Array([
      1, 0,

      0, 1,

      0, 0,

      1, 0,

      1, 1,

      0, 1,
    ]);
    door_geometry.setAttribute("uv", new T.BufferAttribute(window_uvs, 2));

    let door_tl = new T.TextureLoader().load("./textures/door2.jpg");
    let door_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: door_tl,
      side: T.DoubleSide,
    });
    door_geometry.setAttribute(
      "position",
      new T.BufferAttribute(door_vertices, 3)
    );
    door_geometry.computeVertexNormals();

    let house = new T.Group();
    // put the object in its place
    house.position.x = Number(params.x) || 0;
    house.position.y = Number(params.y) || 0;
    house.position.z = Number(params.z) || 0;
    house.scale.set(
      Number(params.size) * 1.5 || 1.5,
      Number(params.size) || 1,
      Number(params.size) || 1
    );

    house.add(body_mesh);
    house.add(roof_mesh);
    roof_mesh.translateY(2);
    let door = new T.Mesh(door_geometry, door_material);
    door.scale.set(0.7, 0.7, 0.7);
    house.add(door);
    door.translateZ(0.001);
    door.translateX(0.7);
    let windows1 = [],
      windows2 = [],
      windows3 = [],
      windows4 = [];
    for (let i = 0; i < 5; i++) {
      windows1[i] = new T.Mesh(window_geometry, window_material);
      windows1[i].scale.set(0.7, 0.7, 0.7);
      house.add(windows1[i]);

      if (i % 2 == 0) windows1[i].translateY(1.25);
      else windows1[i].translateY(0.3);

      windows1[i].translateZ(0.001);
    }

    windows1[0].translateX(0.2);
    windows1[1].translateX(0.2);
    windows1[2].translateX(1.5);
    windows1[3].translateX(1.5);
    windows1[4].translateX(0.9);

    for (let i = 0; i < 4; i++) {
      windows2[i] = new T.Mesh(window_geometry, window_material);
      windows2[i].scale.set(0.7, 0.7, 0.7);
      house.add(windows2[i]);

      if (i % 2 == 0) windows2[i].translateY(1.25);
      else windows2[i].translateY(0.3);

      windows2[i].translateZ(-2 - 0.001);
    }
    windows2[0].translateX(0.2);
    windows2[1].translateX(0.2);
    windows2[2].translateX(1.5);
    windows2[3].translateX(1.5);

    for (let i = 0; i < 4; i++) {
      windows3[i] = new T.Mesh(window_geometry, window_material);
      windows3[i].rotateY(Math.PI / 2);
      windows3[i].scale.set(0.7, 0.7, 0.7);
      house.add(windows3[i]);

      if (i % 2 == 0) windows3[i].translateY(1.25);
      else windows3[i].translateY(0.3);

      windows3[i].translateZ(-0.001);
    }
    windows3[0].translateX(0.2);
    windows3[1].translateX(0.2);
    windows3[2].translateX(1.5);
    windows3[3].translateX(1.5);

    for (let i = 0; i < 4; i++) {
      windows4[i] = new T.Mesh(window_geometry, window_material);
      windows4[i].rotateY(Math.PI / 2);
      windows4[i].scale.set(0.7, 0.7, 0.7);
      house.add(windows4[i]);

      if (i % 2 == 0) windows4[i].translateY(1.25);
      else windows4[i].translateY(0.3);

      windows4[i].translateZ(2 + 0.001);
    }
    windows4[0].translateX(0.2);
    windows4[1].translateX(0.2);
    windows4[2].translateX(1.5);
    windows4[3].translateX(1.5);

    super(`HouseGeometry2-${++House2Count}`, house);
  }
}

export class TowerGeometry1 extends GrObject {
  /**
   * @param {HouseProperties} params
   */
  constructor(params = {}) {
    let body_geometry = new T.BufferGeometry();
    //
    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    let temp = [];
    let r = 0.75,
      h = 3,
      n = 12;
    for (let i = 0; i < Math.PI * 2; i += Math.PI / n) {
      temp.push(r * Math.sin(i + Math.PI / n));
      temp.push(0);
      temp.push(r * Math.cos(i + Math.PI / n));

      temp.push(r * Math.sin(i));
      temp.push(0);
      temp.push(r * Math.cos(i));

      temp.push(r * Math.sin(i));
      temp.push(-h);
      temp.push(r * Math.cos(i));

      temp.push(r * Math.sin(i + Math.PI / n));
      temp.push(0);
      temp.push(r * Math.cos(i + Math.PI / n));

      temp.push(r * Math.sin(i));
      temp.push(-h);
      temp.push(r * Math.cos(i));

      temp.push(r * Math.sin(i + Math.PI / n));
      temp.push(-h);
      temp.push(r * Math.cos(i + Math.PI / n));
    }
    for (let i = 0; i < Math.PI * 2; i += Math.PI / n) {
      temp.push(0);
      temp.push(0);
      temp.push(0);
      temp.push(r * Math.sin(i + Math.PI / n));
      temp.push(0);
      temp.push(r * Math.cos(i + Math.PI / n));

      temp.push(r * Math.sin(i));
      temp.push(0);
      temp.push(r * Math.cos(i));
    }

    for (let i = 0; i < Math.PI * 2; i += Math.PI / n) {
      temp.push(0);
      temp.push(-h);
      temp.push(0);

      temp.push(r * Math.sin(i));
      temp.push(-h);
      temp.push(r * Math.cos(i));

      temp.push(r * Math.sin(i + Math.PI / n));
      temp.push(-h);
      temp.push(r * Math.cos(i + Math.PI / n));
    }
    const body_vertices = new Float32Array(temp);
    body_geometry.setAttribute(
      "position",
      new T.BufferAttribute(body_vertices, 3)
    );

    body_geometry.computeVertexNormals();

    // give it UVs
    let wall_temp = [];
    for (let i = 0; i < Math.PI * 2; i += Math.PI / n) {
      wall_temp.push((i + Math.PI / n) / (Math.PI * 2));
      wall_temp.push(1);
      wall_temp.push(i / (Math.PI * 2));
      wall_temp.push(1);
      wall_temp.push(i / (Math.PI * 2));
      wall_temp.push(0);

      wall_temp.push((i + Math.PI / n) / (Math.PI * 2));
      wall_temp.push(1);
      wall_temp.push(i / (Math.PI * 2));
      wall_temp.push(0);
      wall_temp.push((i + Math.PI / n) / (Math.PI * 2));
      wall_temp.push(0);
    }
    const body_uvs = new Float32Array(wall_temp);
    body_geometry.setAttribute("uv", new T.BufferAttribute(body_uvs, 2));

    let body_tl = new T.TextureLoader().load("./textures/wall3.jpg");
    let body_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      side: T.DoubleSide,
      map: body_tl,
    });

    let body_mesh = new T.Mesh(body_geometry, body_material);

    let temp2 = [];
    let roof_h = 1;
    for (let i = 0; i < Math.PI * 2; i += Math.PI / n) {
      temp2.push(r * Math.sin(i + Math.PI / n));
      temp2.push(0);
      temp2.push(r * Math.cos(i + Math.PI / n));

      temp2.push(0);
      temp2.push(roof_h);
      temp2.push(0);

      temp2.push(r * Math.sin(i));
      temp2.push(0);
      temp2.push(r * Math.cos(i));
    }
    let roof_geometry = new T.BufferGeometry();
    //
    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    const roof_vertices = new Float32Array(temp2);
    roof_geometry.setAttribute(
      "position",
      new T.BufferAttribute(roof_vertices, 3)
    );

    roof_geometry.computeVertexNormals();

    // give it UVs
    let roof_temp = [];
    for (let i = 0; i < Math.PI * 2; i += Math.PI / n) {
      roof_temp.push(1 / 2 + Math.sin(i + Math.PI / n) / 2);
      roof_temp.push(1 / 2 + Math.cos(i + Math.PI / n) / 2);
      roof_temp.push(1 / 2);
      roof_temp.push(1 / 2);
      roof_temp.push(1 / 2 + Math.sin(i) / 2);
      roof_temp.push(1 / 2 + Math.cos(i) / 2);
    }
    const roof_uvs = new Float32Array(roof_temp);
    roof_geometry.setAttribute("uv", new T.BufferAttribute(roof_uvs, 2));

    let roof_tl = new T.TextureLoader().load("./textures/roof3.jpg");
    let roof_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: roof_tl,
      side: T.DoubleSide,
    });

    let roof_mesh = new T.Mesh(roof_geometry, roof_material);

    let window_geometry = new T.BufferGeometry();
    let n2 = 4,
      h2 = 1;
    let temp3 = [];
    for (let i = 0; i < Math.PI * (n2 / n); i += Math.PI / n) {
      temp3.push(r * Math.sin(i + Math.PI / n));
      temp3.push(0);
      temp3.push(r * Math.cos(i + Math.PI / n));

      temp3.push(r * Math.sin(i));
      temp3.push(0);
      temp3.push(r * Math.cos(i));

      temp3.push(r * Math.sin(i));
      temp3.push(-h2);
      temp3.push(r * Math.cos(i));

      temp3.push(r * Math.sin(i + Math.PI / n));
      temp3.push(0);
      temp3.push(r * Math.cos(i + Math.PI / n));

      temp3.push(r * Math.sin(i));
      temp3.push(-h2);
      temp3.push(r * Math.cos(i));

      temp3.push(r * Math.sin(i + Math.PI / n));
      temp3.push(-h2);
      temp3.push(r * Math.cos(i + Math.PI / n));
    }
    const window_vertices = new Float32Array(temp3);
    let window_temp = [];
    let offset_top = 0.96,
      offset_bottom = 0.04,
      offset_horizontal = 0.07;
    for (let i = 0; i < Math.PI * (n2 / n); i += Math.PI / n) {
      window_temp.push(Math.sin(i + Math.PI / n) + offset_horizontal);
      window_temp.push(offset_top);

      window_temp.push(Math.sin(i) + offset_horizontal);
      window_temp.push(offset_top);

      window_temp.push(Math.sin(i) + offset_horizontal);
      window_temp.push(offset_bottom);

      window_temp.push(Math.sin(i + Math.PI / n) + offset_horizontal);
      window_temp.push(offset_top);

      window_temp.push(Math.sin(i) + offset_horizontal);
      window_temp.push(offset_bottom);

      window_temp.push(Math.sin(i + Math.PI / n) + offset_horizontal);
      window_temp.push(offset_bottom);
    }
    const window_uvs = new Float32Array(window_temp);
    window_geometry.setAttribute("uv", new T.BufferAttribute(window_uvs, 2));

    let window_tl = new T.TextureLoader().load("./textures/window_church.jpg");
    let window_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: window_tl,
      side: T.DoubleSide,
    });
    window_geometry.setAttribute(
      "position",
      new T.BufferAttribute(window_vertices, 3)
    );
    window_geometry.computeVertexNormals();

    let door_geometry = new T.BufferGeometry();

    let n3 = 2;
    let temp4 = [];
    for (let i = 0; i < Math.PI * (n3 / n); i += Math.PI / n) {
      temp4.push(r * Math.sin(i + Math.PI / n));
      temp4.push(0);
      temp4.push(r * Math.cos(i + Math.PI / n));

      temp4.push(r * Math.sin(i));
      temp4.push(0);
      temp4.push(r * Math.cos(i));

      temp4.push(r * Math.sin(i));
      temp4.push(-h2);
      temp4.push(r * Math.cos(i));

      temp4.push(r * Math.sin(i + Math.PI / n));
      temp4.push(0);
      temp4.push(r * Math.cos(i + Math.PI / n));

      temp4.push(r * Math.sin(i));
      temp4.push(-h2);
      temp4.push(r * Math.cos(i));

      temp4.push(r * Math.sin(i + Math.PI / n));
      temp4.push(-h2);
      temp4.push(r * Math.cos(i + Math.PI / n));
    }
    const door_vertices = new Float32Array(temp4);
    let door_temp = [];
    let offset_top2 = 0.96,
      offset_bottom2 = 0.04,
      offset_horizontal2 = 0.25;
    for (let i = 0; i < Math.PI * (n2 / n); i += Math.PI / n) {
      door_temp.push(Math.sin(i + Math.PI / n) + offset_horizontal2);
      door_temp.push(offset_top2);

      door_temp.push(Math.sin(i) + offset_horizontal2);
      door_temp.push(offset_top2);

      door_temp.push(Math.sin(i) + offset_horizontal2);
      door_temp.push(offset_bottom2);

      door_temp.push(Math.sin(i + Math.PI / n) + offset_horizontal2);
      door_temp.push(offset_top2);

      door_temp.push(Math.sin(i) + offset_horizontal2);
      door_temp.push(offset_bottom2);

      door_temp.push(Math.sin(i + Math.PI / n) + offset_horizontal2);
      door_temp.push(offset_bottom2);
    }
    const door_uvs = new Float32Array(door_temp);
    door_geometry.setAttribute("uv", new T.BufferAttribute(door_uvs, 2));
    door_geometry.setAttribute(
      "position",
      new T.BufferAttribute(door_vertices, 3)
    );
    door_geometry.computeVertexNormals();
    let door_tl = new T.TextureLoader().load("./textures/door_church.jpg");
    let door_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: door_tl,
      side: T.DoubleSide,
    });

    let house = new T.Group();
    // put the object in its place
    house.position.x = Number(params.x) || 0;
    house.position.y = Number(params.y) || 0;
    house.position.z = Number(params.z) || 0;
    house.scale.set(
      Number(params.size) || 1,
      Number(params.size) || 1,
      Number(params.size) || 1
    );
    house.add(body_mesh);
    body_mesh.translateY(h);
    house.add(roof_mesh);
    roof_mesh.translateY(h);

    let door = new T.Mesh(door_geometry, door_material);
    house.add(door);
    door.rotateY(4 * (Math.PI / n));
    door.translateZ(0.0005);
    door.translateY(1);
    let windows1 = [];
    for (let i = 0; i < 6; i++) {
      windows1[i] = new T.Mesh(window_geometry, window_material);
      house.add(windows1[i]);

      if (i % 2 == 0) windows1[i].translateY(2);
      else windows1[i].translateY(3);
      windows1[i].rotateY(4 * (Math.PI / n) * i);

      windows1[i].translateZ(0.0005);
    }
    super(`TowerGeometry1-${++TowerCount}`, house);
  }
}
