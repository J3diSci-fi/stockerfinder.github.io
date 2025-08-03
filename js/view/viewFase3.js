import ViewFase2 from './viewFase2.js';
export default class ViewFase3 extends ViewFase2 {
  constructor(controller) {
    super(controller);
  }
  renderFase3() {
    // Remover botão antigo se existir
    const oldBtn = document.getElementById('btnMenuLoop');
    if (oldBtn && oldBtn.parentNode) oldBtn.parentNode.removeChild(oldBtn);
    
    // Carregar o modelo da fase 3
    import('../model/fase3Model.js').then((module) => {
      const Fase3Model = module.default;
      const ordemColeta = Fase3Model.ordemColeta;
      const matriz = Fase3Model.matriz;
      const tamanho = Fase3Model.tamanhoGrid[0];

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
          <div id="timerFase3" style="position:absolute; top:20px; right:32px; background:rgba(0,0,0,0.7); color:#fff; font-size:1.5em; padding:6px 18px; border-radius:12px; z-index:10;">01:00</div>
          <div id="avisoLoopFase3" style="position:absolute; top:90px; right:770px; background:rgba(255,193,7,0.95); color:#222; font-size:12px; padding:6px 18px; border-radius:12px; z-index:10; font-weight:bold; box-shadow:0 2px 8px rgba(0,0,0,0.08);">Utilize o loop pelo menos 2 vezes</div>
          <div id="tutorialFase3Overlay" style="display:none;">
            <div id="modalInstrucoesFase3"></div>
          </div>
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
          <div id="bombPanel" class="options-panel" style="display:none;">
            <div class="options-box">
              <h2>💥 BOOM! 💥</h2>
              <p>Você bateu em uma bomba! Que explosão! 😅</p>
              <p style="font-size:0.9em; color:#666; margin-top:8px;">Tente novamente com mais cuidado!</p>
              <button id="btnTentarNovamenteBomb">Tentar Novamente</button>
            </div>
          </div>
          <div id="tempoEsgotadoPanel3" class="options-panel" style="display:none; z-index:1001;">
            <div class="options-box">
              <h2>Tempo esgotado!</h2>
              <p>Você não concluiu a fase a tempo.</p>
              <button id="btnTentarNovamenteTempo3">Tentar novamente</button>
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
        // Verifica se há pelo menos dois comandos de loop
        const usouLoop = this.comandos.filter(cmd => typeof cmd === 'object' && cmd.tipo === 'Loop').length >= 2;
        if (!usouLoop) {
          this.mostrarRequisitoLoopPanel3();
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

             // Timer Fase 3 - será iniciado após o tutorial
       // (removido daqui e movido para o método iniciarTimer)

      // Atualizar nome do player
      const nome = this.controller.personagem && this.controller.personagem.nome ? this.controller.personagem.nome : 'Player';
      const playerNomeDiv = document.getElementById('playerNome');
      if (playerNomeDiv) playerNomeDiv.textContent = nome;

      // Modal de instruções - o timer será iniciado após o tutorial
      this.exibirInstrucoesFase3(nome);
    });
  }
  preencherPrateleiraInicial() {
    const produtosIniciais = [
      'garrafa1.png',
      'lata1.png',
      'pote1.png',
      'garrafa1.png',
      'lata1.png',
      'pote1.png'
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
  mostrarBombPanel() {
    let panel = document.getElementById('bombPanel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'bombPanel';
      panel.className = 'options-panel';
      panel.style.display = 'flex';
      panel.style.zIndex = '2000';
      panel.innerHTML = `
        <div class="options-box">
          <h2>💥 BOOM! 💥</h2>
          <p>Você bateu em uma bomba! Que explosão! 😅</p>
          <p style="font-size:0.9em; color:#666; margin-top:8px;">Tente novamente com mais cuidado!</p>
          <button id="btnTentarNovamenteBomb">Tentar Novamente</button>
        </div>
      `;
      document.body.appendChild(panel);
    } else {
      panel.style.display = 'flex';
    }
    document.getElementById('btnTentarNovamenteBomb').onclick = () => {
      panel.style.display = 'none';
      // Limpar timer antes de reiniciar
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
      this.controller.render();
    };
  }
  mostrarTempoEsgotadoPanel3() {
    let panel = document.getElementById('tempoEsgotadoPanel3');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'tempoEsgotadoPanel3';
      panel.className = 'options-panel';
      panel.style.display = 'flex';
      panel.style.zIndex = '1001';
      panel.innerHTML = `
        <div class="options-box">
          <h2>Tempo esgotado!</h2>
          <p>Você não concluiu a fase a tempo.</p>
          <button id="btnTentarNovamenteTempo3">Tentar novamente</button>
        </div>
      `;
      document.body.appendChild(panel);
    } else {
      panel.style.display = 'flex';
    }
    document.getElementById('btnTentarNovamenteTempo3').onclick = () => {
      panel.style.display = 'none';
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.timerInterval = null;
      this.tempoRestante = 60;
      this.controller.render();
    };
  }
  mostrarRequisitoLoopPanel3() {
    let panel = document.getElementById('requisitoLoopPanel3');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'requisitoLoopPanel3';
      panel.className = 'options-panel';
      panel.style.display = 'flex';
      panel.style.zIndex = '2000';
      panel.innerHTML = `
        <div class="options-box">
          <h2>Requisito não cumprido</h2>
          <p>Você precisa utilizar o comando de loop pelo menos 2 vezes para concluir esta fase.</p>
          <button id="btnFecharRequisitoLoop3">OK</button>
        </div>
      `;
      document.body.appendChild(panel);
    } else {
      panel.style.display = 'flex';
    }
    document.getElementById('btnFecharRequisitoLoop3').onclick = () => {
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
  iniciarTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.tempoRestante = 60;
    const timerDiv = document.getElementById('timerFase3');
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
        this.mostrarTempoEsgotadoPanel3();
      }
    }, 1000);
  }
  exibirInstrucoesFase3(nome) {
    // Verificar se deve mostrar as instruções
    if (this.controller.personagem && !this.controller.personagem.getMostrarInstrucoesFase3()) {
      // Se não deve mostrar o tutorial, iniciar o timer imediatamente
      this.iniciarTimer();
      return;
    }

    const mensagens = [
      `Bem-vindo à <b>Fase 3</b>, <b>${nome}</b>!<br>Esta fase tem novos desafios: <b>bombs</b> e <b>portais</b>!`,
      '<b>💥 Bombs:</b> Evite as bombs na coluna 2! Se você tocar em uma bomb, a fase termina e você perde. Use os portais para navegar melhor!',
      '<b>🌀 Portais:</b> Os portais te teleportam para outros portais no grid. Use-os estrategicamente para evitar bombs e coletar itens na ordem correta!',
      'Lembre-se: você precisa usar o <b>loop pelo menos 2 vezes</b> e coletar os itens na ordem exata mostrada acima. Boa sorte!'
    ];
    let passo = 0;
    const modal = document.getElementById('modalInstrucoesFase3');
    const overlay = document.getElementById('tutorialFase3Overlay');
    if (!modal || !overlay) return;
    
    const mostrarPasso = () => {
      let checkboxHTML = '';
      if (passo === mensagens.length - 1) {
        checkboxHTML = `
          <div style="margin-top: 16px; text-align: left; font-size: 0.9em;">
            <label style="display: flex; align-items: center; cursor: pointer;">
              <input type="checkbox" id="naoMostrarInstrucoesFase3" style="margin-right: 8px;">
              Não mostrar estas instruções novamente
            </label>
          </div>
        `;
      }
      
      modal.innerHTML = `
        <div style='margin-bottom:18px;'>${mensagens[passo]}</div>
        ${checkboxHTML}
        <button id='btnNextInstrucoesFase3' style='padding:8px 32px; font-size:1em; border-radius:8px; background:#4caf50; color:#fff; border:none; cursor:pointer;'>${passo < mensagens.length-1 ? 'Próximo' : 'Fechar'}</button>
      `;
      overlay.style.display = 'flex';
      
      document.getElementById('btnNextInstrucoesFase3').onclick = () => {
        // Se for o último passo, salvar a configuração da checkbox
        if (passo === mensagens.length - 1) {
          const checkbox = document.getElementById('naoMostrarInstrucoesFase3');
          if (checkbox && checkbox.checked && this.controller.personagem) {
            this.controller.personagem.setMostrarInstrucoesFase3(false);
            // Salvar no localStorage
            if (window.saveSlot !== undefined) {
              import('../services/saveService.js').then(({ default: saveService }) => {
                saveService.updatePersonagem(this.controller.personagem, window.saveSlot);
              });
            }
          }
        }
        
        passo++;
        if (passo < mensagens.length) {
          mostrarPasso();
        } else {
          overlay.style.display = 'none';
          // Iniciar o timer quando o tutorial for fechado
          this.iniciarTimer();
        }
      };
    };
    mostrarPasso();
  }
} 