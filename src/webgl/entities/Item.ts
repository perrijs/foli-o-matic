import { Group } from "three";
import gsap from "gsap";

import { AudioEffects } from "@/contexts/audioContext";

import { Scene } from "@/webgl/globals/Scene";

import { AUDIO_PLAY_EFFECT, GL_ACTIVATE_FOCUS } from "@/webgl/config/topics";
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
        onStart: () => {
          PubSub.publish(GL_ACTIVATE_FOCUS);
        },
        onUpdate: () => {
          if (timeline.progress() > 0.8 && !playedEffect) {
            playedEffect = true;

            PubSub.publish(AUDIO_PLAY_EFFECT, AudioEffects.THUD);
          }
        },
        onComplete: () => {
          this.focus();
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

  focus() {
    gsap.to(this.model.rotation, {
      duration: 3,
      ease: "power4.inOut",
      x: 0,
      y: 0,
      z: 0,
    });

    gsap.to(this.model.position, {
      x: 0,
      y: 0,
      z: 9,
      duration: 3,
      ease: "power4.inOut",
    });
  }
}
