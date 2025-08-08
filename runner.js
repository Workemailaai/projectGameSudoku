// Используйте для решения судоку необходимые функции из файла sudoku.js
const { read, solve, isSolved, prettyBoard } = require('./sudoku');
const chalk = require("chalk");

const count = process.argv[2]; // для ввода значений с терминала


function sudokuSolution(number) {
  if (number < 0 || number > 14) {
    return 'Введите число от 0 до 14';
  }

  const board = read(number);

  // Копируем оригинал для вывода (глубокая копия)
  const original = board.map((row) => [...row]);
  console.log(chalk.red('\n ========== Исходное поле =========='));
  prettyBoard(original);

  // Заполнение судоку
  console.log(chalk.yellow('\n ============= Решение ============='));
  solve(board);

  // Если судоку решено верно, то отрисовываем таблицу и пишем "Судоку решено!" или иначе
  if (isSolved(board)) {
    prettyBoard(board);

    return chalk.green('\n Судоку решено!\n');
  } else {
    prettyBoard(board);

    return chalk.red('\n Судоку не решено!\n');
  }
}

console.log(sudokuSolution(count));