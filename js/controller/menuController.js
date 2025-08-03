import ViewMenu from '../view/viewMenu.js';

export default class MenuController {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.view = new ViewMenu(this);
  }

  setStagesController(stagesController){
    this.stagesController = stagesController;
  }
  setCreditosController(creditosController){
    this.creditsController = creditosController;
  }

  setLoadController(loadController){
    this.loadController = loadController;
  }

  setOptionsController(optionsController){
    this.optionsController = optionsController;
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
    if (this.stagesController && typeof this.stagesController.setPersonagem === 'function') {
      this.stagesController.setPersonagem(null); // força sempre abrir o modal
    }
    this.stagesController.render();
  }

  continueGame(){
    const slot = localStorage.getItem('ultimo_slot');
    if (slot !== null) {
      // Importa o personagem salvo
      import('../services/saveService.js').then(({ default: saveService }) => {
        const personagemData = saveService.getPersonagem(Number(slot));
        if (personagemData) {
          import('../model/personagemModel.js').then(({ default: Personagem }) => {
            const personagem = Object.assign(new Personagem(personagemData.nome), personagemData);
            if (personagem.garantirConfiguracoes) personagem.garantirConfiguracoes();
            if (this.stagesController && typeof this.stagesController.setPersonagem === 'function') {
              this.stagesController.setPersonagem(personagem);
              this.stagesController.render();
            }
          });
        } else {
          alert('Nenhum progresso encontrado para continuar!');
        }
      });
    } else {
      alert('Nenhum progresso encontrado para continuar!');
    }
  }

  loadGame() {
    if (this.loadController) {
      this.loadController.render();
    }
  }

  openOptions(){
    if (this.optionsController) {
      this.optionsController.render();
    }
  }

  showCredits(){
    this.creditsController.render();
  }
}
