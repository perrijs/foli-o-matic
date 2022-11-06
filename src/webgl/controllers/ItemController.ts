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

  model?: Group;
  items?: Item[] = [];

  constructor() {
    this.load();
  }

  static getInstance() {
    if (!ItemController.instance)
      ItemController.instance = new ItemController();

    return ItemController.instance;
  }

  load() {
    const loader = new GLTFLoader();

    loader.load("/models/placeholder_packet.glb", (gltf) => {
      gltf.scene.scale.setScalar(0.075);
      gltf.scene.rotation.y = Math.PI / 2;

      this.model = gltf.scene;

      this.init();
    });
  }

  init() {
    ITEMS.forEach((itemData, index) => {
      if (!this.model || !this.items) return;

      if (this.assetController.matcaps) {
        const mesh = this.model.children[0] as Mesh;
        mesh.material = this.assetController.matcaps[index + 2];
      }

      const item = new Item(itemData, this.model.clone());
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
