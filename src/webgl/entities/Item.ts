import { Group } from "three";
import gsap from "gsap";

import { Scene } from "@/webgl/globals/Scene";

import { ItemData } from "@/webgl/config/types";

export class Item {
  scene = Scene.getInstance();

  itemData: ItemData;
  model: Group;

  constructor(itemData: ItemData, model: Group) {
    this.itemData = itemData;
    this.model = model;

    this.init();
  }

  init() {
    const position = this.itemData.position;

    this.model.position.set(position.x, position.y, position.z);
    this.scene.add(this.model);
  }

  move() {
    gsap.fromTo(
      this.model.position,
      {
        z: 0.8,
      },
      {
        duration: 1,
        z: 1.3,
      }
    );

    this.drop();
  }

  drop() {
    gsap.fromTo(
      this.model.position,
      {
        y: 0.125,
      },
      {
        delay: 0.75,
        duration: 0.25,
        ease: "power4.in",
        y: -1,
      }
    );
  }
}
