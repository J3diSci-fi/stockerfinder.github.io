export default class Personagem {
  constructor(nome = "Jogador") {
    this.nome = nome;
    this.fasesConcluidas = [];
    this.progressoFases = {};
  }

  registrarConclusaoFase(faseId, estrelas, tempo, passos) {
    if (!this.fasesConcluidas.includes(faseId)) {
      this.fasesConcluidas.push(faseId);
    }

    this.progressoFases[faseId] = {
      estrelas: estrelas,
      tempo: tempo,          // em segundos
      passos: passos
    };
  }

  getResumoFase(faseId) {
    return this.progressoFases[faseId] || null;
  }

  getTodasFasesConcluidas() {
    return this.fasesConcluidas;
  }

  getNome() {
    return this.nome;
  }

  setNome(nome){
    this.nome = nome;
  }

  redefinirProgresso() {
    this.fasesConcluidas = [];
    this.progressoFases = {};
  }
}
