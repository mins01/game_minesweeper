// const Board = require("./Board");
import Board from "./Board.js";

class MineSearchBoard extends Board{
    constructor() {
        
        super();
        this.debug = false;
        this.boardWidth = 0;
        this.boardHeight = 0;
        this.board = [];
    }

    select(x,y){

    }
    
    
}

// if(module && module.exports){
//     module.exports = MineSearchBoard;
// }
export default MineSearchBoard;
