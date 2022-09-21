import MineBoard from "./MineBoard.js";
import MineSearchBoard from "./MineSearchBoard.js";

class Minesweeper{
    constructor() {
        this.debug = false;
        this.msb = new MineSearchBoard();
        this.boardWidth = 0;
        this.boardHeight = 0;
        this.maxIdx = 0;
        this.playing = false;
    }
    start(){
        this.playing = true;
    }
    setBoard(w,h){
        this.msb.setBoard(w,h)
        this.boardWidth = this.msb.boardWidth;
        this.boardHeight = this.msb.boardHeight;
        this.maxIdx = this.msb.maxIdx;
    }
    printBoard(){
        this.msb.printBoard()
    }

    digXy(x,y){
        if(!this.playing){
            console.log('Game ended');
            return;
        }
        let r = this.msb.digXy(x,y);
        if(r==-2){
            this.playing = false;
            this.printBoard();
            console.log('BOOM!');
            return false;
        }
        this.printBoard();
        return true;
    }
}

export default Minesweeper;