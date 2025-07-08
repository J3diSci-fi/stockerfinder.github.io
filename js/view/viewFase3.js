import ViewFase2 from './viewFase2.js';
export default class ViewFase3 extends ViewFase2 {
  constructor(controller) {
    super(controller);
  }
  renderFase3() {
    super.renderFase2();
    // Nome do player
    let nome = this.controller.personagem && this.controller.personagem.nome ? this.controller.personagem.nome : 'Player';
    let playerNomeDiv = document.getElementById('playerNome');
    if (!playerNomeDiv) {
      playerNomeDiv = document.createElement('div');
      playerNomeDiv.id = 'playerNome';
      playerNomeDiv.style.position = 'absolute';
      playerNomeDiv.style.top = '0px';
      playerNomeDiv.style.right = '32px';
      playerNomeDiv.style.color = '#fff';
      playerNomeDiv.style.fontSize = '1.1em';
      playerNomeDiv.style.fontWeight = 'bold';
      playerNomeDiv.style.textShadow = '1px 1px 4px #000';
      playerNomeDiv.style.zIndex = '11';
      document.querySelector('.background-fase1').appendChild(playerNomeDiv);
    }
    playerNomeDiv.textContent = nome;
    // Ajustar timer para 1 minuto
    if (this.timerInterval) clearInterval(this.timerInterval);
    let tempoRestante = 60;
    let timerDiv = document.getElementById('timerFase2') || document.getElementById('timerFase3');
    if (!timerDiv) {
      timerDiv = document.createElement('div');
      timerDiv.id = 'timerFase3';
      timerDiv.style.position = 'absolute';
      timerDiv.style.top = '20px';
      timerDiv.style.right = '32px';
      timerDiv.style.background = 'rgba(0,0,0,0.7)';
      timerDiv.style.color = '#fff';
      timerDiv.style.fontSize = '1.5em';
      timerDiv.style.padding = '6px 18px';
      timerDiv.style.borderRadius = '12px';
      timerDiv.style.zIndex = '10';
      document.querySelector('.background-fase1').appendChild(timerDiv);
    }
    const atualizarTimer = () => {
      const min = String(Math.floor(tempoRestante / 60)).padStart(2, '0');
      const seg = String(tempoRestante % 60).padStart(2, '0');
      timerDiv.textContent = `${min}:${seg}`;
    };
    atualizarTimer();
    this.timerInterval = setInterval(() => {
      tempoRestante--;
      atualizarTimer();
      if (tempoRestante <= 0) {
        clearInterval(this.timerInterval);
        this.mostrarTempoEsgotadoPanel3();
      }
    }, 1000);
    // Aviso de loops
    let avisoLoop = document.getElementById('avisoLoopFase3');
    if (!avisoLoop) {
      avisoLoop = document.createElement('div');
      avisoLoop.id = 'avisoLoopFase3';
      avisoLoop.style.position = 'absolute';
      avisoLoop.style.top = '20px';
      avisoLoop.style.right = '690px';
      avisoLoop.style.background = 'rgba(255,193,7,0.95)';
      avisoLoop.style.color = '#222';
      avisoLoop.style.fontSize = '1.1em';
      avisoLoop.style.padding = '6px 18px';
      avisoLoop.style.borderRadius = '12px';
      avisoLoop.style.zIndex = '10';
      avisoLoop.style.fontWeight = 'bold';
      avisoLoop.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
      avisoLoop.textContent = 'Utilize o loop pelo menos 2 vezes';
      document.querySelector('.background-fase1').appendChild(avisoLoop);
    }
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
    };
  }
} 