/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { BlasterGeometry1 } from "./final-blaster.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
let ShellCount = 0;
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
 * @property {number} [y_rotation=1]
 * @property {GrWorld} [world]
 */

export class ShellGeometry1 extends GrObject {
  /**
   * @param {Properties} params
   */
  constructor(params = {}) {
    let shell = new T.Group();
    // put the object in its place
    shell.position.x = Number(params.x) || 0;
    shell.position.y = Number(params.y) || 0;
    shell.position.z = Number(params.z) || 0;
    shell.scale.set(
      Number(params.size) || 1,
      Number(params.size) || 1,
      Number(params.size) || 1
    );
    shell.rotateY(Number(params.y_rotation) || 0);
    super(`ShellGeometry1-${++ShellCount}`, shell);
    let r1 = 0.09,
      h = 0.6;
    let cyl_geom1 = new T.CylinderGeometry(r1, r1, h);
    //let shell_tl = new T.TextureLoader().load("./textures/shell1.png");
    let shell_mat = new T.MeshStandardMaterial({
      color: "yellow",
      roughness: 0.75,
      //map: shell_tl,
    });
    let shell_mat2 = new T.MeshStandardMaterial({
      color: "black",
      roughness: 0.75,
      //map: shell_tl,
    });
    let cyl_mesh1 = new T.Mesh(cyl_geom1, shell_mat);
    let r2 = 0.03,
      h2 = 0.3;
    let cyl_geom2 = new T.CylinderGeometry(r2, r1, h2);
    let cyl_mesh2 = new T.Mesh(cyl_geom2, shell_mat2);
    shell.add(cyl_mesh1);
    shell.add(cyl_mesh2);
    cyl_mesh1.rotateZ(Math.PI / 2);
    cyl_mesh2.rotateZ(Math.PI / 2);
    cyl_mesh2.translateY(h - h2 / 2);
    shell.translateY(r1);

    this.shell = shell;
    this.count = 25;
    this.state = 0;
    this.speedY = 0;
    this.gravity = 0.01;
    this.prev_angle = 0;
    this.world = params.world;
    this.blastercount = 1;
    this.hole = null;
  }
  stepWorld(delta, timeOfDay) {
    let speed = delta / 100;
    if (this.state == 0) {
      if (this.count > 20) this.count--;
      else if (this.count < 0) {
        this.state = 1;
      } else {
        this.shell.translateX(-speed);
        this.count--;
      }
    } else if (this.state == 1) {
      this.speedY += this.gravity;
      if (this.shell.position.y - this.speedY <= 0) {
        this.state = 2;
        this.shell.position.y = 0;
        return;
      }
      let angle = Math.atan2(this.speedY, speed);
      /*
      console.log(
        "angle is " +
          this.shell.rotation.x +
          " " +
          this.shell.rotation.y +
          " " +
          this.shell.rotation.z
      );*/
      let velocity = Math.sqrt(speed * speed + this.speedY * this.speedY);
      this.shell.rotateZ(angle - this.prev_angle);
      this.prev_angle = angle;
      this.shell.translateX(-velocity);

      //this.shell.position.y -= this.speedY;
    } else {
      if (this.blastercount > 0) {
        this.shell.clear();
        this.count = 25;
        let r = 1;
        let circle_geom = new T.CircleGeometry(r);
        let circle_mat = new T.MeshStandardMaterial({
          color: "black",
          side: T.DoubleSide,
        });
        let circle_mesh = new T.Mesh(circle_geom, circle_mat);
        circle_mesh.rotateX(Math.PI / 2);
        this.hole = circle_mesh;
        this.shell.add(circle_mesh);
        this.shell.rotation.set(0, 0, 0);
        this.shell.position.y = 0.06;
        this.world?.add(
          new BlasterGeometry1({
            x: this.shell.position.x,
            y: 0,
            z: this.shell.position.z,
            size: 0.1,
          })
        );
        this.blastercount--;
      } /*else {
        if (this.count == 0) this.shell.clear();
        else this.count--;
      }*/
    }
  }
}
