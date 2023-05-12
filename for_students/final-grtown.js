/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */
import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import { StopsignGeometry1 } from "./final-stopsign.js";
import {
  HouseGeometry1,
  HouseGeometry2,
  TowerGeometry1,
} from "./final-buildings.js";
import { BalloonGeometry1 } from "./final-balloon.js";
import {
  TreeGeometry1,
  GrassGeometry1,
  PlantGeometry1,
  FloorGeometry1,
  FloorGeometry2,
  FloorGeometry3,
  ParkingGeometry,
} from "./final-naturalelements.js";
import { CarGeometry1, CarGeometry2 } from "./final-car.js";
import { RoadGeometry1, RoadGeometry2, RoadGeometry3 } from "./final-road.js";
import {
  BasketballCourtGeometry1,
  BasketGeometry1,
} from "./final-basketballcourt.js";
import {
  GrSimpleSwing,
  GrColoredRoundabout,
  GrSimpleRoundabout,
  GrCarousel,
  GrAdvancedSwing,
  GrFerrisWheel,
  GrFlatride,
  GrSeesaw,
  GrDumbo,
} from "./final-parkobjects.js";
import { GoalGeometry1, SoccerGeometry1 } from "./final-soccerfield.js";
import { BlasterGeometry1 } from "./final-blaster.js";
import { PanzerGeometry1 } from "./final-panzer6.js";
import { FenceGeometry1 } from "./final-fences.js";
import { GrBulldozer } from "./final-bulldozer.js";
import { ShellGeometry1 } from "./final-shell.js";

import { main } from "../examples/main.js";

/**m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */

// make the world
let world = new GrWorld({
  width: 800,
  height: 600,
  groundplanesize: 20, // make the ground plane big enough for a world of stuff
});

function shift(grobj, x, y, z) {
  grobj.objects.forEach((element) => {
    element.translateX(x);
    element.translateY(y);
    element.translateZ(z);
  });
  return grobj;
}

function rotateY(obj, angle) {
  obj.objects.forEach((obj) => obj.rotateY(angle));
  return obj;
}

// put stuff into the world
// this calls the example code (that puts a lot of objects into the world)
// you can look at it for reference, but do not use it in your assignment
//main(world);
/*
create many houses
*/
let houses1 = [],
  houses2 = [],
  houses3 = [];
let house_size = 0.7;
for (let i = 0; i < 4; i++) {
  houses1[i] = new HouseGeometry1({ size: house_size });
  houses2[i] = new HouseGeometry2({ size: house_size });
  world.add(houses1[i]);
  world.add(houses2[i]);
}
shift(houses1[0], -7, 0, -5.5);
shift(houses1[1], -17, 0, -5.5);
shift(houses1[2], -7, 0, -15.5);
shift(houses1[3], -17, 0, -15.5);
shift(houses2[0], -12.5, 0, -5.5);
shift(houses2[1], -7.5, 0, -10.5);
shift(houses2[2], -17.5, 0, -10.5);
shift(houses2[3], -12.5, 0, -15.5);
world.add(new TowerGeometry1({ x: -11.5, z: -11, size: 1 }));

// add trees
let trees = [];
for (let i = 0; i < 36; i++) {
  trees[i] = new TreeGeometry1({ size: 0.5 });
  world.add(trees[i]);
}
for (let j = 0; j < 3; j++) {
  for (let i = 0; i < 2; i++) {
    shift(trees[0 + i * 6 + j * 12], -5, 0, -4.5 - (i + j) * 3.5 - j * 1.5);
    shift(trees[1 + i * 6 + j * 12], -8, 0, -4.5 - (i + j) * 3.5 - j * 1.5);
    shift(trees[2 + i * 6 + j * 12], -10, 0, -4.5 - (i + j) * 3.5 - j * 1.5);
    shift(trees[3 + i * 6 + j * 12], -13, 0, -4.5 - (i + j) * 3.5 - j * 1.5);
    shift(trees[4 + i * 6 + j * 12], -15, 0, -4.5 - (i + j) * 3.5 - j * 1.5);
    shift(trees[5 + i * 6 + j * 12], -18, 0, -4.5 - (i + j) * 3.5 - j * 1.5);
  }
}

