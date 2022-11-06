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

    new World(this.canvasParent);
  }
}
