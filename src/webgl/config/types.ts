import { Texture } from "three";

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface CoilData {
  id: string;
  position: Position;
}

export interface ButtonData {
  id: string;
  position: Position;
}

export interface ItemData {
  id: string;
  color: string;
  position: Position;
  slug: string;
}

export interface Textures {
  id: string;
  texture: Texture;
}
