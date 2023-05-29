import { Mesh, BoxGeometry, MeshPhongMaterial } from "three";
import PubSub from "pubsub-js";
import gsap from "gsap";

import { Scene } from "@/webgl/globals/Scene";

import { AssetController } from "@/webgl/controllers/AssetController";

import { GL_ACTIVATE_LIGHTS, GL_SELECT_ITEM } from "@/webgl/config/topics";

export class Flap {
  assetController = AssetController.getInstance();

  scene: Scene;
  mesh?: Mesh;

  constructor(scene: Scene) {
    this.scene = scene;

    this.handleSubscriptions();
    this.init();
  }

  handleSubscriptions() {
    PubSub.subscribe(GL_SELECT_ITEM, this.rotate.bind(this));
    PubSub.subscribe(GL_ACTIVATE_LIGHTS, () => this.switchMaterial());
  }

  init() {
    const geometry = new BoxGeometry(3, 0.75, 0.1);
    const material = new MeshPhongMaterial({ color: "#33312e" });
    const flap = new Mesh(geometry, material);

    flap.position.set(-0.75, -2, 2.75);

    this.mesh = flap;
    this.scene.add(this.mesh);
  }

  rotate() {
    if (!this.mesh) return;

    gsap.fromTo(
      this.mesh.rotation,
      {
        x: 0,
      },
      {
        delay: 2.5,
        duration: 0.1,
        repeat: 1,
        yoyo: true,
        x: -0.5,
      }
    );
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
