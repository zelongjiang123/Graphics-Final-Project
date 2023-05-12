/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";

let BalloonCount = 0;
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

export class BalloonGeometry1 extends GrObject {
  /**
   * @param {Properties} params
   */
  constructor(params = {}) {
    let system = new T.Group();
    let balloon = new T.Group();
    system.add(balloon);
    // put the object in its place
    balloon.position.x = Number(params.x) || 0;
    balloon.position.y = Number(params.y) || 0;
    balloon.position.z = Number(params.z) || 0;
    balloon.scale.set(
      Number(params.size) || 1,
      Number(params.size) || 1,
      Number(params.size) || 1
    );
    balloon.rotateY(Number(params.y_rotation) || 0);
    super(`BalloonGeometry1-${++BalloonCount}`, system);

    let r1 = 1,
      h = 2;
    let survelliance = new T.Group();
    let capsule_geom1 = new T.CapsuleGeometry(r1, h);
    let renderTarget = new T.WebGLCubeRenderTarget(128, {
      generateMipmaps: true,
      minFilter: T.LinearMipmapLinearFilter,
    });
    let cubecam = new T.CubeCamera(r1 * 1.1, 1000, renderTarget);
    let balloon_mat = new T.MeshStandardMaterial({
      roughness: 0.1,
      metalness: 0.9,
      envMap: cubecam.renderTarget.texture,
      //map: balloon_tl,
    });
    let balloon_mat2 = new T.MeshStandardMaterial({
      color: "yellow",
      roughness: 0.75,
      //map: balloon_tl,
    });
    let x = 1,
      y = 0.3,
      z = 0.5;
    let cyl_geom2 = new T.BoxGeometry(x, y, z);
    let cyl_mesh2 = new T.Mesh(cyl_geom2, balloon_mat2);

    let torusGeom = new T.TorusGeometry(4, 1, 16, 100);
    let torusMaterial = new T.MeshStandardMaterial({ color: "green" });
    let stickGeom = new T.BoxGeometry(5, 1, 1);
    let stickMaterial = new T.MeshStandardMaterial({ color: "yellow" });
    let armGeom = new T.BoxGeometry(5, 1, 1);
    let armMaterial = new T.MeshStandardMaterial({ color: "blue" });
    let bodyGeom = new T.SphereGeometry(1);
    let bodyMesh = new T.Mesh(bodyGeom, balloon_mat);
    bodyMesh.scale.set(0.5, 0.5, 0.5);
    survelliance.add(bodyMesh);
    //bodyMesh.rotateX(Math.PI / 4);
    let armMesh = [];
    let stickMesh = [];
    let stick_index = 0;
    for (let j = 0; j < 4; j++) {
      armMesh[j] = new T.Mesh(armGeom, armMaterial);
      armMesh[j].scale.set(0.2, 0.2, 0.2);
      let torusMesh = new T.Mesh(torusGeom, torusMaterial);
      stickMesh[stick_index] = new T.Mesh(stickGeom, stickMaterial);

      let propellers = new T.Group();
      propellers.add(torusMesh);
      propellers.add(stickMesh[stick_index++]);
      propellers.scale.set(0.3, 0.3, 0.3);
      armMesh[j].add(propellers);
      propellers.translateX(1);
      propellers.rotateX(-Math.PI / 2);
      propellers.translateZ(0.8);
      survelliance.add(armMesh[j]);
      armMesh[j].rotateY((Math.PI / 2) * j);
      armMesh[j].translateX(1);
    }

    //survelliance.add(cyl_mesh1);
    survelliance.add(cubecam);
    balloon.add(survelliance);
    //balloon.add(cyl_mesh2);
    capsule_geom1.rotateZ(Math.PI / 2);
    //cyl_mesh2.translateY(-y / 4 - r1);
    balloon.translateY(r1 + (y * 3) / 4);
    let points = [];
    for (let i = 0; i < 10; i++) {
      points.push(new T.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
    }
    let radarGeom = new T.LatheGeometry(points);
    let radarMaterial = new T.MeshStandardMaterial({
      color: "blue",
      side: T.DoubleSide,
    });
    let radarMesh = new T.Mesh(radarGeom, radarMaterial);
    let base_geom = new T.BoxGeometry(1, 1, 1);
    let base_mat = new T.MeshStandardMaterial({
      color: "grey",
      side: T.DoubleSide,
    });
    let cone_h = 1,
      cone_r = 0.1;
    let cone_geom = new T.ConeGeometry(cone_r, cone_h);
    let cone_mesh = new T.Mesh(cone_geom, radarMaterial);
    let radar = new T.Group();
    radar.add(cone_mesh);
    cone_mesh.translateY(cone_h / 2 - 0.2);
    radar.add(radarMesh);
    let base_mesh = new T.Mesh(base_geom, base_mat);
    let radargroup = new T.Group();
    radargroup.add(base_mesh);
    radargroup.add(radar);
    radarMesh.scale.set(0.02, 0.02, 0.02);
    radar.translateY(1.4);
    base_mesh.translateY(0.5);
    // radarMesh.position.set(5, 0.2, 5);
    radargroup.position.set(-1, 0, 2);
    system.add(radargroup);
    this.balloon = balloon;
    this.count = 15;
    this.world = params.world;
    this.cubecam = cubecam;
    this.radar = radar;
    this.stickMesh = stickMesh;
    this.ridePoint = new T.Object3D();
    armMesh[2].add(this.ridePoint);
    this.rideable = this.ridePoint;
  }

  stepWorld(delta, timeOfDay) {
    let stickMesh = this.stickMesh;
    for (let i = 0; i < stickMesh.length; i++)
      stickMesh[i].rotateZ(delta / 100);
    let speed = delta / 1000;
    let r = 18,
      x = 0,
      z = 0;
    this.balloon.translateZ(-r);
    this.balloon.rotateY(speed);
    this.balloon.translateZ(r);
    // @ts-ignore
    this.cubecam.update(this.world.renderer, this.world.scene);
    this.radar.lookAt(
      this.balloon.position.x,
      this.balloon.position.y,
      this.balloon.position.z
    );
    this.radar.rotateX(Math.PI / 2);
  }
}
