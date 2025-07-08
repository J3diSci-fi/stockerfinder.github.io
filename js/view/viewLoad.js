export default class ViewLoad {
  constructor(controller) {
    this.controller = controller;
  }

  renderLoad(saves = []) {
    this.controller.rootElement.innerHTML = `
      <div class="background">
        <div class="divButtons">
          <button class="buttonStage" id="buttonBack">
            <img class="buttonImg" src="../assets/images/icons/setavoltar.png" alt="...back">
          </button>
          <button class="buttonStage" id="buttonStopMusic">
            <img class="buttonImg" src="../assets/images/icons/som.png" alt="...music">
          </button>
        </div>
        <button id="deleteAllSavesBtn" style="position:absolute; z-index:10;">
          <img src="../assets/images/icons/delete_all_saves.png" alt="Excluir Todos Saves" style="width:32px; height:32px;" />
        </button>
        <div class="load" id="load">
          <div>
            <img class="imgloadsize" src="../assets/images/items/person.png" alt="Personagem...">
          </div>
          <div>
            <h1 class="titleh1load">CARREGAR JOGO</h1>
          </div>

          <div class="saves-container">
            ${saves.map((save, index) => {
              if (save) {
                return `
                  <div class="savebox" data-slot="${index}">
                    <div>
                      <img class="imgLockLoad" src="../assets/images/icons/cadeado.png" alt="unlock...">
                    </div>
                    <div class="separator"></div>
                    <div class="divloadtext">
                      <h2 class="h2loadtext">${save.nome}</h2>
                      <p class="saveinfo">Criado: ${save.criado || '--/--/----'}</p>
                      <p class="saveinfo">Fases concluídas: ${(save.fasesConcluidas ? save.fasesConcluidas.length : (save.progressoFases ? Object.keys(save.progressoFases).length : 0))}</p>
                    </div>
                  </div>
                `;
              } else {
                return `
                  <div class="savebox" data-slot="${index}">
                    <div>
                      <img class="imgLockLoad" src="../assets/images/icons/locksave.png" alt="lock...">
                    </div>
                    <div class="separator"></div>
                    <div class="divloadtext">
                      <h2 class="h2loadtext">Espaço Vazio</h2>
                    </div>
                  </div>
                `;
              }
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }
}
