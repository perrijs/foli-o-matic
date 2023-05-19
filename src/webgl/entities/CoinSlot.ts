import {
  CanvasTexture,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
} from "three";

import { AssetController } from "@/webgl/controllers/AssetController";

import { Scene } from "@/webgl/globals/Scene";

export class CoinSlot {
  assetController = AssetController.getInstance();

  scene: Scene;

  group?: Group;
  label?: Mesh;

  constructor(scene: Scene) {
    this.scene = scene;

    this.init();
  }

  init() {
    this.group = new Group();

    const slotGeometry = new PlaneGeometry(0.025, 0.15, 1);
    const slotMaterial = new MeshBasicMaterial({ color: 0x000000 });
    const slot = new Mesh(slotGeometry, slotMaterial);
    slot.position.set(0, 0, 0);
    this.group.add(slot);

    const labelGeometry = new PlaneGeometry(0.125, 0.05, 1);
    const labelMaterial = new MeshBasicMaterial();
    this.label = new Mesh(labelGeometry, labelMaterial);
    this.label.position.set(0, 0.12, 0);
    this.group.add(this.label);

    this.group.position.set(2.31, 1.266, 3.001);
    this.scene.add(this.group);

    this.createCanvasTexture();
  }

  createCanvasTexture() {
    if (!this.label) return;

    const ctx = document
      .createElement("canvas")
      .getContext("2d") as CanvasRenderingContext2D;
    ctx.canvas.width = 512;
    ctx.canvas.height = 204;

    ctx.fillStyle = "#000000";
    ctx.font = `bold 65px Verdana`;
    ctx.fillText("INSERT COIN", 10, 80);

    ctx.beginPath();
    ctx.moveTo(206, 133);
    ctx.lineTo(306, 133);
    ctx.lineTo(256, 183);
    ctx.fill();

    const texture = new CanvasTexture(ctx.canvas);
    this.label.material = new MeshBasicMaterial({
      map: texture,
    });
  }
}
