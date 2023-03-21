import { Group } from "three";
import gsap from "gsap";

import { Scene } from "@/webgl/globals/Scene";

import { setVisibility } from "@/webgl/utils/setVisibility";

import { CoilData } from "@/webgl/config/types";

export class Coil {
  scene: Scene;
  coilData: CoilData;
  model: Group;

  constructor(scene: Scene, coilData: CoilData, model: Group) {
    this.scene = scene;
    this.coilData = coilData;
    this.model = model;

    this.init();
  }

  init() {
    const position = this.coilData.position;

    this.model.position.set(position.x, position.y, position.z);
    this.scene.add(this.model);

    setVisibility(this.model, false);
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
