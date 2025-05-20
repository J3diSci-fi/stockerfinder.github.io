export default class ViewStages {
  constructor(controller) {
    this.controller = controller;
  }

  renderStages() {
    this.controller.rootElement.innerHTML = `
    <div class="background">
      <div class="divButtons">
        <button class="buttonStage" id="buttonBack"><img class="buttonImg" src="../assets/images/icons/setavoltar.png" alt="...back"></button>
        <button class="buttonStage"   id="buttonStopMusic"><img class="buttonImg" src="../assets/images/icons/som.png" alt="...music" ></button>
      </div>
      <div class="fases" id="stages">
        <div class="faseCard" id="fase1">
          <h1 class="textH1">Fase 1</h1>
          <div class="star-initial">
            <img class="star" src="../assets/images/icons/estrela-vazia.png" alt="...music" >
            <img class="star" src="../assets/images/icons/estrela-vazia.png" alt="...music" >
            <img class="star" src="../assets/images/icons/estrela-vazia.png" alt="...music" >
          </div>
          </div>
        <div class="faseCard" id="fase2">
          <h1 class="textH1">Fase 2</h1>
          <img class="cadeado" src="../assets/images/icons/cadeado.png" alt="...music" >
        </div>
        <div class="faseCard" id="fase3">
          <h1 class="textH1">Fase 3</h1>
          <img class="cadeado" src="../assets/images/icons/cadeado.png" alt="...music" >
        </div>
      </div>
    </div>
    `;
  }
}
