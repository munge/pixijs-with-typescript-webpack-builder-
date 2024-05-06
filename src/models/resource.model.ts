import { Texture } from "pixi.js";
import { BundlesEnum } from "../enums/bundles.enum";

export default class ResourcesModel {
  public loaded: any;
  constructor() {}

  getTexture(key: string, bundle: string = BundlesEnum.MAIN): Texture {
    return this.loaded[bundle][key];
  }

  getTextures(key: string, bundle: string = BundlesEnum.MAIN): Texture[] {
    // return this.loaded[bundle][key].animations["pixels_large"];
    return Object.values(this.loaded[bundle][key].textures);
  }
}
