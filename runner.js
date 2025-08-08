// Используйте для решения судоку необходимые функции из файла sudoku.js
const { read, solve, isSolved, prettyBoard } = require('./sudoku');
const chalk = require("chalk");

const count = process.argv[2]; // для ввода значений с терминала


function sudokuSolution(number) {
  if (number < 0 || number > 15) {
    return 'Введите число от 0 до 15';
  }

  const board = read(number);

  // Копируем оригинал для вывода (глубокая копия)
  const original = board.map((row) => [...row]);
  // цвет в консоле
  console.log(chalk.red('\n ========== Исходное поле =========='));
  prettyBoard(original);

  // Заполнение судоку и цвет в консоле
  console.log(chalk.yellow('\n ============= Решение ============='));
  solve(board);

  // Если судоку решено верно, то отрисовываем таблицу и пишем "Судоку решено!" или иначе
  if (isSolved(board)) {
    prettyBoard(board);
  //цвет в консоле
    return chalk.green('\n Судоку решено!\n');
  } else {
    prettyBoard(board);
  //цвет в консоле
    return chalk.red('\n Судоку не решено!\n');
  }
}

console.log(sudokuSolution(count));