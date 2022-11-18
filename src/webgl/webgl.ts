import { World } from "./world";

import { AssetController } from "./controllers/AssetController";

export class WebGL {
  assetController = AssetController.getInstance();

  canvasParent: HTMLDivElement;

  constructor(canvasParent: HTMLDivElement) {
    this.canvasParent = canvasParent;

    this.init();
  }

  async init() {
    await this.assetController.loadMatcaps();

    await this.assetController.loadModels();

    new World(this.canvasParent);
  }
}
