import ViewCredits from '../view/viewCredits.js';

export default class CreditsController {
  constructor(rootElement,menuController) {
    this.rootElement = rootElement;
    this.menuController = menuController;
    this.view = new ViewCredits(this);
    
  }

  render() {
    this.view.renderCredits();
    this.addEventListeners();
  }

  addEventListeners() {
    this.buttonBack = document.getElementById("buttonBack");
    this.buttonStopMusic = document.getElementById("buttonStopMusic");
    
    this.buttonBack.addEventListener('click', () => {
      this.menuController.render();
    });
  }

}