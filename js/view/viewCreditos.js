export default class ViewCreditos {
  constructor(controller) {
    this.controller = controller;
  }

  renderCreditos() {
    this.controller.rootElement.innerHTML = `
    <div class="background">
      <div class="divButtons">
        <button class="buttonStage" id="buttonBack"><img class="buttonImg" src="../assets/images/icons/setavoltar.png" alt="...back"></button>
      </div>
      <div class="creditos" id="credits">
        <div class="creditos-content">
          <div class="creditos-header">
            <h1 class="titulo-creditos">🎮 Stocker Finder</h1>
            <p class="subtitulo-creditos">Um jogo educativo de lógica e programação</p>
          </div>
          
          <div class="creditos-info">
            <div class="info-section">
              <h2>👨‍💻 Desenvolvedor</h2>
              <p class="destaque">Jonas de Jesus Nunes</p>
            </div>
            
            <div class="info-section">
              <h2>📚 Disciplina</h2>
              <p>Interface Homem-máquina</p>
            </div>
            
            <div class="info-section">
              <h2>🎓 Curso</h2>
              <p>Sistemas de Informação</p>
            </div>
            
            <div class="info-section">
              <h2>🏛️ Universidade</h2>
              <p>UFRPE-UAST</p>
            </div>
            
            <div class="info-section">
              <h2>👨‍🏫 Professor</h2>
              <p class="destaque">Dr. Richarlyson Alves D'Emery</p>
            </div>
          </div>
          
          <div class="creditos-footer">
            <p class="agradecimento">✨ Obrigado por jogar! ✨</p>
            <p class="ano">2025</p>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}
