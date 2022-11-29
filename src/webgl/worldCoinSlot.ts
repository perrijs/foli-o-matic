import { Mesh, MeshBasicMaterial, PlaneGeometry, Group } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";

import { Renderer } from "./globals/Renderer";
import { Scene } from "./globals/Scene";
import { Camera } from "./globals/Camera";
import { AmbientLight } from "./globals/AmbientLight";
import { DirectionalLight } from "./globals/DirectionalLight";
import { GL_INSERT_COIN, GL_START_VENDING_MACHINE } from "./config/topics";

export class worldCoinSlot {
  renderer: Renderer;
  camera: Camera;
  scene: Scene;
  ambientLight: AmbientLight;
  directionalLight: DirectionalLight;

  gltfLoader: GLTFLoader;
  coin?: Group;
  canvasParent: HTMLDivElement;

  constructor(canvasParent: HTMLDivElement) {
    this.renderer = new Renderer();
    this.camera = new Camera();
    this.scene = new Scene();
    this.ambientLight = new AmbientLight();
    this.directionalLight = new DirectionalLight();

    this.gltfLoader = new GLTFLoader();

    this.canvasParent = canvasParent;

    this.load();
  }

  loadModel(url: string) {
    return new Promise<GLTF>((resolve) => {
      this.gltfLoader.load(url, resolve);
    });
  }

  async load() {
    const gltf = await this.loadModel("/models/placeholder_coin.glb");

    this.coin = gltf.scene;
    this.coin.position.z = 1.5;
    this.coin.rotation.x = Math.PI / 2;
    this.coin.rotation.z = Math.PI / 2;
    this.coin.scale.setScalar(0.25);

    this.scene.add(this.coin);

    this.init();
  }

  init() {
    this.renderer.setAspectRatio(this.canvasParent);
    this.camera.setAspectRatio(this.canvasParent);

    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);

    this.camera.position.set(0, 2, 3);
    this.camera.lookAt(0, 0, 0);

    this.renderer.setAnimationLoop(() => this.render());
    this.canvasParent.appendChild(this.renderer.domElement);

    this.addEntities();

    this.handleSubscriptions();
  }

  handleSubscriptions() {
    PubSub.subscribe(GL_INSERT_COIN, () => this.insertCoin());
  }

  addEntities() {
    const planeGeometry = new PlaneGeometry(0.25, 1, 1);
    const planeMaterial = new MeshBasicMaterial({ color: 0x000000 });
    const plane = new Mesh(planeGeometry, planeMaterial);
    this.scene.add(plane);
  }

  insertCoin() {
    if (!this.coin) return;

    gsap.to(this.coin.position, {
      delay: 0,
      duration: 3,
      z: -1,
      onComplete: () => {
        document.body.style.overflow = "scroll";
        PubSub.publish(GL_START_VENDING_MACHINE);
      },
    });
  }

  render() {
    if (!this.coin) return;

    this.coin.rotation.x -= 0.01;
    this.renderer.render(this.scene, this.camera);
  }
}
