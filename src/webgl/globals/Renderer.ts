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
    this.setPixelRatio(
      window.devicePixelRatio * (window.innerWidth < 600 ? 1 : 0.66)
    );

    this.setSize(
      elementCanvasParent.clientWidth,
      elementCanvasParent.clientHeight
    );
  }
}
