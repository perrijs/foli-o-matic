import { Mesh, BoxGeometry, MeshMatcapMaterial } from "three";
import PubSub from "pubsub-js";
import gsap from "gsap";

import { Scene } from "@/webgl/globals/Scene";

import { AssetController } from "@/webgl/controllers/AssetController";

import { GL_SELECT_ITEM } from "@/webgl/config/topics";

export class Flap {
  scene = Scene.getInstance();

  assetController = AssetController.getInstance();

  matcap?: MeshMatcapMaterial;
  mesh?: Mesh;

  constructor() {
    this.init();
  }

  init() {
    if (this.assetController.matcaps) {
      this.assetController.matcaps.forEach((item) => {
        if (item.name === "matcap_cosmic_americano") this.matcap = item.matcap;
      });
    }

    const geometry = new BoxGeometry(3, 0.75, 0.1);
    const flap = new Mesh(geometry, this.matcap);

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
        delay: 3.25,
        duration: 0.1,
        repeat: 1,
        yoyo: true,
        x: -0.5,
      }
    );
  }
}
