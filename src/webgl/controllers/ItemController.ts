import { Group, Mesh } from "three";
import PubSub from "pubsub-js";

import { Scene } from "@/webgl/globals/Scene";

import { AssetController } from "@/webgl/controllers/AssetController";
import { Wrapper } from "@/webgl/entities/Wrapper";
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

      const itemGroup = new Group();
      new Wrapper(itemGroup);

      const model = this.assetController.models[index];
      model.rotation.x = itemData.rotation.x;
      model.rotation.y = itemData.rotation.y;
      model.rotation.z = itemData.rotation.z;
      model.scale.setScalar(itemData.scalar);

      itemGroup.add(model);

      const item = new Item(itemData, itemGroup);
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
