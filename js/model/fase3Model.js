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

// Nova ordem de coleta para a Fase 3 (apenas 3 itens)
const ordemColeta = [
  'garrafa1.png',
  'lata1.png',
  'pote1.png'
];

// Novas posições dos itens (apenas 3 itens)
export const posicoesItens = [
  { item: 'garrafa1.png', pos: [1, 3] },
  { item: 'lata1.png', pos: [2, 4] },
  { item: 'pote1.png', pos: [4, 1] }
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

// Adiciona bombs nas posições específicas da coluna 2
matriz[0][2] = 'bomb.png';
matriz[1][2] = 'bomb.png';
matriz[2][2] = 'bomb.png';
matriz[3][2] = 'bomb.png';
matriz[4][2] = 'bomb.png';

// Adiciona portais nas posições especificadas
matriz[0][1] = 'portal.png';
matriz[0][3] = 'portal.png';
matriz[3][0] = 'portal.png';
matriz[4][4] = 'portal.png';

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