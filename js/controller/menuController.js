import ViewMenu from '../view/viewMenu.js';

export default class MenuController {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.view = new ViewMenu(this);
  }

  setStagesController(stagesController){
    this.stagesController = stagesController;
  }
  setCreditsController(creditsController){
    this.creditsController = creditsController;
  }

  setLoadController(loadController){
    this.loadController = loadController;
  }

  render() {
    this.view.renderMenu();
    this.addEventListeners();
  }

  addEventListeners() {
    const buttonStart = document.getElementById('startBtn');
    const buttonContinue = document.getElementById('instructionsBtn');
    const buttonLoad = document.getElementById('loadBtn');
    const optionsBtn = document.getElementById('optionsBtn');
    const creditsBtn = document.getElementById('creditsBtn');

    const playFocusSound = () => {
        const sound = new Audio('../assets/audio/button.mp3');
        sound.volume = 0.1;
        sound.play();
      };
  
      const playClickSound = () => {
        const sound = new Audio('../assets/audio/click.mp3');
        sound.volume = 0.1;
        sound.play();
      };

    buttonStart.addEventListener('mouseover', playFocusSound);
    buttonContinue.addEventListener('mouseover', playFocusSound);
    buttonLoad.addEventListener('mouseover', playFocusSound);
    optionsBtn.addEventListener('mouseover', playFocusSound);
    creditsBtn.addEventListener('mouseover', playFocusSound);

    buttonStart.addEventListener('click', playClickSound);
    buttonContinue.addEventListener('click', playClickSound);
    buttonLoad.addEventListener('click', playClickSound);
    optionsBtn.addEventListener('click', playClickSound);
    creditsBtn.addEventListener('click', playClickSound);

    buttonStart.onclick = () => {
      this.startGame();
    };

    buttonContinue.onclick = () => {
      this.continueGame();
    };

    buttonLoad.onclick = () => {
      this.loadGame();
    };

    optionsBtn.onclick = () => {
      this.openOptions();
    };

    creditsBtn.onclick = () => {
      this.showCredits();
    };

  }

  startGame() {
    this.stagesController.render();
  }

  continueGame(){
    alert('Use as setas para mover e pegue os itens corretos!');
  }

  loadGame() {
    this.loadController.render();
  }

  openOptions(){
    alert('Use as setas para mover e pegue os itens corretos!');
  }

  showCredits(){
    this.creditsController.render();
  }
}
