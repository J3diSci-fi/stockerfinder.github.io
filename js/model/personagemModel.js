export default class Personagem {
  constructor(nome = "Jogador") {
    this.nome = nome;
    this.fasesConcluidas = [];
    this.progressoFases = {};
    this.configuracoes = {
      mostrarInstrucoesFase1: true,
      mostrarInstrucoesFase3: true
    };
  }

  // Método para garantir que as configurações existam (para compatibilidade com saves antigos)
  garantirConfiguracoes() {
    if (!this.configuracoes) {
      this.configuracoes = {
        mostrarInstrucoesFase1: true,
        mostrarInstrucoesFase3: true
      };
    }
    if (this.configuracoes.mostrarInstrucoesFase1 === undefined) {
      this.configuracoes.mostrarInstrucoesFase1 = true;
    }
    if (this.configuracoes.mostrarInstrucoesFase3 === undefined) {
      this.configuracoes.mostrarInstrucoesFase3 = true;
    }
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

  // Métodos para gerenciar configurações
  setMostrarInstrucoesFase1(mostrar) {
    this.garantirConfiguracoes();
    this.configuracoes.mostrarInstrucoesFase1 = mostrar;
  }

  getMostrarInstrucoesFase1() {
    this.garantirConfiguracoes();
    return this.configuracoes.mostrarInstrucoesFase1;
  }

  setMostrarInstrucoesFase3(mostrar) {
    this.garantirConfiguracoes();
    this.configuracoes.mostrarInstrucoesFase3 = mostrar;
  }

  getMostrarInstrucoesFase3() {
    this.garantirConfiguracoes();
    return this.configuracoes.mostrarInstrucoesFase3;
  }

  redefinirProgresso() {
    this.fasesConcluidas = [];
    this.progressoFases = {};
  }
}
