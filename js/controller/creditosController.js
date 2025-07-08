import ViewCreditos from '../view/viewCreditos.js';

export default class CreditosController {
  constructor(rootElement, menuController) {
    this.rootElement = rootElement;
    this.menuController = menuController;
    this.view = new ViewCreditos(this);
  }

  render() {
    this.view.renderCreditos();
    this.addEventListeners();
  }

  addEventListeners() {
    const buttonBack = document.getElementById('buttonBack');
    
    if (buttonBack) {
      buttonBack.addEventListener('click', () => {
        this.menuController.render();
      });
    }
  }
} 