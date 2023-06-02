import { CanvasTexture, MeshBasicMaterial } from "three";
import PubSub from "pubsub-js";

import { Scene } from "@/webgl/globals/Scene";

import { Screen } from "@/webgl/entities/Screen";

import { GL_PRESS_KEY } from "@/webgl/config/topics";

export class ScreenController {
  scene = Scene.getInstance();

  screen?: Screen;

  constructor() {
    this.handleSubscriptions();
    this.init();
  }

  handleSubscriptions() {
    PubSub.subscribe(GL_PRESS_KEY, (_topic, data) =>
      this.createCanvasTexture(_topic, data)
    );
  }

  init() {
    this.screen = new Screen();
  }

  createCanvasTexture(_topic: string, data: string) {
    if (!this.screen || !this.screen.mesh) return;

    const ctx = document
      .createElement("canvas")
      .getContext("2d") as CanvasRenderingContext2D;
    ctx.canvas.width = 512;
    ctx.canvas.height = 102;

    ctx.fillStyle = "#33312e";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = "#00ff33";
    ctx.font = `bold 75px IBM Plex Mono`;
    ctx.fillText(data, 10, 80);

    const texture = new CanvasTexture(ctx.canvas);
    this.screen.mesh.material = new MeshBasicMaterial({
      map: texture,
    });

    setTimeout(() => {
      if (data === "DENIED") this.createCanvasTexture("", "");
    }, 500);
  }
}
