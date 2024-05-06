import "./style.scss";
import ApplicationView from "./views/application.view";

window.onload = () => {
  const applicationView = new ApplicationView(document.getElementById("pixiApp"));
};
