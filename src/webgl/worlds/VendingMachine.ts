import { Raycaster, Vector2, Object3D, Intersection, Clock } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { Renderer } from "@/webgl/globals/Renderer";
import { Scene } from "@/webgl/globals/Scene";
import { Camera } from "@/webgl/globals/Camera";
import { AmbientLight } from "@/webgl/globals/AmbientLight";
import { DirectionalLight } from "@/webgl/globals/DirectionalLight";
import { SpotLight } from "@/webgl/globals/SpotLight";

import { Cabinet } from "@/webgl/entities/Cabinet";
import { LightCone } from "@/webgl/entities/LightCone";
import { Coin } from "@/webgl/entities/Coin";
import { Floor } from "@/webgl/entities/Floor";

import { AssetController } from "@/webgl/controllers/AssetController";
import { CoilController } from "@/webgl/controllers/CoilController";
import { ButtonController } from "@/webgl/controllers/ButtonController";
import { ItemController } from "@/webgl/controllers/ItemController";

import {
  GL_FLIP_COIN,
  GL_PRESS_KEY,
  GL_SELECT_ITEM,
  UI_HANDLE_TRANSITION,
  UI_TOOLTIP_INTERACT,
} from "@/webgl/config/topics";
import { TRIGGER_ELEMENTS, SCROLL_HEIGHT } from "@/webgl/config/scrollTriggers";

gsap.registerPlugin(ScrollTrigger);

export class VendingMachine {
  assetController = AssetController.getInstance();

  renderer: Renderer;
  camera: Camera;
  scene: Scene;
  ambientLight: AmbientLight;
  directionalLight: DirectionalLight;
  spotLight: SpotLight;
  clock = new Clock();

  coilController?: CoilController;
  buttonController?: ButtonController;
  itemController?: ItemController;
  lightCone?: LightCone;
  cabinet?: Cabinet;
  coin?: Coin;
  floor?: Floor;

  controls?: OrbitControls;
  raycaster?: Raycaster;
  pointer?: Vector2;
  intersections?: Intersection<Object3D<Event>>[];

  keycode?: string;
  canSelect?: boolean;
  canvasParent: HTMLDivElement;
  isMobile: boolean;

  constructor(canvasParent: HTMLDivElement) {
    this.renderer = new Renderer();
    this.camera = new Camera();
    this.scene = new Scene();
    this.ambientLight = new AmbientLight();
    this.directionalLight = new DirectionalLight();
    this.spotLight = new SpotLight();

    this.raycaster = new Raycaster();
    this.pointer = new Vector2();

    this.keycode = "";
    this.canSelect = true;
    this.canvasParent = canvasParent;
    this.isMobile = canvasParent.clientWidth < 600;

    this.addEventListeners();
    this.handleSubscriptions();
    this.init();
  }

  addEventListeners() {
    window.addEventListener("resize", () => this.handleResize());
    window.addEventListener("mousemove", (event) =>
      this.handleMouseMove(event)
    );
    window.addEventListener("click", () => this.handleClick());
    window.addEventListener("touchstart", (event) =>
      this.handleTouchStart(event)
    );
  }

  removeEventListeners() {
    window.removeEventListener("resize", () => this.handleResize());
    window.removeEventListener("mousemove", (event) =>
      this.handleMouseMove(event)
    );
    window.removeEventListener("click", () => {
      this.handleClick();
    });
    window.removeEventListener("touchstart", (event) =>
      this.handleTouchStart(event)
    );
  }

  handleSubscriptions() {
    PubSub.subscribe(GL_FLIP_COIN, () => {
      if (!this.coin) return;

      this.coin.flip();
    });

    PubSub.subscribe(UI_HANDLE_TRANSITION, () => {
      document.body.style.overflowY = "hidden";

      setTimeout(() => {
        this.removeEventListeners();
        this.renderer.setAnimationLoop(null);
      }, 1000);
    });
  }

  init() {
    this.renderer.setAspectRatio(this.canvasParent);
    this.camera.setAspectRatio(this.canvasParent);

    this.scene.add(this.camera);
    this.camera.position.set(0, 0, 50);
    this.camera.lookAt(0, 0, 0);

    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);
    this.scene.add(this.spotLight);

