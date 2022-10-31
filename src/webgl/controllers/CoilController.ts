import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { Group } from "three";

import { Scene } from "@/webgl/globals/Scene";
import { Coil } from "@/webgl/entities/Coil";

import { COILS } from "@/webgl/config/coils";

export class CoilController {
  static instance: CoilController;
  scene = Scene.getInstance();

  model?: Group;

  constructor() {
    this.load();
  }

  load() {
    const loader = new GLTFLoader();

    loader.load("/models/placeholder_coil.glb", (gltf) => {
      gltf.scene.scale.setScalar(0.1);

      this.model = gltf.scene;

      this.init();
    });
  }

  init() {
    COILS.forEach((coil) => {
      if (!this.model) return;

      new Coil(coil, this.model.clone());
    });
  }

  static getInstance() {
    if (!CoilController.instance)
      CoilController.instance = new CoilController();

    return CoilController.instance;
  }
}
