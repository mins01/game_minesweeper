// const Mineboard = require("./MineBoard");
import Mineboard from "./Mineboard.js";

// require("Mineboard.js")

let mb = new Mineboard();
mb.debug = true
mb.setBoard(6,6);

// mb.plantMine(1,0);
// mb.plantMine(2,5);
// mb.plantMine(3,4);
// mb.plantMine(4,3);
mb.plantRandomMines(4);

mb.printBoard();