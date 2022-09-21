import MineBoard from "./MineBoard.js";
import MineSearchBoard from "./MineSearchBoard.js";

class Minesweeper{
    constructor() {
        this.debug = false;
        this.mb = new MineBoard();
        this.msb = new MineSearchBoard();
        this.msb.mineBoard = this.mb;
        this.boardWidth = 0;
        this.boardHeight = 0;
        this.maxIdx = 0;
    }
    setBoard(w,h){
        this.mb.setBoard(w,h)
        this.msb.setBoard(w,h)
        this.boardWidth = this.mb.boardWidth;
        this.boardHeight = this.mb.boardHeight;
        this.maxIdx = this.mb.maxIdx;
    }
    printBoard(){
        this.msb.printBoard()
    }
}

export default Minesweeper;