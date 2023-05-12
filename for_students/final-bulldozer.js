/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

function degreesToRadians(deg) {
  return (deg * Math.PI) / 180;
}

let bulldozerObCtr = 0;

// A simple excavator
/**
 * @typedef BulldozerProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrBulldozer extends GrObject {
  /**
   * @param {BulldozerProperties} params
   */
  constructor(params = {}) {
    let bulldozer = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2,
    };
    let exSettings2 = {
      steps: 2,
      depth: 2,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2,
    };

    // As with the crane, we define the base (treads) of the excavator.
    // We draw a line, then extrude the line with ExtrudeGeometry,
    // to get the "cutout" style object.
    // Note, for this object, we translate each piece by 0.25 on the negative x-axis.
    // This makes rotation about the y-axis work nicely
    // (since the extrusion happens along +z, a y-rotation goes around an axis on the back face of the piece,
    //  rather than an axis through the center of the piece).
    /**@type THREE.Shape */
    let base_curve = new T.Shape();
    base_curve.moveTo(-1, 0);
    base_curve.lineTo(-1.2, 0.2);
    base_curve.lineTo(-1.2, 0.4);
    base_curve.lineTo(-1, 0.6);
    base_curve.lineTo(1, 0.6);
    base_curve.lineTo(1.2, 0.4);
    base_curve.lineTo(1.2, 0.2);
    base_curve.lineTo(1, 0);
    base_curve.lineTo(-1, 0);
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let shaderMat1 = shaderMaterial("./shaders/final.vs", "./shaders/final.fs");
    /*
    let excavator_mat = new T.MeshStandardMaterial({
      color: "brown",
      metalness: 0.5,
      roughness: 0.7,
    });*/
    let base = new T.Mesh(base_geom, shaderMat1);
    bulldozer.add(base);
    base.translateZ(-0.2);

    // We'll add the "pedestal" piece for the cab of the excavator to sit on.
    // It can be considered a part of the treads, to some extent,
    // so it doesn't need a group of its own.
    let pedestal_curve = new T.Shape();
    pedestal_curve.moveTo(-0.35, 0);
    pedestal_curve.lineTo(-0.35, 0.25);
    pedestal_curve.lineTo(0.35, 0.25);
    pedestal_curve.lineTo(0.35, 0);
    pedestal_curve.lineTo(-0.35, 0);
    let pedestal_geom = new T.ExtrudeGeometry(pedestal_curve, exSettings);
    let pedestal = new T.Mesh(pedestal_geom, shaderMat1);
    bulldozer.add(pedestal);
    pedestal.translateY(0.6);
    pedestal.translateZ(-0.2);

    // For the cab, we create a new group, since the cab should be able to spin on the pedestal.
    let cab_group = new T.Group();
    bulldozer.add(cab_group);
    cab_group.translateY(0.7);
    let cab_curve = new T.Shape();
    cab_curve.moveTo(-1, 0);
    cab_curve.lineTo(1, 0);
    cab_curve.lineTo(1.2, 0.35);
    cab_curve.lineTo(1, 0.75);
    cab_curve.lineTo(0.25, 0.75);
    cab_curve.lineTo(0, 1.5);
    cab_curve.lineTo(-0.8, 1.5);
    cab_curve.lineTo(-1, 1.2);
    cab_curve.lineTo(-1, 0);
    let cab_geom = new T.ExtrudeGeometry(cab_curve, exSettings);
    let cab = new T.Mesh(cab_geom, shaderMat1);
    cab_group.add(cab);
    cab.translateZ(-0.2);

    // Next up is the first part of the bucket arm.
    // In general, each piece is just a series of line segments,
    // plus a bit of extra to get the geometry built and put into a group.
    // We always treat the group as the "pivot point" around which the object should rotate.
    // It is helpful to draw the lines for extrusion with the zero at our desired "pivot point."
    // This minimizes the fiddling needed to get the piece placed correctly relative to its parent's origin.
    // The remaining few pieces are very similar to the arm piece.
    let arm_group = new T.Group();
    cab_group.add(arm_group);
    arm_group.position.set(-1.08, 0, 0);

    let shovel_curve = new T.Shape();
    shovel_curve.moveTo(0.1, 0.5);
    shovel_curve.lineTo(-0.2, 0.5);
    shovel_curve.bezierCurveTo(-0.1, 0.25, -0.3, -0.25, -0.7, -0.5);
    shovel_curve.lineTo(-0.4, -0.5);
    shovel_curve.closePath();
    let shovel_geom = new T.ExtrudeGeometry(shovel_curve, exSettings2);
    let shovel_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3,
    });
    let shovel = new T.Mesh(shovel_geom, shovel_mat);
    shovel.scale.set(0.8, 0.8, 0.8);
    let shovel_group = new T.Group();
    shovel_group.position.set(-0.9, 0, 0);
    shovel_group.add(shovel);
    arm_group.add(shovel_group);
    shovel.translateZ(-0.8);
    let arm_geom = new T.BoxGeometry(1, 0.1, 0.1);
    let arm_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3,
    });
    //shovel.translateX(-0.5);
    let arms = [];
    for (let i = 0; i < 2; i++) {
      arms[i] = new T.Mesh(arm_geom, arm_mat);
      arm_group.add(arms[i]);
      arms[i].translateX(-0.5);
    }
    arms[0].translateZ(-0.3);
    arms[1].translateZ(0.3);
    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // The parameters for sliders are also defined here.
    super(`GrBulldozer-${++bulldozerObCtr}`, bulldozer, [
      ["x", -10, 10, 0],
      ["z", -10, 10, 0],
      ["theta", 0, 360, 0],
      ["spin", 0, 360, 0],
      ["arm", 0, 30, 0],
      ["armlength", 0, 0.3, 0.3],
      ["shovel", 0, 30, 0],
    ]);
    // As with the crane, we save the "excavator" group as the "whole object" of the GrExcavator class.
    // We also save the groups of each object that may be manipulated by the UI.
    this.whole_ob = bulldozer;
    this.cab = cab_group;
    this.arm = arm_group;
    this.shovel = shovel_group;
    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    bulldozer.scale.set(scale, scale, scale);
  }

  /*
  // As with the crane, we wire up each saved group with the appropriate parameter defined in the "super" call.
  // Note, with the forearm, there is an extra bit of rotation added, which allows us to create a rotation offset,
  // while maintaining a nice 0-90 range for the slider itself.
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.cab.rotation.y = degreesToRadians(paramValues[3]);
    paramValues[5] -= 0.3;
    this.arm.translateX(paramValues[5]);
    this.arm.rotation.z = degreesToRadians(-paramValues[4]);
    this.arm.translateX(-paramValues[5]);
    this.arm.position.x = -paramValues[5] - 1.08;

    //this.shovel.translateY(-0.5);
    this.shovel.rotation.z = degreesToRadians(-paramValues[6]);
    //this.shovel.translateY(0.5);
  }*/
}
