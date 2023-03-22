import {
  Texture,
  DataTexture,
  TextureLoader,
  Group,
  MeshMatcapMaterial,
  Mesh,
} from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

import { applyMatcaps } from "@/webgl/utils/applyMatcaps";

import { MATCAPS } from "@/webgl/config/matcaps";
import { HDRS } from "@/webgl/config/hdrs";
import { ITEMS, WRAPPER, COIN, COIL } from "@/webgl/config/items";
import { Matcap } from "@/webgl/config/types";

export class AssetController {
  static instance: AssetController;

  gltfLoader = new GLTFLoader();
  textureLoader = new TextureLoader();
  hdrLoader = new RGBELoader();

  matcaps?: Matcap[] = [];
  hdrs?: DataTexture[] = [];
  models?: Group[] = [];
  coin?: GLTF;
  wrapper?: GLTF;
  coil?: GLTF;

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

  loadHDR(url: string) {
    return new Promise<DataTexture>((resolve) => {
      this.hdrLoader.load(url, resolve);
    });
  }

  async loadMatcaps() {
    const matcapsMap = MATCAPS.map(async (url) => {
      const texture = await this.loadTexture(`/textures/matcaps/${url}.webp`);

      const matcap = new MeshMatcapMaterial({ matcap: texture });

      return { name: url, matcap: matcap };
    });

    const matcaps = await Promise.all(matcapsMap);
    this.matcaps = matcaps;
  }

  async loadHDRS() {
    const hdrsMap = HDRS.map(async (hdr) => {
      const hdrTexture = await this.loadHDR(`/textures/hdr/${hdr}.hdr`);

      return hdrTexture;
    });

    const hdrs = await Promise.all(hdrsMap);
    this.hdrs = hdrs;
  }

  async loadWrapper() {
    const wrapperLoader = await this.loadModel(WRAPPER);

    const wrapper = await Promise.resolve(wrapperLoader);
    this.wrapper = wrapper;
  }

  async loadCoil() {
    const wrapperLoader = await this.loadModel(COIL);

    const coil = await Promise.resolve(wrapperLoader);
    this.coil = coil;
  }

  async loadCoin() {
    const coinLoader = await this.loadModel(COIN);

    const coin = await Promise.resolve(coinLoader);
    this.coin = coin;
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
