export function createBasicModal() {
  const modal = document.createElement('div');
  modal.classList.add('modal-overlay');
  modal.innerHTML = `
    <div class="modal-box">
      <div class="modal-header">
        <img src="./assets/images/items/person.png" alt="Personagem" class="modal-character"/>
        <p class="modal-message">Bem-vindo ao <strong>Stocker Finder</strong>!<br>
        Como você gosta de ser chamado?</p>
        <input type="text" id="playerNameInput" placeholder="Digite seu nome..." class="modal-input"/>
      </div>
      <div class="modal-actions">
        <button id="modal-confirm">Confirmar</button>
        <button id="modal-cancel">Cancelar</button>
      </div>
    </div>
  `;
  return modal;
}