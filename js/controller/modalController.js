import { createBasicModal } from '../view/viewModals.js';
import Personagem from '../model/personagemModel.js';
import saveService from '../services/saveService.js';

export default class ModalNomePersonagem {
  constructor(rootElement, onPersonagemCriado = null,menuController) {
    this.rootElement = rootElement;
    this.onPersonagemCriado = onPersonagemCriado;
    this.modal = null;
    this.saveService = saveService;
    this.menuController = menuController;
  }

  gerarNomeAleatorio() {
    const numero = Math.floor(1000 + Math.random() * 9000); // 4 dígitos
    return `Player${numero}`;
  }

  showModal() {
    this.modal = createBasicModal();
    this.rootElement.appendChild(this.modal);

    // Animação suave
    requestAnimationFrame(() => {
      this.modal.classList.add('show');
    });

    const confirmButton = this.modal.querySelector('#modal-confirm');
    const cancelButton = this.modal.querySelector('#modal-cancel');
    const inputPlayerName = this.modal.querySelector('#playerNameInput');

    if (!confirmButton || !cancelButton || !inputPlayerName) {
      console.error('Elementos do modal não encontrados');
      return;
    }

    confirmButton.onclick = () => {
      let nome = inputPlayerName.value.trim();
      if (!nome) {
        nome = this.gerarNomeAleatorio();
        console.log(`Nenhum nome digitado. Gerando nome aleatório: ${nome}`);
      }
      if (this.saveService.personagemExists(nome)) {
        alert('Já existe um personagem com esse nome!');
        return;
      }
      const personagem = new Personagem(nome);
      this.salvarPersonagem(personagem);
      this.closeModal(personagem);
    };

    cancelButton.onclick = () => {
      this.menuController.render();
    };
  }

  salvarPersonagem(personagem) {
    // Usar o novo método para adicionar personagem ao final da lista
    const slotIndex = this.saveService.addNewPersonagem(personagem);
    if (slotIndex !== -1) {
      window.saveSlot = slotIndex;
      console.log(`Personagem salvo no slot ${slotIndex + 1}`);
    } else {
      console.error('Erro ao salvar personagem');
    }
  }

  closeModal(personagemCriado) {
    if (this.modal) {
      this.modal.classList.remove('show');
      setTimeout(() => {
        if (this.modal && this.rootElement.contains(this.modal)) {
          this.rootElement.removeChild(this.modal);
        }
        this.modal = null;
        if (this.onPersonagemCriado && personagemCriado) {
          this.onPersonagemCriado(personagemCriado);
        }
      }, 300);
    }
  }
}
