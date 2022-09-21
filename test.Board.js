// const Board = require("./Board");
import Board from "./Board.js";
// import Board from "./Board";

// require("Mineboard.js")

let board = new Board();
board.debug = true
board.setBoard(10,10);

board.setValue(0,0,0);
board.setValue(1,1,1);
board.setValue(2,2,2);
board.setValue(3,3,3);
board.setValue(4,4,4);
board.setValue(5,5,5);
board.setValue(6,6,6);
board.setValue(7,7,7);
board.setValue(8,8,8);
board.setValue(9,9,9);


board.printBoard();