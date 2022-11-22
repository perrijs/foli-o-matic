import { Texture, TextureLoader, Group, MeshMatcapMaterial, Mesh } from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";

import { MATCAPS } from "@/webgl/config/matcaps";
import { ITEMS, WRAPPER } from "@/webgl/config/items";
import { Matcap } from "@/webgl/config/types";
import { applyMatcaps } from "../utils/applyMatcaps";
import { BUTTONS } from "../config/buttons";

export class AssetController {
  static instance: AssetController;

  gltfLoader = new GLTFLoader();
  textureLoader = new TextureLoader();

  matcaps?: Matcap[] = [];
  buttonTextures?: Texture[] = [];
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
      this.gltfLoader.load(url, resolve);
    });
  }

  loadTexture(url: string) {
    return new Promise<Texture>((resolve) => {
      this.textureLoader.load(url, resolve);
    });
  }

  async loadMatcaps() {
    const matcapsMap = MATCAPS.map(async (url) => {
      const texture = await this.loadTexture(`/textures/matcaps/${url}.png`);

      const matcap = new MeshMatcapMaterial({ matcap: texture });

      return { name: url, matcap: matcap };
    });

    const matcaps = await Promise.all(matcapsMap);
    this.matcaps = matcaps;
  }

  async loadButtonTextures() {
    const buttonTexturesMap = BUTTONS.map(async (button) => {
      const texture = await this.loadTexture(
        `/textures/buttons/${button.texture}.png`
      );

      return texture;
    });

    const buttonTextures = await Promise.all(buttonTexturesMap);
    this.buttonTextures = buttonTextures;
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
