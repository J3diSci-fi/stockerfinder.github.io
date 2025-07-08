import ViewFase3 from '../view/viewFase3.js';
export default class Fase3Controller {
  constructor(rootElement, menuController, personagem) {
    this.rootElement = rootElement;
    this.menuController = menuController;
    this.personagem = personagem;
    this.view = new ViewFase3(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.panelVisible = false;
  }
  render() {
    this.view.renderFase3();
    document.addEventListener('keydown', this.handleKeyDown);
    setTimeout(() => {
      this.view.reabilitarBotaoExecutar();
    }, 100);
  }
  handleKeyDown(event) {
    if (event.key === 'Escape' && !this.panelVisible) {
      this.panelVisible = true;
      this.view.showOptionsPanel();
      this.addPanelListeners();
    }
  }
  addPanelListeners() {
    const btnContinue = document.getElementById('btnContinue');
    const btnRestart = document.getElementById('btnRestart');
    const btnExit = document.getElementById('btnExit');
    if (btnContinue) {
      btnContinue.onclick = () => {
        this.view.hideOptionsPanel();
        this.panelVisible = false;
      };
    }
    if (btnRestart) {
      btnRestart.onclick = () => {
        this.panelVisible = false;
        this.view.limparPrateleira();
        this.render();
      };
    }
    if (btnExit) {
      btnExit.onclick = () => {
        document.removeEventListener('keydown', this.handleKeyDown);
        this.menuController.render();
      };
    }
  }
  executarComandos(comandos) {
    // Expande comandos do tipo loop para comandos simples
    let comandosExpandidos = [];
    let quantidadeLoops = 0;
    for (let cmd of comandos) {
      if (typeof cmd === 'object' && cmd.tipo === 'Loop') {
        quantidadeLoops++;
        for (let i = 0; i < cmd.vezes; i++) {
          comandosExpandidos.push(cmd.direcao);
        }
      } else {
        comandosExpandidos.push(cmd);
      }
    }
    // Exigir pelo menos 2 loops
    if (quantidadeLoops < 2) {
      if (this.view.mostrarRequisitoLoopPanel3) {
        this.view.mostrarRequisitoLoopPanel3();
      }
      this.view.reabilitarBotaoExecutar();
      return;
    }
    import('../model/fase3Model.js').then(({ default: Fase3Model }) => {
      let matriz = Fase3Model.matriz.map(row => row.slice());
      let pos = [...Fase3Model.posicaoInicial];
      let ordemColeta = Fase3Model.ordemColeta;
      let coletados = [];
      let coletadosPos = [];
      let erro = false;
      const passos = comandosExpandidos.length;
      matriz[pos[0]][pos[1]] = null;
      this.view.atualizarGrid(matriz);
      const delay = 350;
      let passo = 0;
      const mostrarPopupConclusao = (estrelas, maxPassos = false) => {
        let popup = document.createElement('div');
        popup.className = 'popup-conclusao-fase';
        popup.style.position = 'fixed';
        popup.style.top = '0';
        popup.style.left = '0';
        popup.style.width = '100vw';
        popup.style.height = '100vh';
        popup.style.background = 'rgba(0,0,0,0.6)';
        popup.style.display = 'flex';
        popup.style.alignItems = 'center';
        popup.style.justifyContent = 'center';
        popup.style.zIndex = '2000';
        let estrelasHTML = '';
        for (let i = 0; i < 3; i++) {
          if (i < estrelas) {
            estrelasHTML += `<img src="../assets/images/icons/estrela-preenchida.png" style="width:48px;height:48px;margin:0 4px;">`;
          } else {
            estrelasHTML += `<img src="../assets/images/icons/estrela-vazia.png" style="width:48px;height:48px;margin:0 4px;">`;
          }
        }
        let msg = maxPassos
          ? '<h2>Você atingiu o máximo de passos!</h2><p>Tente novamente com menos de 21 passos.</p>'
          : `<h2>Fase 3 concluída!</h2><div style="margin:16px 0;">${estrelasHTML}</div><p>Você ganhou ${estrelas} estrela${estrelas === 1 ? '' : 's'}!</p>`;
        popup.innerHTML = `
          <div style="background:#fff;padding:32px 24px;border-radius:16px;box-shadow:0 2px 16px rgba(0,0,0,0.2);text-align:center;min-width:320px;">
            ${msg}
            <button id="btnVoltarStages" style="margin-top:24px;padding:12px 32px;font-size:18px;border-radius:8px;background:#ffd700;border:none;cursor:pointer;">Voltar para Fases</button>
          </div>
        `;
        document.body.appendChild(popup);
        document.getElementById('btnVoltarStages').onclick = () => {
          document.body.removeChild(popup);
          if (this.menuController && this.menuController.stagesController) {
            this.menuController.stagesController.setPersonagem(this.personagem);
            this.menuController.stagesController.render();
          } else {
            this.menuController.render();
          }
        };
      };
      const andar = () => {
        if (passo >= comandosExpandidos.length) {
          matriz[pos[0]][pos[1]] = 'person.png';
          this.view.atualizarGrid(matriz);
          if (!erro && coletados.length === ordemColeta.length) {
            for (let i = 0; i < ordemColeta.length; i++) {
              if (coletados[i] !== ordemColeta[i]) {
                erro = true;
                break;
              }
            }
          } else if (!erro && coletados.length !== ordemColeta.length) {
            erro = true;
          }
          setTimeout(() => {
            if (erro) {
              this.view.showErroPanel();
            } else if (passos > 20) {
              mostrarPopupConclusao(0, true);
            } else {
              let estrelas = 1;
              if (passos <= 11) estrelas = 3;
              else if (passos <= 13) estrelas = 2;
              if (this.personagem && typeof this.personagem.registrarConclusaoFase === 'function') {
                this.personagem.registrarConclusaoFase(Fase3Model.id, estrelas, null, passos);
                // desbloquear próxima fase se houver
                if (window.saveSlot !== undefined) {
                  import('../services/saveService.js').then(({ default: saveService }) => {
                    saveService.updatePersonagem(this.personagem, window.saveSlot);
                  });
                }
              }
              mostrarPopupConclusao(estrelas);
            }
          }, 400);
          return;
        }
        let [row, col] = pos;
        if (comandosExpandidos[passo] === 'Cima') row--;
        if (comandosExpandidos[passo] === 'Baixo') row++;
        if (comandosExpandidos[passo] === 'Esquerda') col--;
        if (comandosExpandidos[passo] === 'Direita') col++;
        if (row < 0 || row >= matriz.length || col < 0 || col >= matriz[0].length) {
          erro = true;
          matriz[pos[0]][pos[1]] = 'person.png';
          this.view.atualizarGrid(matriz);
          setTimeout(() => this.view.showErroPanel(), 400);
          return;
        }
        pos = [row, col];
        const valor = matriz[row][col];
        if (valor && valor !== 'person.png') {
          coletados.push(valor);
          coletadosPos.push([row, col]);
          matriz[row][col] = null;
          this.view.adicionarItemPrateleira(valor);
        }
        matriz[pos[0]][pos[1]] = 'person.png';
        this.view.atualizarGrid(matriz);
        if (passo < comandosExpandidos.length - 1) {
          setTimeout(() => {
            matriz[pos[0]][pos[1]] = null;
            this.view.atualizarGrid(matriz);
            passo++;
            andar();
          }, delay);
        } else {
          passo++;
          setTimeout(andar, delay);
        }
      };
      andar();
    });
  }
} 