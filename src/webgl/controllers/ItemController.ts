import { Mesh } from "three";
import PubSub from "pubsub-js";

import { AssetController } from "@/webgl/controllers/AssetController";
import { CloneController } from "@/webgl/controllers/CloneController";

import { Scene } from "@/webgl/globals/Scene";

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
  cards?: Card[] = [];

  constructor() {
    this.handleSubscriptions();
    this.init();
  }

  handleSubscriptions() {
    PubSub.subscribe(GL_SELECT_ITEM, (_topic, data) => {
      this.cloneController.currentIndex = data;

      this.handleMove(_topic, data);
    });
  }

  init() {
    ITEMS.forEach((itemData) => {
      const item = new Item(itemData);

      if (this.items) this.items.push(item);
    });

    SOLD_OUTS_CARDS.forEach((cardData) => {
      const card = new Card(cardData);

      if (this.cards) this.cards.push(card);
    });
  }

  handleMove(_topic: string, data: number) {
    if (!this.items || !this.cards) return;

    this.items.forEach((item) => {
      if (item.itemData.id === data) item.move();
    });

    this.cards.forEach((card) => {
      if (card.cardData.id === data) card.move();
    });
  }
}
