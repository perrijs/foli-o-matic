import { Group } from "three";
import gsap from "gsap";

import { AudioEffects } from "@/contexts/audioContext";

import { Scene } from "@/webgl/globals/Scene";

import { AUDIO_PLAY_EFFECT } from "@/webgl/config/topics";
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
        onStart: () => {
          PubSub.publish(AUDIO_PLAY_EFFECT, AudioEffects.WHIRR);
        },
      }
    );
  }
}
