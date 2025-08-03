import ViewStages from '../view/viewStages.js';
import ModalNomePersonagem from '../controller/modalController.js';

export default class StagesController {
  constructor(rootElement, menuController) {
    this.rootElement = rootElement;
    this.menuController = menuController;
    this.view = new ViewStages(this);
    this.personagem = null;
  }

  setPersonagem(personagem) {
    this.personagem = personagem;
  }

  render() {
    console.log('Rendering stages'); // Log para depuração
    this.view.renderStages();
    
    // Só mostrar modal se não há personagem definido
    if (!this.personagem) {
      this.showModal();
    }
    
    this.addEventListeners();
  }

  showModal() {
    const modalController = new ModalNomePersonagem(
      this.rootElement,
      (personagem) => {
        console.log('Modal fechado, personagem criado:', personagem.nome);
        this.personagem = personagem;
      },
      this.menuController
    );
    modalController.showModal();
  }

  addEventListeners() {
    const buttonBack = document.getElementById('buttonBack');
    const buttonStopMusic = document.getElementById('buttonStopMusic');
    const boxStage1 = document.getElementById('fase1');
    const boxStage2 = document.getElementById('fase2');
    const boxStage3 = document.getElementById('fase3');

    if (buttonBack) {
      buttonBack.addEventListener('click', () => {
        console.log('Voltando ao menu');
        this.menuController.render();
      });
    } else {
      console.error('Elemento buttonBack não encontrado');
    }

    if (buttonStopMusic) {
      // Adicione funcionalidade para parar a música, se aplicável
      console.log('buttonStopMusic encontrado, funcionalidade não implementada');
    } else {
      console.error('Elemento buttonStopMusic não encontrado');
    }

    if (boxStage1) {
      boxStage1.addEventListener('click', () => {
        console.log('Fase 1 selecionada');
        if (this.personagem) {
          console.log(`Iniciando Fase 1 com personagem: ${this.personagem.nome}`);
          // Recupera o slot salvo
          const slot = localStorage.getItem('ultimo_slot');
          import('../controller/fase1Controller.js').then(({ default: Fase1Controller }) => {
            const fase1Controller = new Fase1Controller(this.rootElement, this.menuController, this.personagem, slot ? Number(slot) : undefined);
            fase1Controller.render();
          });
        } else {
          console.error('Nenhum personagem definido');
        }
      });
    } else {
      console.error('Elemento fase1 não encontrado');
    }

    if (boxStage2) {
      boxStage2.addEventListener('click', () => {
        console.log('Fase 2 selecionada');
        
        // Verificar se a fase 2 está desbloqueada
        if (this.personagem) {
          const progressoFase1 = this.personagem.getResumoFase(1);
          if (progressoFase1) {
            // Fase 2 está desbloqueada
            import('../controller/fase2Controller.js').then(({ default: Fase2Controller }) => {
              const fase2Controller = new Fase2Controller(this.rootElement, this.menuController, this.personagem);
              fase2Controller.render();
            });
            return;
          }
        }
        
        // Fase 2 está bloqueada
        console.log('Fase 2 bloqueada');
        alert('Fase 2 está bloqueada. Complete a Fase 1 para desbloquear!');
      });
    }

    if (boxStage3) {
      boxStage3.addEventListener('click', () => {
        // Verificar se a fase 3 está desbloqueada
        if (this.personagem) {
          const progressoFase2 = this.personagem.getResumoFase(2);
          if (progressoFase2 && progressoFase2.estrelas > 0) {
            // Fase 3 está desbloqueada
            import('../controller/fase3Controller.js').then(({ default: Fase3Controller }) => {
              const fase3Controller = new Fase3Controller(this.rootElement, this.menuController, this.personagem);
              fase3Controller.render();
            });
            return;
          }
        }
        // Fase 3 está bloqueada
        console.log('Fase 3 bloqueada');
        alert('Fase 3 está bloqueada. Complete a Fase 2 para desbloquear!');
      });
    }
  }
}