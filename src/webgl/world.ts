import { Raycaster, Vector2, Object3D, Intersection } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { Renderer } from "./globals/Renderer";
import { Scene } from "./globals/Scene";
import { Camera } from "./globals/Camera";
import { AmbientLight } from "./globals/AmbientLight";

import { Cabinet } from "./entities/Cabinet";
import { CoilController } from "./controllers/CoilController";
import { ButtonController } from "./controllers/ButtonController";
import { ItemController } from "./controllers/ItemController";

export class World {
  renderer = Renderer.getInstance();
  scene = Scene.getInstance();
  camera = Camera.getInstance();
  ambientLight = AmbientLight.getInstance();

  coilController = CoilController.getInstance();
  buttonController = ButtonController.getInstance();
  itemController = ItemController.getInstance();

  controls?: OrbitControls;
  raycaster?: Raycaster;
  pointer?: Vector2;
  intersections?: Intersection<Object3D<Event>>[];

  canvasParent: HTMLDivElement;

  constructor(canvasParent: HTMLDivElement) {
    this.raycaster = new Raycaster();
    this.pointer = new Vector2();

    this.canvasParent = canvasParent;

    this.init();
    this.addEventListeners();
  }

  init() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.camera.position.set(0, 5, 10);
    this.controls.update();

    this.renderer.setAnimationLoop(() => this.render());
    this.canvasParent.appendChild(this.renderer.domElement);

    new Cabinet();
  }

  addEventListeners() {
    document.addEventListener("mousemove", (event) =>
      this.handleMouseMove(event)
    );
    document.addEventListener("click", () => this.handleClick());
  }

  handleMouseMove(event: MouseEvent) {
    if (!this.pointer) return;

    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  handleClick() {
    if (!this.intersections) return;

    if (this.intersections.length > 0) {
      const topNode = this.intersections[0].object;

      this.buttonController.handleClick(topNode.name);
    }
  }

  render() {
    if (this.raycaster && this.pointer) {
      this.raycaster.setFromCamera(this.pointer, this.camera);

      this.intersections = this.raycaster.intersectObjects(this.scene.children);

      if (this.intersections.length > 0) {
        document.body.style.cursor = this.intersections[0].object.name.includes(
          "item"
        )
          ? "pointer"
          : "default";
      }
    }
    if (this.controls) this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }
}
