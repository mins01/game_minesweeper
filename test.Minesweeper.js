// const MineSearchboard = require("./MineSearchBoard");
// require("MineSearchboard.js")
import Minesweeper from "./Minesweeper.js";


let ms = new Minesweeper();
ms.debug = true
ms.setBoard(6,6,0);
ms.mb.plantRandomMines(4);
ms.msb.debug = true 

// msb.selectXy(0,1);
// msb.selectXy(1,1);

// console.log(msb.countAroundedMines(msb.xyToIdx(1,2)));
console.log(ms.msb.selectXy(1,2)); ;
// mb.printBoard();
ms.printBoard();

console.log(ms.msb.selectXy(3,2)); ;
// mb.printBoard();
ms.printBoard();
