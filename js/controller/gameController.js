import MenuController from "./menuController.js";
import StagesController from "./stagesController.js";
import CreditosController from "./creditosController.js";
import LoadController from './loadController.js';
import OptionsController from './optionsController.js';

export default class GameController {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.menuController = new MenuController(rootElement);
    this.stagesController = new StagesController(rootElement,this.menuController);
    this.creditosController = new CreditosController(rootElement, this.menuController);
    this.loadController = new LoadController(rootElement, () => this.menuController.render(), (personagem, slot) => {
      
      if (this.stagesController && typeof this.stagesController.setPersonagem === 'function') {
        this.stagesController.setPersonagem(personagem);
      }
      this.stagesController.render();
    });
    this.optionsController = new OptionsController(rootElement, () => this.menuController.render());
  }
  
  render() {
    this.menuController.render();
    this.menuController.setStagesController(this.stagesController);
    this.menuController.setCreditosController(this.creditosController);
    this.menuController.setLoadController(this.loadController);
    this.menuController.setOptionsController(this.optionsController);
  }
}
