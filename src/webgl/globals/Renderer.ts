import { WebGLRenderer, PCFSoftShadowMap } from "three";

export class Renderer extends WebGLRenderer {
  constructor() {
    super({
      antialias: true,
      alpha: true,
    });
    this.shadowMap.enabled = true;
    this.shadowMap.type = PCFSoftShadowMap;

    this.setPixelRatio(window.devicePixelRatio * 0.66);
  }

  setAspectRatio(elementCanvasParent: HTMLDivElement) {
    this.setSize(
      elementCanvasParent.clientWidth,
      elementCanvasParent.clientHeight
    );
  }
}
