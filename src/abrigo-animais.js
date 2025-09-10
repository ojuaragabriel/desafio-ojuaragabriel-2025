class AbrigoAnimais {
  constructor() {
    // Catálogo
    this.catalogo = {
      Rex:  { tipo: 'cão',   fav: ['RATO', 'BOLA'] },
      Mimi: { tipo: 'gato',  fav: ['BOLA', 'LASER'] },
      Fofo: { tipo: 'gato',  fav: ['BOLA', 'RATO', 'LASER'] },
      Zero: { tipo: 'gato',  fav: ['RATO', 'BOLA'] },
      Bola: { tipo: 'cão',   fav: ['CAIXA', 'NOVELO'] },
      Bebe: { tipo: 'cão',   fav: ['LASER', 'RATO', 'BOLA'] },
      Loco: { tipo: 'jabuti', fav: ['SKATE', 'RATO'], especial: true }
    };

    // Aceitos
    this.brinquedosValidos = ['RATO','BOLA','LASER','CAIXA','NOVELO','SKATE'];
  }

  _csv(texto) {
    if (!texto || String(texto).trim() === '') return [];
    return String(texto).split(',').map(p => p.trim());
  }
  _csvUpper(texto) { return this._csv(texto).map(p => p.toUpperCase()); }
  _temDuplicado(lista) {
    const vistos = {};
    for (const x of lista) {
      if (vistos[x]) return true;
      vistos[x] = true;
    }
    return false;
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // valida
    const p1 = this._csvUpper(brinquedosPessoa1);
    const p2 = this._csvUpper(brinquedosPessoa2);
    if (p1.some(t => !this.brinquedosValidos.includes(t)) ||
        p2.some(t => !this.brinquedosValidos.includes(t))) {
      return { erro: 'Brinquedo inválido' };
    }
    if (this._temDuplicado(p1) || this._temDuplicado(p2)) {
      return { erro: 'Brinquedo inválido' };
    }

    // valída os animais
    const entrada = this._csv(ordemAnimais);
    if (entrada.length === 0) return { erro: 'Animal inválido' };

    const ordem = [];
    for (const nome of entrada) {
      const canon = Object.keys(this.catalogo).find(n => n.toLowerCase() === nome.toLowerCase());
      if (!canon) return { erro: 'Animal inválido' };
      ordem.push(canon);
    }
    if (this._temDuplicado(ordem)) return { erro: 'Animal inválido' };

    return { lista: [] };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
