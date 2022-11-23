import { World } from "./world";
import { WorldAlt } from "./worldAlt";

import { AssetController } from "./controllers/AssetController";

export class WebGL {
  assetController = AssetController.getInstance();

  canvasParent: HTMLDivElement;
  isMain: boolean;

  constructor(canvasParent: HTMLDivElement, isMain: boolean) {
    this.canvasParent = canvasParent;
    this.isMain = isMain;

    this.isMain ? this.init() : this.initAlt();
  }

  async init() {
    await this.assetController.loadMatcaps();
    await this.assetController.loadButtonTextures();
    await this.assetController.loadWrapper();
    await this.assetController.loadModels();

    new World(this.canvasParent);
  }

  async initAlt() {
    await this.assetController.loadMatcaps();
    await this.assetController.loadButtonTextures();
    await this.assetController.loadWrapper();
    await this.assetController.loadModels();

    new WorldAlt(this.canvasParent);
  }
}
