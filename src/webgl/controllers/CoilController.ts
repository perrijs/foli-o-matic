import { Group, Mesh, MeshMatcapMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import PubSub from "pubsub-js";

import { Scene } from "@/webgl/globals/Scene";
import { Coil } from "@/webgl/entities/Coil";
import { AssetController } from "./AssetController";

import { COILS } from "@/webgl/config/coils";
import { GL_SELECT_ITEM } from "@/webgl/config/topics";

export class CoilController {
  static instance: CoilController;
  assetController = AssetController.getInstance();
  scene = Scene.getInstance();

  model?: Group;
  matcap?: MeshMatcapMaterial;
  coils?: Coil[] = [];

  constructor() {
    this.load();
  }

  static getInstance() {
    if (!CoilController.instance)
      CoilController.instance = new CoilController();

    return CoilController.instance;
  }

  async load() {
    if (this.assetController.matcaps) {
      this.assetController.matcaps.forEach((item) => {
        if (item.name === "matcap_silver") this.matcap = item.matcap;
      });
    }

    const gltfLoader = new GLTFLoader();

    gltfLoader.load("/models/placeholder_coil.glb", (gltf) => {
      const mesh = gltf.scene.children[0] as Mesh;

      if (this.matcap) mesh.material = this.matcap;

      gltf.scene.scale.set(0.05, 0.05, 0.085);

      this.model = gltf.scene;

      this.init();
    });
  }

  init() {
    COILS.forEach((coilData) => {
      if (!this.model || !this.coils) return;

      const coil = new Coil(coilData, this.model.clone());
      this.coils.push(coil);
    });

    this.handleSubscriptions();
  }

  handleSubscriptions() {
    PubSub.subscribe(GL_SELECT_ITEM, this.handleRotate.bind(this));
  }

  handleRotate(_topic: string, data: string) {
    if (!this.coils) return;

    this.coils.forEach((coil) => {
      if (coil.coilData.id === data) coil.rotate();
    });
  }
}
