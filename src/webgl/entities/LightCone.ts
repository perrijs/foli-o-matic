import {
  Mesh,
  BoxGeometry,
  MeshMatcapMaterial,
  Material,
  MeshBasicMaterial,
  ConeGeometry,
} from "three";
import PubSub from "pubsub-js";
import gsap from "gsap";

import { Scene } from "@/webgl/globals/Scene";

import { AssetController } from "@/webgl/controllers/AssetController";

import { GL_SELECT_ITEM } from "@/webgl/config/topics";

export class LightCone {
  assetController = AssetController.getInstance();

  scene: Scene;
  mesh?: Mesh;

  constructor(scene: Scene) {
    this.scene = scene;

    this.init();
  }

  init() {
    const geometry = new ConeGeometry(20, 100, 32);
    const material = new MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
    });
    const cone = new Mesh(geometry, material);

    cone.position.set(0, 0, 0);

    this.mesh = cone;
    this.scene.add(this.mesh);

    this.handleSubscriptions();
  }

  handleSubscriptions() {}
}
