import { Group, Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import PubSub from "pubsub-js";

import { Scene } from "@/webgl/globals/Scene";

import { AssetController } from "@/webgl/controllers/AssetController";
import { Item } from "@/webgl/entities/Item";

import { ITEMS } from "@/webgl/config/items";
import { GL_SELECT_ITEM } from "@/webgl/config/topics";

export class ItemController {
  static instance: ItemController;

  scene = Scene.getInstance();
  assetController = AssetController.getInstance();

  model?: Mesh;
  items?: Item[] = [];

  constructor() {
    this.init();
  }

  static getInstance() {
    if (!ItemController.instance)
      ItemController.instance = new ItemController();

    return ItemController.instance;
  }

  init() {
    ITEMS.forEach((itemData, index) => {
      if (!this.assetController.models || !this.items) return;

      const model = this.assetController.models[index].children[0] as Mesh;
      model.scale.setScalar(0.5);

      if (this.assetController.matcaps) {
        model.material = this.assetController.matcaps[index + 2];
      }

      const item = new Item(itemData, model);
      this.items.push(item);
    });

    this.handleSubscriptions();
  }

  handleSubscriptions() {
    PubSub.subscribe(GL_SELECT_ITEM, this.handleMove.bind(this));
  }

  handleMove(_topic: string, data: string) {
    if (!this.items) return;

    this.items.forEach((item) => {
      if (item.itemData.id === data) item.move();
    });
  }
}
