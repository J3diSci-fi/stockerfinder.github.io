import MenuController from "./menuController.js";
import StagesController from "./stagesController.js";
import CreditsController from "./creditsController.js";
import LoadController from "./loadController.js";

export default class GameController {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.menuController = new MenuController(rootElement);
    this.stagesController = new StagesController(rootElement,this.menuController);
    this.creditsController = new CreditsController(rootElement,this.menuController);
    this.loadController = new LoadController(rootElement,this.menuController);
  }
  
  render() {
    this.menuController.render();
    this.menuController.setStagesController(this.stagesController);
    this.menuController.setCreditsController(this.creditsController);
    this.menuController.setLoadController(this.loadController);
  }
}
