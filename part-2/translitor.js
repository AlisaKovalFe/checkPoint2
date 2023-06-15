const path = require("path");
const fs = require("fs").promises;
const converter = require("./converter");

class Translitor {
  constructor({ path, converter }) {
    this.path = path
    this.converter = converter
  }

  async readFile(path) {
    let data = await fs.readFile(path, 'utf8')
    return data
  }

  async convertString(path) {
    const str = await this.readFile(path, 'utf8')
    let newStr = ''
    for (let letter = 0; letter < str.length; letter++) {
      newStr += this.converter[str[letter]] // работал и просто converter, потому что на 3 строке переменная с таким же именем?
    }
  }
}

module.exports = Translitor;

// моменты в комментах надо проговорить, что мне разобраться
// 1) в ридми указано, что метод должен быть асинхронным, поэтому я сам метод и прописала асихнронным, хотя если просто асихронно читать данные в обычном методе (не асинх) через readFile все тоже ок работает
// 2) в тесте в качестве аргумент указан только файл txt, поэтому даже если не делать асинхронным сам метод чтение файла без колбэка все равно  работает
// 3) по тесту в методах приходит какой-то путь (прописан там руками), поэтому я писала в аргмументе входящий path и далее в методе этот path использовала, но при этом здесь по идее я могла бы в самом методе использовать this.path. В обоих случаях тесты проходят, но под тестами разные комменты - ошибки, связанные, видимо, с этим путем ======> см.ниже                         (как правильно то?)

// т.о. если я в методах пишу this.path, то коммент-ошибка такая:
// node:internal/process/promises:279
//   triggerUncaughtException(err, true /* fromPromise */);
//   ^

// [Error: EISDIR: illegal operation on a directory, read] {
// errno: -21,
// code: 'EISDIR',
// syscall: 'read'
// }


// если я в методах пишу path, то коммент-ошибка такая:
// node:internal/process/promises:279
//  triggerUncaughtException(err, true /* fromPromise */);
//  ^

// [Error: ENOENT: no such file or directory, open 'translitThis.txt'] {
//   errno: -2,
//   code: 'ENOENT',
//   syscall: 'open',
//   path: 'translitThis.txt'
// }