// const MineSearchboard = require("./MineSearchBoard");
// require("MineSearchboard.js")
import MineBoard from "./MineBoard.js";
import MineSearchBoard from "./MineSearchBoard.js";


let mb = new MineBoard();
mb.debug = true
mb.setBoard(6,6,0);

// mb.plantRandomMines(4);

let msb = new MineSearchBoard();
// console.log(msb);
msb.debug = true
msb.setBoard(3,3);
msb.plantMineXy(0,1);
msb.plantMineXy(1,1);
msb.plantMineXy(2,1);
msb.fillHint();
msb.printBoard();

msb.digXy(1,0);
msb.flagXy(0,1);
msb.printBoard();
console.log(msb.countFlagedMine);

// msb.plantMineXy(0,0);
// msb.plantMineXy(1,1);
// msb.plantMineXy(2,2);
// msb.plantMineXy(3,3);
// msb.plantMineXy(4,4);
// msb.plantMineXy(5,5);
// msb.mineBoard = mb; 

// msb.digXy(0,1);
// msb.digXy(1,1);

// msb.printBoard();
// // console.log(msb.countAroundedMines(msb.xyToIdx(1,2)));
// console.log(msb.digXy(1,2)); ;
// // mb.printBoard();
// msb.printBoard();

// console.log(msb.digXy(3,2)); ;
// console.log(msb.flagXy(3,3,1)); ;
// // mb.printBoard();
// msb.printBoard();
