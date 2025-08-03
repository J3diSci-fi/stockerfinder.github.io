import ViewFase2 from '../view/viewFase2.js';

export default class Fase2Controller {
  constructor(rootElement, menuController, personagem) {
    this.rootElement = rootElement;
    this.menuController = menuController;
    this.personagem = personagem;
    this.view = new ViewFase2(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.panelVisible = false;
  }

  render() {
    // Limpar timer anterior se existir
    if (this.view.timerInterval) {
      clearInterval(this.view.timerInterval);
      this.view.timerInterval = null;
    }
    this.view.renderFase2();
    // document.addEventListener('keydown', this.handleKeyDown); // Remover atalho Esc
    setTimeout(() => {
      this.view.reabilitarBotaoExecutar();
    }, 100);
  }

  abrirMenuOpcoes() {
    if (!this.panelVisible) {
      this.panelVisible = true;
      this.view.showOptionsPanel();
      this.addPanelListeners();
      this.view.pausarTimer && this.view.pausarTimer();
    }
  }

  handleKeyDown(event) {
    // Remover lógica do Esc
  }

  addPanelListeners() {
    const btnContinue = document.getElementById('btnContinue');
    const btnRestart = document.getElementById('btnRestart');
    const btnExit = document.getElementById('btnExit');
    if (btnContinue) {
      btnContinue.onclick = () => {
        this.view.hideOptionsPanel();
        this.panelVisible = false;
        this.view.retomarTimer && this.view.retomarTimer();
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
    for (let cmd of comandos) {
      if (typeof cmd === 'object' && cmd.tipo === 'Loop') {
        for (let i = 0; i < cmd.vezes; i++) {
          comandosExpandidos.push(cmd.direcao);
        }
      } else {
        comandosExpandidos.push(cmd);
      }
    }
    import('../model/fase2Model.js').then(({ default: Fase2Model, posicoesItens }) => {
      let matriz = Fase2Model.matriz.map(row => row.slice());
      let pos = [...Fase2Model.posicaoInicial];
      let ordemColeta = Fase2Model.ordemColeta;
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
          : `<h2>Fase 2 concluída!</h2><div style="margin:16px 0;">${estrelasHTML}</div><p>Você ganhou ${estrelas} estrela${estrelas === 1 ? '' : 's'}!</p>`;
        popup.innerHTML = `
          <div style="background:#fff;padding:32px 24px;border-radius:16px;box-shadow:0 2px 16px rgba(0,0,0,0.2);text-align:center;min-width:320px;">
            ${msg}
            <button id="btnVoltarStages" style="margin-top:24px;padding:12px 32px;font-size:18px;border-radius:8px;background:#ffd700;border:none;cursor:pointer;">Voltar para Fases</button>
          </div>
        `;
        document.body.appendChild(popup);
        document.getElementById('btnVoltarStages').onclick = () => {
          document.body.removeChild(popup);
          // Limpar timer antes de sair
          if (this.view.timerInterval) {
            clearInterval(this.view.timerInterval);
            this.view.timerInterval = null;
          }
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
                this.personagem.registrarConclusaoFase(Fase2Model.id, estrelas, null, passos);
                this.personagem.registrarConclusaoFase(3, 0, null, null); // desbloqueia fase 3
                // Salvar progresso do personagem
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