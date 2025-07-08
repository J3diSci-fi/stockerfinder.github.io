export default class Fase {
  constructor({
    id,
    nome,
    tamanhoGrid,
    posicaoInicial,
    matriz,
    ordemColeta,
    dicas = [],
    tempoLimite = null,
    maxPassos = null
  }) {
    this.id = id;
    this.nome = nome;
    this.tamanhoGrid = tamanhoGrid;
    this.posicaoInicial = posicaoInicial;
    this.matriz = matriz;
    this.ordemColeta = ordemColeta;
    this.dicas = dicas;
    this.tempoLimite = tempoLimite;
    this.maxPassos = maxPassos;
  }
}
