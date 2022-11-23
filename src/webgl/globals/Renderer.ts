import { WebGLRenderer, PCFSoftShadowMap } from "three";

export class Renderer extends WebGLRenderer {
  constructor(elementCanvasParent: HTMLDivElement) {
    super({
      antialias: true,
      alpha: true,
    });
    this.shadowMap.enabled = true;
    this.shadowMap.type = PCFSoftShadowMap;

    if (elementCanvasParent) {
      this.setSize(
        elementCanvasParent.clientWidth,
        elementCanvasParent.clientHeight
      );
    }
  }
}
