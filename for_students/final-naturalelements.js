/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
let TreeCount = 0;

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
export class TreeGeometry1 extends GrObject {
  /**
   * @param {Properties} params
   */
  constructor(params = {}) {
    let body_geometry = new T.BufferGeometry();
    //
    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    let temp = [];
    let r = 0.25,
      h = 1;
    for (let i = 0; i < Math.PI * 2; i += Math.PI / 6) {
      temp.push(r * Math.sin(i + Math.PI / 6));
      temp.push(0);
      temp.push(r * Math.cos(i + Math.PI / 6));
      temp.push(r * Math.sin(i));
      temp.push(0);
      temp.push(r * Math.cos(i));
      temp.push(r * Math.sin(i));
      temp.push(-h);
      temp.push(r * Math.cos(i));

      temp.push(r * Math.sin(i + Math.PI / 6));
      temp.push(0);
      temp.push(r * Math.cos(i + Math.PI / 6));
      temp.push(r * Math.sin(i));
      temp.push(-h);
      temp.push(r * Math.cos(i));
      temp.push(r * Math.sin(i + Math.PI / 6));
      temp.push(-h);
      temp.push(r * Math.cos(i + Math.PI / 6));
    }
    for (let i = 0; i < Math.PI * 2; i += Math.PI / 6) {
      temp.push(0);
      temp.push(0);
      temp.push(0);
      temp.push(r * Math.sin(i + Math.PI / 6));
      temp.push(0);
      temp.push(r * Math.cos(i + Math.PI / 6));

      temp.push(r * Math.sin(i));
      temp.push(0);
      temp.push(r * Math.cos(i));
    }

    for (let i = 0; i < Math.PI * 2; i += Math.PI / 6) {
      temp.push(0);
      temp.push(-h);
      temp.push(0);

      temp.push(r * Math.sin(i));
      temp.push(-h);
      temp.push(r * Math.cos(i));

      temp.push(r * Math.sin(i + Math.PI / 6));
      temp.push(-h);
      temp.push(r * Math.cos(i + Math.PI / 6));
    }

    const body_vertices = new Float32Array(temp);
    body_geometry.setAttribute(
      "position",
      new T.BufferAttribute(body_vertices, 3)
    );

    body_geometry.computeVertexNormals();

    // give it UVs
    let wall_temp = [];
    for (let i = 0; i < 12; i++) {
      wall_temp.push(1);
      wall_temp.push(1);
      wall_temp.push(0);
      wall_temp.push(1);
      wall_temp.push(0);
      wall_temp.push(0);

      wall_temp.push(1);
      wall_temp.push(1);
      wall_temp.push(0);
      wall_temp.push(0);
      wall_temp.push(1);
      wall_temp.push(0);
    }
    const body_uvs = new Float32Array(wall_temp);
    body_geometry.setAttribute("uv", new T.BufferAttribute(body_uvs, 2));

    let body_tl = new T.TextureLoader().load("./textures/tree.jpg");
    let body_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: body_tl,
      side: T.DoubleSide,
    });
    let body_mesh = new T.Mesh(body_geometry, body_material);

    let leaf_geometry = new T.ConeGeometry(0.7, 1.5, 32);
    let leaf_material = new T.MeshStandardMaterial({
      color: "green",
      roughness: 0.75,
    });
    let leaf_mesh = new T.Mesh(leaf_geometry, leaf_material);

    let tree = new T.Group();
    // put the object in its place
    tree.position.x = Number(params.x) || 0;
    tree.position.y = Number(params.y) || 0;
    tree.position.z = Number(params.z) || 0;
    tree.scale.set(
      Number(params.size) || 1,
      Number(params.size) || 1,
      Number(params.size) || 1
    );
    tree.add(body_mesh);
    tree.add(leaf_mesh);
    body_mesh.translateY(h);
    leaf_mesh.translateY((h * 3) / 2);
    super(`TreeGeometry1-${++TreeCount}`, tree);
  }
}
let GrassCount = 0;
export class GrassGeometry1 extends GrObject {
  /**
   * @param {Properties} params
   */
  constructor(params = {}) {
    let grass = new T.Group();
    super(`GrassGeometry1-${++GrassCount}`, grass);
    // put the object in its place
    grass.position.x = Number(params.x) || 0;
    grass.position.y = Number(params.y) || 0;
    grass.position.z = Number(params.z) || 0;
    // grass.scale.set(Number(params.size) || 1, 1, Number(params.size) || 1);
    grass.translateY(0.01);
    //let body_geometry = new T.BoxGeometry(1, 0.0001, 1);

    let body_geometry = new T.BufferGeometry();
    let size = Number(params.size);
    const body_vertices = new Float32Array([
      size,
      0,
      0,

      0,
      0,
      -size,

      0,
      0,
      0,

      size,
      0,
      0,

      size,
      0,
      -size,

      0,
      0,
      -size,
    ]);
    body_geometry.setAttribute(
      "position",
      new T.BufferAttribute(body_vertices, 3)
    );

    body_geometry.computeVertexNormals();

    const body_uvs = new Float32Array([
      1, 0,

      0, 1,

      0, 0,

      1, 0,

      1, 1,

      0, 1,
    ]);
    body_geometry.setAttribute("uv", new T.BufferAttribute(body_uvs, 2));

    let body_tl = new T.TextureLoader().load("./textures/grass1.jpg");
    body_tl.repeat.set(20, 20);
    body_tl.wrapS = T.MirroredRepeatWrapping; // or T.ClampToEdgeWrapping
    body_tl.wrapT = T.MirroredRepeatWrapping;
    body_tl.needsUpdate = true;
    let body_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: body_tl,
      side: T.DoubleSide,
    });
    let body_mesh = new T.Mesh(body_geometry, body_material);
    //body_mesh.translateX(0.5);
    //body_mesh.translateZ(-0.5);
    grass.add(body_mesh);
  }
}

