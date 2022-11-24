import { WebGLRenderer, PCFSoftShadowMap } from "three";

export class Renderer extends WebGLRenderer {
  static instance: Renderer;

  constructor() {
    super({
      antialias: true,
      alpha: true,
    });
    this.shadowMap.enabled = true;
    this.shadowMap.type = PCFSoftShadowMap;

    this.setPixelRatio(window.devicePixelRatio);
  }

  static getInstance() {
    if (!Renderer.instance) Renderer.instance = new Renderer();

    return Renderer.instance;
  }

  setAspectRatio(elementCanvasParent: HTMLDivElement) {
    this.setSize(
      elementCanvasParent.clientWidth,
      elementCanvasParent.clientHeight
    );
  }
}
