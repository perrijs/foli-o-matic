import { Group } from "three";
import gsap from "gsap";

import { Scene } from "@/webgl/globals/Scene";

import { setVisibility } from "@/webgl/utils/setVisibility";

import { UI_HANDLE_TRANSITION } from "@/webgl/config/topics";
import { ItemData } from "@/webgl/config/types";

export class Item {
  scene: Scene;
  itemData: ItemData;
  model: Group;

  constructor(scene: Scene, itemData: ItemData, model: Group) {
    this.scene = scene;
    this.itemData = itemData;
    this.model = model;

    this.init();
  }

  init() {
    const position = this.itemData.position;

    this.model.position.set(position.x, position.y, position.z);
    this.scene.add(this.model);

    setVisibility(this.model, false);
  }

  move() {
    gsap.fromTo(
      this.model.position,
      {
        z: 1.7,
      },
      {
        duration: 2,
        z: 2,
      }
    );

    this.drop();
  }

  drop() {
    gsap.fromTo(
      this.model.position,
      {
        y: this.model.position.y,
      },
      {
        delay: 1.75,
        duration: 0.5,
        ease: "power4.in",
        y: -2,
        onComplete: () => {
          PubSub.publish(UI_HANDLE_TRANSITION, this.itemData);
        },
      }
    );

    gsap.fromTo(
      this.model.rotation,
      {
        x: this.model.rotation.x,
        y: this.model.rotation.y,
        z: this.model.rotation.z,
      },
      {
        delay: 1.75,
        duration: 0.5,
        ease: "power4.in",
        x: 0.5,
        y: 0.5,
        z: 0.5,
      }
    );
  }
}