/**
 * we pass a set of properties to a cube to allow for flexible parameters
 *
 * @typedef ObjectProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 * @property {GrWorld} [world]
 */
let PlantCount = 0;
export class PlantGeometry1 extends GrObject {
  /**
   * @param {ObjectProperties} params
   */
  constructor(params = {}) {
    let grass = new T.Group();
    super(`PlantGeometry1-${++PlantCount}`, grass);
    // put the object in its place
    /*
    grass.position.x = Number(params.x) || 0;
    grass.position.y = Number(params.y) || 0;
    grass.position.z = Number(params.z) || 0;
    grass.scale.set(
      Number(params.size) || 1,
      Number(params.size) || 1,
      Number(params.size) || 1
    );*/
    let world = params.world;
    let loader = new OBJLoader();
    loader.load("./models/Alien Plant.obj", function (grass1) {
      grass1.position.set(
        Number(params.x) || 0,
        Number(params.y) || 0,
        Number(params.z) || 0
      );
      grass1.scale.set(
        Number(params.size) || 0.005,
        Number(params.size) || 0.005,
        Number(params.size) || 0.005
      );
      grass = grass1;
      grass.traverse((obj) => {
        if (obj instanceof T.Mesh) {
          obj.material = new T.MeshStandardMaterial({ color: "green" });
        }
      });
      world?.scene.add(grass);
      world?.renderer.render(world.scene, world.camera);
    });
  }
}

let FloorCount = 0;
/**
 * we pass a set of properties to a cube to allow for flexible parameters
 *
 * @typedef FloorProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [x_size=1]
 * @property {number} [z_size=1]
 */
