import {
  Texture,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  EquirectangularReflectionMapping,
  MeshPhysicalMaterial,
} from "three";
import gsap from "gsap";

import { Renderer } from "../globals/Renderer";
import { Scene } from "../globals/Scene";
import { Camera } from "../globals/Camera";
import { AmbientLight } from "../globals/AmbientLight";
import { DirectionalLight } from "../globals/DirectionalLight";
import {
  LOAD_COMPLETE,
  GL_INSERT_COIN,
  GL_START_VENDING_MACHINE,
} from "../config/topics";
import { AssetController } from "../controllers/AssetController";

export class CoinSlot {
  assetController = AssetController.getInstance();

  renderer: Renderer;
  camera: Camera;
  scene: Scene;
  ambientLight: AmbientLight;
  directionalLight: DirectionalLight;

  hdr?: Texture;
  coin?: Group;
  canvasParent: HTMLDivElement;

  constructor(canvasParent: HTMLDivElement) {
    this.renderer = new Renderer();
    this.camera = new Camera();
    this.scene = new Scene();
    this.ambientLight = new AmbientLight();
    this.directionalLight = new DirectionalLight();

    this.canvasParent = canvasParent;

    this.handleSubscriptions();
  }

  init() {
    if (!this.assetController.models) return;

    this.coin = this.assetController.models[3].clone();
    this.coin.position.z = 2;
    this.coin.position.y = -2;
    this.coin.rotation.x = Math.PI / 2;
    this.coin.scale.setScalar(0.25);

    this.scene.add(this.coin);

    if (this.assetController.hdrs) this.hdr = this.assetController.hdrs[0];
    if (this.hdr) this.hdr.mapping = EquirectangularReflectionMapping;

    this.renderer.setAspectRatio(this.canvasParent);
    this.camera.setAspectRatio(this.canvasParent);

    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);

    this.camera.position.set(0, 0, 3);
    this.camera.lookAt(0, 0, 0);

    this.renderer.setAnimationLoop(() => this.render());
    this.canvasParent.appendChild(this.renderer.domElement);

    this.addEntities();
  }

  handleSubscriptions() {
    PubSub.subscribe(LOAD_COMPLETE, () => this.init());
    PubSub.subscribe(GL_INSERT_COIN, () => this.insertCoin());
    PubSub.subscribe(GL_START_VENDING_MACHINE, () =>
      this.renderer.setAnimationLoop(null)
    );
  }

  addEntities() {
    const metalGeometry = new PlaneGeometry(2, 3, 1);
    const metalMaterial = new MeshPhysicalMaterial({
      color: 0xf0f0f0,
      emissive: 0x000000,
      roughness: 0.75,
      metalness: 1,
      envMap: this.hdr,
      ior: 0,
    });

    const metal = new Mesh(metalGeometry, metalMaterial);
    metal.position.z = -0.01;
    this.scene.add(metal);

    const planeGeometry = new PlaneGeometry(0.25, 1.5, 1);
    const planeMaterial = new MeshBasicMaterial({ color: 0x000000 });
    const plane = new Mesh(planeGeometry, planeMaterial);
    this.scene.add(plane);
  }

  insertCoin() {
    if (!this.coin) return;

    const lerpUp = gsap.to(this.coin.position, {
      duration: 1,
      z: 2,
      y: 0,
      ease: "back.out(2.5)",
      onComplete: () => {
        if (!this.coin) return;

        gsap.to(this.coin.position, {
          duration: 1,
          z: -1,
          y: 0,
          ease: "back.in(1)",
          onComplete: () => {
            lerpUp.kill();

            PubSub.publish(GL_START_VENDING_MACHINE);
          },
        });
      },
    });

    gsap.to(this.coin.rotation, {
      delay: 0.75,
      duration: 0.5,
      z: Math.PI / 2,
      y: 0,
    });
  }

  render() {
    if (!this.coin) return;

    this.coin.rotation.x -= 0.1;
    this.renderer.render(this.scene, this.camera);
  }
}