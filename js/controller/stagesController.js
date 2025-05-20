import ViewStages from '../view/viewStages.js';
import { showBasicModal } from '../view/viewModals.js';

export default class StagesController {
  constructor(rootElement,menuController) {
    this.rootElement = rootElement;
    this.menuController = menuController;
    this.view = new ViewStages(this);
    
  }

  render() {
    this.view.renderStages();
    showBasicModal(this.rootElement);
    this.addEventListeners();
  }

  addEventListeners() {
    this.buttonBack = document.getElementById("buttonBack");
    this.buttonStopMusic = document.getElementById("buttonStopMusic");

    this.boxStage1 = document.getElementById("fase1"); 
    this.boxStage2 = document.getElementById("fase2"); 
    this.boxStage3 = document.getElementById("fase3");
    
    
    this.buttonBack.addEventListener('click', () => {
      this.menuController.render();
    });
  }
}