export class FloorGeometry1 extends GrObject {
  /**
   * @param {FloorProperties} params
   */
  constructor(params = {}) {
    let floor = new T.Group();
    super(`FloorGeometry1-${++FloorCount}`, floor);
    // put the object in its place
    floor.position.x = Number(params.x) || 0;
    floor.position.y = Number(params.y) || 0;
    floor.position.z = Number(params.z) || 0;
    // floor.scale.set(Number(params.size) || 1, 1, Number(params.size) || 1);
    floor.translateY(0.01);
    //let body_geometry = new T.BoxGeometry(1, 0.0001, 1);

    let body_geometry = new T.BufferGeometry();
    let x_size = Number(params.x_size),
      z_size = Number(params.z_size);
    const body_vertices = new Float32Array([
      x_size,
      0,
      0,

      0,
      0,
      -z_size,

      0,
      0,
      0,

      x_size,
      0,
      0,

      x_size,
      0,
      -z_size,

      0,
      0,
      -z_size,
    ]);
    body_geometry.setAttribute(
      "position",
      new T.BufferAttribute(body_vertices, 3)
    );

    body_geometry.computeVertexNormals();

    const body_uvs = new Float32Array([
      1, 0,

      0, 1,

      0, 0,

      1, 0,

      1, 1,

      0, 1,
    ]);
    body_geometry.setAttribute("uv", new T.BufferAttribute(body_uvs, 2));

    let body_tl = new T.TextureLoader().load("./textures/floor1.jpg");
    body_tl.repeat.set(20, 20);
    body_tl.wrapS = T.MirroredRepeatWrapping; // or T.ClampToEdgeWrapping
    body_tl.wrapT = T.MirroredRepeatWrapping;
    body_tl.needsUpdate = true;
    let body_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: body_tl,
      side: T.DoubleSide,
    });
    let body_mesh = new T.Mesh(body_geometry, body_material);
    //body_mesh.translateX(0.5);
    //body_mesh.translateZ(-0.5);
    floor.add(body_mesh);
  }
}

let FloorCount2 = 0;
export class FloorGeometry2 extends GrObject {
  /**
   * @param {FloorProperties} params
   */
  constructor(params = {}) {
    let floor = new T.Group();
    super(`FloorGeometry2-${++FloorCount2}`, floor);
    // put the object in its place
    floor.position.x = Number(params.x) || 0;
    floor.position.y = Number(params.y) || 0;
    floor.position.z = Number(params.z) || 0;
    // floor.scale.set(Number(params.size) || 1, 1, Number(params.size) || 1);
    floor.translateY(0.01);
    //let body_geometry = new T.BoxGeometry(1, 0.0001, 1);

    let body_geometry = new T.BufferGeometry();
    let x_size = Number(params.x_size),
      z_size = Number(params.z_size);
    const body_vertices = new Float32Array([
      x_size,
      0,
      0,

      0,
      0,
      -z_size,

      0,
      0,
      0,

      x_size,
      0,
      0,

      x_size,
      0,
      -z_size,

      0,
      0,
      -z_size,
    ]);
    body_geometry.setAttribute(
      "position",
      new T.BufferAttribute(body_vertices, 3)
    );

    body_geometry.computeVertexNormals();

    const body_uvs = new Float32Array([
      1, 0,

      0, 1,

      0, 0,

      1, 0,

      1, 1,

      0, 1,
    ]);
    body_geometry.setAttribute("uv", new T.BufferAttribute(body_uvs, 2));

    let body_tl = new T.TextureLoader().load("./textures/floor2.jpg");
    body_tl.repeat.set(20, 20);
    body_tl.wrapS = T.MirroredRepeatWrapping; // or T.ClampToEdgeWrapping
    body_tl.wrapT = T.MirroredRepeatWrapping;
    body_tl.needsUpdate = true;
    let body_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: body_tl,
      side: T.DoubleSide,
    });
    let body_mesh = new T.Mesh(body_geometry, body_material);
    //body_mesh.translateX(0.5);
    //body_mesh.translateZ(-0.5);
    floor.add(body_mesh);
  }
}

