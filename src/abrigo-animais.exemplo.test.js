import { AbrigoAnimais } from './abrigo-animais';

test('Exemplo do enunciado', () => {
  const r = new AbrigoAnimais().encontraPessoas('RATO,BOLA','RATO,NOVELO','Rex,Fofo');
  expect(r.lista).toEqual(['Fofo - abrigo', 'Rex - pessoa 1']);
});
