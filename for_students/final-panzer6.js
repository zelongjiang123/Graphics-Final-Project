/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { ShellGeometry1 } from "./final-shell.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
let PanzerCount = 0;

function calculate_position(body_x, body_y, body_y2, body_z) {
  return new Float32Array([
    //left
    body_x,
    0,
    0,

    0,
    body_y,
    0,

    0,
    0,
    0,

    body_x,
    0,
    0,

    body_x,
    body_y2,
    0,

    0,
    body_y,
    0,

    //right
    0,
    0,
    -body_z,

    body_x,
    body_y2,
    -body_z,

    body_x,
    0,
    -body_z,

    0,
    0,
    -body_z,

    0,
    body_y,
    -body_z,

    body_x,
    body_y2,
    -body_z,

    // front
    0,
    0,
    0,

    0,
    body_y,
    -body_z,

    0,
    0,
    -body_z,

    0,
    0,
    0,

    0,
    body_y,
    0,

    0,
    body_y,
    -body_z,

    // back
    body_x,
    0,
    -body_z,

    body_x,
    body_y2,
    0,

    body_x,
    0,
    0,

    body_x,
    0,
    -body_z,

    body_x,
    body_y2,
    -body_z,

    body_x,
    body_y2,
    0,

    // top
    body_x,
    body_y2,
    -body_z,

    0,
    body_y,
    0,

    body_x,
    body_y2,
    0,

    body_x,
    body_y2,
    -body_z,

    0,
    body_y,
    -body_z,

    0,
    body_y,
    0,
  ]);
}

function calculate_uv(body_x, body_y, body_z) {
  let factor = body_x + body_y + body_z;
  return new Float32Array([
    // left
    0,
    0,
    body_y / factor,
    body_x / factor,
    0,
    body_x / factor,
    0,
    0,
    body_y / factor,
    0,
    body_y / factor,
    body_x / factor,
    // right
    0,
    0,
    body_y / factor,
    body_x / factor,
    0,
    body_x / factor,
    0,
    0,
    body_y / factor,
    0,
    body_y / factor,
    body_x / factor,
    // front
    0,
    0,
    body_y / factor,
    body_z / factor,
    0,
    body_z / factor,
    0,
    0,
    body_y / factor,
    0,
    body_y / factor,
    body_z / factor,
    // back
    0,
    0,
    body_y / factor,
    body_z / factor,
    0,
    body_z / factor,
    0,
    0,
    body_y / factor,
    0,
    body_y / factor,
    body_z / factor,
    // top
    body_z / factor,
    0,
    0,
    body_x / factor,
    0,
    0,
    body_z / factor,
    0,
    body_z / factor,
    body_x / factor,
    0,
    body_x / factor,
  ]);
}

// define your vehicles here - remember, they need to be imported
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
 * @property {Array<GrObject>} [shells]
 * @property {GrWorld} [world]
 * @property {boolean} [rideable=true]
 */

