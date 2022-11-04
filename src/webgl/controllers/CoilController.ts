import { TextureLoader, Texture, Group, MeshMatcapMaterial, Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import PubSub from "pubsub-js";

import { Scene } from "@/webgl/globals/Scene";
import { Coil } from "@/webgl/entities/Coil";

import { COILS } from "@/webgl/config/coils";
import { GL_SELECT_ITEM } from "@/webgl/config/topics";

export class CoilController {
  static instance: CoilController;
  scene = Scene.getInstance();

  model?: Group;
  matcap?: Texture;
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
    const textureLoader = new TextureLoader();
    const gltfLoader = new GLTFLoader();

    await textureLoader.load("textures/matcaps/matcap_grey.png", (texture) => {
      this.matcap = texture;

      this.init();
    });

    gltfLoader.load("/models/placeholder_coil.glb", (gltf) => {
      const mesh = gltf.scene.children[0] as Mesh;

      mesh.material = new MeshMatcapMaterial({
        matcap: this.matcap,
      });

      gltf.scene.scale.setScalar(0.1);

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
