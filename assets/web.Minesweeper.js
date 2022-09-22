import Minesweeper from "./Minesweeper.js";


let ms = new Minesweeper();
// ms.debug = true
// ms.msb.debug = true; 
ms.debug = false;
ms.msb.debug = false;
globalThis.ms = ms;

// node 연결
ms.gameApp = document.querySelector('#gameApp');
ms.msBoard = ms.gameApp.querySelector('.ms-board');

ms.fnInit=(ms)=>{

  ms.gameApp.style.setProperty('--grid-number-columns', ms.width);
  ms.gameApp.style.setProperty('--grid-number-rows',ms.height);
  ms.gameApp.style.setProperty('--grid-max-wh',Math.max(ms.width,ms.height));
  

  ms.msBoard.innerHTML = '';
  let template_ms_item = document.querySelector('#template_ms_item');
  ms.msb.board.forEach((element) => {
    const clone = template_ms_item.content.cloneNode(true);
    const msItem = clone.querySelector('.ms-item');

    ms.msBoard.appendChild(clone);
  });
  

  console.log(ms.width)
}

let fnDraw = (ms)=>{
 // console.log(ms)
 const msItems = ms.msBoard.querySelectorAll('.ms-item');
 msItems.forEach((el,idx) => {
   el.dataset.idx = idx;
   el.dataset.dig = ms.msb.board[idx].dig;
   el.dataset.cover = ms.msb.board[idx].cover;
   el.dataset.flag = ms.msb.board[idx].flag;
   el.dataset.mine = ms.msb.board[idx].mine;
  //  el.dataset.last = (idx == ms.lastIdx)?'on':'off';
  //  const ch = el.querySelector('.ms-item-box');
  //  ch.dataset.idx = idx;
  //  ch.dataset.dig = ms.msb.board[idx].dig;
  //  ch.dataset.cover = ms.msb.board[idx].cover;
  //  ch.dataset.flag = ms.msb.board[idx].flag;
  //  ch.dataset.mine = ms.msb.board[idx].mine;
  //  ch.dataset.last = (idx == ms.lastIdx)?'on':'off';
 });
 // status
 document.querySelectorAll('.ms-status-wrap .numberAction').forEach((el)=>{el.innerHTML = ms.numberAction})
 document.querySelectorAll('.ms-status-wrap .countDig').forEach((el)=>{el.innerHTML = ms.msb.countDig})
 document.querySelectorAll('.ms-status-wrap .countFlag').forEach((el)=>{el.innerHTML = ms.msb.countFlag})
 document.querySelectorAll('.ms-status-wrap .countMine').forEach((el)=>{el.innerHTML = ms.msb.countMine})
 document.querySelectorAll('.ms-status-wrap .countFlagedMine').forEach((el)=>{el.innerHTML = ms.msb.countFlagedMine})
 document.querySelectorAll('.ms-status-wrap .countDig').forEach((el)=>{el.innerHTML = ms.msb.countDig})
 document.querySelectorAll('.ms-status-wrap .countBoom').forEach((el)=>{el.innerHTML = ms.msb.countBoom})
 document.querySelectorAll('.ms-status-wrap .countArea').forEach((el)=>{el.innerHTML = ms.msb.countArea})

 ms.gameApp.dataset.playing = ms.playing?'on':'off';
 ms.gameApp.dataset.endding = ms.endding;
 
}
ms.fnDraw = fnDraw;


ms.fnEnd=(ms)=>{
  fnDraw(ms)
  let tm = 0;
  if(ms.startDate!=null){
    tm = ((ms.endDate.getTime()-ms.startDate.getTime())/1000).toFixed(2);
  }
  let endding = ms.isEnd();
  if(endding == 2){ //폭발 엔딩
    setTimeout(()=>{
      alert('💥💥💥💥💥 BOOM 💥💥💥💥💥\n ⏰ '+tm+'sec')
    },500)
  }
  if(endding == 1){ //해제 엔딩
    setTimeout(()=>{
      alert('🌺🌺🌺🌺🌺 Clear 🌺🌺🌺🌺🌺\n ⏰ '+tm+'sec')
    },500)
  } 
}

ms.msBoard.addEventListener('click',(event)=>{
  if(!ms.playing){return false;}
  const target = event.target;
  if(!target.classList.contains('ms-item')){return false;}
  // const p = target.parentElement;
  // console.log(target)
  let tool = document.form_tool.querySelector('input[name=ms_tool]:checked').value;

  if((tool=='dig' && ms.dig(parseInt(target.dataset.idx))) || (tool=='flag' && ms.flag(parseInt(target.dataset.idx)))){
    ms.draw();
  }else{
    ms.draw();
    ms.end();
  }
  
})
ms.msBoard.addEventListener('contextmenu',(event)=>{
  if(!ms.playing){return false;}
  const target = event.target;
  if(!target.classList.contains('ms-item')){return false;}
  event.stopPropagation()
  event.preventDefault();
  
  // const p = target.parentElement;
  // console.log(target)
  let tool = 'flag';

  if((tool=='dig' && ms.dig(parseInt(target.dataset.idx))) || (tool=='flag' && ms.flag(parseInt(target.dataset.idx)))){
    ms.draw();
  }else{
    ms.draw();
    ms.end();
  }
  return false;
})






// export default ms;