const fs = require('fs');
const Table = require('cli-table3');
const CliTable3 = require('cli-table3');

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


function solve(board) {
  // Проходим по каждой строке (i) и столбцу (j)
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {

      // Если клетка пустая (обозначена '-'), пытаемся вставить туда число
      if (board[i][j] === '-') {

        // Пробуем поставить цифры от 1 до 9
        for (let num = 1; num <= 9; num++) {
          const value = String(num); // Преобразуем число в строку, т.к. в board хранятся строки

          // Получаем текущую строку (i)
          const row = board[i];

          // Получаем текущий столбец (j)
          const column = board.map((row) => row[j]);

          // Находим координаты начала квадрата 3x3, в который входит клетка [i][j]
          const boxStartRow = Math.floor(i / 3) * 3;
          const boxStartCol = Math.floor(j / 3) * 3;
          const box = [];

          for (let r = boxStartRow; r < boxStartRow + 3; r++) {
            for (let c = boxStartCol; c < boxStartCol + 3; c++) {
              box.push(board[r][c]);
            }
          }

          // Если цифры нет ни в строке, ни в столбце, ни в квадрате — ставим её
          if (!row.includes(value) && !column.includes(value) && !box.includes(value)) {
            // Вставляем число в пустую клетку
            board[i][j] = value;

            // Рекурсивно решаем оставшуюся часть поля
            if (solve(board)) {
              return board; // Успешно нашли решение
            }

            // Если не получилось — откатываем (возвращаем '-' в клетку, если зашли в тупик)
            board[i][j] = '-';
          }
        }

        // Ни одно число не подошло — возвращаем false (тупик)
        return false;
      }
    }
  }

  // Если нет пустых клеток — решение найдено
  return board;
}

function isSolved(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = board[i][j];

      // Если есть хотя бы одна пустая клетка — судоку не решено
      if (cell === '-') { 
        return false;
      }

      // Проверка строки
      for (let k = 0; k < 9; k++) {
        // Пропускаем текущую ячейку, чтобы не сравнивать её саму с собой
        if (k !== j && board[i][k] === cell) {
          return false;
        }
      }

      // Проверка столбца
      for (let k = 0; k < 9; k++) {
        // Пропускаем текущую ячейку, чтобы не сравнивать её саму с собой
        if (k !== i && board[k][j] === cell) {
          return false;
        }
      }

      // Проверка блока 3x3
      const boxRow = Math.floor(i / 3) * 3;
      const boxCol = Math.floor(j / 3) * 3;

      for (let k = boxRow; k < boxRow + 3; k++) {
        for (let l = boxCol; l < boxCol + 3; l++) {
          // Пропускаем текущую ячейку
          if ((k !== i || l !== j) && board[k][l] === cell) {
            return false;
          }
        }
      }
    }
  }

  return true;
}

function prettyBoard() {
  /**
   * Принимает игровое поле в том формате, в котором его вернули из функции solve.
   * Выводит в консоль/терминал судоку.
   * Подумай, как симпатичнее его вывести.
   */
}
