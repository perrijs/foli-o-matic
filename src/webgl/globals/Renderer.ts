import { WebGLRenderer } from "three";

export class Renderer extends WebGLRenderer {
  static instance: Renderer;

  elementCanvasParent: HTMLDivElement | null;

  constructor() {
    super({
      antialias: true,
      alpha: true,
    });

    this.elementCanvasParent = document.querySelector(".canvasParent");
    if (this.elementCanvasParent) {
      this.setSize(
        this.elementCanvasParent.clientWidth,
        this.elementCanvasParent.clientHeight
      );
    }
  }

  static getInstance() {
    if (!Renderer.instance) Renderer.instance = new Renderer();

    return Renderer.instance;
  }
}