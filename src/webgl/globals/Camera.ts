import { PerspectiveCamera } from "three";

export class Camera extends PerspectiveCamera {
  constructor() {
    super(75, 0, 0.1, 1000);
  }

  setAspectRatio(elementCanvasParent: HTMLDivElement) {
    this.aspect =
      elementCanvasParent.clientWidth / elementCanvasParent.clientHeight;
    this.updateProjectionMatrix();
  }
}
