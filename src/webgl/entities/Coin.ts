import { Group } from "three";
import gsap from "gsap";

import { AssetController } from "@/webgl/controllers/AssetController";

import { Scene } from "@/webgl/globals/Scene";

export class Coin {
  assetController = AssetController.getInstance();

  scene: Scene;

  mesh?: Group;

  constructor(scene: Scene) {
    this.scene = scene;

    this.init();
  }

  init() {
    if (!this.assetController.models) return;

    this.mesh = this.assetController.models[3].clone();
    this.mesh.position.set(0, -1, 49);
    this.mesh.rotation.x = Math.PI / 2;

    this.scene.add(this.mesh);
  }

  flip() {
    if (!this.mesh) return;

    const lerpUp = gsap.to(this.mesh.position, {
      delay: 1,
      duration: 1,
      z: 49,
      y: 0,
      ease: "power4.out",
      onComplete: () => this.hover(),
    });

    const rotate = gsap.to(this.mesh.rotation, {
      delay: 1,
      duration: 0.9,
      z: Math.PI / 2,
      y: Math.PI * 5,
    });
  }

  hover() {
    if (!this.mesh) return;

    gsap.to(this.mesh.position, {
      duration: 2,
      y: -0.05,
      repeat: -1,
      yoyo: true,
      ease: "power.1.inOut",
    });
  }

  inertia() {
    if (!this.mesh) return;

    this.mesh.rotation.x -= 0.1;
  }
}
