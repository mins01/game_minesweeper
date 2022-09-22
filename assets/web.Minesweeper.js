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

ms.fnDraw=(ms)=>{
  console.log(ms)
  const msItems = ms.msBoard.querySelectorAll('.ms-item');
  msItems.forEach((el,idx) => {
    el.dataset.idx = idx;
    el.dataset.dig = ms.msb.board[idx].dig;
    el.dataset.cover = ms.msb.board[idx].cover;
    el.dataset.flag = ms.msb.board[idx].flag;
    el.dataset.mine = ms.msb.board[idx].mine;
    const ch = el.querySelector('.ms-item-box');
    ch.dataset.idx = idx;
    ch.dataset.dig = ms.msb.board[idx].dig;
    ch.dataset.cover = ms.msb.board[idx].cover;
    ch.dataset.flag = ms.msb.board[idx].flag;
    ch.dataset.mine = ms.msb.board[idx].mine;
  });
}

ms.msBoard.addEventListener('click',(event)=>{
  const target = event.target;
  if(!target.classList.contains('ms-item')){return false;}
  // const p = target.parentElement;
  // console.log(target)
  ms.dig(parseInt(target.dataset.idx))
  ms.draw();
})







// export default ms;