// add grass in the neighborhood
let grass = [];
for (let i = 0; i < 1; i++) {
  grass[i] = new GrassGeometry1({ x: -20, z: -4, size: 16 });
  world.add(grass[i]);
}
//for(let i=1; i<9; i++)
//shift(grass[i], );
let plant = new PlantGeometry1({ x: -7, z: -5, world: world });
plant.lookFromLookAt = function () {
  return [-6, 2, -4, -7, 0, -5];
};
world.add(plant);

// add road in the neighborhood
let roads1 = [],
  roads2 = [],
  roads3 = [];
for (let i = 0; i < 3; i++) {
  roads1[i] = new RoadGeometry1({ x: -12, z: -4, x_size: 15, z_size: 0.2 });
  shift(roads1[i], 0, 0, i * -5);
  world.add(roads1[i]);
}
for (let i = 4; i < 6; i++) {
  roads1[i] = new RoadGeometry1({ z: -9, x_size: 0.2, z_size: 10 });
  shift(roads1[i], -9 + (i - 4) * -5, 0, 0);
  world.add(roads1[i]);
}
roads1[6] = new RoadGeometry1({ x_size: 0.2, z_size: 16 });
shift(roads1[6], -4.5, 0, -11.9);
world.add(roads1[6]);
roads2[0] = new RoadGeometry2({ x: -20, z: -2.9, x_size: 40 });
world.add(roads2[0]);
roads3[0] = new RoadGeometry3({ z: -19, x: -4.4, y: 0.01, z_size: 40 });
world.add(roads3[0]);

// add stop signs
let stopsign1 = new StopsignGeometry1({ x: -3, z: -4.2, size: 0.6 });
let stopsign2 = new StopsignGeometry1({ x: -5, z: -2.8, size: 0.6 });
rotateY(stopsign1, Math.PI / 2);
world.add(stopsign1);
world.add(stopsign2);

//add basketball courts
world.add(new BasketballCourtGeometry1({ x: -1, z: -6, x_size: 3, z_size: 3 }));
world.add(
  new BasketballCourtGeometry1({ x: -1, z: -10.5, x_size: 3, z_size: 3 })
);
world.add(
  new BasketballCourtGeometry1({ x: -1, z: -15, x_size: 3, z_size: 3 })
);
let baskets = [];
for (let i = 0; i < 6; i++) {
  baskets[i] = new BasketGeometry1({
    x_size: 0.1,
    y_size: 0.1,
    z_size: 0.1,
  });
  world.add(baskets[i]);
  if (i % 2 == 1) rotateY(baskets[i], Math.PI);
}
shift(baskets[0], -1, 0, -8.3);
shift(baskets[1], -7.6, 0, 8.3);
shift(baskets[2], -1, 0, -12.8);
shift(baskets[3], -7.6, 0, 12.8);
shift(baskets[4], -1, 0, -17.3);
shift(baskets[5], -7.6, 0, 17.3);

//add soccer fields
let soccer_pitch = new SoccerGeometry1({ x: 18, z: -5, x_size: 5, z_size: 5 });
rotateY(soccer_pitch, Math.PI / 2);
world.add(soccer_pitch);
let goals = [];
for (let i = 0; i < 2; i++) {
  goals[i] = new GoalGeometry1({
    x_size: 0.08,
    y_size: 0.08,
    z_size: 0.08,
  });
  world.add(goals[i]);
}
rotateY(goals[0], Math.PI / 2);
rotateY(goals[1], -Math.PI / 2);
shift(goals[0], 18.9, 0, 15.2);
shift(goals[1], -5.5, 0, -13.25);

// add floor bricks
world.add(new FloorGeometry1({ x: -4, z: -3.9, x_size: 24, z_size: 16 }));
world.add(new FloorGeometry2({ x: -20, z: 20, x_size: 16, z_size: 23 }));
world.add(new FloorGeometry3({ x: -4, z: 20, x_size: 24, z_size: 23 }));
world.add(new ParkingGeometry({ x: -20.1, z: 20.1, x_size: 10, z_size: 6 }));

