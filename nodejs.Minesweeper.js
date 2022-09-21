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


// ms.flagXy(0,1)?ms.draw():1;
// ms.flagXy(1,1)?ms.draw():1;
// ms.flagXy(2,1)?ms.draw():1;
// ms.end()
// process.exit()


// ms.digXy(1,2);
// ms.digXy(3,2);




let args = [],x=-1,y=-1;
let inputMode = 'dig';

ms.draw();
process.stdout.write(`[mode:${inputMode}] x y (enter) (*empty : dig<=>flag)(*q : quit) : `);

reader.on('line', (line) => {
  line = line.trim();
  if(line.length==0){
    inputMode = inputMode=='dig'?'flag':'dig';
    process.stdout.write(`[mode:${inputMode}] x y (enter) (*empty : dig<=>flag)(*q : quit) : `);
    return;
  }
  args = line.split(/[\s\t\r\n]/);
  
  // console.log(line,args);
  if(args[0]=='q'){
    ms.end();
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
  if( (inputMode=='dig' && ms.digXy(x,y) ) || (inputMode=='flag' && ms.flagXy(x,y)) ){
    ms.draw();
    process.stdout.write(`[mode:${inputMode}] x y (enter) (*empty : dig<=>flag)(*q : quit) : `);
  }else{
    ms.end(true);
    if(ms.endding==1){
      console.log('CLEAR!');
    }else if(ms.endding==2){
      console.log('BOOM!');
    }
    
    reader.close();
  }

});
