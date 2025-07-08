import ViewOpcoes from '../view/viewOpcoes.js';
import saveOptions from '../services/saveOptions.js';

export default class OptionsController {
  constructor(rootElement, onBack = null) {
    this.rootElement = rootElement;
    this.view = new ViewOpcoes(this);
    this.onBack = onBack;
    this.config = saveOptions.getOptions();
  }

  render() {
    this.config = saveOptions.getOptions();
    this.view.renderOpcoes(this.config);
    this.addEventListeners();
  }

  addEventListeners() {
    document.getElementById('backToMenu').onclick = () => {
      if (this.onBack) this.onBack();
    };
    document.getElementById('saveOptions').onclick = () => {
      saveOptions.setOptions(this.config);
      alert('Opções salvas!');
    };
    // Adicione aqui os listeners para sliders, checkboxes, etc.
    // Exemplo:
    document.getElementById('musicVolume').oninput = (e) => {
      this.config.musicVolume = Number(e.target.value);
    };
    document.getElementById('daltonicMode').onchange = (e) => {
      this.config.daltonicMode = e.target.checked;
    };
    document.getElementById('language').onchange = (e) => {
      this.config.language = e.target.value;
    };
    document.getElementById('resetProgress').onclick = () => {
      if (confirm('Tem certeza que deseja apagar todo o progresso?')) {
        localStorage.clear();
        alert('Progresso apagado!');
        location.reload();
      }
    };
    document.getElementById('showControls').onclick = () => {
      alert('Use as setas para mover e pegue os itens corretos!');
    };
    document.getElementById('helpMode').onchange = (e) => {
      this.config.helpMode = e.target.checked;
    };
  }
} 