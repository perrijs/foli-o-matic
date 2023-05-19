import { Group, Material, Mesh } from "three";
import PubSub from "pubsub-js";

import { Scene } from "@/webgl/globals/Scene";

import { AssetController } from "@/webgl/controllers/AssetController";
import { Wrapper } from "@/webgl/entities/Wrapper";
import { Item } from "@/webgl/entities/Item";
import { Card } from "@/webgl/entities/Card";

import { ITEMS, SOLD_OUTS_CARDS } from "@/webgl/config/items";
import { GL_SELECT_ITEM } from "@/webgl/config/topics";

export class ItemController {
  assetController = AssetController.getInstance();

  scene: Scene;
  model?: Mesh;
  items?: Item[] = [];
  wrappers?: Wrapper[] = [];
  cards?: Card[] = [];

  constructor(scene: Scene) {
    this.scene = scene;

    this.init();
    this.handleSubscriptions();
  }

  init() {
    if (!this.assetController.models || this.assetController.models.length < 1)
      return;

    ITEMS.forEach((itemData, index) => {
      if (!this.assetController.models) return;

      const itemGroup = new Group();
      const wrapper = new Wrapper(this.scene, itemGroup);
      if (this.wrappers) this.wrappers.push(wrapper);

      const model = this.assetController.models[index];
      model.rotation.x = itemData.rotation.x;
      model.rotation.y = itemData.rotation.y;
      model.rotation.z = itemData.rotation.z;
      model.scale.setScalar(itemData.scalar);

      itemGroup.add(model);

      const item = new Item(this.scene, itemData, itemGroup);
      if (this.items) this.items.push(item);
    });

    SOLD_OUTS_CARDS.forEach((itemData) => {
      new Card(this.scene, itemData);
    });
  }

  handleSubscriptions() {
    PubSub.subscribe(GL_SELECT_ITEM, this.handleMove.bind(this));
  }

  getItem(index: number) {
    if (!this.items) return;

    const model = this.items[index].model;
    model.position.set(0, 0, 0);
    model.rotation.set(0, 0, 0);
  }

  handleMove(_topic: string, data: string) {
    if (!this.items) return;

    this.items.forEach((item) => {
      if (item.itemData.id === data) item.move();
    });
  }
}
