// const Board = require("./Board");
import Board from "./Board.js";
// import Board from "./Board";

// require("Mineboard.js")

let board = new Board();
board.debug = true
board.setBoard(10,10);

board.setValue(board.xyToIdx(0,0),0);
board.setValue(board.xyToIdx(1,1),1);
board.setValue(board.xyToIdx(2,2),2);
board.setValue(board.xyToIdx(3,3),3);
board.setValue(board.xyToIdx(4,4),4);
board.setValue(board.xyToIdx(5,5),5);
board.setValue(board.xyToIdx(6,6),6);
board.setValue(board.xyToIdx(7,7),7);
board.setValue(board.xyToIdx(8,8),8);
board.setValue(board.xyToIdx(9,9),9);


board.printBoard();