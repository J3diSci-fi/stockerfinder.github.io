import { createDeleteAllSavesModal } from '../view/viewModalDeleteAllSaves.js';

export default class ModalDeleteAllSavesController {
  constructor(rootElement, onConfirm = null, onCancel = null) {
    this.rootElement = rootElement;
    this.onConfirm = onConfirm;
    this.onCancel = onCancel;
    this.modal = null;
  }

  showModal() {
    this.modal = createDeleteAllSavesModal();
    this.rootElement.appendChild(this.modal);
    setTimeout(() => this.modal.classList.add('show'), 10);

    const confirmButton = this.modal.querySelector('#modal-deleteall-confirm');
    const cancelButton = this.modal.querySelector('#modal-deleteall-cancel');

    if (confirmButton) {
      confirmButton.onclick = () => {
        this.closeModal();
        if (this.onConfirm) this.onConfirm();
      };
    }
    if (cancelButton) {
      cancelButton.onclick = () => {
        this.closeModal();
        if (this.onCancel) this.onCancel();
      };
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.classList.remove('show');
      setTimeout(() => {
        if (this.modal && this.rootElement.contains(this.modal)) {
          this.rootElement.removeChild(this.modal);
        }
        this.modal = null;
      }, 200);
    }
  }
} 