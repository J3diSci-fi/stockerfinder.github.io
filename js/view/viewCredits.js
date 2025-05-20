export default class ViewCredits {
  constructor(controller) {
    this.controller = controller;
  }

  renderCredits() {
    this.controller.rootElement.innerHTML = `
    <div class="background">
      <div class="divButtons">
        <button class="buttonStage" id="buttonBack"><img class="buttonImg" src="../assets/images/icons/setavoltar.png" alt="...back"></button>
        <button class="buttonStage"   id="buttonStopMusic"><img class="buttonImg" src="../assets/images/icons/som.png" alt="...music" ></button>
      </div>
      <div class="creditos" id="credits">
        <h1>Em Construção...</h1>
      </div>
    </div>
    `;
  }
}
