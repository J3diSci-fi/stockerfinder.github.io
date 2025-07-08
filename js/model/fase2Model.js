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

// Ordem de coleta diferente da Fase 1
const ordemColeta = [
  'morango.png',
  'pote2.png',
  'creme.png'
];

// Posições dos itens da ordem de coleta
export const posicoesItens = [
  { item: 'morango.png', pos: [2, 1] },
  { item: 'pote2.png', pos: [3, 3] },
  { item: 'creme.png', pos: [4, 2] }
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

const fase2Data = {
  id: 2,
  nome: 'Fase 2',
  tamanhoGrid: [5, 5],
  posicaoInicial: [0, 0],
  matriz: matriz,
  ordemColeta: ordemColeta,
  dicas: [],
  tempoLimite: null,
  maxPassos: null
};

const Fase2Model = new Fase(fase2Data);
export default Fase2Model; 