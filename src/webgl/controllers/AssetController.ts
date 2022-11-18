import { TextureLoader, MeshMatcapMaterial, Object3D } from "three";

import { MATCAPS } from "@/webgl/config/matcaps";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ITEMS } from "../config/items";

export class AssetController {
  static instance: AssetController;

  matcaps?: MeshMatcapMaterial[] = [];
  models?: Object3D[] = [];

  constructor() {}

  static getInstance() {
    if (!AssetController.instance)
      AssetController.instance = new AssetController();

    return AssetController.instance;
  }

  loadModel(url: string) {
    const loader = new GLTFLoader();

    return new Promise<GLTF>((resolve) => {
      loader.load(url, resolve);
    });
  }

  async loadMatcaps() {
    const textureLoader = new TextureLoader();

    const matcapsMap = MATCAPS.map(async (url) => {
      const texture = await textureLoader.load(url, (texture) => {
        if (!this.matcaps) return;
      });

      const matcap = new MeshMatcapMaterial({ matcap: texture });

      return matcap;
    });

    const matcaps = await Promise.all(matcapsMap);
    this.matcaps = matcaps;
  }

  async loadModels() {
    const modelsMap = ITEMS.map(async (item) => {
      const gltf = await this.loadModel(item.object);

      return gltf.scene;
    });

    const models = await Promise.all(modelsMap);
    this.models = models;
  }
}
