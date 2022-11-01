import { Ray, Raycaster, Vector2 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { Renderer } from "./globals/Renderer";
import { Scene } from "./globals/Scene";
import { Camera } from "./globals/Camera";
import { AmbientLight } from "./globals/AmbientLight";

import { CoilController } from "./controllers/CoilController";
import { ButtonController } from "./controllers/ButtonController";

export class World {
  renderer = Renderer.getInstance();
  scene = Scene.getInstance();
  camera = Camera.getInstance();
  ambientLight = AmbientLight.getInstance();

  coilController = CoilController.getInstance();
  buttonController = ButtonController.getInstance();

  controls?: OrbitControls;
  raycaster?: Raycaster;
  pointer?: Vector2;

  canvasParent: HTMLDivElement;

  constructor(canvasParent: HTMLDivElement) {
    this.raycaster = new Raycaster();
    this.pointer = new Vector2();

    this.canvasParent = canvasParent;

    this.init();
  }

  init() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.camera.position.set(0, 0, 5);
    this.controls.update();

    this.renderer.setAnimationLoop(() => this.render());
    this.canvasParent.appendChild(this.renderer.domElement);

    document.addEventListener("mousemove", (event) =>
      this.handleMouseMove(event)
    );
  }

  handleMouseMove(event: MouseEvent) {
    if (!this.pointer) return;

    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  render() {
    if (this.raycaster && this.pointer) {
      this.raycaster.setFromCamera(this.pointer, this.camera);

      const intersects = this.raycaster.intersectObjects(this.scene.children);
    }
    if (this.controls) this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }
}
