import { AssetController } from "./controllers/AssetController";

import { LOAD_COMPLETE } from "./config/topics";

export class Load {
  assetController = AssetController.getInstance();

  constructor() {
    this.load();
  }

  async load() {
    await this.assetController.loadMatcaps();
    await this.assetController.loadHDRS();
    await this.assetController.loadWrapper();
    await this.assetController.loadCoil();
    await this.assetController.loadModels();

    PubSub.publish(LOAD_COMPLETE);
  }
}
