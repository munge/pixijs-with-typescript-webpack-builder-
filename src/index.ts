import "./style.scss";
import ApplicationView from "./pixi/application.view";

window.onload = () => {
  const applicationView = new ApplicationView(document.getElementById("pixiApp"));
};
