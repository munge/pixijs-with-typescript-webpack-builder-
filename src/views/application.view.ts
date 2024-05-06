import { AnimatedSprite, Application, Assets, Container, Graphics, Sprite, Text } from "pixi.js";
import { RESOURCES } from "../global/global.config";
import { Manifest } from "../models/manifest.model";
import { BundlesEnum } from "../enums/bundles.enum";
import gsap from "gsap";

export default class ApplicationView {
  private MANIFEST: any = Manifest;
  private BG_COLOR: number = 0x333333;
  private BG_ALPHA: number = 1;
  private application: Application;
  public mainContainer: Container;

  constructor(private canvasParent: any, private BASE_WIDTH: number = 1000, private BASE_HEIGHT: number = 1000) {
    this.application = new Application();
    this.application
      .init({
        width: BASE_WIDTH,
        height: BASE_HEIGHT,
        antialias: true,
        autoDensity: false,
        resolution: 1, //devicePixelRatio,
        // resizeTo: window,
        // background: this.BG_COLOR,
        // backgroundAlpha: this.BG_ALPHA,
        // backgroundAlpha: 0,
        roundPixels: true,
      })
      .then(() => {
        canvasParent.appendChild(this.application.canvas);
        this.application.stage.addChild(this.mainContainer);

        // this.loadAssets([BundlesEnum.MAIN]).then((resources: any) => {
        this.loadAssets().then((resources: any) => {
          console.log(resources);
          RESOURCES.loaded = resources;

          this.draw();
          this.initListeners();
        });

        const gt: any = globalThis;
        gt.__PIXI_APP__ = this.application;
      });

    this.mainContainer = new Container();
    this.mainContainer.label = "main container";
  }

  private draw(): void {
    const g: Graphics = new Graphics();
    g.rect(0, 0, this.BASE_WIDTH, this.BASE_HEIGHT);
    g.fill({ color: this.BG_COLOR, alpha: this.BG_ALPHA });
    this.mainContainer.addChild(g);
    g.label = "background graphics";

    const sprite = new Sprite(RESOURCES.getTexture("background"));
    this.mainContainer.addChild(sprite);
    sprite.label = "background sprite";
    sprite.anchor.set(0.5);
    sprite.position.set(this.BASE_WIDTH * 0.5, this.BASE_HEIGHT * 0.5);

    const f22 = new Sprite(RESOURCES.getTexture("f22", BundlesEnum.BUNDLE_1));
    this.mainContainer.addChild(f22);
    f22.label = "f22";
    f22.scale.set(0.5);
    f22.anchor.set(0.5);
    f22.position.set(this.BASE_WIDTH * 0.5, this.BASE_HEIGHT * 0.5);
    f22.eventMode = "static";
    f22.cursor = "pointer";
    f22.on("pointerdown", () => {
      gsap.fromTo(f22, 0.1, { alpha: 1 }, { alpha: 0.5, yoyo: true, repeat: 1 });
    });

    const text = new Text({ text: "Fira Go Text", style: { fontFamily: "Firago Bold", fontSize: 36, fill: 0xffffff } });
    this.mainContainer.addChild(text);
    text.label = "test text";
    text.anchor.set(0.5);
    text.position.set(this.BASE_WIDTH * 0.5, 100);

    const guy = new AnimatedSprite(RESOURCES.getTextures("guy", BundlesEnum.BUNDLE_1));
    this.mainContainer.addChild(guy);
    guy.label = "guy animation";
    guy.loop = false;
    guy.animationSpeed = 0.1;
    guy.anchor.set(0.5, 1);
    guy.position.set(this.BASE_WIDTH * 0.5, this.BASE_HEIGHT);
    guy.eventMode = "static";
    guy.cursor = "pointer";
    guy.on("pointerdown", () => {
      guy.gotoAndPlay(0);
      gsap.fromTo(guy, 0.3, { y: this.BASE_HEIGHT }, { y: this.BASE_HEIGHT - 100, yoyo: true, repeat: 1 });
    });
  }
  private initListeners(): void {
    window.onresize = () => {
      this.resize();
    };
    this.resize();
  }

  private async loadAssets(bundles: string[] = []): Promise<void> {
    const manifest = this.MANIFEST;
    const bundlesToLoad = bundles.length == 0 ? manifest.bundles.map((bundle: any) => bundle.name) : bundles;

    await Assets.init({ manifest });

    return Assets.loadBundle(bundlesToLoad, (pr: any) => {
      console.log("progress: ", pr);
    });
  }

  private resize(): void {
    // scale by parent width or height
    if (this.application.canvas.parentElement) {
      const canvasParentBoundingBox = this.application.canvas.parentElement.getBoundingClientRect();
      const scale: number = Math.min(canvasParentBoundingBox.width / this.BASE_WIDTH, canvasParentBoundingBox.height / this.BASE_HEIGHT);
      this.application.canvas.style.transform = `scale(${scale})`;
    }
  }
}