    this.coilController = new CoilController(this.scene);
    this.buttonController = new ButtonController(this.scene);
    this.itemController = new ItemController(this.scene);
    this.floor = new Floor(this.scene);
    this.lightCone = new LightCone(this.scene);
    this.cabinet = new Cabinet(this.scene);
    this.coin = new Coin(this.scene);

    this.initScroll();

    this.renderer.setAnimationLoop(() => this.render());
    this.canvasParent.appendChild(this.renderer.domElement);
  }

  initScroll() {
    if (!this.coin || !this.coin.mesh || !this.lightCone) return;

    const timeline = gsap.timeline();
    const triggerElementOne = document.querySelector(
      `.${TRIGGER_ELEMENTS[0]}`
    ) as HTMLDivElement;

    const scrollTrigger = {
      trigger: triggerElementOne,
      start: 0,
      end: triggerElementOne.clientHeight * 1.5,
      scrub: true,
      immediateRender: false,
    };

    timeline.to(this.coin.mesh.position, {
      x: 2.31,
      y: 1.266,
      z: 3.001,
      scrollTrigger: {
        ...scrollTrigger,
        onUpdate: () => {
          if (!this.coin || !this.coin.mesh) return;

          const newY = this.coin.mesh.position.y - 0.6;

          this.camera.position.z = this.coin.mesh.position.z + 3;
          if (!(newY < 0)) this.camera.position.y = newY;
        },
        onLeave: () => {
          if (!this.coin) return;

          document.body.style.overflowY = "hidden";

          this.fixCamera();
          this.coin.insert();
        },
      },
    });

    timeline.to(this.coin.mesh.scale, {
      x: 0.075,
      y: 0.075,
      z: 0.075,
      scrollTrigger,
    });

    if (this.lightCone.mesh)
      timeline.to(this.lightCone.mesh.material, {
        opacity: 0,
        scrollTrigger,
      });

    timeline.to(this.spotLight, {
      intensity: 0,
      scrollTrigger,
    });

    timeline.to(this.directionalLight, {
      intensity: 1,
      scrollTrigger,
    });
  }

  fixCamera() {
    gsap.to(this.camera.position, {
      duration: 3,
      x: 0,
      y: 0,
      z: 7.5,
      ease: "power4.inOut",
    });
  }

  handleResize() {
    this.isMobile = this.canvasParent.clientWidth < 600;

    this.renderer.setAspectRatio(this.canvasParent);
    this.camera.setAspectRatio(this.canvasParent);
  }

  handleTouchStart(event: TouchEvent) {
    if (!this.pointer) return;

    this.pointer.x =
      (event.changedTouches[0].clientX / this.canvasParent.clientWidth) * 2 - 1;
    this.pointer.y =
      -(event.changedTouches[0].clientY / this.canvasParent.clientHeight) * 2 +
      1;
  }

  handleMouseMove(event: MouseEvent) {
    if (!this.pointer) return;

    this.pointer.x = (event.clientX / this.canvasParent.clientWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / this.canvasParent.clientHeight) * 2 + 1;
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

          this.setPositionDefault(2);

          PubSub.publish(GL_PRESS_KEY, "ENJOY!");
          PubSub.publish(GL_SELECT_ITEM, item.itemData.id);
          PubSub.publish(UI_TOOLTIP_INTERACT, false);
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

  handleTooltip() {
    const currentScroll = document.documentElement.scrollTop;

    PubSub.publish(UI_TOOLTIP_INTERACT, currentScroll > SCROLL_HEIGHT);
  }

  setPositionDefault(duration: number, init?: boolean, reset?: boolean) {
    if (reset) document.documentElement.scrollTop = 0;

    gsap.to(this.camera.position, {
      duration: duration,
      ease: "power4.inOut",
      x: 0,
      y: 0,
      z: this.isMobile ? 12 : 10,
      onComplete: () => {
        if (init) {
          document.body.style.overflowY = "scroll";

          this.handleTooltip();
        }
      },
    });
  }

  render() {
    const delta = this.clock.getDelta();

    if (this.raycaster && this.pointer) {
      this.raycaster.setFromCamera(this.pointer, this.camera);

      this.intersections = this.raycaster.intersectObjects(this.scene.children);
      if (this.intersections.length > 0) {
        this.handleCursor();
      }
    }

    if (this.coin && this.coin.rotating) this.coin.inertia(delta);

    this.renderer.render(this.scene, this.camera);
  }
}
