export function createDeleteAllSavesModal() {
  const modal = document.createElement('div');
  modal.classList.add('modal-overlay', 'modal-delete-all-saves');
  modal.innerHTML = `
    <div class="modal-box">
      <div class="modal-header">
        <img src="./assets/images/icons/reset.png" alt="Excluir Saves" class="modal-icon-delete"/>
        <p class="modal-message">Tem certeza que deseja <strong>excluir TODOS os saves?</strong><br>Essa ação <span style='color:red;'>não pode ser desfeita</span>.</p>
      </div>
      <div class="modal-actions">
        <button id="modal-deleteall-confirm" class="btn-danger">Excluir Tudo</button>
        <button id="modal-deleteall-cancel">Cancelar</button>
      </div>
    </div>
  `;
  return modal;
} 