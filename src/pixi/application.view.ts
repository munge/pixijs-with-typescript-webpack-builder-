import { Application, Container, Graphics, settings } from "pixi.js";

export default class ApplicationView {
  private BG_COLOR: number = 0x333333;
  private BG_ALPHA: number = 1;
  private application: Application;
  public mainContainer: Container;

  constructor(private canvasRef: any, private BASE_WIDTH: number = 1000, private BASE_HEIGHT: number = 1000) {
    settings.ROUND_PIXELS = true;
    this.application = new Application({
      width: BASE_WIDTH,
      height: BASE_HEIGHT,
      antialias: true,
      autoDensity: false,
      resolution: 1, //devicePixelRatio,
      resizeTo: window,
      // background: this.BG_COLOR,
      // backgroundAlpha: this.BG_ALPHA,
      backgroundAlpha: 0,
      view: canvasRef,
    });
    const gt: any = globalThis;
    gt.__PIXI_APP__ = this.application;

    this.mainContainer = new Container();
    this.application.stage.addChild(this.mainContainer);
    this.mainContainer.name = "main container";

    this.draw();
    this.initListeners();
  }

  private draw(): void {
    const g: Graphics = new Graphics();
    g.beginFill(this.BG_COLOR, this.BG_ALPHA);
    g.drawRect(0, 0, this.BASE_WIDTH, this.BASE_HEIGHT);
    g.endFill();
    this.mainContainer.addChild(g);
    g.name = "background graphics";
  }
  private initListeners(): void {
    window.onresize = () => {
      this.resize();
    };
    this.resize();
  }

  private resize(): void {
    // contain
    const scale: number = Math.min(this.application.view.width / this.BASE_WIDTH, this.application.view.height / this.BASE_HEIGHT);

    // cover
    // const scale: number = Math.max(
    //   this.application.view.width / this.BASE_WIDTH,
    //   this.application.view.height / this.BASE_HEIGHT
    // );

    this.mainContainer.scale.set(scale);
    this.mainContainer.position.set(
      (this.application.view.width - this.mainContainer.width) * 0.5,
      (this.application.view.height - this.mainContainer.height) * 0.5
    );
  }
}
