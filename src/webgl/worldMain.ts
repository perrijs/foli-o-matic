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
import { Floor } from "./entities/Floor";

import { AssetController } from "./controllers/AssetController";
import { CoilController } from "./controllers/CoilController";
import { ButtonController } from "./controllers/ButtonController";
import { ItemController } from "./controllers/ItemController";
import { SpriteController } from "./controllers/SpriteController";

import {
  GL_DISPLAY_SPRITES,
  GL_PRESS_KEY,
  GL_SELECT_ITEM,
  UI_HANDLE_TRANSITION,
  UI_TOOLTIP_SCROLL,
  UI_TOOLTIP_ZOOM,
} from "./config/topics";

export class WorldMain {
  renderer = Renderer.getInstance();
  scene = Scene.getInstance();
  camera = Camera.getInstance();
  ambientLight: AmbientLight;
  directionalLight: DirectionalLight;

  assetController = AssetController.getInstance();
  coilController = CoilController.getInstance();
  buttonController = ButtonController.getInstance();
  itemController = ItemController.getInstance();
  spriteController = SpriteController.getInstance();
  cabinet?: Cabinet;
  floor?: Floor;

  controls?: OrbitControls;
  raycaster?: Raycaster;
  pointer?: Vector2;
  intersections?: Intersection<Object3D<Event>>[];

  keycode?: string;
  timer?: ReturnType<typeof setInterval>;
  canSelect?: boolean;
  canvasParent: HTMLDivElement;

  constructor(canvasParent: HTMLDivElement) {
    this.ambientLight = new AmbientLight();
    this.directionalLight = new DirectionalLight();
    this.raycaster = new Raycaster();
    this.pointer = new Vector2();

    this.keycode = "";
    this.canSelect = true;
    this.canvasParent = canvasParent;

    this.init();
    this.addEventListeners();
  }

  async init() {
    document.body.style.height = "5000px";

    this.renderer.setAspectRatio(this.canvasParent);
    this.camera.setAspectRatio(this.canvasParent);

    this.scene.add(this.camera);
    this.camera.position.set(25, 25, 25);
    this.camera.lookAt(0, 0, 0);
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.update();

    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);

    this.renderer.setAnimationLoop(() => this.render());
    this.canvasParent.appendChild(this.renderer.domElement);

    this.floor = new Floor();
    this.cabinet = new Cabinet();

    this.scroll();
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

      if (topNode.name.includes("sprite")) {
        topNode.name === "sprite_items"
          ? this.zoomInItems()
          : this.zoomInButtons();
      }

      if (topNode.name.includes("button")) {
        if (!this.canSelect) return;

        const keyValue = topNode.name.split("_")[1];

        this.handleKeyCode(keyValue);
        this.buttonController.handleClick(keyValue);
      }
    }
  }

  handleCursor() {
    if (!this.intersections || this.intersections.length < 1) return;

    if (this.intersections.length > 0) {
      const topNode = this.intersections[0].object;

      const objectItem = topNode.name.includes("button") && this.canSelect;
      const objectSprite = topNode.name.includes("sprite");

      if (objectItem || objectSprite) {
        document.body.style.cursor = "pointer";
      } else {
        document.body.style.cursor = "default";
      }
    }
  }

  handleKeyCode(key: string) {
    if (!this.itemController.items) return;

    if (key === "C") {
      this.keycode = "";
      PubSub.publish(GL_PRESS_KEY, this.keycode);
    } else if (key === "E") {
      this.itemController.items.forEach((item) => {
        if (item.itemData.item_code === this.keycode)
          PubSub.publish(GL_SELECT_ITEM, item.itemData.id);
      });

      PubSub.publish(GL_PRESS_KEY, "ENJOY!");
    } else {
      this.keycode = `${this.keycode}${key}`;
      PubSub.publish(GL_PRESS_KEY, this.keycode);
    }
  }

  scroll() {
    gsap.registerPlugin(ScrollTrigger);

    const cameraLerp = gsap.to(this.camera.position, {
      delay: 1,
      z: 10,
      y: 0,
      x: 0,
      scrollTrigger: {
        trigger: this.renderer.domElement,
        start: "top top",
        end: ScrollTrigger.maxScroll(document.body),
        pin: true,
        scrub: 0.25,
      },
      onUpdate: () => {
        if (!this.cabinet) return;

        PubSub.publish(UI_TOOLTIP_SCROLL, false);

        clearInterval(this.timer);
        this.scrollTimer();

        this.camera.lookAt(this.cabinet.cabinet.position);
      },
      onComplete: () => {
        cameraLerp.kill();

        PubSub.publish(GL_DISPLAY_SPRITES, true);

        clearInterval(this.timer);
        this.zoomTimer();

        document.body.style.height = "100vh";
      },
    });

    PubSub.subscribe(UI_HANDLE_TRANSITION, () => cameraLerp.kill());

    this.scrollTimer();
  }

  scrollTimer() {
    this.timer = setInterval(() => {
      PubSub.publish(UI_TOOLTIP_SCROLL, true);
    }, 3000);
  }

  zoomTimer() {
    this.timer = setInterval(() => {
      PubSub.publish(UI_TOOLTIP_ZOOM, true);
    }, 5000);
  }

  zoomInItems() {
    clearInterval(this.timer);
    PubSub.publish(UI_TOOLTIP_ZOOM, false);
    PubSub.publish(GL_DISPLAY_SPRITES, false);

    gsap.to(this.camera.position, {
      duration: 3,
      ease: "power4.inOut",
      z: 4,
      y: 1.5,
      x: -0.5,
    });
  }

  zoomInButtons() {
    clearInterval(this.timer);
    PubSub.publish(UI_TOOLTIP_ZOOM, false);
    PubSub.publish(GL_DISPLAY_SPRITES, false);

    gsap.to(this.camera.position, {
      duration: 3,
      ease: "power4.inOut",
      z: 4,
      y: 0.75,
      x: 1.5,
      onComplete: () => {
        this.canSelect = true;
      },
    });
  }

  zoomOut() {
    gsap.to(this.camera.position, {
      duration: 1.5,
      ease: "power4.inOut",
      z: 10,
      y: 0,
      x: 0,
    });
  }

  render() {
    if (this.raycaster && this.pointer) {
      this.raycaster.setFromCamera(this.pointer, this.camera);

      this.intersections = this.raycaster.intersectObjects(this.scene.children);
      if (this.intersections.length > 0) {
        this.handleCursor();
      }
    }
    // if (this.controls) this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }
}
