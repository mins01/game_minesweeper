// const MineSearchboard = require("./MineSearchBoard");
// require("MineSearchboard.js")
import MineBoard from "./MineBoard.js";
import MineSearchBoard from "./MineSearchBoard.js";


let mb = new MineBoard();
mb.debug = true
mb.setBoard(6,6,0);
mb.plantMine(0,0);
mb.plantMine(1,1);
mb.plantMine(2,2);
mb.plantMine(3,3);
mb.plantMine(4,4);
mb.plantMine(5,5);
// mb.plantRandomMines(4);

let msb = new MineSearchBoard();
// console.log(msb);
msb.debug = true
msb.setBoard(6,6,-1);
msb.mineBoard = mb; 

// msb.digXy(0,1);
// msb.digXy(1,1);

msb.printBoard();
// console.log(msb.countAroundedMines(msb.xyToIdx(1,2)));
console.log(msb.digXy(1,2)); ;
// mb.printBoard();
msb.printBoard();

console.log(msb.digXy(3,2)); ;
console.log(msb.flagXy(3,3,1)); ;
// mb.printBoard();
msb.printBoard();
