export default class ViewStages {
  constructor(controller) {
    this.controller = controller;
  }

  renderStages() {
    const personagem = this.controller.personagem;
    let fase1Estrelas = [false, false, false];
    let fase2Desbloqueada = false;
    let fase2Estrelas = [false, false, false];
    let fase3Desbloqueada = false;
    let fase3Estrelas = [false, false, false];

    // Verificar progresso do personagem
    if (personagem) {
      const progressoFase1 = personagem.getResumoFase(1);
      if (progressoFase1) {
        fase1Estrelas = [
          progressoFase1.estrelas >= 1,
          progressoFase1.estrelas >= 2,
          progressoFase1.estrelas >= 3
        ];
        fase2Desbloqueada = true; // Fase 1 concluída desbloqueia fase 2
      }

      const progressoFase2 = personagem.getResumoFase(2);
      if (progressoFase2 && progressoFase2.estrelas > 0) {
        fase2Estrelas = [
          progressoFase2.estrelas >= 1,
          progressoFase2.estrelas >= 2,
          progressoFase2.estrelas >= 3
        ];
        fase3Desbloqueada = true; // Fase 2 concluída desbloqueia fase 3
      }

      const progressoFase3 = personagem.getResumoFase(3);
      if (progressoFase3 && progressoFase3.estrelas > 0) {
        fase3Estrelas = [
          progressoFase3.estrelas >= 1,
          progressoFase3.estrelas >= 2,
          progressoFase3.estrelas >= 3
        ];
      }
    }

    // Gerar HTML das estrelas da fase 1
    const fase1EstrelasHTML = fase1Estrelas.map(conquistada => 
      `<img class="star" src="../assets/images/icons/${conquistada ? 'estrela-preenchida' : 'estrela-vazia'}.png" alt="estrela">`
    ).join('');

    // Gerar HTML da fase 2
    let fase2HTML = '';
    if (fase2Desbloqueada) {
      const fase2EstrelasHTML = fase2Estrelas.map(conquistada => 
        `<img class="star" src="../assets/images/icons/${conquistada ? 'estrela-preenchida' : 'estrela-vazia'}.png" alt="estrela">`
      ).join('');
      
      fase2HTML = `
        <h1 class="textH1">Fase 2</h1>
        <div class="star-initial">
          ${fase2EstrelasHTML}
        </div>
      `;
    } else {
      fase2HTML = `
        <h1 class="textH1">Fase 2</h1>
        <img class="cadeado" src="../assets/images/icons/cadeado.png" alt="cadeado">
      `;
    }

    // Gerar HTML da fase 3
    let fase3HTML = '';
    if (fase3Desbloqueada) {
      const fase3EstrelasHTML = fase3Estrelas.map(conquistada => 
        `<img class="star" src="../assets/images/icons/${conquistada ? 'estrela-preenchida' : 'estrela-vazia'}.png" alt="estrela">`
      ).join('');
      fase3HTML = `
        <h1 class="textH1">Fase 3</h1>
        <div class="star-initial">
          ${fase3EstrelasHTML}
        </div>
      `;
    } else {
      fase3HTML = `
        <h1 class="textH1">Fase 3</h1>
        <img class="cadeado" src="../assets/images/icons/cadeado.png" alt="cadeado">
      `;
    }

    this.controller.rootElement.innerHTML = `
    <div class="background">
      <div class="divButtons">
        <button class="buttonStage" id="buttonBack"><img class="buttonImg" src="../assets/images/icons/setavoltar.png" alt="...back"></button>
        <button class="buttonStage"   id="buttonStopMusic"><img class="buttonImg" src="../assets/images/icons/som.png" alt="...music" ></button>
      </div>
      <div class="player-info" style="text-align:center; margin-bottom: 18px; font-size: 1.2em; font-weight: bold; color: #333;">
        ${personagem ? `Nome do Personagem: <span style='color:#1976D2'>${personagem.nome}</span>` : ''}
      </div>
      <div class="fases" id="stages">
        <div class="faseCard ${fase2Desbloqueada ? 'fase-desbloqueada' : ''}" id="fase1">
          <h1 class="textH1">Fase 1</h1>
          <div class="star-initial">
            ${fase1EstrelasHTML}
          </div>
        </div>
        <div class="faseCard ${fase2Desbloqueada ? 'fase-desbloqueada' : 'fase-bloqueada'}" id="fase2">
          ${fase2HTML}
        </div>
        <div class="faseCard ${fase3Desbloqueada ? 'fase-desbloqueada' : 'fase-bloqueada'}" id="fase3">
          ${fase3HTML}
        </div>
      </div>
    </div>
    `;
  }
}
