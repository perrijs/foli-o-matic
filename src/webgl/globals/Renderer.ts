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

    this.setSize(window.innerWidth, window.innerHeight);
  }

  static getInstance() {
    if (!Renderer.instance) Renderer.instance = new Renderer();

    return Renderer.instance;
  }
}
