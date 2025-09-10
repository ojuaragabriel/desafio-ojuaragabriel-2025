class AbrigoAnimais {
  constructor() {
    this.catalogo = {
      Rex:  { tipo: 'cão',   fav: ['RATO', 'BOLA'] },
      Mimi: { tipo: 'gato',  fav: ['BOLA', 'LASER'] },
      Fofo: { tipo: 'gato',  fav: ['BOLA', 'RATO', 'LASER'] },
      Zero: { tipo: 'gato',  fav: ['RATO', 'BOLA'] },
      Bola: { tipo: 'cão',   fav: ['CAIXA', 'NOVELO'] },
      Bebe: { tipo: 'cão',   fav: ['LASER', 'RATO', 'BOLA'] },
      Loco: { tipo: 'jabuti', fav: ['SKATE', 'RATO'], especial: true } // ordem não importa + precisa de companhia
    };
    this.brinquedosValidos = ['RATO','BOLA','LASER','CAIXA','NOVELO','SKATE'];
  }

  _csv(texto) { if (!texto || String(texto).trim() === '') return []; return String(texto).split(',').map(p => p.trim()); }
  _csvUpper(texto) { return this._csv(texto).map(p => p.toUpperCase()); }
  _temDuplicado(lista) { const v = {}; for (const x of lista) { if (v[x]) return true; v[x] = true; } return false; }
  _ehSubsequencia(fav, seq) { let j = 0; for (let i = 0; i < seq.length && j < fav.length; i++) if (seq[i] === fav[j]) j++; return j === fav.length; }
  _temTodos(fav, seq) { const s = {}; for (const t of seq) s[t] = true; for (const f of fav) if (!s[f]) return false; return true; }
  _pessoaPodeLevar(animal, brinquedosPessoa, totalAnimais, totalGatos) {
    if (totalAnimais >= 3) return false;
    if (animal.tipo === 'gato' && totalGatos >= 1) return false;
    if (animal.especial) return this._temTodos(animal.fav, brinquedosPessoa);
    return this._ehSubsequencia(animal.fav, brinquedosPessoa);
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // Validações
    const p1 = this._csvUpper(brinquedosPessoa1);
    const p2 = this._csvUpper(brinquedosPessoa2);
    if (p1.some(t => !this.brinquedosValidos.includes(t)) ||
        p2.some(t => !this.brinquedosValidos.includes(t))) return { erro: 'Brinquedo inválido' };
    if (this._temDuplicado(p1) || this._temDuplicado(p2)) return { erro: 'Brinquedo inválido' };

    const entrada = this._csv(ordemAnimais);
    if (entrada.length === 0) return { erro: 'Animal inválido' };
    const ordem = [];
    for (const nome of entrada) {
      const canon = Object.keys(this.catalogo).find(n => n.toLowerCase() === nome.toLowerCase());
      if (!canon) return { erro: 'Animal inválido' };
      ordem.push(canon);
    }
    if (this._temDuplicado(ordem)) return { erro: 'Animal inválido' };

    // Alocação
    let total1 = 0, total2 = 0, gatos1 = 0, gatos2 = 0;
    let locoDono = null;
    const destino = {};

    for (const nome of ordem) {
      const animal = this.catalogo[nome];
      const p1Pode = this._pessoaPodeLevar(animal, p1, total1, gatos1);
      const p2Pode = this._pessoaPodeLevar(animal, p2, total2, gatos2);

      if (p1Pode && p2Pode) {
        destino[nome] = 'abrigo';
      } else if (p1Pode) {
        destino[nome] = 'pessoa 1';
        total1++; if (animal.tipo === 'gato') gatos1++; if (animal.especial) locoDono = 'p1';
      } else if (p2Pode) {
        destino[nome] = 'pessoa 2';
        total2++; if (animal.tipo === 'gato') gatos2++; if (animal.especial) locoDono = 'p2';
      } else {
        destino[nome] = 'abrigo';
      }
    }

    // se ficar sozinho na casa, volta pro abrigo
    if (locoDono === 'p1' && total1 === 1) destino['Loco'] = 'abrigo';
    if (locoDono === 'p2' && total2 === 1) destino['Loco'] = 'abrigo';

    const nomesOrdenados = Object.keys(destino).sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
    const lista = nomesOrdenados.map(n => `${n} - ${destino[n]}`);
    return { lista };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