export class PanzerGeometry1 extends GrObject {
  /**
   * @param {Properties} params
   */
  constructor(params = {}) {
    let panzer = new T.Group();
    // put the object in its place
    panzer.position.x = Number(params.x) || 0;
    panzer.position.y = Number(params.y) || 0;
    panzer.position.z = Number(params.z) || 0;
    panzer.scale.set(
      Number(params.size) || 1,
      Number(params.size) || 1,
      Number(params.size) || 1
    );
    super(`PanzerGeometry1-${++PanzerCount}`, panzer);
    let body_geometry = new T.BufferGeometry();
    let body_x = 4.5,
      body_y = 0.5,
      body_z = 3;
    this.body_x = body_x;
    this.body_z = body_z;
    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    const body_vertices = calculate_position(body_x, body_y, body_y, body_z);
    body_geometry.setAttribute(
      "position",
      new T.BufferAttribute(body_vertices, 3)
    );
    body_geometry.computeVertexNormals();

    // give it UVs
    const uvs = calculate_uv(body_x, body_y, body_z);
    body_geometry.setAttribute("uv", new T.BufferAttribute(uvs, 2));

    let tl = new T.TextureLoader().load("./textures/panzer1.jpg");
    let body_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: tl,
      side: T.DoubleSide,
    });
    let body_mesh = new T.Mesh(body_geometry, body_material);
    panzer.add(body_mesh);

    let side_geometry = new T.BufferGeometry();
    let side_x = 4.5,
      side_y = 0.05,
      side_z = 0.2;
    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    const side_vertices = calculate_position(side_x, side_y, side_y, side_z);
    side_geometry.setAttribute(
      "position",
      new T.BufferAttribute(side_vertices, 3)
    );
    side_geometry.computeVertexNormals();
    // give it UVs
    const side_uvs = calculate_uv(side_x, side_y, side_z);
    side_geometry.setAttribute("uv", new T.BufferAttribute(side_uvs, 2));
    let side_mesh = [];
    for (let i = 0; i < 2; i++) {
      side_mesh[i] = new T.Mesh(side_geometry, body_material);
      body_mesh.add(side_mesh[i]);
      //side_mesh[i].translateY(0.1);
    }
    side_mesh[0].translateZ(side_z - side_z / Math.sqrt(2) + 0.06);
    side_mesh[0].translateY(-0.1);
    side_mesh[0].rotateX(Math.PI / 4);
    side_mesh[1].translateZ(-body_z);
    side_mesh[1].translateY(0.05);
    side_mesh[1].rotateX(-Math.PI / 4);

    let terret_geometry = new T.BufferGeometry();
    let terret_x = 1.2,
      terret_y = 0.8,
      terret_z = 1.5;
    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    const terret_vertices = calculate_position(
      terret_x,
      terret_y,
      terret_y,
      terret_z
    );
    terret_geometry.setAttribute(
      "position",
      new T.BufferAttribute(terret_vertices, 3)
    );
    terret_geometry.computeVertexNormals();

    // give it UVs
    const terret_uvs = calculate_uv(terret_x, terret_y, terret_z);
    terret_geometry.setAttribute("uv", new T.BufferAttribute(terret_uvs, 2));

    let terret_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: tl,
      side: T.DoubleSide,
    });

    let terret_mesh = new T.Mesh(terret_geometry, terret_material);
    let armor_tl = new T.TextureLoader().load("./textures/armor.png");
    let armor_x = 0.8,
      armor_y = 0.6,
      armor_z = 0.05;
    let armor_geom = new T.BoxGeometry(armor_x, armor_y, armor_z);
    let armor_mat = new T.MeshStandardMaterial({
      map: armor_tl,
      roughness: 0.75,
      bumpMap: armor_tl,
    });
    let armor_mesh = [];
    for (let i = 0; i < 2; i++) {
      armor_mesh[i] = new T.Mesh(armor_geom, armor_mat);
      terret_mesh.add(armor_mesh[i]);
      armor_mesh[i].translateX(armor_x / 2);
      armor_mesh[i].translateZ(armor_z / 2);
      armor_mesh[i].translateY(armor_y / 2 + 0.1);
    }
    armor_mesh[1].translateZ(-terret_z - armor_z);

    let terret1_geometry = new T.BufferGeometry();
    let terret1_y = 0.6;
    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    const terret1_vertices = calculate_position(
      terret_x,
      terret1_y,
      terret_y,
      terret_z
    );
    terret1_geometry.setAttribute(
      "position",
      new T.BufferAttribute(terret1_vertices, 3)
    );
    terret1_geometry.computeVertexNormals();

    // give it UVs
    const terret1_uvs = calculate_uv(terret_x, terret_y, terret_z);
    terret1_geometry.setAttribute("uv", new T.BufferAttribute(terret1_uvs, 2));

    let terret1_mesh = new T.Mesh(terret1_geometry, terret_material);

    let terret2_geometry = new T.BufferGeometry();
    let terret2_y1 = 0.7,
      terret2_y2 = 0.5,
      terret2_x = 0.2;
    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    const terret2_vertices = calculate_position(
      terret2_x,
      terret2_y1,
      terret2_y2,
      terret_z
    );
    terret2_geometry.setAttribute(
      "position",
      new T.BufferAttribute(terret2_vertices, 3)
    );
    terret2_geometry.computeVertexNormals();

    // give it UVs
    const terret2_uvs = calculate_uv(terret_x, terret2_y1, terret_z);
    terret2_geometry.setAttribute("uv", new T.BufferAttribute(terret2_uvs, 2));

    let terret2_mesh = new T.Mesh(terret2_geometry, terret_material);
    let upper = new T.Group();
    this.upper = upper;
    upper.add(terret_mesh);
    upper.add(terret1_mesh);
    upper.add(terret2_mesh);
    terret2_mesh.translateX(terret_x * 2);
    terret2_mesh.translateY(terret_y - terret2_y1);
    terret_mesh.translateX(terret_x);
    panzer.add(upper);
    upper.translateY(body_y);
    upper.translateX(1.3);
    upper.translateZ(-(body_z - terret_z) / 2);

    let cannon = new T.Group();
    upper.add(cannon);
    cannon.translateZ(-terret_z / 2);
    let cannon1_r = 0.2,
      cannon1_w = 1;
    let cannon1_geom = new T.CylinderGeometry(cannon1_r, cannon1_r, cannon1_w);
    let cannon1_mesh = new T.Mesh(cannon1_geom, terret_material);
    cannon1_mesh.rotateZ(Math.PI / 2);
    cannon1_mesh.translateX(cannon1_r + 0.1);
    cannon1_mesh.translateY(cannon1_w / 2);
    cannon.add(cannon1_mesh);
    let cannon2_r = 0.13,
      cannon2_w = 1;
    let cannon2_geom = new T.CylinderGeometry(cannon2_r, cannon2_r, cannon2_w);
    let cannon2_mesh = new T.Mesh(cannon2_geom, terret_material);
    cannon2_mesh.rotateZ(Math.PI / 2);
    cannon2_mesh.translateX(cannon2_r + 0.17);
    cannon2_mesh.translateY(cannon1_w + cannon2_w / 2);
    cannon.add(cannon2_mesh);
    let cannon3_r = 0.1,
      cannon3_w = 1.5;
    let cannon3_geom = new T.CylinderGeometry(cannon3_r, cannon3_r, cannon3_w);
    let cannon3_mesh = new T.Mesh(cannon3_geom, terret_material);
    cannon3_mesh.rotateZ(Math.PI / 2);
    cannon3_mesh.translateX(cannon3_r + 0.19);
    cannon3_mesh.translateY(cannon1_w + cannon2_w + cannon3_w / 2);
    cannon.add(cannon3_mesh);
    let cannon4_r = 0.15,
      cannon4_w = 0.5;
    let cannon4_geom = new T.CylinderGeometry(cannon4_r, cannon4_r, cannon4_w);
    let cannon4_mesh = new T.Mesh(cannon4_geom, terret_material);
    cannon4_mesh.rotateZ(Math.PI / 2);
    cannon4_mesh.translateX(cannon4_r + 0.15);
    cannon4_mesh.translateY(cannon1_w + cannon2_w + cannon3_w + cannon4_w / 2);
    cannon.add(cannon4_mesh);
    let cannon5_r = 0.1,
      cannon5_w = 0.1;
    let cannon5_geom = new T.CylinderGeometry(cannon5_r, cannon5_r, cannon5_w);
    let cannon5_mat = new T.MeshStandardMaterial({
      color: "black",
      roughness: 0.75,
    });
    let cannon5_mesh = new T.Mesh(cannon5_geom, cannon5_mat);
    cannon5_mesh.rotateZ(Math.PI / 2);
    cannon5_mesh.translateX(cannon5_r + 0.19);
    cannon5_mesh.translateY(
      cannon1_w + cannon2_w + cannon3_w + cannon4_w - 0.049
    );
    cannon.add(cannon5_mesh);

    let gate_r = 0.2;
    let gate_geom = new T.CylinderGeometry(gate_r, (gate_r * 3) / 2, 0.2);
    let gate_mesh = new T.Mesh(gate_geom, terret_material);
    terret_mesh.add(gate_mesh);
    gate_mesh.translateY(terret_y + 0.05);
    gate_mesh.translateZ(-terret_z / 2 + 0.1);
    gate_mesh.translateX(terret_x / 2 - 0.1);

    let lower_geometry = new T.BufferGeometry();
    let lower_x = 4,
      lower_y = 1,
      lower_z = 2;
    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    const lower_vertices = calculate_position(
      lower_x,
      lower_y,
      lower_y,
      lower_z
    );
    lower_geometry.setAttribute(
      "position",
      new T.BufferAttribute(lower_vertices, 3)
    );
    lower_geometry.computeVertexNormals();

    // give it UVs
    const lower_uvs = calculate_uv(lower_x, lower_y, lower_z);
    lower_geometry.setAttribute("uv", new T.BufferAttribute(lower_uvs, 2));

    //let lower_tl = new T.TextureLoader().load("./textures/panzer1.jpg");
    let lower_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: tl,
      side: T.DoubleSide,
    });

    let lower_mesh = new T.Mesh(lower_geometry, lower_material);
    lower_mesh.translateZ(-(body_z - lower_z) / 2);
    lower_mesh.translateY(0.29);
    lower_mesh.translateX(0.2);
    panzer.add(lower_mesh);
    upper.translateY(0.8);
    body_mesh.translateY(0.8);

    let tail_geometry = new T.BufferGeometry();
    let tail_x = 0.2,
      tail_y1 = 0.6,
      tail_y2 = 0.8,
      tail_z = body_z;
    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    const tail_vertices = calculate_position(tail_x, tail_y1, tail_y2, tail_z);
    tail_geometry.setAttribute(
      "position",
      new T.BufferAttribute(tail_vertices, 3)
    );
    tail_geometry.computeVertexNormals();

    // give it UVs
    const tail_uvs = calculate_uv(tail_x, tail_y1, tail_z);
    tail_geometry.setAttribute("uv", new T.BufferAttribute(tail_uvs, 2));

    //let tail_tl = new T.TextureLoader().load("./textures/panzer1.jpg");
    let tail_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: tl,
      side: T.DoubleSide,
    });

    let tail_mesh = new T.Mesh(tail_geometry, tail_material);
    let tail = new T.Group();
    body_mesh.add(tail);
    tail.add(tail_mesh);
    tail.translateX(body_x);
    tail.translateY(-0.1);

    let tail_cyl_r = 0.15,
      tail_cyl_h = 1;
    let tail_cyl_geom = new T.CylinderGeometry(
      tail_cyl_r,
      tail_cyl_r,
      tail_cyl_h
    );
    let tail_cyl_mesh = [];
    for (let i = 0; i < 2; i++) {
      tail_cyl_mesh[i] = new T.Mesh(tail_cyl_geom, tail_material);
      tail.add(tail_cyl_mesh[i]);
      tail_cyl_mesh[i].translateY(tail_cyl_h / 2 - 0.1);
      tail_cyl_mesh[i].translateZ(-1);
      tail_cyl_mesh[i].translateX(tail_x + tail_cyl_r);
    }
    tail_cyl_mesh[1].translateZ(-0.9);

    let wheel_geometry = new T.BufferGeometry();
    let temp = [];
    let r = 0.4,
      n = 12;
    for (let i = 0; i < Math.PI * 2; i += Math.PI / n) {
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

    for (let i = 0; i < Math.PI * 2; i += Math.PI / n) {
      temp.push(0);
      temp.push(0);
      temp.push(-0.2);
      temp.push(r * Math.sin(i));
      temp.push(r * Math.cos(i));
      temp.push(-0.2);
      temp.push(r * Math.sin(i + Math.PI / n));
      temp.push(r * Math.cos(i + Math.PI / n));
      temp.push(-0.2);
    }
    for (let i = 0; i < Math.PI * 2; i += Math.PI / n) {
      temp.push(r * Math.sin(i + Math.PI / n));
      temp.push(r * Math.cos(i + Math.PI / n));
      temp.push(0);
      temp.push(r * Math.sin(i));
      temp.push(r * Math.cos(i));
      temp.push(-0.2);
      temp.push(r * Math.sin(i));
      temp.push(r * Math.cos(i));
      temp.push(0);
      temp.push(r * Math.sin(i + Math.PI / n));
      temp.push(r * Math.cos(i + Math.PI / n));
      temp.push(0);
      temp.push(r * Math.sin(i + Math.PI / n));
      temp.push(r * Math.cos(i + Math.PI / n));
      temp.push(-0.2);
      temp.push(r * Math.sin(i));
      temp.push(r * Math.cos(i));
      temp.push(-0.2);
    }
    const wheel_vertices = new Float32Array(temp);
    wheel_geometry.setAttribute(
      "position",
      new T.BufferAttribute(wheel_vertices, 3)
    );
    wheel_geometry.computeVertexNormals();

    // give it UVs
    let temp2 = [];
    for (let i = 0; i < Math.PI * 2; i += Math.PI / n) {
      temp2.push(1 / 2);
      temp2.push(1 / 2);
      temp2.push(1 / 2 + Math.sin(i + Math.PI / n) / 2);
      temp2.push(1 / 2 + Math.cos(i + Math.PI / n) / 2);
      temp2.push(1 / 2 + Math.sin(i) / 2);
      temp2.push(1 / 2 + Math.cos(i) / 2);
    }

    for (let i = 0; i < Math.PI * 2; i += Math.PI / n) {
      temp2.push(1 / 2);
      temp2.push(1 / 2);
      temp2.push(1 / 2 + Math.sin(i) / 2);
      temp2.push(1 / 2 + Math.cos(i) / 2);
      temp2.push(1 / 2 + Math.sin(i + Math.PI / n) / 2);
      temp2.push(1 / 2 + Math.cos(i + Math.PI / n) / 2);
    }
    for (let i = 0; i < Math.PI * 2; i += Math.PI / n) {
      temp2.push(0.51);
      temp2.push(0.03);
      temp2.push(0.5);
      temp2.push(0.02);
      temp2.push(0.5);
      temp2.push(0.03);
      temp2.push(0.51);
      temp2.push(0.03);
      temp2.push(0.51);
      temp2.push(0.02);
      temp2.push(0.5);
      temp2.push(0.02);
    }
    const wheel_uvs = new Float32Array(temp2);
    wheel_geometry.setAttribute("uv", new T.BufferAttribute(wheel_uvs, 2));

    let wheel_tl = new T.TextureLoader().load("./textures/tank_wheel.jpg");
    let wheel_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: wheel_tl,
      bumpMap: wheel_tl,
    });
    let wheel_meshs = [];
    for (let i = 0; i < 12; i++) {
      wheel_meshs[i] = new T.Mesh(wheel_geometry, wheel_material);
      panzer.add(wheel_meshs[i]);
      wheel_meshs[i].translateY(r + 0.02);
      if (i < 6) wheel_meshs[i].translateZ(0);
      else wheel_meshs[i].translateZ(-body_z + 0.2);
    }
    let start_pos = 0.3;
    wheel_meshs[0].translateX(start_pos);
    wheel_meshs[1].translateX(start_pos + 2 * r);
    wheel_meshs[2].translateX(start_pos + 4 * r);
    wheel_meshs[3].translateX(start_pos + 6 * r);
    wheel_meshs[4].translateX(start_pos + 8 * r);
    wheel_meshs[5].translateX(start_pos + 10 * r);
    wheel_meshs[6].translateX(start_pos);
    wheel_meshs[7].translateX(start_pos + 2 * r);
    wheel_meshs[8].translateX(start_pos + 4 * r);
    wheel_meshs[9].translateX(start_pos + 6 * r);
    wheel_meshs[10].translateX(start_pos + 8 * r);
    wheel_meshs[11].translateX(start_pos + 10 * r);

    let track_geometry = new T.BufferGeometry();
    let temp3 = [];
    let r1 = 0.42,
      r2 = 0.4,
      h = 0.2;

    for (let i = 0; i < Math.PI; i += Math.PI / n) {
      temp3.push(r2 * Math.sin(i + Math.PI / n));
      temp3.push(r2 * Math.cos(i + Math.PI / n));
      temp3.push(0);
      temp3.push(r2 * Math.sin(i));
      temp3.push(r2 * Math.cos(i));
      temp3.push(-0.2);
      temp3.push(r2 * Math.sin(i));
      temp3.push(r2 * Math.cos(i));
      temp3.push(0);
      temp3.push(r2 * Math.sin(i + Math.PI / n));
      temp3.push(r2 * Math.cos(i + Math.PI / n));
      temp3.push(0);
      temp3.push(r2 * Math.sin(i + Math.PI / n));
      temp3.push(r2 * Math.cos(i + Math.PI / n));
      temp3.push(-0.2);
      temp3.push(r2 * Math.sin(i));
      temp3.push(r2 * Math.cos(i));
      temp3.push(-0.2);

      temp3.push(r1 * Math.sin(i + Math.PI / n));
      temp3.push(r1 * Math.cos(i + Math.PI / n));
      temp3.push(0);
      temp3.push(r1 * Math.sin(i));
      temp3.push(r1 * Math.cos(i));
      temp3.push(-0.2);
      temp3.push(r1 * Math.sin(i));
      temp3.push(r1 * Math.cos(i));
      temp3.push(0);
      temp3.push(r1 * Math.sin(i + Math.PI / n));
      temp3.push(r1 * Math.cos(i + Math.PI / n));
      temp3.push(0);
      temp3.push(r1 * Math.sin(i + Math.PI / n));
      temp3.push(r1 * Math.cos(i + Math.PI / n));
      temp3.push(-0.2);
      temp3.push(r1 * Math.sin(i));
      temp3.push(r1 * Math.cos(i));
      temp3.push(-0.2);
    }
    for (let i = 0; i < Math.PI; i += Math.PI / n) {
      temp3.push(r2 * Math.sin(i + Math.PI / n));
      temp3.push(r2 * Math.cos(i + Math.PI / n));
      temp3.push(0);

      temp3.push(r1 * Math.sin(i));
      temp3.push(r1 * Math.cos(i));
      temp3.push(0);

      temp3.push(r2 * Math.sin(i));
      temp3.push(r2 * Math.cos(i));
      temp3.push(0);

      temp3.push(r2 * Math.sin(i + Math.PI / n));
      temp3.push(r2 * Math.cos(i + Math.PI / n));
      temp3.push(0);

      temp3.push(r1 * Math.sin(i + Math.PI / n));
      temp3.push(r1 * Math.cos(i + Math.PI / n));
      temp3.push(0);

      temp3.push(r1 * Math.sin(i));
      temp3.push(r1 * Math.cos(i));
      temp3.push(0);
    }
    for (let i = 0; i < Math.PI; i += Math.PI / n) {
      temp3.push(r2 * Math.sin(i + Math.PI / n));
      temp3.push(r2 * Math.cos(i + Math.PI / n));
      temp3.push(-h);

      temp3.push(r1 * Math.sin(i));
      temp3.push(r1 * Math.cos(i));
      temp3.push(-h);

      temp3.push(r2 * Math.sin(i));
      temp3.push(r2 * Math.cos(i));
      temp3.push(-h);

      temp3.push(r2 * Math.sin(i + Math.PI / n));
      temp3.push(r2 * Math.cos(i + Math.PI / n));
      temp3.push(-h);

      temp3.push(r1 * Math.sin(i + Math.PI / n));
      temp3.push(r1 * Math.cos(i + Math.PI / n));
      temp3.push(-h);

      temp3.push(r1 * Math.sin(i));
      temp3.push(r1 * Math.cos(i));
      temp3.push(-h);
    }

    const track_vertices = new Float32Array(temp3);
    track_geometry.setAttribute(
      "position",
      new T.BufferAttribute(track_vertices, 3)
    );
    track_geometry.computeVertexNormals();

    // give it UVs
    let temp4 = [];
    for (let i = 0; i < n; i++) {
      temp4.push(1);
      temp4.push(1);
      temp4.push(0);
      temp4.push(0);
      temp4.push(0);
      temp4.push(1);

      temp4.push(1);
      temp4.push(1);
      temp4.push(1);
      temp4.push(0);
      temp4.push(0);
      temp4.push(0);

      temp4.push(1);
      temp4.push(1);
      temp4.push(0);
      temp4.push(0);
      temp4.push(0);
      temp4.push(1);

      temp4.push(1);
      temp4.push(1);
      temp4.push(1);
      temp4.push(0);
      temp4.push(0);
      temp4.push(0);
    }
    const track_uvs = new Float32Array(temp4);
    track_geometry.setAttribute("uv", new T.BufferAttribute(track_uvs, 2));

    let track_tl = new T.TextureLoader().load("./textures/tank_track.jpg");

    let track_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      side: T.DoubleSide,
      map: track_tl,
      bumpMap: track_tl,
    });
    let track = new T.Group();
    let track_l = 4.3,
      track_x = 0.287;
    let rect_geom = new T.BoxGeometry(track_x, r1 - r2, h);
    for (let j = 0; j < 2; j++) {
      let rect_mesh = [];
      for (let i = 0; i < 14; i++) {
        rect_mesh[i] = new T.Mesh(rect_geom, track_material);
        track.add(rect_mesh[i]);
        rect_mesh[i].translateX(0.44 + i * track_x);
        rect_mesh[i].translateY(r1 - (r1 - r2) / 2);
        if (j == 1) rect_mesh[i].translateZ(-body_z);
        else rect_mesh[i].translateZ(-h);
      }
      for (let i = 14; i < 28; i++) {
        rect_mesh[i] = new T.Mesh(rect_geom, track_material);
        track.add(rect_mesh[i]);
        rect_mesh[i].translateX(0.44 + (i - 14) * track_x);
        rect_mesh[i].translateY(-r1 + (r1 - r2) / 2);
        if (j == 1) rect_mesh[i].translateZ(-body_z);
        else rect_mesh[i].translateZ(-h);
      }
      let track_mesh1 = new T.Mesh(track_geometry, track_material);
      let track_mesh2 = new T.Mesh(track_geometry, track_material);
      track_mesh1.translateZ(-h / 2);
      track_mesh2.translateZ(-h / 2);
      if (j == 1) {
        track_mesh1.translateZ(-body_z + h);
        track_mesh2.translateZ(-body_z + h);
      }
      track_mesh1.translateX(track_l);
      track_mesh2.rotateZ(Math.PI);
      track_mesh2.translateX(-start_pos);

      track.add(track_mesh1);
      track.add(track_mesh2);
    }
    track.translateY(r1);
    track.translateZ(0.1);
    panzer.add(track);
    //this.time = 0;
    this.shell_count = 0;
    this.total_count = 4;
    this.shells = params.shells;
    this.start_pos = cannon5_mesh;
    this.targetangle = 0;
    this.angle = 0;
    this.wait = 0;
    this.panzer = panzer;
    this.world = params.world;
    this.total_angle = 0;
    if (params.rideable) {
      this.ridePoint = new T.Object3D();
      terret1_mesh.add(this.ridePoint);
      this.ridePoint.translateZ(10);
      this.rideable = this.ridePoint;
    }
    this.size = Number(params.size);
  }

  /**
   * StepWorld method
   * @param {*} delta
   * @param {*} timeOfDay
   */
  stepWorld(delta, timeOfDay) {
    // in this animation, use the sine of the accumulated angle to set current rotation.
    // This means the swing moves faster as it reaches the bottom of a swing,
    // and faster at either end of the swing, like a pendulum should.
    //this.time += delta / 1000; // time in seconds

    let speed = delta / 1000;
    this.targetangle = (Math.PI * 2) / this.total_count;
    /*
    if (this.shell_count == 4) {

    } else*/
    if (this.shell_count == 0) {
      let pos = new T.Vector3();
      this.start_pos.getWorldPosition(pos);
      //console.log(pos);
      /*
      this.shells?.push(
        new ShellGeometry1({
          x: pos.x,
          y: pos.y,
          z: pos.z,
          y_rotation: this.upper.rotation.y,
        })
      );*/
      console.log(this.upper.rotation.y);
      this.world?.add(
        new ShellGeometry1({
          x: pos.x,
          y: pos.y - 0.1,
          z: pos.z,
          y_rotation: this.total_angle,
          world: this.world,
          size: this.size,
        })
      );
      this.shell_count++;
      this.wait = 10;
    } else {
      if (this.wait > 0) this.wait--;
      else {
        if (this.angle >= this.targetangle) {
          this.angle = 0;
          let pos = new T.Vector3();
          this.start_pos.getWorldPosition(pos);
          //console.log(pos);
          /*
          this.shells?.push(
        new ShellGeometry1({
          x: pos.x,
          y: pos.y,
          z: pos.z,
          y_rotation: this.upper.rotation.y,
        })
      );*/
          //console.log(this.upper.rotation.y);
          this.world?.add(
            new ShellGeometry1({
              x: pos.x,
              y: pos.y - 0.1,
              z: pos.z,
              y_rotation: this.total_angle,
              world: this.world,
              size: this.size,
            })
          );

          this.shell_count++;
          this.wait = 10;
        } else {
          this.upper.translateX(this.body_x / 4);
          this.upper.translateZ(-this.body_z / 4);
          this.upper.rotateY(speed);
          this.upper.translateX(-this.body_x / 4);
          this.upper.translateZ(this.body_z / 4);
          this.angle += speed;
          this.total_angle += speed;
          // console.log(this.upper.rotation.y);
        }
      }
    }
  }
}