// add a panzer
let shells = [];
world.add(
  new PanzerGeometry1({
    x: 6,
    z: 10,
    y: 0.1,
    shells: shells,
    world: world,
    size: 0.5,
    rideable: true,
  })
);
let panzer = [];
for (let i = 0; i < 2; i++) {
  panzer[i] = new PanzerGeometry1({
    x: 15 + 3 * i,
    z: 1,
    y: 0.1,
    shells: shells,
    world: world,
    size: 0.5,
    rideable: false,
  });
  panzer[i].stepWorld = function () {};
  world.add(panzer[i]);
  rotateY(panzer[i], Math.PI / 2);
}
for (let i = 2; i < 4; i++) {
  panzer[i] = new PanzerGeometry1({
    x: 1,
    z: 15 + 3 * (i - 2),
    y: 0.1,
    shells: shells,
    world: world,
    size: 0.5,
    rideable: false,
  });
  panzer[i].stepWorld = function () {};
  world.add(panzer[i]);
  rotateY(panzer[i], Math.PI);
}
// add a bulldozer
let bulldozer = new GrBulldozer({ x: -15, z: 14.8, size: 0.3 });
world.add(bulldozer);
rotateY(bulldozer, Math.PI / 2);

// add some fences
world.add(
  new FenceGeometry1({
    x: 9.7,
    z: -2.5,
    x_size: 10.2,
    y_size: 1.2,
    z_size: 0.5,
  })
);
let fence2 = new FenceGeometry1({
  x_size: 10,
  y_size: 1.2,
  z_size: 0.5,
});
rotateY(fence2, -Math.PI / 2);
shift(fence2, 10, 0, 3);
world.add(fence2);

// add a survelliance balloon
let ballon = new BalloonGeometry1({ world: world, y: 5, z: 20 });
world.add(ballon);

// add an amusement park
let park_size = 0.6,
  park_size2 = 0.3;
let roundabout_2 = new GrColoredRoundabout({ x: -12, size: park_size2 });
world.add(roundabout_2);
let swing_1 = new GrAdvancedSwing({ x: -9, size: park_size2 });
world.add(swing_1);
let carousel_1 = new GrCarousel({ x: -15, z: 10, size: park_size });
world.add(carousel_1);
let ferrisWheel_1 = new GrFerrisWheel({ x: -8, z: 10, size: park_size });
world.add(ferrisWheel_1);
let flatride_1 = new GrFlatride({ x: -15, z: 5, size: park_size });
world.add(flatride_1);
let dumbo_1 = new GrDumbo({ x: -8, z: 5, size: park_size });
world.add(dumbo_1);
let seesaw_1 = new GrSeesaw({ x: -15, size: park_size2 });
world.add(seesaw_1);

// add some cars
let car1 = new CarGeometry1({ size: 0.2, y: 0.01 }),
  car2 = new CarGeometry2({ x: 10, z: -3.4, size: 0.2, y: 0.01 });

rotateY(car1, -Math.PI / 2);
shift(car1, 20, 0, 3.9);
world.add(car1);
world.add(car2);

world.scene.background = new T.CubeTextureLoader()
  .setPath("./textures/cubeMaps/")
  .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

// while making your objects, be sure to identify some of them as "highlighted"

///////////////////////////////////////////////////////////////
// because I did not store the objects I want to highlight in variables, I need to look them up by name
// This code is included since it might be useful if you want to highlight your objects here
function highlight(obName) {
  const toHighlight = world.objects.find((ob) => ob.name === obName);
  if (toHighlight) {
    toHighlight.highlighted = true;
  } else {
    throw `no object named ${obName} for highlighting!`;
  }
}

/*
// of course, the student should highlight their own objects, not these
highlight("SimpleHouse-5");
highlight("Helicopter-0");
highlight("Track Car");
highlight("MorphTest");*/
highlight("BasketGeometry1-1");
highlight("PanzerGeometry1-1");
highlight("HouseGeometry1-1");
highlight("CarGeometry2-1");
highlight("TreeGeometry1-1");

highlight("GoalGeometry1-1");
highlight("GrFerrisWheel-1");
highlight("TowerGeometry1-1");
highlight("SoccerGeometry1-1");
highlight("StopsignGeometry1-1");
highlight("PlantGeometry1-1");
highlight("GrBulldozer-1");
highlight("BalloonGeometry1-1");
highlight("Carousel-0");
highlight("GrDumbo-0");
///////////////////////////////////////////////////////////////
// build and run the UI
// only after all the objects exist can we build the UI
// @ts-ignore       // we're sticking a new thing into the world
world.ui = new WorldUI(world);
// now make it go!
world.go();
