// test/index.test.js

test('vérifie que true est vrai', () => {
  expect(true).toBe(true);
});

const maFonction = require('../src/index');

test('maFonction retourne ce qu’on attend', () => {
  expect(maFonction()).toBe('résultat attendu');
});
