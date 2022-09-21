const Minesweeper = require("./Minesweeper");
// require("Minesweeper.js")

let ms = new Minesweeper();
ms.debug = true
ms.setBoard(6,6);

// ms.plantMine(1,0);
// ms.plantMine(2,5);
// ms.plantMine(3,4);
// ms.plantMine(4,3);
ms.plantRandomMines(4);

ms.printBoard();