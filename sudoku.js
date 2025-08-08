const fs = require('fs');
const Table = require('cli-table3');
const CliTable3 = require('cli-table3');

function read(number) {
  const filePath = fs.readFileSync('./puzzles.txt', 'utf-8');
  const allBoards = filePath.trim().split('\n');

  // В этом массиве будут лежать все варианты судоку
  const variationSudoku = [];

  allBoards.forEach((el) => {
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
    variationSudoku.push(board);
  });

  // Возвращают вариант судоку под номером number
  return variationSudoku[number];
}

function solve(board) {
  // Проходим по каждой строке (strRow) и столбцу (strCol)
  for (let strRow = 0; strRow < 9; strRow++) {
    for (let strCol = 0; strCol < 9; strCol++) {
      // Если клетка пустая (обозначена '-'), пытаемся вставить туда число
      if (board[strRow][strCol] === '-') {
        // Пробуем поставить цифры от 1 до 9
        for (let num = 1; num <= 9; num++) {
          const value = String(num); // Преобразуем число в строку, т.к. в board хранятся строки

          // Получаем текущую строку (strRow)
          const row = board[strRow];

          // Получаем текущий столбец (strCol)
          const column = board.map((row) => row[strCol]);

          // Находим координаты начала квадрата 3x3, в который входит клетка [strRow][strCol]
          const boxStartRow = Math.floor(strRow / 3) * 3;
          const boxStartCol = Math.floor(strCol / 3) * 3;
          const box3x3 = [];

          for (let newRow = boxStartRow; newRow < boxStartRow + 3; newRow++) {
            for (let newCol = boxStartCol; newCol < boxStartCol + 3; newCol++) {
              box3x3.push(board[newRow][newCol]);
            }
          }

          // Если цифры нет ни в строке, ни в столбце, ни в квадрате — ставим её
          if (
            !row.includes(value) &&
            !column.includes(value) &&
            !box3x3.includes(value)
          ) {
            // Вставляем число в пустую клетку
            board[strRow][strCol] = value;

            // РЕКУРСИВНО решаем оставшуюся часть поля
            if (solve(board)) {
              return board; // Успешно нашли решение
            }

            // Если не получилось — откатываем (возвращаем '-' в клетку, если зашли в тупик)
            board[strRow][strCol] = '-';
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
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = board[row][col];

      // Если есть хотя бы одна пустая клетка — судоку не решено
      if (cell === '-') {
        return false;
      }

      // Проверка строки
      for (let fillCell = 0; fillCell < 9; fillCell++) {
        // Пропускаем текущую ячейку, чтобы не сравнивать её саму с собой
        if (fillCell !== col && board[row][fillCell] === cell) {
          return false;
        }
      }

      // Проверка столбца
      for (let fillCol = 0; fillCol < 9; fillCol++) {
        // Пропускаем текущую ячейку, чтобы не сравнивать её саму с собой
        if (fillCol !== row && board[fillCol][col] === cell) {
          return false;
        }
      }

      // Проверка блока 3x3
      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;

      for (let cellRow3x3 = boxRow; cellRow3x3 < boxRow + 3; cellRow3x3++) {
        for (let cellCol3x3 = boxCol; cellCol3x3 < boxCol + 3; cellCol3x3++) {
          // Пропускаем текущую ячейку
          if (
            (cellRow3x3 !== row || cellCol3x3 !== col) &&
            board[cellRow3x3][cellCol3x3] === cell
          ) {
            return false;
          }
        }
      }
    }
  }

  return true;
}

function prettyBoard(board) {
  const table = new Table();

  for (let i = 0; i < 9; i++) {
    // Если встречается '-', то заменяем на пустоту
    const row = board[i].map((cell) => (cell === '-' ? ' ' : cell));

    table.push(row);
  }

  console.log(table.toString());
}

module.exports = { read, solve, isSolved, prettyBoard, CliTable3 };
