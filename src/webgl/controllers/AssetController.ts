import { TextureLoader, MeshMatcapMaterial } from "three";

import { MATCAPS } from "@/webgl/config/matcaps";

export class AssetController {
  static instance: AssetController;

  matcaps?: MeshMatcapMaterial[] = [];

  constructor() {}

  static getInstance() {
    if (!AssetController.instance)
      AssetController.instance = new AssetController();

    return AssetController.instance;
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
}
