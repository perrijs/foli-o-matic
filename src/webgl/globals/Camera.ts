import { MathUtils, PerspectiveCamera } from "three";

export class Camera extends PerspectiveCamera {
  constructor() {
    super(75, 0, 0.1, 1000);

    this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener("mousemove", (event: MouseEvent) =>
      this.addAmbientPosition(event)
    );
  }

  setAspectRatio(elementCanvasParent: HTMLDivElement) {
    this.aspect =
      elementCanvasParent.clientWidth / elementCanvasParent.clientHeight;
    this.updateProjectionMatrix();
  }

  addAmbientPosition(event: MouseEvent) {
    const mouseX = (event.screenX - window.innerWidth / 2) * 0.0001;
    const mouseY = (event.screenY - window.innerHeight / 2) * 0.0001;

    this.rotation.x = MathUtils.lerp(this.rotation.x, -mouseY, 0.1);
    this.rotation.y = MathUtils.lerp(this.rotation.y, -mouseX, 0.1);
  }
}
