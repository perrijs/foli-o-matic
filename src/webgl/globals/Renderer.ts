import { WebGLRenderer, PCFSoftShadowMap } from "three";

export class Renderer extends WebGLRenderer {
  constructor() {
    super({
      antialias: true,
      alpha: true,
    });
    this.shadowMap.enabled = true;
    this.shadowMap.type = PCFSoftShadowMap;
  }

  setAspectRatio(elementCanvasParent: HTMLDivElement) {
    const altPixelRatio = window.devicePixelRatio * 0.66;
    window.innerWidth < 600
      ? this.setPixelRatio(window.devicePixelRatio)
      : this.setPixelRatio(altPixelRatio < 1 ? 1 : altPixelRatio);

    this.setSize(
      elementCanvasParent.clientWidth,
      elementCanvasParent.clientHeight
    );
  }
}
