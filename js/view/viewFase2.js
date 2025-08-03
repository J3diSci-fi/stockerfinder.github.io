export default class ViewFase2 {
  constructor(controller) {
    this.controller = controller;
    this.blocosMontados = [];
    this.tempoRestante = 60;
    this.timerInterval = null;
  }

  renderFase2() {
    // Remover botão antigo se existir
    const oldBtn = document.getElementById('btnMenuLoop');
    if (oldBtn && oldBtn.parentNode) oldBtn.parentNode.removeChild(oldBtn);
    import('../model/fase2Model.js').then((module) => {
      const Fase2Model = module.default;
      const ordemColeta = Fase2Model.ordemColeta;
      const matriz = Fase2Model.matriz;
      const tamanho = Fase2Model.tamanhoGrid[0];

      let ordemHTML = '<div class="ordem-coleta-area"><div class="ordem-coleta-lista">';
      for (let i = 0; i < ordemColeta.length; i++) {
        ordemHTML += `<img src="../assets/images/items/${ordemColeta[i]}" class="ordem-coleta-img" alt="ordem">`;
      }
      ordemHTML += '</div></div>';

      let gridHTML = '<div class="fase1-grid">';
      for (let row = 0; row < tamanho; row++) {
        for (let col = 0; col < tamanho; col++) {
          let cellContent = '';
          const valor = matriz[row][col];
          if (valor === 'person.png') {
            cellContent = `<img src="../assets/images/items/person.png" class="personagem-img" alt="Personagem">`;
          } else if (valor) {
            cellContent = `<img src="../assets/images/items/${valor}" class="item-img" alt="Item">`;
          }
          gridHTML += `<div class="grid-cell" data-row="${row}" data-col="${col}">${cellContent}</div>`;
        }
      }
      gridHTML += '</div>';

      let prateleiraHTML = `
        <div class="prateleira-grid" id="prateleiraGrid">
          <div class="prateleira-item" data-pos="0"></div>
          <div class="prateleira-item" data-pos="1"></div>
          <div class="prateleira-item" data-pos="2"></div>
          <div class="prateleira-item" data-pos="3"></div>
          <div class="prateleira-item" data-pos="4"></div>
          <div class="prateleira-item" data-pos="5"></div>
          <div class="prateleira-item" data-pos="6"></div>
          <div class="prateleira-item" data-pos="7"></div>
          <div class="prateleira-item" data-pos="8"></div>
        </div>
      `;

      let comandosHTML = `
        <div class="comandos-area" style="position:relative; height:80px;">
          <button id="btnExcluirUltimo" class="excluir-btn">
            <img src="../assets/images/icons/backx.png" alt="Excluir Último" width="32" height="32">
          </button>
          <button id="btnResetar" class="resetar-btn">
            <img src="../assets/images/icons/reset.png" alt="Resetar" width="32" height="32">
          </button>
          <button id="btnExecutar" class="executar-btn">Executar</button>
          <div id="comandosVisual" style="position:absolute; left:15.5px; top:11px; width:100%; height:64px; pointer-events:none;"></div>
        </div>
      `;

      this.controller.rootElement.innerHTML = `
        <div class="background-fase1">
          <div id="playerNome" style="position:absolute; top:0px; right:32px; color:#fff; font-size:1.1em; font-weight:bold; text-shadow:1px 1px 4px #000; z-index:11;">Player</div>
          <div id="timerFase2" style="position:absolute; top:20px; right:32px; background:rgba(0,0,0,0.7); color:#fff; font-size:1.5em; padding:6px 18px; border-radius:12px; z-index:10;">01:00</div>
          <div id="avisoLoopFase2" style="position:absolute; top:90px; right:770px; background:rgba(255,193,7,0.95); color:#222; font-size:12px; padding:6px 18px; border-radius:12px; z-index:10; font-weight:bold; box-shadow:0 2px 8px rgba(0,0,0,0.08);">Utilize o loop pelo menos 1 vez</div>
          ${ordemHTML}
          ${gridHTML}
          ${prateleiraHTML}
          ${comandosHTML}
          <div class="commands-buttons">
            <button id="btnTop" class="command-btn"><img src="../assets/images/commands/button_top.png" alt="Cima"></button>
            <button id="btnLeft" class="command-btn"><img src="../assets/images/commands/button_left.png" alt="Esquerda"></button>
            <button id="btnDown" class="command-btn"><img src="../assets/images/commands/button_down.png" alt="Baixo"></button>
            <button id="btnRight" class="command-btn"><img src="../assets/images/commands/button_right.png" alt="Direita"></button>
            <button id="btnLoop" class="command-btn" style="position:absolute; left:875px; top:20px;"><img src="../assets/images/commands/loop.png" alt="Loop"></button>
          </div>
          <div id="optionsPanel" class="options-panel" style="display:none;">
            <div class="options-box">
              <h2>Painel de Opções</h2>
              <button id="btnContinue">Continuar</button>
              <button id="btnRestart">Reiniciar</button>
              <button id="btnExit">Sair</button>
            </div>
          </div>
          <div id="erroPanel" class="options-panel" style="display:none;">
            <div class="options-box">
              <h2>Ordem Incorreta!</h2>
              <p>Você coletou os itens na ordem errada. Tente novamente!</p>
              <button id="btnTentarNovamente">Tentar Novamente</button>
            </div>
          </div>
          <div id="tempoEsgotadoPanel2" class="options-panel" style="display:none; z-index:1001;">
            <div class="options-box">
              <h2>Tempo esgotado!</h2>
              <p>Você não concluiu a fase a tempo.</p>
              <button id="btnTentarNovamenteTempo2">Tentar novamente</button>
            </div>
          </div>
        </div>
      `;
      // Adicionar botão de menu após o container existir
      const container = document.querySelector('.background-fase1');
      if (container && !document.getElementById('btnMenuLoop')) {
        const btn = document.createElement('button');
        btn.id = 'btnMenuLoop';
        btn.style.position = 'absolute';
        btn.style.top = '20px';
        btn.style.left = '20px';
        btn.style.width = '56px';
        btn.style.height = '56px';
        btn.style.zIndex = '1002';
        btn.style.background = 'none';
        btn.style.border = '1px solid #333';
        btn.style.borderRadius = '8px';
        btn.style.cursor = 'pointer';
        btn.innerHTML = '<img src="../assets/images/game/hamburger.png" alt="Menu" style="width: 100%; height: 100%; object-fit: contain; pointer-events: none;" />';
        btn.onclick = () => {
          if (this.controller && typeof this.controller.abrirMenuOpcoes === 'function') {
            this.controller.abrirMenuOpcoes();
          }
        };
        container.prepend(btn);
      }

      this.preencherPrateleiraInicial();
      this.comandos = [];
      const atualizarComandosVisual = () => {
        const comandosDiv = document.getElementById('comandosVisual');
        if (!comandosDiv) return;
        comandosDiv.innerHTML = '';
        for (let i = 0; i < this.comandos.length; i++) {
          if (i >= 20) break;
          let img = document.createElement('img');
          let cmd = this.comandos[i];
          let src = '';
          if (typeof cmd === 'object' && cmd.tipo === 'Loop') {
            src = '../assets/images/commands/loop.png';
            img.alt = `Loop ${cmd.direcao} x${cmd.vezes}`;
            img.title = `Repetir ${cmd.direcao} ${cmd.vezes}x`;
          } else {
            if (cmd === 'Cima') src = '../assets/images/commands/top.png';
            if (cmd === 'Baixo') src = '../assets/images/commands/down.png';
            if (cmd === 'Esquerda') src = '../assets/images/commands/left.png';
            if (cmd === 'Direita') src = '../assets/images/commands/right.png';
            img.alt = cmd;
            img.title = cmd;
          }
          img.src = src;
          img.style.width = '32px';
          img.style.height = '32px';
          img.style.position = 'absolute';
          img.style.left = ((i % 10) * 34.5) + 'px';
          img.style.top = (i < 10 ? 0 : 34) + 'px';
          comandosDiv.appendChild(img);
        }
      };
      document.getElementById('btnTop').onclick = () => { if (this.comandos.length < 20) { this.comandos.push('Cima'); atualizarComandosVisual(); } };
      document.getElementById('btnLeft').onclick = () => { if (this.comandos.length < 20) { this.comandos.push('Esquerda'); atualizarComandosVisual(); } };
      document.getElementById('btnDown').onclick = () => { if (this.comandos.length < 20) { this.comandos.push('Baixo'); atualizarComandosVisual(); } };
      document.getElementById('btnRight').onclick = () => { if (this.comandos.length < 20) { this.comandos.push('Direita'); atualizarComandosVisual(); } };
      document.getElementById('btnLoop').onclick = () => {
        if (this.comandos.length < 20) {
          this.abrirModalLoop((direcao, vezes) => {
            if (["Cima", "Baixo", "Esquerda", "Direita"].includes(direcao) && vezes > 0) {
              this.comandos.push({ tipo: 'Loop', direcao, vezes });
              atualizarComandosVisual();
            }
          });
        }
      };
      document.getElementById('btnExecutar').onclick = () => { 
        const btnExecutar = document.getElementById('btnExecutar');
        const btnExcluirUltimo = document.getElementById('btnExcluirUltimo');
        const btnResetar = document.getElementById('btnResetar');
        btnExecutar.disabled = true;
        btnExecutar.style.opacity = '0.6';
        btnExecutar.style.cursor = 'not-allowed';
        btnExcluirUltimo.disabled = true;
        btnExcluirUltimo.style.opacity = '0.6';
        btnExcluirUltimo.style.cursor = 'not-allowed';
        btnResetar.disabled = true;
        btnResetar.style.opacity = '0.6';
        btnResetar.style.cursor = 'not-allowed';
        // Verifica se há pelo menos um comando de loop
        const usouLoop = this.comandos.some(cmd => typeof cmd === 'object' && cmd.tipo === 'Loop');
        if (!usouLoop) {
          this.mostrarRequisitoLoopPanel();
          this.reabilitarBotaoExecutar();
          return;
        }
        this.controller.executarComandos(this.comandos); 
      };
      document.getElementById('btnExcluirUltimo').onclick = () => { 
        if (this.comandos.length > 0) { 
          this.comandos.pop(); 
          atualizarComandosVisual(); 
        } 
      };
      document.getElementById('btnResetar').onclick = () => { 
        this.comandos = []; 
        atualizarComandosVisual(); 
      };
      atualizarComandosVisual();

      // Timer Fase 2
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.tempoRestante = 60;
      const timerDiv = document.getElementById('timerFase2');
      const atualizarTimer = () => {
        const min = String(Math.floor(this.tempoRestante / 60)).padStart(2, '0');
        const seg = String(this.tempoRestante % 60).padStart(2, '0');
        timerDiv.textContent = `${min}:${seg}`;
      };
      atualizarTimer();
      this.timerInterval = setInterval(() => {
        this.tempoRestante--;
        atualizarTimer();
        if (this.tempoRestante <= 0) {
          clearInterval(this.timerInterval);
          this.mostrarTempoEsgotadoPanel2();
        }
      }, 1000);

      // Atualizar nome do player
      const nome = this.controller.personagem && this.controller.personagem.nome ? this.controller.personagem.nome : 'Player';
      const playerNomeDiv = document.getElementById('playerNome');
      if (playerNomeDiv) playerNomeDiv.textContent = nome;
    });
  }

  atualizarGrid(matriz) {
    const tamanho = matriz.length;
    for (let row = 0; row < tamanho; row++) {
      for (let col = 0; col < tamanho; col++) {
        const cell = document.querySelector(`.grid-cell[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
          cell.innerHTML = '';
          const valor = matriz[row][col];
          if (valor === 'person.png') {
            cell.innerHTML = `<img src="../assets/images/items/person.png" class="personagem-img" alt="Personagem">`;
          } else if (valor) {
            cell.innerHTML = `<img src="../assets/images/items/${valor}" class="item-img" alt="Item">`;
          }
        }
      }
    }
  }

  showOptionsPanel() {
    document.getElementById('optionsPanel').style.display = 'flex';
    // Ocultar o botão de menu
    const menuBtn = document.getElementById('btnMenuLoop');
    if (menuBtn) {
      menuBtn.style.display = 'none';
    }
  }

  hideOptionsPanel() {
    document.getElementById('optionsPanel').style.display = 'none';
    // Mostrar o botão de menu novamente
    const menuBtn = document.getElementById('btnMenuLoop');
    if (menuBtn) {
      menuBtn.style.display = 'block';
    }
  }

  showErroPanel() {
    document.getElementById('erroPanel').style.display = 'flex';
    document.getElementById('btnTentarNovamente').onclick = () => {
      this.hideErroPanel();
      // Limpar timer antes de reiniciar
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
      this.controller.render();
    };
  }

  hideErroPanel() {
    document.getElementById('erroPanel').style.display = 'none';
  }

  reabilitarBotaoExecutar() {
    const btnExecutar = document.getElementById('btnExecutar');
    const btnExcluirUltimo = document.getElementById('btnExcluirUltimo');
    const btnResetar = document.getElementById('btnResetar');
    if (btnExecutar) {
      btnExecutar.disabled = false;
      btnExecutar.style.opacity = '1';
      btnExecutar.style.cursor = 'pointer';
    }
    if (btnExcluirUltimo) {
      btnExcluirUltimo.disabled = false;
      btnExcluirUltimo.style.opacity = '1';
      btnExcluirUltimo.style.cursor = 'pointer';
    }
    if (btnResetar) {
      btnResetar.disabled = false;
      btnResetar.style.opacity = '1';
      btnResetar.style.cursor = 'pointer';
    }
  }

  adicionarItemPrateleira(itemName) {
    const prateleiraGrid = document.getElementById('prateleiraGrid');
    if (!prateleiraGrid) return;
    const items = prateleiraGrid.querySelectorAll('.prateleira-item');
    for (let i = 0; i < items.length; i++) {
      if (!items[i].classList.contains('ocupado')) {
        items[i].classList.add('ocupado');
        items[i].innerHTML = `<img src="../assets/images/items/${itemName}" alt="${itemName}">`;
        break;
      }
    }
  }

  limparPrateleira() {
    const prateleiraGrid = document.getElementById('prateleiraGrid');
    if (!prateleiraGrid) return;
    const items = prateleiraGrid.querySelectorAll('.prateleira-item');
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('ocupado');
      items[i].innerHTML = '';
    }
  }

  preencherPrateleiraInicial() {
    const produtosIniciais = [
      'morango.png',
      'pote2.png', 
      'creme.png',
      'morango.png',
      'pote2.png',
      'creme.png'
    ];
    const prateleiraGrid = document.getElementById('prateleiraGrid');
    if (!prateleiraGrid) return;
    const items = prateleiraGrid.querySelectorAll('.prateleira-item');
    for (let i = 0; i < 6; i++) {
      if (items[i]) {
        items[i].classList.add('ocupado');
        items[i].innerHTML = `<img src="../assets/images/items/${produtosIniciais[i]}" alt="${produtosIniciais[i]}">`;
      }
    }
  }

  abrirModalLoop(callback) {
    // Remove modal antigo se existir
    this.fecharModalLoop();
    // Cria o modal
    const modal = document.createElement('div');
    modal.id = 'modalLoop';
    modal.style.position = 'fixed';
    modal.style.left = '50%';
    modal.style.top = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.zIndex = '1000';
    modal.style.background = 'rgba(60, 60, 60, 0.9)'; // cinza mais sólido
    modal.style.borderRadius = '16px';
    modal.style.boxShadow = '0 2px 16px rgba(254, 241, 219, 0.9)';
    modal.style.padding = '32px 32px 24px 32px';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.alignItems = 'center';
    // Layout do controle melhorado
    modal.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; min-width: 320px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="../assets/images/commands/loop.png" alt="Loop" style="width: 48px; height: 48px; animation: loopSpin 1.2s linear infinite alternate;">
          <h2 style="margin: 0; color: #ffb300;">Configurar Loop</h2>
          <button id="btnFecharLoop" style="background: none; border: none; font-size: 1.5em; color: #888; cursor: pointer; margin-left: 12px;">&times;</button>
        </div>
        <div style="font-size: 1em; color: #fff; margin-bottom: 8px;">Escolha a direção e o número de repetições.</div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
          <!-- Linha superior: seta para cima -->
          <div style="display: flex; justify-content: center;">
            <button id="setaCimaLoop" class="seta-loop-btn" style="background: transparent; border: none; padding: 0; margin: 0; border-radius: 8px; transition: all 0.2s; cursor: pointer;"><img src="../assets/images/commands/button_top.png" width="40" height="40"></button>
          </div>
          
          <!-- Linha do meio: seta esquerda, centro vazio, seta direita -->
          <div style="display: flex; align-items: center; gap: 32px;">
            <button id="setaEsquerdaLoop" class="seta-loop-btn" style="background: transparent; border: none; padding: 0; margin: 0; border-radius: 8px; transition: all 0.2s; cursor: pointer;"><img src="../assets/images/commands/button_left.png" width="40" height="40"></button>
            <div style="width: 40px; height: 40px;"></div>
            <button id="setaDireitaLoop" class="seta-loop-btn" style="background: transparent; border: none; padding: 0; margin: 0; border-radius: 8px; transition: all 0.2s; cursor: pointer;"><img src="../assets/images/commands/button_right.png" width="40" height="40"></button>
          </div>
          
          <!-- Linha inferior: seta para baixo -->
          <div style="display: flex; justify-content: center;">
            <button id="setaBaixoLoop" class="seta-loop-btn" style="background: transparent; border: none; padding: 0; margin: 0; border-radius: 8px; transition: all 0.2s; cursor: pointer;"><img src="../assets/images/commands/button_down.png" width="40" height="40"></button>
          </div>
          
          <!-- Controles de repetição abaixo da seta para baixo -->
          <div style="display: flex; flex-direction: column; align-items: center; margin-top: 4px;">
            <div style="font-size: 0.9em; color: #fff; margin-bottom: 2px;">Repetições</div>
            <div style="display: flex; align-items: center; gap: 3px;">
              <button id="btnMenosLoop" style="font-size:1.2em; width:28px; height:28px; background: transparent; border: none; cursor: pointer;">-</button>
              <input id="inputVezesLoop" type="number" min="1" max="20" value="2" style="width: 40px; text-align: center; font-size: 1.1em; border-radius: 6px; border: 1px solid #aaa; padding: 3px;" />
              <button id="btnMaisLoop" style="font-size:1.2em; width:28px; height:28px; background: transparent; border: none; cursor: pointer;">+</button>
            </div>
          </div>
        </div>
        <div id="previewLoop" style="margin: 12px 0; font-size: 1.1em; color: #ffffff;">Repetir Cima por 2 vezes</div>
        <button id="btnConfirmarLoop" style="margin-top: 8px; padding: 10px 32px; font-size:1.1em; border-radius:8px; border:none; background:#4caf50; color:white; cursor:pointer;">Adicionar Loop</button>
      </div>
    `;
    document.body.appendChild(modal);
    // Lógica de seleção de direção
    let direcaoSelecionada = 'Cima';
    let vezesSelecionado = 2;
    const setas = {
      'Cima': document.getElementById('setaCimaLoop'),
      'Baixo': document.getElementById('setaBaixoLoop'),
      'Esquerda': document.getElementById('setaEsquerdaLoop'),
      'Direita': document.getElementById('setaDireitaLoop'),
    };
    const preview = document.getElementById('previewLoop');
    const inputVezes = document.getElementById('inputVezesLoop');
    const btnMenos = document.getElementById('btnMenosLoop');
    const btnMais = document.getElementById('btnMaisLoop');
    const btnFechar = document.getElementById('btnFecharLoop');
    // Função para atualizar preview
    function atualizarPreview() {
      preview.textContent = `Repetir ${direcaoSelecionada} por ${vezesSelecionado} vez${vezesSelecionado > 1 ? 'es' : ''}`;
    }
    // Função para destacar seta
    function destacarSeta(dir) {
      Object.entries(setas).forEach(([d, btn]) => {
        if (btn) {
          if (d === dir) {
            btn.classList.add('selected');
            btn.style.background = 'rgba(25, 118, 210, 0.2)';
            btn.style.boxShadow = '0 0 15px rgba(25, 118, 210, 0.6)';
            btn.style.border = '2px solid rgba(25, 118, 210, 0.8)';
          } else {
            btn.classList.remove('selected');
            btn.style.background = 'transparent';
            btn.style.boxShadow = 'none';
            btn.style.border = 'none';
          }
        }
      });
    }
    Object.entries(setas).forEach(([dir, btn]) => {
      if (btn) btn.onclick = () => {
        direcaoSelecionada = dir;
        destacarSeta(dir);
        atualizarPreview();
      };
    });
    destacarSeta('Cima');
    atualizarPreview();
    // Botões + e -
    btnMenos.onclick = () => {
      let v = parseInt(inputVezes.value, 10);
      if (v > 1) v--;
      inputVezes.value = v;
      vezesSelecionado = v;
      atualizarPreview();
    };
    btnMais.onclick = () => {
      let v = parseInt(inputVezes.value, 10);
      if (v < 20) v++;
      inputVezes.value = v;
      vezesSelecionado = v;
      atualizarPreview();
    };
    inputVezes.oninput = () => {
      let v = parseInt(inputVezes.value, 10);
      if (isNaN(v) || v < 1) v = 1;
      if (v > 20) v = 20;
      inputVezes.value = v;
      vezesSelecionado = v;
      atualizarPreview();
    };
    // Botão de fechar
    btnFechar.onclick = () => {
      this.fecharModalLoop();
    };
    // Confirmar
    document.getElementById('btnConfirmarLoop').onclick = () => {
      const vezes = parseInt(inputVezes.value, 10);
      this.fecharModalLoop();
      callback(direcaoSelecionada, vezes);
    };
  }

  fecharModalLoop() {
    const modal = document.getElementById('modalLoop');
    if (modal) modal.remove();
  }

  mostrarTempoEsgotadoPanel2() {
    const panel = document.getElementById('tempoEsgotadoPanel2');
    if (panel) {
      panel.style.display = 'flex';
      document.getElementById('btnTentarNovamenteTempo2').onclick = () => {
        panel.style.display = 'none';
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.tempoRestante = 60;
        this.controller.render();
      };
    }
  }

  mostrarRequisitoLoopPanel() {
    // Modal de requisito não cumprido
    let panel = document.getElementById('requisitoLoopPanel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'requisitoLoopPanel';
      panel.className = 'options-panel';
      panel.style.display = 'flex';
      panel.style.zIndex = '2000';
      panel.innerHTML = `
        <div class="options-box">
          <h2>Requisito não cumprido</h2>
          <p>Você precisa utilizar o comando de loop pelo menos 1 vez para concluir esta fase.</p>
          <button id="btnFecharRequisitoLoop">OK</button>
        </div>
      `;
      document.body.appendChild(panel);
    } else {
      panel.style.display = 'flex';
    }
    document.getElementById('btnFecharRequisitoLoop').onclick = () => {
      panel.style.display = 'none';
      // Limpar timer antes de reiniciar
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
      this.controller.render();
    };
  }

  pausarTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  retomarTimer() {
    if (this.timerInterval === null && this.tempoRestante > 0) {
      const timerDiv = document.getElementById('timerFase2');
      const atualizarTimer = () => {
        const min = String(Math.floor(this.tempoRestante / 60)).padStart(2, '0');
        const seg = String(this.tempoRestante % 60).padStart(2, '0');
        timerDiv.textContent = `${min}:${seg}`;
      };
      atualizarTimer();
      this.timerInterval = setInterval(() => {
        this.tempoRestante--;
        atualizarTimer();
        if (this.tempoRestante <= 0) {
          clearInterval(this.timerInterval);
          this.mostrarTempoEsgotadoPanel2();
        }
      }, 1000);
    }
  }
} 