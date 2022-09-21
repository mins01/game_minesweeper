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
// ms.msb.plantRandomMines(1);
ms.start();


// ms.digXy(1,2);
// ms.digXy(3,2);


ms.draw();
process.stdout.write('input: x y (enter) (*quit: q) : ');


let args = [],x=-1,y=-1;
let mode = 'd';
reader.on('line', (line) => {
  args = line.split(/[\s\t\r\n]/);
  // console.log(line,args);
  if(args[0]=='q'){
    console.log('Bye~');
    reader.close();
    return;
  }
  x = parseInt(args[0],10);
  y = parseInt(args[1],10);
  if(isNaN(x) || isNaN(y)){
    console.log('Input value is not number.');
    return;
  }

  if(ms.digXy(x,y)){
    ms.draw();
    process.stdout.write('input: x y (enter) (*quit: q) : ');
  }else{
    ms.draw();
    if(ms.endding==1){
      console.log('CLEAR!');
    }else if(ms.endding==2){
      console.log('BOOM!');
    }
    
    reader.close();
  }

});
