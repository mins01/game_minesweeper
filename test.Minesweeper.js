// const MineSearchboard = require("./MineSearchBoard");
// require("MineSearchboard.js")
import Minesweeper from "./Minesweeper.js";


let ms = new Minesweeper();
ms.debug = true
ms.msb.debug = true; 
ms.setBoard(6,6,0);
ms.msb.plantRandomMines(30);
ms.start();

// msb.selectXy(0,1);
// msb.selectXy(1,1);

// console.log(msb.countAroundedMines(msb.xyToIdx(1,2)));
// console.log(ms.msb.digXy(1,2)); ;
// mb.printBoard();
// ms.printBoard();

// console.log(ms.msb.digXy(3,2)); ;
// mb.printBoard();
// ms.printBoard();

ms.digXy(1,2);
ms.digXy(3,2);

