import { Group } from "three";
import gsap from "gsap";

import { Scene } from "@/webgl/globals/Scene";

import { AssetController } from "@/webgl/controllers/AssetController";

import {
  AUDIO_PLAY_EFFECT,
  AUDIO_PLAY_TRACK,
  GL_ACTIVATE_LIGHTS,
} from "@/webgl/config/topics";

export class Coin {
  assetController = AssetController.getInstance();

  scene: Scene;

  mesh?: Group;
  rotating?: boolean;

  constructor(scene: Scene) {
    this.scene = scene;

    this.rotating = true;

    this.init();
  }

  init() {
    if (!this.assetController.coin) return;

    this.mesh = this.assetController.coin.scene;
    this.mesh.position.set(0, -20, 47);
    this.mesh.rotation.x = Math.PI / 2;
    this.mesh.scale.setScalar(1);

    this.scene.add(this.mesh);
  }

  flip() {
    if (!this.mesh) return;

    let hasSetRotate = false;
    let playedEffect = false;

    const timeline = gsap.timeline();
    timeline.to(this.mesh.position, {
      delay: 1,
      duration: 2,
      y: -1.5,
      ease: "back.out(2.5)",
      onUpdate: () => {
        if (timeline.progress() > 0.5 && !playedEffect) {
          playedEffect = true;

          PubSub.publish(AUDIO_PLAY_EFFECT, "/audio/coin_flip.mp3");
        }

        if (timeline.progress() > 0.75 && !hasSetRotate) {
          if (!this.mesh) return;

          hasSetRotate = true;

          gsap.to(this.mesh.rotation, {
            duration: 1,
            z: -Math.PI / 2,
          });
        }
      },
      onComplete: () => {
        document.body.style.overflowY = "scroll";
      },
    });
  }

  hover() {
    if (!this.mesh) return;

    gsap.to(this.mesh.position, {
      duration: 2,
      y: -0.05,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }

  inertia(delta: number) {
    if (!this.mesh) return;

    this.mesh.rotation.x += -15 * delta;
  }

  insert() {
    if (!this.mesh) return;

    let playedEffect = false;

    const timeline = gsap.timeline();
    timeline.to(this.mesh.position, {
      duration: 1,
      z: this.mesh.position.z + 0.5,
      ease: "power4.inOut",
      onComplete: () => {
        if (!this.mesh) return;

        timeline.to(this.mesh.position, {
          duration: 1,
          z: this.mesh.position.z - 2,
          ease: "power4.inOut",
          onUpdate: () => {
            if (timeline.progress() > 0.8 && !playedEffect) {
              playedEffect = true;

              PubSub.publish(AUDIO_PLAY_EFFECT, "/audio/coin_slot.mp3");
            }
          },
          onComplete: () => {
            setTimeout(() => {
              PubSub.publish(GL_ACTIVATE_LIGHTS);

              // PubSub.publish(AUDIO_PLAY_TRACK, "/audio/elevator_music.mp3");
            }, 1000);
          },
        });
      },
    });
  }
}
