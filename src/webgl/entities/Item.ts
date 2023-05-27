import { Group } from "three";
import gsap from "gsap";

import { Scene } from "@/webgl/globals/Scene";

import { AUDIO_PLAY_EFFECT } from "@/webgl/config/topics";
import { ItemData } from "@/webgl/config/types";
import { AudioEffects } from "@/contexts/audioContext";

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
        onComplete: () => {
          this.drop();
        },
      }
    );
  }

  drop() {
    let playedEffect = false;

    const timeline = gsap.timeline();
    timeline.fromTo(
      this.model.position,
      {
        y: this.model.position.y,
      },
      {
        duration: 0.5,
        ease: "power4.in",
        y: -2,
        onUpdate: () => {
          if (timeline.progress() > 0.8 && !playedEffect) {
            playedEffect = true;

            PubSub.publish(AUDIO_PLAY_EFFECT, AudioEffects.THUD);
          }
        },
        onComplete: () => {
          //TODO(pschofield): Add trigger for new item overlay here.
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
        duration: 0.5,
        ease: "power4.in",
        x: 0.5,
        y: 0.5,
        z: 0.5,
      }
    );
  }
}
