import { Group } from "three";
import gsap from "gsap";

import { Scene } from "@/webgl/globals/Scene";

import { AUDIO_PLAY_EFFECT } from "@/webgl/config/topics";
import { CoilData } from "@/webgl/config/types";
import { AudioEffects } from "@/contexts/audioContext";

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
        onStart: () => {
          PubSub.publish(AUDIO_PLAY_EFFECT, AudioEffects.WHIRR);
        },
      }
    );
  }
}
