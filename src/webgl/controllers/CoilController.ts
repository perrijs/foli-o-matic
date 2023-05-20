import { Group, Material, Mesh, MeshMatcapMaterial } from "three";
import PubSub from "pubsub-js";

import { Scene } from "@/webgl/globals/Scene";

import { AssetController } from "./AssetController";

import { Coil } from "@/webgl/entities/Coil";

import { COILS } from "@/webgl/config/coils";
import { GL_SELECT_ITEM } from "@/webgl/config/topics";

export class CoilController {
  assetController = AssetController.getInstance();

  scene: Scene;
  model?: Group;
  matcap?: MeshMatcapMaterial;
  coils?: Coil[] = [];

  constructor(scene: Scene) {
    this.scene = scene;

    this.handleSubscriptions();
    this.init();
  }

  handleSubscriptions() {
    PubSub.subscribe(GL_SELECT_ITEM, this.handleRotate.bind(this));
  }

  init() {
    if (this.assetController.matcaps) {
      this.assetController.matcaps.forEach((item) => {
        if (item.name === "matcap_silver") this.matcap = item.matcap;
      });
    }

    if (this.assetController.coil && this.matcap) {
      this.model = this.assetController.coil.scene;
      this.model.scale.set(0.05, 0.05, 0.085);

      const mesh = this.model.children[0] as Mesh;
      if (this.matcap) mesh.material = this.matcap;
    }

    COILS.forEach((coilData) => {
      if (!this.model || !this.coils) return;

      const coil = new Coil(this.scene, coilData, this.model.clone());
      this.coils.push(coil);
    });
  }

  handleRotate(_topic: string, data: string) {
    if (!this.coils) return;

    this.coils.forEach((coil) => {
      if (coil.coilData.id === data) coil.rotate();
    });
  }
}
