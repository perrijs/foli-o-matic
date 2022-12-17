import { Raycaster, Vector2, Object3D, Intersection } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { Renderer } from "@/webgl/globals/Renderer";
import { Scene } from "@/webgl/globals/Scene";
import { Camera } from "@/webgl/globals/Camera";
import { AmbientLight } from "@/webgl/globals/AmbientLight";
import { DirectionalLight } from "@/webgl/globals/DirectionalLight";

import { Cabinet } from "@/webgl/entities/Cabinet";
import { Floor } from "@/webgl/entities/Floor";

import { AssetController } from "@/webgl/controllers/AssetController";
import { CoilController } from "@/webgl/controllers/CoilController";
import { ButtonController } from "@/webgl/controllers/ButtonController";
import { ItemController } from "@/webgl/controllers/ItemController";

import {
  GL_PRESS_KEY,
  GL_SELECT_ITEM,
  UI_HANDLE_TRANSITION,
  UI_TOOLTIP_SCROLL,
  UI_TOOLTIP_TAP,
} from "@/webgl/config/topics";
import {
  CAMERA_POSITION,
  TRIGGER_ELEMENTS,
} from "@/webgl/config/scrollTriggers";
import { Position } from "@/webgl/config/types";

gsap.registerPlugin(ScrollTrigger);

export class VendingMachine {
  assetController = AssetController.getInstance();

  renderer: Renderer;
  camera: Camera;
  scene: Scene;
  ambientLight: AmbientLight;
  directionalLight: DirectionalLight;

  coilController?: CoilController;
  buttonController?: ButtonController;
  itemController?: ItemController;
  cabinet?: Cabinet;
  floor?: Floor;

  controls?: OrbitControls;
  raycaster?: Raycaster;
  pointer?: Vector2;
  intersections?: Intersection<Object3D<Event>>[];

  keycode?: string;
  canSelect?: boolean;
  canvasParent: HTMLDivElement;

  constructor(canvasParent: HTMLDivElement) {
    this.renderer = new Renderer();
    this.camera = new Camera();
    this.scene = new Scene();
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

  init() {
    document.body.style.overflowY = "scroll";

    this.renderer.setAspectRatio(this.canvasParent);
    this.camera.setAspectRatio(this.canvasParent);

    this.scene.add(this.camera);
    this.camera.position.set(25, 25, 25);
    this.camera.lookAt(0, 0, 0);

    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);

    this.renderer.setAnimationLoop(() => this.render());
    this.canvasParent.appendChild(this.renderer.domElement);

    this.coilController = new CoilController(this.scene);
    this.buttonController = new ButtonController(this.scene);
    this.itemController = new ItemController(this.scene);
    this.floor = new Floor(this.scene);
    this.cabinet = new Cabinet(this.scene);

    this.initScroll();
    this.handleTooltip();
  }

  addEventListeners() {
    document.addEventListener("mousemove", (event) =>
      this.handleMouseMove(event)
    );
    document.addEventListener("click", () => this.handleClick());
  }

  removeEventListeners() {
    document.removeEventListener("mousemove", (event) =>
      this.handleMouseMove(event)
    );
    document.removeEventListener("click", () => this.handleClick());
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

      if (topNode.name.includes("button")) {
        if (!this.canSelect) return;

        const keyValue = topNode.name.split("_")[1];

        this.handleKeyCode(keyValue);
        if (this.buttonController) this.buttonController.handleClick(keyValue);
      }
    }
  }

  handleCursor() {
    if (!this.intersections || this.intersections.length < 1) return;

    if (this.intersections.length > 0) {
      const topNode = this.intersections[0].object;

      const objectItem = topNode.name.includes("button") && this.canSelect;

      if (objectItem) {
        document.body.style.cursor = "pointer";
      } else {
        document.body.style.cursor = "default";
      }
    }
  }

  handleKeyCode(key: string) {
    if (!this.itemController || !this.itemController.items) return;

    if (key === "C") {
      this.keycode = "";
      PubSub.publish(GL_PRESS_KEY, this.keycode);
    } else if (key === "E") {
      let hasMatched = false;

      this.itemController.items.forEach((item, index) => {
        if (!this.itemController || !this.itemController.items) return;

        if (item.itemData.item_code === this.keycode) {
          hasMatched = true;
          document.body.style.overflowY = "hidden";

          this.zoomOut();

          PubSub.publish(GL_PRESS_KEY, "ENJOY!");
          PubSub.publish(GL_SELECT_ITEM, item.itemData.id);
          PubSub.publish(UI_TOOLTIP_TAP, true);
          PubSub.publish(UI_TOOLTIP_SCROLL, false);
        }

        if (index === this.itemController.items.length - 1 && !hasMatched) {
          this.keycode = "";

          PubSub.publish(GL_PRESS_KEY, "INVALID");
        }
      });
    } else {
      this.keycode = `${this.keycode}${key}`;
      PubSub.publish(GL_PRESS_KEY, this.keycode);
    }
  }

  initScroll() {
    const timeline = gsap.timeline();

    TRIGGER_ELEMENTS.forEach((query, index) => {
      const triggerElement = document.querySelector(query) as HTMLDivElement;

      this.createPathPoint(
        timeline,
        triggerElement,
        {
          x: CAMERA_POSITION[index].x,
          y: CAMERA_POSITION[index].y,
          z: CAMERA_POSITION[index].z,
        },
        4000 * index,
        index === 0
      );
    });
  }

  createPathPoint(
    timeline: GSAPTimeline | null,
    trigger: HTMLDivElement,
    position: Position,
    start: number,
    update: boolean
  ) {
    if (timeline)
      timeline.to(this.camera.position, {
        x: position.x,
        y: position.y,
        z: position.z,
        scrollTrigger: {
          trigger,
          start,
          scrub: true,
          immediateRender: false,
          onToggle: (self: { isActive: boolean }) => {
            if (self.isActive) this.handleTooltip();
          },
          onUpdate: () => {
            if (!this.cabinet) return;

            if (update) this.camera.lookAt(this.cabinet.cabinet.position);
          },
        },
      });

    PubSub.subscribe(UI_HANDLE_TRANSITION, () => {
      if (timeline) {
        timeline.kill();
        timeline = null;
      }

      document.body.style.overflowY = "hidden";

      setTimeout(() => {
        this.removeEventListeners();
        this.renderer.setAnimationLoop(null);
      }, 1000);
    });
  }

  handleTooltip() {
    const currentScroll = document.documentElement.scrollTop;

    if (currentScroll < 8000) {
      PubSub.publish(UI_TOOLTIP_SCROLL, true);
      PubSub.publish(UI_TOOLTIP_TAP, false);
    } else {
      PubSub.publish(UI_TOOLTIP_TAP, true);
      PubSub.publish(UI_TOOLTIP_SCROLL, false);
    }
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

    this.renderer.render(this.scene, this.camera);
  }
}
