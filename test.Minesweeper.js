process.stdin.resume();
process.stdin.setEncoding('utf8');

var data = [];
// var reader = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
import readline from "readline";
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// const MineSearchboard = require("./MineSearchBoard");
// require("MineSearchboard.js")
import Minesweeper from "./Minesweeper.js";


let ms = new Minesweeper();
ms.debug = true
ms.msb.debug = true; 
ms.setBoard(3,3,0);
ms.msb.plantMine(0,1);
ms.msb.plantMine(1,1);
ms.msb.plantMine(2,1);
// ms.msb.plantRandomMines(1);
ms.start();
ms.flagXy(0,1);
ms.flagXy(1,1);
ms.flagXy(2,1);
ms.end() //전부 찾음

ms.start();
ms.flagXy(0,1);
ms.flagXy(1,1);
// ms.flagXy(2,1);
ms.end() //2개만 찾음

ms.start();
ms.flagXy(0,1);
if(ms.playing && !ms.digXy(0,0)) ms.end();
if(ms.playing && !ms.digXy(1,1)) ms.end(); //여기서 터짐
if(ms.playing && !ms.digXy(2,2)) ms.end();


ms.start();
if(ms.playing && !ms.digXy(0,0)) ms.end();
if(ms.playing && !ms.digXy(1,1)) ms.end(); //여기서 터짐
if(ms.playing && !ms.digXy(2,2)) ms.end();

process.exit()
