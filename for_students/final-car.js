/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let Car1Count = 0;
let Car2Count = 0;

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
 */

export class CarGeometry1 extends GrObject {
  /**
   * @param {Properties} params
   */
  constructor(params = {}) {
    let body_geometry = new T.BufferGeometry();
    //
    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    const body_vertices = new Float32Array([
      //right-bottom
      4, 0, 0,

      0, 0.5, 0,

      0, 0, 0,

      4, 0, 0,

      4, 0.5, 0,

      0, 0.5, 0,

      //right-top
      3.5, 0.5, 0,

      2, 1, 0,

      1, 0.5, 0,

      3.5, 0.5, 0,

      3, 1, 0,

      2, 1, 0,

      //left-bottom
      0, 0, -2,

      4, 0.5, -2,

      4, 0, -2,

      0, 0, -2,

      0, 0.5, -2,

      4, 0.5, -2,

      //left-top
      1, 0.5, -2,

      3, 1, -2,

      3.5, 0.5, -2,

      1, 0.5, -2,

      2, 1, -2,

      3, 1, -2,

      //front-bottom
      0, 0, 0,

      0, 0.5, -2,

      0, 0, -2,

      0, 0, 0,

      0, 0.5, 0,

      0, 0.5, -2,

      //engine-lid
      0, 0.5, 0,

      1, 0.5, -2,

      0, 0.5, -2,

      0, 0.5, 0,

      1, 0.5, 0,

      1, 0.5, -2,

      //front-top
      1, 0.5, 0,

      2, 1, -2,

      1, 0.5, -2,

      1, 0.5, 0,

      2, 1, 0,

      2, 1, -2,

      //top
      2, 1, 0,

      3, 1, -2,

      2, 1, -2,

      2, 1, 0,

      3, 1, 0,

      3, 1, -2,

      //back-top
      3.5, 0.5, -2,

      3, 1, 0,

      3.5, 0.5, 0,

      3.5, 0.5, -2,

      3, 1, -2,

      3, 1, 0,

      //trunk
      4, 0.5, -2,

      3.5, 0.5, 0,

      4, 0.5, 0,

      4, 0.5, -2,

      3.5, 0.5, -2,

      3.5, 0.5, 0,

      //back-bottom
      4, 0, -2,

      4, 0.5, 0,

      4, 0, 0,

      4, 0, -2,

      4, 0.5, -2,

      4, 0.5, 0,
    ]);
    body_geometry.setAttribute(
      "position",
      new T.BufferAttribute(body_vertices, 3)
    );
    body_geometry.computeVertexNormals();

    // give it UVs
    const uvs = new Float32Array([
      //right-bottom
      1 / 3,
      1 / 3,
      0,
      2 / 3,
      0,
      1 / 3,

      1 / 3,
      1 / 3,
      1 / 3,
      2 / 3,
      0,
      2 / 3,

      //right-top
      1,
      0,
      2 / 3,
      1 / 3,
      2 / 3,
      0,

      1,
      0,
      1,
      1 / 3,
      2 / 3,
      1 / 3,

      //left-bottom
      1 / 3,
      1 / 3,
      0,
      2 / 3,
      0,
      1 / 3,

      1 / 3,
      1 / 3,
      1 / 3,
      2 / 3,
      0,
      2 / 3,

      //left-top
      1,
      0,
      2 / 3,
      1 / 3,
      2 / 3,
      0,

      1,
      0,
      1,
      1 / 3,
      2 / 3,
      1 / 3,

      //front-bottom
      1 / 3,
      1 / 3,
      0,
      2 / 3,
      0,
      1 / 3,

      1 / 3,
      1 / 3,
      1 / 3,
      2 / 3,
      0,
      2 / 3,

      //engine-lid
      1,
      0,
      2 / 3,
      1 / 3,
      2 / 3,
      0,

      1,
      0,
      1,
      1 / 3,
      2 / 3,
      1 / 3,

      //front-top
      1 / 3,
      1 / 3,
      0,
      2 / 3,
      0,
      1 / 3,

      1 / 3,
      1 / 3,
      1 / 3,
      2 / 3,
      0,
      2 / 3,

      //top
      1,
      0,
      2 / 3,
      1 / 3,
      2 / 3,
      0,

      1,
      0,
      1,
      1 / 3,
      2 / 3,
      1 / 3,

      //back-top
      1 / 3,
      1 / 3,
      0,
      2 / 3,
      0,
      1 / 3,

      1 / 3,
      1 / 3,
      1 / 3,
      2 / 3,
      0,
      2 / 3,

      //trunk
      1,
      0,
      2 / 3,
      1 / 3,
      2 / 3,
      0,

      1,
      0,
      1,
      1 / 3,
      2 / 3,
      1 / 3,

      //back-bottom
      1 / 3,
      1 / 3,
      0,
      2 / 3,
      0,
      1 / 3,

      1 / 3,
      1 / 3,
      1 / 3,
      2 / 3,
      0,
      2 / 3,
    ]);
    body_geometry.setAttribute("uv", new T.BufferAttribute(uvs, 2));

    let tl = new T.TextureLoader().load("./textures/car1.jpg");
    let body_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: tl,
    });

    let body_mesh = new T.Mesh(body_geometry, body_material);

    let wheel_geometry = new T.BufferGeometry();

    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    let temp = [];
    let r = 0.25,
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
    const wheel_uvs = new Float32Array(temp2);
    wheel_geometry.setAttribute("uv", new T.BufferAttribute(wheel_uvs, 2));

    let wheel_tl = new T.TextureLoader().load("./textures/tire.jpg");
    let wheel_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: wheel_tl,
    });

    let window_material = new T.MeshStandardMaterial({
      color: "cyan",
      roughness: 0.75,
      side: T.DoubleSide,
    });

    let window1_geometry = new T.BufferGeometry();
    const window1_vertices = new Float32Array([
      // right
      0.9, 0, 0,

      0.6, 0.3, 0,

      0, 0, 0,

      0.9, 0, 0,

      0.9, 0.3, 0,

      0.6, 0.3, 0,
    ]);
    window1_geometry.setAttribute(
      "position",
      new T.BufferAttribute(window1_vertices, 3)
    );
    window1_geometry.computeVertexNormals();

    let window2_geometry = new T.BufferGeometry();
    const window2_vertices = new Float32Array([
      //right
      0.5, 0, 0,

      0, 0.3, 0,

      0, 0, 0,

      0.5, 0, 0,

      0.2, 0.3, 0,

      0, 0.3, 0,
    ]);
    window2_geometry.setAttribute(
      "position",
      new T.BufferAttribute(window2_vertices, 3)
    );
    window2_geometry.computeVertexNormals();

    let window3_geometry = new T.BufferGeometry();
    const window3_vertices = new Float32Array([
      // front
      0, 0, 0,

      0.8, 0.4, -1.5,

      0, 0, -1.5,

      0, 0, 0,

      0.8, 0.4, 0,

      0.8, 0.4, -1.5,

      // right
      0.1, 0, 0,

      0.8, 0.4, 0,

      0, 0, 0,

      0.1, 0, 0,

      0.9, 0.4, 0,

      0.8, 0.4, 0,

      // left
      0, 0, -1.5,

      0.9, 0.4, -1.5,

      0.1, 0, -1.5,

      0, 0, -1.5,

      0.8, 0.4, -1.5,

      0.9, 0.4, -1.5,

      // top
      0.8, 0.4, 0,

      0.9, 0.4, -1.5,

      0.8, 0.4, -1.5,

      0.8, 0.4, 0,

      0.9, 0.4, 0,

      0.9, 0.4, -1.5,
    ]);
    window3_geometry.setAttribute(
      "position",
      new T.BufferAttribute(window3_vertices, 3)
    );
    window3_geometry.computeVertexNormals();

    const window3_uvs = new Float32Array([
      1, 0,

      0, 1,

      0, 0,

      1, 0,

      1, 1,

      0, 1,
    ]);
    window3_geometry.setAttribute("uv", new T.BufferAttribute(window3_uvs, 2));

    let window3_tl = new T.TextureLoader().load("./textures/window_car1.jpg");
    let window3_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: window3_tl,
    });

    let window4_geometry = new T.BufferGeometry();
    const window4_vertices = new Float32Array([
      // back
      0, 0, -1.5,

      -0.4, 0.4, 0,

      0, 0, 0,

      0, 0, -1.5,

      -0.4, 0.4, -1.5,

      -0.4, 0.4, 0,

      // right
      0, 0, 0,

      -0.5, 0.4, 0,

      -0.1, 0, 0,

      0, 0, 0,

      -0.4, 0.4, 0,

      -0.5, 0.4, 0,

      // left
      -0.1, 0, -1.5,

      -0.4, 0.4, -1.5,

      0, 0, -1.5,

      -0.1, 0, -1.5,

      -0.5, 0.4, -1.5,

      -0.4, 0.4, -1.5,

      // top
      -0.4, 0.4, 0,

      -0.5, 0.4, -1.5,

      -0.5, 0.4, 0,

      -0.4, 0.4, 0,

      -0.4, 0.4, -1.5,

      -0.5, 0.4, -1.5,
    ]);
    window4_geometry.setAttribute(
      "position",
      new T.BufferAttribute(window4_vertices, 3)
    );
    window4_geometry.computeVertexNormals();

    let car = new T.Group();
    // put the object in its place
    car.position.x = Number(params.x) || 0;
    car.position.y = Number(params.y) || 0;
    car.position.z = Number(params.z) || 0;
    car.scale.set(
      Number(params.size) || 1,
      Number(params.size) || 1,
      Number(params.size) || 1
    );
    let window3 = new T.Mesh(window3_geometry, window3_material);
    car.add(window3);
    window3.translateY(0.85);
    window3.translateX(1.05);
    window3.translateZ(-0.25);
    window3.translateX(-2);
    window3.translateZ(1);

    let window4 = new T.Mesh(window4_geometry, window_material);
    car.add(window4);
    window4.translateY(0.88);
    window4.translateX(3.43);
    window4.translateZ(-0.25);
    window4.translateX(-2);
    window4.translateZ(1);

    let windows1 = [],
      windows2 = [];
    for (let i = 0; i < 2; i++) {
      windows1[i] = new T.Mesh(window1_geometry, window_material);
      car.add(windows1[i]);
      windows1[i].translateX(1.5);
      windows1[i].translateY(0.85);
      windows1[i].translateX(-2);
      windows1[i].translateZ(1);

      windows2[i] = new T.Mesh(window2_geometry, window_material);
      car.add(windows2[i]);
      windows2[i].translateX(2.7);
      windows2[i].translateY(0.85);
      windows2[i].translateX(-2);
      windows2[i].translateZ(1);
    }
    windows1[0].translateZ(0.0005);
    windows1[1].translateZ(-2.0005);
    windows2[0].translateZ(0.0005);
    windows2[1].translateZ(-2.0005);
    car.add(body_mesh);
    let wheel_meshs = [];
    for (let i = 0; i < 4; i++) {
      wheel_meshs[i] = new T.Mesh(wheel_geometry, wheel_material);
      car.add(wheel_meshs[i]);
      wheel_meshs[i].translateY(r);
      wheel_meshs[i].translateX(-2);
      wheel_meshs[i].translateZ(1);
    }
    wheel_meshs[0].translateZ(0.1);
    wheel_meshs[1].translateZ(0.1);
    wheel_meshs[2].translateZ(-1.9);
    wheel_meshs[3].translateZ(-1.9);

    wheel_meshs[0].translateX(1);
    wheel_meshs[1].translateX(3);
    wheel_meshs[2].translateX(1);
    wheel_meshs[3].translateX(3);

    body_mesh.translateY(0.3);
    body_mesh.translateX(-2);
    body_mesh.translateZ(1);
    super(`CarGeometry1-${++Car1Count}`, car);
    this.car = car;
    this.count = 0;
    this.angle = 0;
    this.status = 0;
    this.stop1 = -2.2;
    this.stop2 = -18.2;
    this.stop3 = 15;
    this.wheels = wheel_meshs;
  }
  stepWorld(delta, timeOfDay) {
    //console.log(this.car.position + " count " + this.count);
    let speed = delta / 200;
    let run = true;
    if (this.status == 0) {
      let stop_time = 200;
      if (this.count > 0) {
        this.count--;
        run = false;
        if (this.count == 0) {
          this.status = 1;
          this.angle = -Math.PI / 2;
          return;
        }
      } else {
        if (this.car.position.z - speed <= this.stop1) {
          this.count = stop_time;
          this.car.position.z = this.stop1;
        } else this.car.position.z -= speed;
      }
    } else if (this.status == 1) {
      let r = 1;
      if (this.angle + speed / 2 >= 0) {
        this.status = 2;
        this.angle = 0;
      } else {
        this.angle += speed / 2;
      }
      this.car.translateZ(r);
      this.car.rotation.y = this.angle;
      this.car.translateZ(-r);
      /*
      this.car.translateZ(r);
      this.car.rotateY(speed / 2);
      this.angle += speed / 2;
      this.car.translateZ(-r);

      if (this.angle < Math.PI / 2 && this.angle + speed / 2 >= Math.PI / 2) {
        console.log(this.angle);
        this.status = 2;
      }*/
    } else if (this.status == 2) {
      if (this.car.position.x > this.stop2) {
        this.car.position.x -= speed;
      } else {
        this.status = 3;
        this.angle = 0; // reset angle
      }
    } else if (this.status == 3) {
      let x = -18,
        r = 1;
      if (this.angle + speed / 2 >= Math.PI / 2) {
        this.status = 4;
        this.angle = Math.PI / 2;
      } else {
        this.angle += speed / 2;
      }
      this.car.translateZ(r);
      this.car.rotation.y = this.angle;
      this.car.translateZ(-r);
    } else {
      if (this.car.position.z < this.stop3) {
        this.car.position.z += speed;
      } else run = false;
    }
    if (run)
      for (let i = 0; i < this.wheels.length; i++)
        this.wheels[i].rotateZ(speed);
  }
}

