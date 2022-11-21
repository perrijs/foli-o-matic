import {
  TextureLoader,
  Group,
  MeshMatcapMaterial,
  Mesh,
  MeshStandardMaterial,
  Material,
} from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";

import { MATCAPS } from "@/webgl/config/matcaps";
import { ITEMS, WRAPPER } from "@/webgl/config/items";
import { Matcap } from "@/webgl/config/types";
import { applyMatcaps } from "../utils/applyMatcaps";

export class AssetController {
  static instance: AssetController;

  loader = new GLTFLoader();

  matcaps?: Matcap[] = [];
  wrapper?: GLTF;
  models?: Group[] = [];

  constructor() {}

  static getInstance() {
    if (!AssetController.instance)
      AssetController.instance = new AssetController();

    return AssetController.instance;
  }

  loadModel(url: string) {
    return new Promise<GLTF>((resolve) => {
      this.loader.load(url, resolve);
    });
  }

  async loadMatcaps() {
    const textureLoader = new TextureLoader();

    const matcapsMap = MATCAPS.map(async (url) => {
      const texture = await textureLoader.load(`/textures/matcaps/${url}.png`);

      const matcap = new MeshMatcapMaterial({ matcap: texture });

      return { name: url, matcap: matcap };
    });

    const matcaps = await Promise.all(matcapsMap);
    this.matcaps = matcaps;
  }

  async loadWrapper() {
    const wrapperLoader = await this.loadModel(WRAPPER);

    const wrapper = await Promise.resolve(wrapperLoader);
    this.wrapper = wrapper;
  }

  async loadModels() {
    const modelsMap = ITEMS.map(async (item) => {
      const gltf = await this.loadModel(item.object);

      gltf.scene.traverse((child) => {
        const mesh = child as Mesh;

        if (this.matcaps) {
          applyMatcaps(this.matcaps, mesh);
        }
      });

      return gltf.scene;
    });

    const models = await Promise.all(modelsMap);
    this.models = models;
  }
}
