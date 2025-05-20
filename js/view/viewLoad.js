export default class ViewLoad {
  constructor(controller) {
    this.controller = controller;
  }

  renderLoad() {
    this.controller.rootElement.innerHTML = `
    <div class="background">
      <div class="divButtons">
        <button class="buttonStage" id="buttonBack"><img class="buttonImg" src="../assets/images/icons/setavoltar.png" alt="...back"></button>
        <button class="buttonStage" id="buttonStopMusic"><img class="buttonImg" src="../assets/images/icons/som.png" alt="...music" ></button>
      </div>
      <div class="load" id="load">
        <div><img class="imgloadsize" src="../assets/images/items/person.png" alt"Personagem..."></div>
        <div><h1 class="titleh1load">CARREGAR JOGO</h1></div>
        <div class="savebox">
          <div><img class="imgLockLoad" src="../assets/images/icons/locksave.png" alt="lock..."></div>
          <div class="separator"></div>
          <div class="divloadtext"><h2 class="h2loadtext">Espaço Vazio</h2></div>
        </div>
        <div class="savebox">
          <div><img class="imgLockLoad" src="../assets/images/icons/locksave.png" alt="lock..."></div>
          <div class="separator"></div>
          <div class="divloadtext"><h2 class="h2loadtext">Espaço Vazio</h2></div>
        </div>
        <div class="savebox">
          <div><img class="imgLockLoad" src="../assets/images/icons/locksave.png" alt="lock..."></div>
          <div class="separator"></div>
          <div class="divloadtext"><h2 class="h2loadtext">Espaço Vazio</h2></div>
        </div>
      </div>
    </div>
    `;
  }
}
