import { Group, Mesh } from "three";
import PubSub from "pubsub-js";

import { AssetController } from "@/webgl/controllers/AssetController";
import { CloneController } from "@/webgl/controllers/CloneController";

import { Scene } from "@/webgl/globals/Scene";

import { Wrapper } from "@/webgl/entities/Wrapper";
import { Item } from "@/webgl/entities/Item";
import { Card } from "@/webgl/entities/Card";

import { ITEMS, SOLD_OUTS_CARDS } from "@/webgl/config/items";
import { GL_SELECT_ITEM } from "@/webgl/config/topics";

export class ItemController {
  assetController = AssetController.getInstance();
  cloneController = CloneController.getInstance();
  scene = Scene.getInstance();

  model?: Mesh;
  items?: Item[] = [];
  wrappers?: Wrapper[] = [];
  cards?: Card[] = [];

  constructor() {
    this.handleSubscriptions();
    this.init();
  }

  handleSubscriptions() {
    PubSub.subscribe(GL_SELECT_ITEM, (_topic, data) => {
      this.cloneController.activeIndex = data;

      this.handleMove(_topic, data);
    });
  }

  init() {
    if (!this.assetController.models || this.assetController.models.length < 1)
      return;

    ITEMS.forEach((itemData, index) => {
      if (!this.assetController.models) return;

      const itemGroup = new Group();
      const wrapper = new Wrapper(itemGroup);
      if (this.wrappers) this.wrappers.push(wrapper);

      const model = this.assetController.models[index];
      model.rotation.x = itemData.rotation.x;
      model.rotation.y = itemData.rotation.y;
      model.rotation.z = itemData.rotation.z;
      model.scale.setScalar(itemData.scalar);

      itemGroup.add(model);

      const item = new Item(itemData, itemGroup);
      if (this.items) this.items.push(item);
    });

    SOLD_OUTS_CARDS.forEach((itemData) => {
      new Card(itemData);
    });
  }

  handleMove(_topic: string, data: number) {
    if (!this.items) return;

    this.items.forEach((item) => {
      if (item.itemData.id === data) item.move();
    });
  }
}
