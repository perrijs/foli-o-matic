import { Group } from "three";
import gsap from "gsap";

import { AssetController } from "@/webgl/controllers/AssetController";

import { Scene } from "@/webgl/globals/Scene";

export class Coin {
  assetController = AssetController.getInstance();

  scene: Scene;

  mesh?: Group;
  rotating?: boolean;

  constructor(scene: Scene) {
    this.scene = scene;

    this.rotating = false;

    this.init();
  }

  init() {
    if (!this.assetController.models) return;

    this.mesh = this.assetController.models[3].clone();
    this.mesh.position.set(0, -4, 50);
    this.mesh.rotation.x = Math.PI / 2;
    this.mesh.scale.setScalar(1);

    this.scene.add(this.mesh);
  }

  flip() {
    if (!this.mesh) return;

    const lerpUp = gsap.to(this.mesh.position, {
      delay: 1,
      duration: 1.5,
      z: 47,
      y: 0,
      ease: "back.out(3)",
      onComplete: () => {
        document.body.style.overflowY = "scroll";
      },
    });

    const timeline = gsap.timeline();
    timeline.to(this.mesh.rotation, {
      delay: 1,
      duration: 1,
      z: -Math.PI / 2,
      y: -Math.PI * 5,
      onUpdate: () => {
        if (timeline.progress() > 0.9) this.rotating = true;
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

    this.mesh.rotation.x -= 0.1;
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
