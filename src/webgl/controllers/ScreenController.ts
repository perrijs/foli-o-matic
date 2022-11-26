import PubSub from "pubsub-js";

import { Scene } from "@/webgl/globals/Scene";
import { Sprite } from "@/webgl/entities/Sprite";

import { GL_PRESS_KEY } from "@/webgl/config/topics";
import { Screen } from "../entities/Screen";
import { CanvasTexture, MeshBasicMaterial } from "three";

export class ScreenController {
  static instance: ScreenController;
  scene = Scene.getInstance();

  screen?: Screen;
  sprites?: Sprite[] = [];

  constructor() {}

  static getInstance() {
    if (!ScreenController.instance)
      ScreenController.instance = new ScreenController();

    return ScreenController.instance;
  }

  init() {
    this.screen = new Screen();

    this.handleSubscriptions();
  }

  createCanvasTexture(_topic: string, data: string) {
    if (!this.screen || !this.screen.mesh) return;

    const ctx = document
      .createElement("canvas")
      .getContext("2d") as CanvasRenderingContext2D;
    ctx.canvas.width = 512;
    ctx.canvas.height = 146;

    ctx.fillStyle = "#33312e";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = "#00ff33";
    ctx.font = `100px IBM Plex Mono`;
    ctx.fillText(data, 10, 110);

    const texture = new CanvasTexture(ctx.canvas);
    this.screen.mesh.material = new MeshBasicMaterial({
      map: texture,
    });
  }

  handleSubscriptions() {
    PubSub.subscribe(GL_PRESS_KEY, this.createCanvasTexture.bind(this));
  }
}
