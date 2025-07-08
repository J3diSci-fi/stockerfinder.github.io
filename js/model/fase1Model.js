import Fase from './faseModel.js';

// Itens disponíveis (exceto person.png)
const itens = [
  'creme.png',
  'garrafa1.png',
  'lata1.png',
  'morango.png',
  'pote1.png',
  'pote2.png',
  'prateleira.png',
  'falta.png'
];

// Ordem de coleta preestabelecida para a fase 1 (exemplo)
const ordemColeta = [
  'creme.png',
  'garrafa1.png',
  'lata1.png'
];

// Posições dos itens da ordem de coleta
export const posicoesItens = [
  { item: 'creme.png', pos: [1, 2] },
  { item: 'garrafa1.png', pos: [3, 4] },
  { item: 'lata1.png', pos: [4, 1] }
];

// Cria matriz 5x5 vazia
const tamanho = 5;
const matriz = Array.from({ length: tamanho }, () => Array(tamanho).fill(null));

// Posiciona o personagem
matriz[0][0] = 'person.png';

// Posiciona os itens
for (const { item, pos } of posicoesItens) {
  const [row, col] = pos;
  matriz[row][col] = item;
}

const fase1Data = {
  id: 1,
  nome: 'Fase 1',
  tamanhoGrid: [5, 5],
  posicaoInicial: [0, 0],
  matriz: matriz,
  ordemColeta: ordemColeta,
  dicas: [],
  tempoLimite: null,
  maxPassos: null
};

const Fase1Model = new Fase(fase1Data);
export default Fase1Model; 