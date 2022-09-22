// @deprecated


// const Mineboard = require("./MineBoard");
import Mineboard from "./Mineboard.js";

// require("Mineboard.js")

let mb = new Mineboard();
mb.debug = true
mb.setBoard(6,6);

// mb.plantMineXy(1,0);
// mb.plantMineXy(2,5);
// mb.plantMineXy(3,4);
// mb.plantMineXy(4,3);
mb.plantRandomMines(4);

mb.printBoard();