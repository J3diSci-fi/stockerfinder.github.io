import ViewLoad from '../view/viewLoad.js';
export default class LoadController{
  constructor(rootElement,menuController){
    this.rootElement = rootElement;
    this.menuController = menuController;
    this.view = new ViewLoad(this);
  }

  render(){
    this.view.renderLoad();
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