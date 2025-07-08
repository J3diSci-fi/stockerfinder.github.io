import Fase from './faseModel.js';

// Itens disponíveis
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

// Nova ordem de coleta para a Fase 3
const ordemColeta = [
  'garrafa1.png',
  'lata1.png',
  'pote1.png',
  'morango.png'
];

// Novas posições dos itens
export const posicoesItens = [
  { item: 'garrafa1.png', pos: [1, 3] },
  { item: 'lata1.png', pos: [2, 4] },
  { item: 'pote1.png', pos: [4, 1] },
  { item: 'morango.png', pos: [3, 2] }
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

const fase3Data = {
  id: 3,
  nome: 'Fase 3',
  tamanhoGrid: [5, 5],
  posicaoInicial: [0, 0],
  matriz: matriz,
  ordemColeta: ordemColeta,
  dicas: [],
  tempoLimite: 60, // 1 minuto
  maxPassos: null
};

const Fase3Model = new Fase(fase3Data);
export default Fase3Model; 