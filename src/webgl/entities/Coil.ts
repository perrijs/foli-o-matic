import { Group } from "three";
import gsap from "gsap";

import { Scene } from "@/webgl/globals/Scene";

import { CoilData } from "@/webgl/config/types";

export class Coil {
  scene = Scene.getInstance();

  coilData: CoilData;
  model: Group;

  constructor(coilData: CoilData, model: Group) {
    this.coilData = coilData;
    this.model = model;

    this.init();
  }

  init() {
    const position = this.coilData.position;

    this.model.position.set(position.x, position.y, position.z);
    this.scene.add(this.model);
  }

  rotate() {
    gsap.fromTo(
      this.model.rotation,
      {
        z: 0,
      },
      {
        duration: 3,
        z: Math.PI * 2,
      }
    );
  }
}
