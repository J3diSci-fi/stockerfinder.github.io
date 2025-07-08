export default class ViewMenu {
  constructor(controller) {
    this.controller = controller;
  }

  renderMenu() {
    this.controller.rootElement.innerHTML = `
      <div id="menu-image">
         <div id="menu">
          <button class="menu-button" id="startBtn">Novo Jogo</button>
          <button class="menu-button" id="instructionsBtn">Continuar</button>
          <button class="menu-button" id="loadBtn">Carregar</button>
          <button class="menu-button" id="optionsBtn">Opções</button>
          <button class="menu-button" id="creditsBtn">Créditos</button>
        </div>
      </div>
    `;
  }
}
