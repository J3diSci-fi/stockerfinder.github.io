import MenuController from "./menuController.js";
import StagesController from "./stagesController.js";
import CreditosController from "./creditosController.js";
import LoadController from './loadController.js';
import OptionsController from './optionsController.js';

export default class GameController {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.menuController = new MenuController(rootElement);
    this.stagesController = new StagesController(rootElement,this.menuController);
    this.creditosController = new CreditosController(rootElement, this.menuController);
    this.loadController = new LoadController(rootElement, () => this.menuController.render(), (personagem, slot) => {
      
      if (this.stagesController && typeof this.stagesController.setPersonagem === 'function') {
        this.stagesController.setPersonagem(personagem);
      }
      this.stagesController.render();
    });
    this.optionsController = new OptionsController(rootElement, () => this.menuController.render());
  }
  
  render() {
    // Popup de aviso de testes
    if (!localStorage.getItem('aviso_teste_exibido')) {
      const popup = document.createElement('div');
      popup.id = 'popupAvisoTeste';
      popup.style.position = 'fixed';
      popup.style.top = '0';
      popup.style.left = '0';
      popup.style.width = '100vw';
      popup.style.height = '100vh';
      popup.style.background = 'rgba(0,0,0,0.6)';
      popup.style.display = 'flex';
      popup.style.alignItems = 'center';
      popup.style.justifyContent = 'center';
      popup.style.zIndex = '3000';
      popup.innerHTML = `
        <div style="background:#fff;padding:32px 24px;border-radius:16px;box-shadow:0 2px 16px rgba(0,0,0,0.2);text-align:center;min-width:320px;max-width:90vw;">
          <h2>Aviso</h2>
          <p style="margin:16px 0 24px 0;font-size:1.1em;">Este jogo está em fase de testes (construção) e pode conter bugs.<br>Se encontrar algum problema, por favor, reporte ao desenvolvedor.</p>
          <button id="btnFecharAvisoTeste" style="margin-top:8px;padding:10px 32px;font-size:1.1em;border-radius:8px;background:#ffd700;border:none;cursor:pointer;">Entendi</button>
        </div>
      `;
      document.body.appendChild(popup);
      document.getElementById('btnFecharAvisoTeste').onclick = () => {
        popup.remove();
        localStorage.setItem('aviso_teste_exibido', '1');
      };
    }
    this.menuController.render();
    this.menuController.setStagesController(this.stagesController);
    this.menuController.setCreditosController(this.creditosController);
    this.menuController.setLoadController(this.loadController);
    this.menuController.setOptionsController(this.optionsController);
  }
}
