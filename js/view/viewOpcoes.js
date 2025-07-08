export default class ViewOpcoes {
  constructor(controller) {
    this.controller = controller;
  }

  renderOpcoes(config = {}) {
    this.controller.rootElement.innerHTML = `
      <div class="opcoes-background-options">
        <div class="opcoes-options-container">
          <h1 class="opcoes-titleh1opcoes">OPÇÕES</h1>

          <div class="opcoes-option-group">
            <label for="musicVolume">🔊 Música:</label>
            <input type="range" id="musicVolume" min="0" max="100" value="${config.musicVolume ?? 50}">
          </div>

          <div class="opcoes-option-group">
            <label for="helpMode">❓ Ativar Ajuda:</label>
            <input type="checkbox" id="helpMode" ${config.helpMode ? 'checked' : ''}>
          </div>

          <div class="opcoes-option-group">
            <label for="daltonicMode">🌈 Modo Daltônico:</label>
            <input type="checkbox" id="daltonicMode" ${config.daltonicMode ? 'checked' : ''}>
          </div>

          <div class="opcoes-option-group">
            <label>⌨️ Controles:</label>
            <button id="showControls" class="opcoes-btn opcoes-btn-controles">Ver</button>
          </div>

          <div class="opcoes-option-group">
            <label for="language">🌐 Idioma:</label>
            <select id="language">
              <option value="pt" ${config.language === 'pt' ? 'selected' : ''}>Português</option>
              <option value="en" ${config.language === 'en' ? 'selected' : ''}>Inglês</option>
            </select>
          </div>

          <div class="opcoes-option-group">
            <button id="resetProgress" class="opcoes-btn opcoes-btn-reset">🗑️ Resetar Progresso</button>
          </div>

          <div class="opcoes-option-group opcoes-version">
            <span>Versão: 1.0.0</span>
          </div>

          <div class="opcoes-option-group">
            <button id="saveOptions" class="opcoes-btn opcoes-btn-salvar">Salvar</button>
            <button id="backToMenu" class="opcoes-btn opcoes-btn-voltar">Voltar</button>
          </div>
        </div>
      </div>
    `;
  }
} 