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
    this.setSize(
      elementCanvasParent.clientWidth,
      elementCanvasParent.clientHeight
    );
  }
}
