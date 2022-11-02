import { Mesh, BoxGeometry, MeshBasicMaterial } from "three";
import PubSub from "pubsub-js";
import gsap from "gsap";

import { Scene } from "@/webgl/globals/Scene";

import { GL_SELECT_ITEM } from "@/webgl/config/topics";

export class Flap {
  scene = Scene.getInstance();

  mesh?: Mesh;

  constructor() {
    this.init();
  }

  init() {
    const flapGeometry = new BoxGeometry(3, 0.75, 0.1);
    const flapMaterial = new MeshBasicMaterial({ color: 0x000000 });
    const flap = new Mesh(flapGeometry, flapMaterial);

    flap.position.set(-0.75, -2, 2.75);

    this.mesh = flap;
    this.scene.add(this.mesh);

    this.handleSubscriptions();
  }

  handleSubscriptions() {
    PubSub.subscribe(GL_SELECT_ITEM, this.rotate.bind(this));
  }

  rotate() {
    if (!this.mesh) return;

    gsap.fromTo(
      this.mesh.rotation,
      {
        x: 0,
      },
      {
        delay: 1.25,
        duration: 0.1,
        repeat: 1,
        yoyo: true,
        x: -0.5,
      }
    );
  }
}
