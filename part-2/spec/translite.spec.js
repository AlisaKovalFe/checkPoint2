const path = require('path');
const Translitor = require('../translitor');
const converter = require('../converter');

describe('Перевод текста в латиницу', () => {
  let translitor;

  beforeEach(() => {
    translitor = new Translitor({
      path: path.join(__dirname, '..'),
      converter,
    });
  });

  describe('Translitor содержит необходимые методы', () => {
    it('Содержит метод readFile', () => {
      expect(translitor.readFile).toBeTruthy();
    });
    it('Содержит метод convertString', () => {
      expect(translitor.convertString).toBeTruthy();
    });
  });

  describe('Проверка работы методов', () => {
    it('Метод readFile возвращает содержимое файла', () => {
      translitor.readFile('translitThis.txt')
        .then((data) => {
          expect(data).toBe('Необходимо перевести этот текст в транслит');
        });
    });

    it('Метод convertString возвращает сообщение написанное транслитом', () => {
      translitor.convertString('translitThis.txt')
        .then((data) => {
          expect(data).toBe('Neobhodimo perevesti etot tekst v translit');
        });
    });
  });
});