export class CarGeometry2 extends GrObject {
  /**
   * @param {Properties} params
   */
  constructor(params = {}) {
    let body_geometry = new T.BufferGeometry();
    //
    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    const body_vertices = new Float32Array([
      //right-bottom
      4, 0, 0,

      0, 2, 0,

      0, 0, 0,

      4, 0, 0,

      4, 2, 0,

      0, 2, 0,

      //right-top
      4, 2, 0,

      0.5, 2.25, 0,

      0, 2, 0,

      4, 2, 0,

      3.75, 2.25, 0,

      0.5, 2.25, 0,

      //left-bottom
      0, 0, -2,

      4, 2, -2,

      4, 0, -2,

      0, 0, -2,

      0, 2, -2,

      4, 2, -2,

      //left-top
      0, 2, -2,

      3.75, 2.25, -2,

      4, 2, -2,

      0, 2, -2,

      0.5, 2.25, -2,

      3.75, 2.25, -2,

      //front-bottom
      0, 0, 0,

      0, 2, -2,

      0, 0, -2,

      0, 0, 0,

      0, 2, 0,

      0, 2, -2,

      //front-top
      0, 2, 0,

      0.5, 2.25, -2,

      0, 2, -2,

      0, 2, 0,

      0.5, 2.25, 0,

      0.5, 2.25, -2,

      //top
      0.5, 2.25, 0,

      3.75, 2.25, -2,

      0.5, 2.25, -2,

      0.5, 2.25, 0,

      3.75, 2.25, 0,

      3.75, 2.25, -2,

      //back-top
      4, 2, -2,

      3.75, 2.25, 0,

      4, 2, 0,

      4, 2, -2,

      3.75, 2.25, -2,

      3.75, 2.25, 0,

      //back-bottom
      4, 0, -2,

      4, 2, 0,

      4, 0, 0,

      4, 0, -2,

      4, 2, -2,

      4, 2, 0,
    ]);
    body_geometry.setAttribute(
      "position",
      new T.BufferAttribute(body_vertices, 3)
    );
    body_geometry.computeVertexNormals();

    // give it UVs
    const body_uvs = new Float32Array([
      //right-bottom
      1 / 3,
      1 / 3,
      0,
      2 / 3,
      0,
      1 / 3,

      1 / 3,
      1 / 3,
      1 / 3,
      2 / 3,
      0,
      2 / 3,

      //right-top
      1,
      0,
      2 / 3,
      1 / 3,
      2 / 3,
      0,

      1,
      0,
      1,
      1 / 3,
      2 / 3,
      1 / 3,

      //left-bottom
      1 / 3,
      1 / 3,
      0,
      2 / 3,
      0,
      1 / 3,

      1 / 3,
      1 / 3,
      1 / 3,
      2 / 3,
      0,
      2 / 3,

      //left-top
      1,
      0,
      2 / 3,
      1 / 3,
      2 / 3,
      0,

      1,
      0,
      1,
      1 / 3,
      2 / 3,
      1 / 3,

      //front-bottom
      1 / 3,
      1 / 3,
      0,
      2 / 3,
      0,
      1 / 3,

      1 / 3,
      1 / 3,
      1 / 3,
      2 / 3,
      0,
      2 / 3,

      //engine-lid
      1,
      0,
      2 / 3,
      1 / 3,
      2 / 3,
      0,

      1,
      0,
      1,
      1 / 3,
      2 / 3,
      1 / 3,

      //front-top
      1 / 3,
      1 / 3,
      0,
      2 / 3,
      0,
      1 / 3,

      1 / 3,
      1 / 3,
      1 / 3,
      2 / 3,
      0,
      2 / 3,

      //top
      1,
      0,
      2 / 3,
      1 / 3,
      2 / 3,
      0,

      1,
      0,
      1,
      1 / 3,
      2 / 3,
      1 / 3,

      //back-top
      1 / 3,
      1 / 3,
      0,
      2 / 3,
      0,
      1 / 3,

      1 / 3,
      1 / 3,
      1 / 3,
      2 / 3,
      0,
      2 / 3,

      //trunk
      1,
      0,
      2 / 3,
      1 / 3,
      2 / 3,
      0,

      1,
      0,
      1,
      1 / 3,
      2 / 3,
      1 / 3,

      //back-bottom
      1 / 3,
      1 / 3,
      0,
      2 / 3,
      0,
      1 / 3,

      1 / 3,
      1 / 3,
      1 / 3,
      2 / 3,
      0,
      2 / 3,
    ]);
    body_geometry.setAttribute("uv", new T.BufferAttribute(body_uvs, 2));

    let body_tl = new T.TextureLoader().load("./textures/bus_body.jpg");
    let body_material = new T.MeshStandardMaterial({
      color: "yellow",
      roughness: 0.75,
      map: body_tl,
    });

    let body_mesh = new T.Mesh(body_geometry, body_material);

    let wheel_geometry = new T.BufferGeometry();

    // while the two triangles have 4 certices, we need to split the vertices
    // so that they can have different normals
    let temp = [];
    let r = 0.5,
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
    const wheel_uvs = new Float32Array(temp2);
    wheel_geometry.setAttribute("uv", new T.BufferAttribute(wheel_uvs, 2));

    let wheel_tl = new T.TextureLoader().load("./textures/tire.jpg");
    let wheel_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: wheel_tl,
    });

    let window_material = new T.MeshStandardMaterial({
      color: "cyan",
      roughness: 0.75,
      side: T.DoubleSide,
    });

    let window1_geometry = new T.BufferGeometry();
    const window1_vertices = new Float32Array([
      // right-bottom
      0.5, 0, 0,

      0, 0.5, 0,

      0, 0, 0,

      0.5, 0, 0,

      0.5, 0.5, 0,

      0, 0.5, 0,

      // right-top
      0.5, 0.5, 0,

      0.3, 0.75, 0,

      0, 0.5, 0,

      0.5, 0.5, 0,

      0.5, 0.75, 0,

      0.3, 0.75, 0,

      // left-bottom
      0, 0, -0.1,

      0.5, 0.5, -0.1,

      0.5, 0, -0.1,

      0, 0, -0.1,

      0, 0.5, -0.1,

      0.5, 0.5, -0.1,

      // left-top
      0, 0.5, -0.1,

      0.5, 0.75, -0.1,

      0.5, 0.5, -0.1,

      0, 0.5, -0.1,

      0.3, 0.75, -0.1,

      0.5, 0.75, -0.1,

      //front-bottom
      0, 0, 0,

      0, 0.5, -0.1,

      0, 0, -0.1,

      0, 0, 0,

      0, 0.5, 0,

      0, 0.5, -0.1,

      //front-top
      0, 0.5, 0,

      0.3, 0.75, -0.1,

      0, 0.5, -0.1,

      0, 0.5, 0,

      0.3, 0.75, 0,

      0.3, 0.75, -0.1,

      //top
      0.3, 0.75, 0,

      0.5, 0.75, -0.1,

      0.3, 0.75, -0.1,

      0.3, 0.75, 0,

      0.5, 0.75, 0,

      0.5, 0.75, -0.1,

      //back
      0.5, 0, -0.1,

      0.5, 0.75, 0,

      0.5, 0, 0,

      0.5, 0, -0.1,

      0.5, 0.75, -0.1,

      0.5, 0.75, 0,
    ]);
    window1_geometry.setAttribute(
      "position",
      new T.BufferAttribute(window1_vertices, 3)
    );
    window1_geometry.computeVertexNormals();

    let window2_geometry = new T.BoxGeometry(0.75, 0.75, 0.1);

    let window3_geometry = new T.BoxGeometry(0.1, 0.75, 1.5);

    let door_geometry = new T.BufferGeometry();

    const door_vertices = new Float32Array([
      1, 0, 0,

      0, 2, 0,

      0, 0, 0,

      1, 0, 0,

      1, 2, 0,

      0, 2, 0,
    ]);
    door_geometry.setAttribute(
      "position",
      new T.BufferAttribute(door_vertices, 3)
    );
    door_geometry.computeVertexNormals();

    const door_uvs = new Float32Array([
      1, 0,

      0, 1,

      0, 0,

      1, 0,

      1, 1,

      0, 1,
    ]);
    door_geometry.setAttribute("uv", new T.BufferAttribute(door_uvs, 2));

    let door_tl = new T.TextureLoader().load("./textures/door_bus.jpg");
    let door_material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      side: T.DoubleSide,
      map: door_tl,
    });

    let car = new T.Group();

    // put the object in its place
    car.position.x = Number(params.x) || 0;
    car.position.y = Number(params.y) || 0;
    car.position.z = Number(params.z) || 0;
    car.scale.set(
      Number(params.size) || 1,
      Number(params.size) || 1,
      Number(params.size) || 1
    );

    let window3 = [];
    for (let i = 0; i < 2; i++) {
      window3[i] = new T.Mesh(window3_geometry, window_material);
      car.add(window3[i]);
      window3[i].translateY(1.8);
      window3[i].translateZ(-1);
      window3[i].translateX(-2);
      window3[i].translateZ(1);
    }
    window3[1].translateX(4);

    let door = new T.Mesh(door_geometry, door_material);
    car.add(door);
    door.scale.set(0.7, 0.7, 0.7);
    door.translateX(1.7);
    door.translateY(0.3);
    door.translateZ(0.0005);
    door.translateX(-2);
    door.translateZ(1);
    let windows1 = [],
      windows2 = [];
    for (let i = 0; i < 2; i++) {
      windows1[i] = new T.Mesh(window1_geometry, window_material);
      car.add(windows1[i]);
      windows1[i].translateX(0.1);
      windows1[i].translateY(1.55);
      windows1[i].translateX(-2);
      windows1[i].translateZ(1);
    }
    for (let i = 0; i < 4; i++) {
      windows2[i] = new T.Mesh(window2_geometry, window_material);
      car.add(windows2[i]);
      if (i % 2 == 0) windows2[i].translateX(3.2);
      else windows2[i].translateX(1.2);
      windows2[i].translateY(1.9);
      windows2[i].translateX(-2);
      windows2[i].translateZ(1);
    }
    windows1[0].translateZ(0.05);
    windows1[1].translateZ(-1.95);
    windows2[0].translateZ(0);
    windows2[2].translateZ(-2);
    windows2[1].translateZ(0);
    windows2[3].translateZ(-2);
    car.add(body_mesh);
    let wheel_meshs = [];
    for (let i = 0; i < 4; i++) {
      wheel_meshs[i] = new T.Mesh(wheel_geometry, wheel_material);
      car.add(wheel_meshs[i]);
      wheel_meshs[i].translateY(r);
      wheel_meshs[i].translateX(-2);
      wheel_meshs[i].translateZ(1);
    }
    wheel_meshs[0].translateZ(0.1);
    wheel_meshs[1].translateZ(0.1);
    wheel_meshs[2].translateZ(-1.9);
    wheel_meshs[3].translateZ(-1.9);

    wheel_meshs[0].translateX(1);
    wheel_meshs[1].translateX(3);
    wheel_meshs[2].translateX(1);
    wheel_meshs[3].translateX(3);

    body_mesh.translateY(0.3);
    body_mesh.translateX(-2);
    body_mesh.translateZ(1);
    super(`CarGeometry2-${++Car2Count}`, car);
    this.car = car;
    this.count = -1;
    this.status = 0;
    this.angle = 0;
    this.ridePoint = new T.Object3D();
    car.add(this.ridePoint);
    this.ridePoint.translateY(5);
    this.ridePoint.translateX(4);
    this.ridePoint.rotateY(-Math.PI / 2);
    this.rideable = this.ridePoint;
    this.stop2 = -17.1;
    this.stop3 = 16.2;
    this.stop1 = -3;
    this.stop4 = -5;
    this.stop5 = -2.2;
    this.wheels = wheel_meshs;
  }
  stepWorld(delta, timeOfDay) {
    //console.log(this.car.position + " count " + this.count);
    let speed = delta / 200;
    let stop_time = 200;
    let run = true;
    if (this.status == 0) {
      if (this.car.position.x < this.stop2) {
        this.status = 1;
        return;
      }

      if (this.count > 0) {
        this.count--;
        run = false;
      } else if (this.count == -1) {
        if (this.car.position.x - speed <= this.stop1) {
          this.count = stop_time;
          this.car.position.x = this.stop1;
        } else this.car.position.x -= speed;
      } else {
        if (this.car.position.x - speed < this.stop2) {
          this.status = 1;
          this.car.position.x = this.stop2;
          return;
        } else this.car.position.x -= speed;
      }
    } else if (this.status == 1) {
      let x = -18,
        r = 1;

      if (this.angle + speed / 2 >= Math.PI / 2) {
        this.status = 2;
        this.angle = Math.PI / 2;
      } else {
        this.angle += speed / 2;
      }
      this.car.translateZ(r);
      this.car.rotation.y = this.angle;
      this.car.translateZ(-r);
    } else if (this.status == 2) {
      if (this.car.position.z < this.stop3) {
        this.car.position.z += speed;
      } else {
        this.count = stop_time;
        this.status = 3;
      }
    } else if (this.status == 3) {
      if (this.count > 0) {
        this.count--;
        run = false;
      } else this.status = 4;
    } else if (this.status == 4) {
      let r = 1;
      if (this.angle + speed / 2 >= Math.PI) {
        this.status = 5;
        this.angle = Math.PI;
      } else {
        this.angle += speed / 2;
      }
      this.car.translateZ(r);
      this.car.rotation.y = this.angle;
      this.car.translateZ(-r);
    } else if (this.status == 5) {
      if (this.car.position.x < this.stop4) {
        this.car.position.x += speed;
      } else {
        this.status = 6;
      }
    } else if (this.status == 6) {
      let r = 1;
      if (this.angle + speed / 2 >= (Math.PI * 3) / 2) {
        this.status = 7;
        this.angle = (Math.PI * 3) / 2;
      } else {
        this.angle += speed / 2;
      }
      this.car.translateZ(r);
      this.car.rotation.y = this.angle;
      this.car.translateZ(-r);
    } else if (this.status == 7) {
      if (this.car.position.z > this.stop5) {
        this.car.position.z -= speed;
      } else {
        this.count = stop_time;
        this.status = 8;
      }
    } else if (this.status == 8) {
      if (this.count > 0) {
        this.count--;
        run = false;
      } else {
        let r = 1.1;
        if (this.angle + speed / 2 >= Math.PI * 2) {
          this.status = 9;
          this.angle = 0;
        } else {
          this.angle += speed / 2;
        }
        this.car.translateZ(r);
        this.car.rotation.y = this.angle;
        this.car.translateZ(-r);
      }
    } else if (this.status == 9) {
      if (this.car.position.x < this.stop2) {
        this.status = 1;
      } else this.car.position.x -= speed;
    }

    if (run)
      for (let i = 0; i < this.wheels.length; i++)
        this.wheels[i].rotateZ(speed);
  }
}
