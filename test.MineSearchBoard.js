// const MineSearchboard = require("./MineSearchBoard");
// require("MineSearchboard.js")
import MineSearchBoard from "./MineSearchBoard.js";


let msb = new MineSearchBoard();
// console.log(msb);
msb.debug = true
msb.setBoard(6,6,-1);

// // msb.plantMine(1,0);
// // msb.plantMine(2,5);
// // msb.plantMine(3,4);
// // msb.plantMine(4,3);
// msb.plantRandomMines(4);

// msb.printBoard();