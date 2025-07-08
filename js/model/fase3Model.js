import fase2Model from './fase2Model.js';
const Fase3Model = JSON.parse(JSON.stringify(fase2Model));
Fase3Model.id = 3;
Fase3Model.ordemColeta = [...fase2Model.ordemColeta]; // Ajuste se quiser outra ordem
Fase3Model.matriz = fase2Model.matriz.map(row => [...row]); // Ajuste se quiser outro layout
Fase3Model.tamanhoGrid = [...fase2Model.tamanhoGrid];
Fase3Model.posicaoInicial = [...fase2Model.posicaoInicial];
export default Fase3Model; 