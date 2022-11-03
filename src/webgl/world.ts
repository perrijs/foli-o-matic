import { Raycaster, Vector2, Object3D, Intersection } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { Renderer } from "./globals/Renderer";
import { Scene } from "./globals/Scene";
import { Camera } from "./globals/Camera";
import { AmbientLight } from "./globals/AmbientLight";
import { DirectionalLight } from "./globals/DirectionalLight";

import { Cabinet } from "./entities/Cabinet";
import { CoilController } from "./controllers/CoilController";
import { ButtonController } from "./controllers/ButtonController";
import { ItemController } from "./controllers/ItemController";
import { Floor } from "./entities/Floor";

export class World {
  renderer = Renderer.getInstance();
  scene = Scene.getInstance();
  camera = Camera.getInstance();
  ambientLight = AmbientLight.getInstance();
  directionalLight = DirectionalLight.getInstance();

  coilController = CoilController.getInstance();
  buttonController = ButtonController.getInstance();
  itemController = ItemController.getInstance();
  cabinet?: Cabinet;
  floor?: Floor;

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
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.update();
    this.camera.position.set(50, 50, 50);
    this.camera.lookAt(0, 0, 0);

    this.renderer.setAnimationLoop(() => this.render());
    this.canvasParent.appendChild(this.renderer.domElement);

    this.floor = new Floor();
    this.cabinet = new Cabinet();
  }

  addEventListeners() {
    document.addEventListener("mousemove", (event) =>
      this.handleMouseMove(event)
    );
    document.addEventListener("click", () => this.handleClick());

    this.handleScroll();
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

  handleScroll() {
    gsap.registerPlugin(ScrollTrigger);

    const cameraLerp = gsap.to(this.camera.position, {
      z: 10,
      y: 0,
      x: 0,
      ease: "none",
      scrollTrigger: {
        trigger: this.renderer.domElement,
        start: "top top",
        end: ScrollTrigger.maxScroll(document.body),
        pin: true,
        scrub: 0.5,
      },
      onUpdate: () => {
        if (!this.cabinet) return;

        this.camera.lookAt(this.cabinet.cabinet.position);
      },
      onComplete: () => {
        cameraLerp.kill();
        document.body.style.height = "100vh";
      },
    });
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
    // if (this.controls) this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }
}
