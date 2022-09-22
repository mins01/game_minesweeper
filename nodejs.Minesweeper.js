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
// ms.debug = true
// ms.msb.debug = true; 
ms.debug = false;
ms.msb.debug = false;
 

// ms.setBoard(3,3,0);
// ms.msb.plantMineXy(0,1);
// ms.msb.plantMineXy(1,1);
// ms.msb.plantMineXy(2,1);

let width = 0,height=0,confNumberMine=0;

let args = [],x=-1,y=-1;
let inputMode = 'dig';


process.stdout.write('board width : ');


reader.on('line', (line) => {
  line = line.trim();

  if(isNaN(width) || width<=0){
    width = parseInt(line);
    if(isNaN(width) || width<=0){
      process.stdout.write('board width : ');
    }else{
      process.stdout.write('board height : ');
    }
    return;
  }
  if(isNaN(height) || height<=0){
    height = parseInt(line);
    if(isNaN(height) || height<=0){
      process.stdout.write('board height : ');
    }else{
      process.stdout.write('number of mine : ');
    }
    return;
  }
  if(isNaN(confNumberMine) || confNumberMine<=0){
    confNumberMine = parseInt(line);
    if(isNaN(confNumberMine) || confNumberMine<=0){
      process.stdout.write('number of mine : ');
    }else{
      if(!ms.playing){
        ms.setBoard(width,height,0);
        ms.confNumberMine = confNumberMine;
        ms.start();
        ms.draw();
      }
      process.stdout.write(`[mode:${inputMode}] x y (enter) (*empty : dig<=>flag)(*q : quit) : `);
    }
    return;
  }

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
