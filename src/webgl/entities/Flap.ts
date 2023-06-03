import { Mesh, BoxGeometry, MeshPhongMaterial } from "three";
import PubSub from "pubsub-js";
import gsap from "gsap";

import { Scene } from "@/webgl/globals/Scene";

import { AssetController } from "@/webgl/controllers/AssetController";

import { GL_ACTIVATE_LIGHTS, GL_SELECT_ITEM } from "@/webgl/config/topics";

export class Flap {
  assetController = AssetController.getInstance();
  scene = Scene.getInstance();

  mesh?: Mesh;

  constructor() {
    this.handleSubscriptions();
    this.init();
  }

  handleSubscriptions() {
    PubSub.subscribe(GL_SELECT_ITEM, () => this.rotate());
    PubSub.subscribe(GL_ACTIVATE_LIGHTS, () => this.switchMaterial());
  }

  init() {
    const geometry = new BoxGeometry(2.7, 0.75, 0.1);
    const material = new MeshPhongMaterial({ color: "#33312e" });
    const flap = new Mesh(geometry, material);

    flap.position.set(-0.65, -2, 2.75);

    this.mesh = flap;
    this.scene.add(this.mesh);
  }

  rotate() {
    if (!this.mesh) return;

    gsap.to(this.mesh.rotation, {
      delay: 2.5,
      duration: 0.5,
      x: 1.5,
    });

    gsap.to(this.mesh.position, {
      delay: 2.5,
      duration: 0.5,
      y: -1.665,
      z: 2.25,
    });
  }

  switchMaterial() {
    if (!this.assetController.matcaps) return;

    this.assetController.matcaps.forEach((item) => {
      if (!this.mesh) return;

      if (item.name === "matcap_cosmic_americano")
        this.mesh.material = item.matcap;
    });
  }
}
