const STORAGE_KEY = 'personagens_saves';

function getSaves() {
  const saves = localStorage.getItem(STORAGE_KEY);
  return saves ? JSON.parse(saves) : [];
}

function setSaves(saves) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saves));
}

export default {
  hasSave(slot) {
    const saves = getSaves();
    return !!saves[slot];
  },

  savePersonagem(personagem, slot) {
    const saves = getSaves();
    // Verifica se já existe personagem com o mesmo nome
    if (saves.some(p => p && p.nome === personagem.nome)) {
      return false;
    }
    // Adiciona data de criação se não existir
    if (!personagem.criado) {
      const now = new Date();
      const data = now.toLocaleDateString('pt-BR');
      const hora = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      personagem.criado = `${data} às ${hora}`;
    }
    
    // Se o slot não existe, adiciona ao final
    if (slot >= saves.length) {
      saves.push(personagem);
    } else {
      saves[slot] = personagem;
    }
    setSaves(saves);
    return true;
  },

  personagemExists(nome) {
    const saves = getSaves();
    return saves.some(p => p && p.nome === nome);
  },

  getPersonagem(slot) {
    const saves = getSaves();
    return saves[slot] || null;
  },

  getAllPersonagens() {
    return getSaves();
  },

  setAllPersonagens(saves) {
    setSaves(saves);
  },

  // Novo método para adicionar um novo save
  addNewPersonagem(personagem) {
    const saves = getSaves();
    // Adiciona data de criação se não existir
    if (!personagem.criado) {
      const now = new Date();
      const data = now.toLocaleDateString('pt-BR');
      const hora = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      personagem.criado = `${data} às ${hora}`;
    }
    saves.push(personagem);
    setSaves(saves);
    return saves.length - 1; // Retorna o índice do novo save
  },

  // Novo método para remover um save
  removePersonagem(slot) {
    const saves = getSaves();
    if (slot >= 0 && slot < saves.length) {
      saves.splice(slot, 1);
      setSaves(saves);
      return true;
    }
    return false;
  },

  // Método para criar saves de teste (apenas para demonstração)
  createTestSaves() {
    const testNames = [
      'João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Oliveira', 
      'Carlos Ferreira', 'Lucia Rodrigues', 'Roberto Almeida', 'Fernanda Lima',
      'Marcos Pereira', 'Juliana Souza', 'Ricardo Barbosa', 'Patricia Gomes'
    ];
    
    testNames.forEach((nome, index) => {
      const personagem = {
        nome: nome,
        criado: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR') + ' às ' + 
               new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        fases: Math.floor(Math.random() * 3) + 1,
        fasesConcluidas: [1],
        progressoFases: {
          1: {
            estrelas: Math.floor(Math.random() * 3) + 1,
            tempo: Math.floor(Math.random() * 300),
            passos: Math.floor(Math.random() * 20) + 5
          }
        }
      };
      this.addNewPersonagem(personagem);
    });
  },

  updatePersonagem(personagem, slot) {
    const saves = getSaves();
    if (slot >= 0 && slot < saves.length) {
      saves[slot] = personagem;
      setSaves(saves);
      return true;
    }
    return false;
  }
}; 