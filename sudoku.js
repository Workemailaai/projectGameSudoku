function read(number) {
const data = fs.readFileSync('./puzzles.txt', 'utf-8');
  const arrStrData = data.trim().split('\n');

  // В этом массиве будут лежать все варианты судоку
  const sudokuStart = [];

  arrStrData.forEach((el) => {
    // Создаю доску для каждой строки из файла txt
    const board = [];
    let index = 0;

    for (let j = 0; j < 9; j++) {
      board.push([]);

      for (let i = 0; i < 9; i++) {
        board[j].push(el[index]);
        index++;
      }
    }

    // Пушу все полученные доски в sudokuStart
    sudokuStart.push(board);
  });

  // Возвращают вариант судоку под номером number
  return sudokuStart[number];
}


function solve() {
  /**
   * Принимает игровое поле в том формате, в котором его вернули из функции read.
   * Возвращает игровое поле после попытки его решить.
   */
}

function isSolved() {
  /**
   * Принимает игровое поле в том формате, в котором его вернули из функции solve.
   * Возвращает булевое значение — решено это игровое поле или нет.
   */
}

function prettyBoard() {
  /**
   * Принимает игровое поле в том формате, в котором его вернули из функции solve.
   * Выводит в консоль/терминал судоку.
   * Подумай, как симпатичнее его вывести.
   */
}
