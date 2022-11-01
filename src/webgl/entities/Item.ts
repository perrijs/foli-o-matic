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
        z: 1.8,
      },
      {
        duration: 1,
        z: 2.3,
      }
    );

    this.drop();
  }

  drop() {
    gsap.fromTo(
      this.model.position,
      {
        y: 2.125,
      },
      {
        delay: 0.75,
        duration: 0.5,
        ease: "power4.in",
        y: -2,
      }
    );
  }
}
