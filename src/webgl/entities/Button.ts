import { BoxGeometry, CanvasTexture, Mesh, MeshBasicMaterial } from "three";
import gsap from "gsap";

import { Scene } from "@/webgl/globals/Scene";

import { ButtonData } from "@/webgl/config/types";

export class Button {
  scene: Scene;
  buttonData: ButtonData;
  mesh?: Mesh;
  index?: number;

  constructor(scene: Scene, buttonData: ButtonData, index: number) {
    this.scene = scene;
    this.buttonData = buttonData;
    this.index = index;

    this.init();
  }

  init() {
    const position = this.buttonData.position;

    const geometry = new BoxGeometry(0.275, 0.275, 0.35);

    const ctx = document
      .createElement("canvas")
      .getContext("2d") as CanvasRenderingContext2D;
    ctx.canvas.width = 256;
    ctx.canvas.height = 256;

    ctx.fillStyle = "#33312e";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = "#00ff33";
    ctx.font = `100px IBM Plex Mono`;
    ctx.fillText(this.buttonData.key_value, 90, 165);

    const texture = new CanvasTexture(ctx.canvas);
    const material = new MeshBasicMaterial({
      map: texture,
    });

    const mesh = new Mesh(geometry, material);

    mesh.name = `button_${this.buttonData.key_value}`;
    mesh.position.set(position.x, position.y, position.z);

    this.mesh = mesh;
    this.scene.add(this.mesh);
  }

  press() {
    if (!this.mesh) return;

    gsap.fromTo(
      this.mesh.position,
      {
        z: 2.85,
      },
      {
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        z: 2.825,
      }
    );
  }
}
