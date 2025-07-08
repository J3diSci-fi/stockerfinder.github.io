# IHM Stocker Finder

Um jogo de puzzle onde você precisa organizar itens nas prateleiras corretas.

## Sistema de Save

O jogo agora possui um sistema completo de save/load que funciona da seguinte forma:

### Funcionalidades Implementadas:

1. **Salvamento Automático**: Quando um personagem é criado através do modal, ele é automaticamente salvo no localStorage
2. **3 Slots de Save**: O jogo suporta até 3 saves diferentes
3. **Interface Visual**: 
   - Slots vazios mostram um cadeado fechado (`locksave.png`)
   - Slots com save mostram um cadeado aberto (`cadeado.png`)
   - Informações do save são exibidas (nome do personagem, data de criação, número de fases)

### Como Usar:

1. **Criar Novo Save**: 
   - Vá para "JOGAR" no menu principal
   - Digite um nome para seu personagem ou deixe em branco para gerar um nome aleatório
   - O personagem será automaticamente salvo

2. **Carregar Save**:
   - Vá para "CARREGAR JOGO" no menu principal
   - Clique em um slot que tenha um cadeado aberto
   - O personagem será carregado e você irá para a tela de fases

3. **Deletar Save**:
   - Na tela de carregar, clique com o botão direito em um slot com save
   - Confirme a exclusão

### Estrutura dos Arquivos:

- `js/services/saveService.js` - Serviço principal para gerenciar saves
- `js/controller/modalController.js` - Modificado para salvar personagens automaticamente
- `js/controller/loadController.js` - Modificado para carregar e deletar saves
- `js/controller/stagesController.js` - Modificado para trabalhar com personagens carregados
- `js/view/viewLoad.js` - Modificado para mostrar saves existentes
- `css/viewLoad.css` - Estilos para a interface de carregamento

### Tecnologias Utilizadas:

- HTML5
- CSS3
- JavaScript (ES6+)
- LocalStorage para persistência de dados

## Como Executar:

1. Clone o repositório
2. Abra o arquivo `index.html` em um navegador web
3. Ou execute um servidor local: `python -m http.server 8000`

## Estrutura do Projeto:

```
ihm-stocker-finder/
├── assets/          # Recursos do jogo (imagens, áudio)
├── css/            # Estilos CSS
├── js/             # Código JavaScript
│   ├── controller/ # Controladores
│   ├── model/      # Modelos de dados
│   ├── view/       # Views
│   └── services/   # Serviços (incluindo save)
├── index.html      # Página principal
└── README.md       # Este arquivo
```