let FloorCount3 = 0;
export class FloorGeometry3 extends GrObject {
  /**
   * @param {FloorProperties} params
   */
  constructor(params = {}) {
    let floor = new T.Group();
    super(`FloorGeometry3-${++FloorCount3}`, floor);
    // put the object in its place
    floor.position.x = Number(params.x) || 0;
    floor.position.y = Number(params.y) || 0;
    floor.position.z = Number(params.z) || 0;
    // floor.scale.set(Number(params.size) || 1, 1, Number(params.size) || 1);
    floor.translateY(0.01);
    //let body_geometry = new T.BoxGeometry(1, 0.0001, 1);

    let body_geometry = new T.BufferGeometry();
    let x_size = Number(params.x_size),
      z_size = Number(params.z_size);
    const body_vertices = new Float32Array([
      x_size,
      0,
      0,

      0,
      0,
      -z_size,

      0,
      0,
      0,

      x_size,
      0,
      0,

      x_size,
      0,
      -z_size,

      0,
      0,
      -z_size,
    ]);
    body_geometry.setAttribute(
      "position",
      new T.BufferAttribute(body_vertices, 3)
    );

    body_geometry.computeVertexNormals();

    const body_uvs = new Float32Array([
      1, 0,

      0, 1,

      0, 0,

      1, 0,

      1, 1,

      0, 1,
    ]);
    body_geometry.setAttribute("uv", new T.BufferAttribute(body_uvs, 2));

    let body_tl = new T.TextureLoader().load("./textures/floor3.jpg");
    body_tl.repeat.set(20, 20);
    body_tl.wrapS = T.MirroredRepeatWrapping; // or T.ClampToEdgeWrapping
    body_tl.wrapT = T.MirroredRepeatWrapping;
    body_tl.needsUpdate = true;
    let body_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: body_tl,
      side: T.DoubleSide,
    });
    let body_mesh = new T.Mesh(body_geometry, body_material);
    //body_mesh.translateX(0.5);
    //body_mesh.translateZ(-0.5);
    floor.add(body_mesh);
  }
}

let ParkingCount = 0;
export class ParkingGeometry extends GrObject {
  /**
   * @param {FloorProperties} params
   */
  constructor(params = {}) {
    let floor = new T.Group();
    super(`ParkingGeometry-${++ParkingCount}`, floor);
    // put the object in its place
    floor.position.x = Number(params.x) || 0;
    floor.position.y = Number(params.y) || 0;
    floor.position.z = Number(params.z) || 0;
    // floor.scale.set(Number(params.size) || 1, 1, Number(params.size) || 1);
    floor.translateY(0.02);
    //let body_geometry = new T.BoxGeometry(1, 0.0001, 1);

    let body_geometry = new T.BufferGeometry();
    let x_size = Number(params.x_size),
      z_size = Number(params.z_size);
    const body_vertices = new Float32Array([
      x_size,
      0,
      0,

      0,
      0,
      -z_size,

      0,
      0,
      0,

      x_size,
      0,
      0,

      x_size,
      0,
      -z_size,

      0,
      0,
      -z_size,
    ]);
    body_geometry.setAttribute(
      "position",
      new T.BufferAttribute(body_vertices, 3)
    );

    body_geometry.computeVertexNormals();

    const body_uvs = new Float32Array([
      1, 0,

      0, 1,

      0, 0,

      1, 0,

      1, 1,

      0, 1,
    ]);
    body_geometry.setAttribute("uv", new T.BufferAttribute(body_uvs, 2));

    let body_tl = new T.TextureLoader().load("./textures/parkinglot.jpg");
    body_tl.repeat.set(3, 2);
    body_tl.wrapS = T.MirroredRepeatWrapping; // or T.ClampToEdgeWrapping
    body_tl.wrapT = T.MirroredRepeatWrapping;
    body_tl.needsUpdate = true;
    let body_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: body_tl,
      side: T.DoubleSide,
    });
    let body_mesh = new T.Mesh(body_geometry, body_material);
    //body_mesh.translateX(0.5);
    //body_mesh.translateZ(-0.5);
    floor.add(body_mesh);
  }
}
