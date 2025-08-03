import ViewLoad from '../view/viewLoad.js';
import saveService from '../services/saveService.js';

export default class LoadController {
  constructor(rootElement, onBack = null, onLoadPersonagem = null) {
    this.rootElement = rootElement;
    this.view = new ViewLoad(this);
    this.onBack = onBack;
    this.onLoadPersonagem = onLoadPersonagem;
  }

  render() {
    const saves = saveService.getAllPersonagens();
    this.view.renderLoad(saves);
    this.addEventListeners();
  }

  addEventListeners() {
    // Botão de voltar
    const buttonBack = document.getElementById('buttonBack');
    if (buttonBack) {
      buttonBack.onclick = () => {
        if (this.onBack) this.onBack();
      };
    }

    // Botão de excluir todos os saves
    const deleteAllBtn = document.getElementById('deleteAllSavesBtn');
    if (deleteAllBtn) {
      deleteAllBtn.onclick = () => {
        import('./modalDeleteAllSavesController.js').then(({ default: ModalDeleteAllSavesController }) => {
          const modalController = new ModalDeleteAllSavesController(
            this.rootElement,
            () => {
              saveService.setAllPersonagens([]);
              this.render();
            },
            null
          );
          modalController.showModal();
        });
      };
    }

    // Clique nos slots salvos
    document.querySelectorAll('.savebox').forEach(box => {
      box.onclick = () => {
        const slot = parseInt(box.getAttribute('data-slot'));
        const saves = saveService.getAllPersonagens();
        const personagem = saves[slot];
        if (personagem && this.onLoadPersonagem) {
          import('../model/personagemModel.js').then(({ default: Personagem }) => {
            const personagemInstancia = Object.assign(new Personagem(personagem.nome), personagem);
            personagemInstancia.garantirConfiguracoes(); // Garantir que as configurações existam
            window.saveSlot = slot;
            // Salva o slot como último personagem jogado
            localStorage.setItem('ultimo_slot', slot);
            this.onLoadPersonagem(personagemInstancia, slot);
          });
        }
      };
      // Clique direito para excluir
      box.oncontextmenu = (e) => {
        e.preventDefault();
        const slot = parseInt(box.getAttribute('data-slot'));
        const saves = saveService.getAllPersonagens();
        const personagem = saves[slot];
        if (personagem) {
          if (confirm(`Deseja excluir o save do personagem "${personagem.nome}"?`)) {
            saveService.removePersonagem(slot);
            this.render();
          }
        }
      };
    });
  }
} 