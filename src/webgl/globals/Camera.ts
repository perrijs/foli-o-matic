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
    const mouseX = (event.pageX - window.innerWidth / 2) * 0.00025;
    const mouseY = (event.pageY - window.innerWidth / 2) * 0.0001;

    this.position.x = MathUtils.lerp(this.position.x, mouseX, 0.1);
    this.position.y = MathUtils.lerp(this.position.y, -mouseY, 0.1);
  }
}
