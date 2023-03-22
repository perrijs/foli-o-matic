import { Group } from "three";
import gsap from "gsap";

import { AssetController } from "@/webgl/controllers/AssetController";

import { Scene } from "@/webgl/globals/Scene";

import { GL_SHOW_CAB } from "@/webgl/config/topics";

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

    let cabVisible = false;

    const timeline = gsap.timeline();
    timeline.to(this.mesh.position, {
      delay: 1,
      duration: 2.5,
      y: -1.5,
      ease: "back.out(2.5)",
      onUpdate: () => {
        if (timeline.progress() > 0.525) {
          if (!this.mesh || cabVisible) return;

          cabVisible = true;
          PubSub.publish(GL_SHOW_CAB);

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

  inertia() {
    if (!this.mesh) return;

    this.mesh.rotation.x -= 0.3;
  }

  insert() {
    if (!this.mesh) return;

    gsap.to(this.mesh.position, {
      duration: 1,
      z: this.mesh.position.z + 0.5,
      ease: "power4.inOut",
      onComplete: () => {
        if (!this.mesh) return;

        gsap.to(this.mesh.position, {
          duration: 1,
          z: this.mesh.position.z - 2,
          ease: "power4.inOut",
        });
      },
    });
  }
}
