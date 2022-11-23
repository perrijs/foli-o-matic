import { PerspectiveCamera } from "three";

export class Camera extends PerspectiveCamera {
  static instance: Camera;

  constructor() {
    super(75, 0, 0.1, 1000);
  }

  static getInstance() {
    if (!Camera.instance) Camera.instance = new Camera();

    return Camera.instance;
  }

  setAspectRatio(elementCanvasParent: HTMLDivElement) {
    this.aspect =
      elementCanvasParent.clientWidth / elementCanvasParent.clientHeight;
    this.updateProjectionMatrix();
  }
}
