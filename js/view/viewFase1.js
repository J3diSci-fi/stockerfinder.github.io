export default class ViewFase1 {
  constructor(controller) {
    this.controller = controller;
    this.tempoRestante = 45;
    this.timerInterval = null;
  }

  renderFase1() {
    // Importa o model da fase 1 para pegar a ordem de coleta e matriz
    import('../model/fase1Model.js').then(({ default: Fase1Model, posicoesItens }) => {
      const ordemColeta = Fase1Model.ordemColeta;
      const matriz = Fase1Model.matriz;
      const tamanho = Fase1Model.tamanhoGrid[0];

      // Monta a ordem de coleta visual (apenas imagens, sem texto)
      let ordemHTML = '<div class="ordem-coleta-area"><div class="ordem-coleta-lista">';
      for (let i = 0; i < ordemColeta.length; i++) {
        ordemHTML += `<img src="../assets/images/items/${ordemColeta[i]}" class="ordem-coleta-img" alt="ordem">`;
      }
      ordemHTML += '</div></div>';

      // Cria o grid 5x5 com imagens
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

      // Grid da prateleira 3x3
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

      // Área para comandos e execução
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
          <div id="timerFase1" style="position:absolute; top:20px; right:32px; background:rgba(0,0,0,0.7); color:#fff; font-size:1.5em; padding:6px 18px; border-radius:12px; z-index:10;">00:45</div>
          <div id="tutorialFase1Overlay" style="display:none;">
            <div id="modalBoasVindasFase1"></div>
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
          <div id="tempoEsgotadoPanel" class="options-panel" style="display:none; z-index:1001;">
            <div class="options-box">
              <h2>Tempo esgotado!</h2>
              <p>Você não concluiu a fase a tempo.</p>
              <button id="btnTentarNovamenteTempo">Tentar novamente</button>
            </div>
          </div>
        </div>
      `;

      // Preencher a prateleira com 6 produtos iniciais
      this.preencherPrateleiraInicial();

      // Lógica para salvar comandos
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
          if (cmd === 'Cima') src = '../assets/images/commands/top.png';
          if (cmd === 'Baixo') src = '../assets/images/commands/down.png';
          if (cmd === 'Esquerda') src = '../assets/images/commands/left.png';
          if (cmd === 'Direita') src = '../assets/images/commands/right.png';
          img.src = src;
          img.alt = cmd;
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
      document.getElementById('btnExecutar').onclick = () => { 
        const btnExecutar = document.getElementById('btnExecutar');
        const btnExcluirUltimo = document.getElementById('btnExcluirUltimo');
        const btnResetar = document.getElementById('btnResetar');
        
        // Desabilitar todos os botões
        btnExecutar.disabled = true;
        btnExecutar.style.opacity = '0.6';
        btnExecutar.style.cursor = 'not-allowed';
        
        btnExcluirUltimo.disabled = true;
        btnExcluirUltimo.style.opacity = '0.6';
        btnExcluirUltimo.style.cursor = 'not-allowed';
        
        btnResetar.disabled = true;
        btnResetar.style.opacity = '0.6';
        btnResetar.style.cursor = 'not-allowed';
        
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

      // Atualizar nome do player
      const nome = this.controller.personagem && this.controller.personagem.nome ? this.controller.personagem.nome : 'Player';
      const playerNomeDiv = document.getElementById('playerNome');
      if (playerNomeDiv) playerNomeDiv.textContent = nome;

      // Modal de boas-vindas - o timer será iniciado após o tutorial
      this.exibirBoasVindas(nome);

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
    });
  }

  atualizarGrid(matriz) {
    // Atualiza o grid visualmente conforme a matriz recebida
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
    // Pausar o timer quando o menu de opções é aberto
    this.pausarTimer();
    // Ocultar o botão de menu
    const menuBtn = document.getElementById('btnMenuLoop');
    if (menuBtn) {
      menuBtn.style.display = 'none';
    }
  }

  hideOptionsPanel() {
    document.getElementById('optionsPanel').style.display = 'none';
    // Retomar o timer quando o menu de opções é fechado
    this.retomarTimer();
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

  // Métodos para gerenciar a prateleira
  adicionarItemPrateleira(itemName) {
    const prateleiraGrid = document.getElementById('prateleiraGrid');
    if (!prateleiraGrid) return;

    // Encontrar o próximo espaço vazio (começando da posição 6, onde estão os espaços vazios)
    const items = prateleiraGrid.querySelectorAll('.prateleira-item');
    for (let i = 6; i < items.length; i++) {
      if (!items[i].classList.contains('ocupado')) {
        // Adicionar o item
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
    items.forEach(item => {
      item.classList.remove('ocupado');
      item.innerHTML = '';
    });
  }

  preencherPrateleiraInicial() {
    // Produtos que já estão na prateleira (6 produtos)
    const produtosIniciais = [
      'creme.png',
      'garrafa1.png', 
      'lata1.png',
      'creme.png',
      'garrafa1.png',
      'lata1.png'
    ];

    const prateleiraGrid = document.getElementById('prateleiraGrid');
    if (!prateleiraGrid) return;

    const items = prateleiraGrid.querySelectorAll('.prateleira-item');
    
    // Preencher os primeiros 6 espaços com os produtos iniciais
    for (let i = 0; i < 6; i++) {
      if (items[i]) {
        items[i].classList.add('ocupado');
        items[i].innerHTML = `<img src="../assets/images/items/${produtosIniciais[i]}" alt="${produtosIniciais[i]}">`;
      }
    }
    
    // Os últimos 3 espaços ficam vazios (para os itens que serão coletados)
  }

  iniciarTimer() {
    // Timer Fase 1
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.tempoRestante = 45;
    const timerDiv = document.getElementById('timerFase1');
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
        this.mostrarTempoEsgotadoPanel();
      }
    }, 1000);
  }

  pausarTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  retomarTimer() {
    if (this.timerInterval === null && this.tempoRestante > 0) {
      const timerDiv = document.getElementById('timerFase1');
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
          this.mostrarTempoEsgotadoPanel();
        }
      }, 1000);
    }
  }

  mostrarTempoEsgotadoPanel() {
    const panel = document.getElementById('tempoEsgotadoPanel');
    if (panel) {
      panel.style.display = 'flex';
      document.getElementById('btnTentarNovamenteTempo').onclick = () => {
        panel.style.display = 'none';
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.tempoRestante = 45;
        this.controller.render();
      };
    }
  }

  exibirBoasVindas(nome) {
    // Verificar se deve mostrar as instruções
    if (this.controller.personagem && !this.controller.personagem.getMostrarInstrucoesFase1()) {
      // Se não deve mostrar o tutorial, iniciar o timer imediatamente
      this.iniciarTimer();
      return;
    }

    const mensagens = [
      `Bem-vindo, <b>${nome}</b>!<br>Este é o início da sua jornada. Aqui você vai aprender a programar o personagem para coletar os itens na ordem correta.`,
      'Use os botões de seta para montar a sequência de comandos. Depois, clique em <b>Executar</b> para ver o personagem se mover.',
      'Se errar, use o botão de <b>reset</b> <img src="../assets/images/icons/reset.png" alt="Reset" width="32" height="32"> para reiniciar os comandos. Boa sorte!'
    ];
    let passo = 0;
    const modal = document.getElementById('modalBoasVindasFase1');
    const overlay = document.getElementById('tutorialFase1Overlay');
    if (!modal || !overlay) return;
    
    const mostrarPasso = () => {
      let checkboxHTML = '';
      if (passo === mensagens.length - 1) {
        checkboxHTML = `
          <div style="margin-top: 16px; text-align: left; font-size: 0.9em;">
            <label style="display: flex; align-items: center; cursor: pointer;">
              <input type="checkbox" id="naoMostrarInstrucoes" style="margin-right: 8px;">
              Não mostrar estas instruções novamente
            </label>
          </div>
        `;
      }
      
      modal.innerHTML = `
        <div style='margin-bottom:18px;'>${mensagens[passo]}</div>
        ${checkboxHTML}
        <button id='btnNextBoasVindas' style='padding:8px 32px; font-size:1em; border-radius:8px; background:#4caf50; color:#fff; border:none; cursor:pointer;'>${passo < mensagens.length-1 ? 'Próximo' : 'Fechar'}</button>
      `;
      overlay.style.display = 'flex';
      
      document.getElementById('btnNextBoasVindas').onclick = () => {
        // Se for o último passo, salvar a configuração da checkbox
        if (passo === mensagens.length - 1) {
          const checkbox = document.getElementById('naoMostrarInstrucoes');
          if (checkbox && checkbox.checked && this.controller.personagem) {
            this.controller.personagem.setMostrarInstrucoesFase1(false);
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