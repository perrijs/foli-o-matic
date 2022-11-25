import { WorldMain } from "./worldMain";
import { WorldAlt } from "./worldAlt";

import { AssetController } from "./controllers/AssetController";

export class WebGL {
  assetController = AssetController.getInstance();

  canvasParent: HTMLDivElement;

  constructor(canvasParent: HTMLDivElement, isMain: boolean) {
    this.canvasParent = canvasParent;

    isMain ? new WorldMain(this.canvasParent) : new WorldAlt(this.canvasParent);
  }
}
