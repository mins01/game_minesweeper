class Board{
    constructor() {
        this.debug = false;
        this.boardWidth = 0;
        this.boardHeight = 0;
        this.maxIdx = 0;
        this.board = [];

        // this.debugBoard_1 = 'V';
        // this.debugBoard_0 = '-';
    }
    
    // 보드 설정
    setBoard(w,h,v){
        if(v===undefined){v = 0}
        this.board = [];
        // for(var i=0,m=h;i<m;i++){
        //     this.board = this.board.concat((new Array(w)).fill(v));
        // }
        for(var i=0,m=w*h;i<m;i++){
            this.board.push(v);
        }
        this.boardWidth = w;
        this.boardHeight = h;
        this.maxIdx = this.board.length - 1;
        this.printDebug('setBoard',Array.from(arguments).join(','))
    }
    // 지정위치 값 표시
    setValueXy(x,y,v){
        this.printDebug('setValueXy',Array.from(arguments).join(','))
        if(v == undefined){v = 1;}
        return this.setValue(this.xyToIdx(x,y),v);
    }
    setValue(idx,v){
        this.printDebug('setValue',Array.from(arguments).join(','))
        if(v == undefined){v = 1;}
        if(idx+1 > this.board.length){
            console.error(`${x},${y}는 board의 범위를 벗어납니다.`);
            return false;
        }
        this.board[idx] = 1;
        return true;
    }
    // 디버그 출력제어용
    printDebug(...args){
        if(!this.debug) return;
        console.log('@printDebug',args)
    }
    // 디버깅용 보드 내용 출력
    printBoard(){
        let arrs = [];
        var t = (new Array(this.boardWidth+1)).fill(0).map((v,idx) => { return '[x'+(idx-1)+']'; })
        t[0] = '[y⧵x]';
        arrs.push(t.join('\t'));
        let chunkSize = this.boardWidth;
        for (let i = 0,m= this.board.length; i < m; i += chunkSize) {
            let chunk = ['['+'y'+Math.floor(i/this.boardWidth)+']'];
            // chunk = chunk.concat(this.board.slice(i, i + chunkSize).map((v)=>{return v=='0'?this.debugBoard_0:this.debugBoard_1}));
            chunk = chunk.concat(this.board.slice(i, i + chunkSize));
            arrs.push(chunk.join('\t'));
        }
        var t = '#'+'='.repeat(this.boardWidth*8)+'#';
        console.log(t)
        console.log('|'+' '.repeat(Math.floor((t.length-12)/2))+'printBoard'+' '.repeat(Math.floor((t.length-12)/2))+'|')
        var t2 = '#'+'-'.repeat(this.boardWidth*8)+'#';
        console.log(t2)
        console.log(arrs.join('\n'));
        console.log(t2)
    }
    xyToIdx(x,y){
        return this.boardWidth*y+x;
    }
    relIdx(idx,x,y){
        let nIdx = -1,nX=-1,nY=-1;
        nIdx = idx+this.boardWidth*y+1*x;
        nX = nIdx % this.boardWidth;
        nY = Math.ceil(nIdx / this.boardWidth);
        if(nX < 0 || nY < 0 || nIdx < 0 || nX > this.boardWidth-1 || nY > this.boardHeight -1 || nIdx > this.maxIdx){
            return null;
        }
        return nIdx
    }
    // 9면
    aroundedIdxes(idx,containSelf){
        // let idx = this.xyToIdx(x,y);
        let idxes = [];
        let nIdx = -1,x=-1,y=-1;

        nIdx = this.relIdx(idx, -1, -1); if(nIdx !== null ) idxes.push(nIdx);
        nIdx = this.relIdx(idx,  0, -1); if(nIdx !== null ) idxes.push(nIdx);
        nIdx = this.relIdx(idx, +1, -1); if(nIdx !== null ) idxes.push(nIdx);
        nIdx = this.relIdx(idx, -1,  0); if(nIdx !== null ) idxes.push(nIdx);
        if(containSelf){ 
            nIdx = this.relIdx(idx,  0,  0); if(nIdx !== null ) idxes.push(nIdx);
        }
        nIdx = this.relIdx(idx, +1,  0); if(nIdx !== null ) idxes.push(nIdx);
        nIdx = this.relIdx(idx, -1, +1); if(nIdx !== null ) idxes.push(nIdx);
        nIdx = this.relIdx(idx,  0, +1); if(nIdx !== null ) idxes.push(nIdx);
        nIdx = this.relIdx(idx, +1, +1); if(nIdx !== null ) idxes.push(nIdx);
        

        // nIdx = idx-this.boardWidth-1; x=nIdx%this.boardWidth; y if(nIdx >= 0 && nIdx <= this.maxIdx) idxes.push(nIdx);
        // nIdx = idx-this.boardWidth; if(nIdx >= 0 && nIdx <= this.maxIdx) idxes.push(nIdx);
        // nIdx = idx-this.boardWidth+1; if(nIdx >= 0 && nIdx <= this.maxIdx) idxes.push(nIdx);
        // nIdx = idx-0-1; if(nIdx >= 0 && nIdx <= this.maxIdx) idxes.push(nIdx);
        // if(containSelf){ 
        //     nIdx = idx-0; if(nIdx >= 0 && nIdx <= this.maxIdx) idxes.push(nIdx); //자기자신 
        // }
        // nIdx = idx-0+1; if(nIdx >= 0 && nIdx <= this.maxIdx) idxes.push(nIdx);
        // nIdx = idx+this.boardWidth-1; if(nIdx >= 0 && nIdx <= this.maxIdx) idxes.push(nIdx);
        // nIdx = idx+this.boardWidth; if(nIdx >= 0 && nIdx <= this.maxIdx) idxes.push(nIdx);
        // nIdx = idx+this.boardWidth+1; if(nIdx >= 0 && nIdx <= this.maxIdx) idxes.push(nIdx);
        return idxes;
    }

    // 상하좌우 4면
    crossedIdxes(idx,containSelf){
        // let idx = this.xyToIdx(x,y);
        let idxes = [];
        let nIdx = 0;
        // nIdx = idx-this.boardWidth-1; if(nIdx >= 0 && nIdx <= this.maxIdx) idxes.push(nIdx);
        nIdx = idx-this.boardWidth; if(nIdx >= 0 && nIdx <= this.maxIdx) idxes.push(nIdx);
        // nIdx = idx-this.boardWidth+1; if(nIdx >= 0 && nIdx <= this.maxIdx) idxes.push(nIdx);
        nIdx = idx-0-1; if(nIdx >= 0 && nIdx <= this.maxIdx) idxes.push(nIdx);
        if(containSelf){ 
            nIdx = idx-0; if(nIdx >= 0 && nIdx <= this.maxIdx) idxes.push(nIdx); //자기자신 
        }
        nIdx = idx-0+1; if(nIdx >= 0 && nIdx <= this.maxIdx) idxes.push(nIdx);
        // nIdx = idx+this.boardWidth-1; if(nIdx >= 0 && nIdx <= this.maxIdx) idxes.push(nIdx);
        nIdx = idx+this.boardWidth; if(nIdx >= 0 && nIdx <= this.maxIdx) idxes.push(nIdx);
        // nIdx = idx+this.boardWidth+1; if(nIdx >= 0 && nIdx <= this.maxIdx) idxes.push(nIdx);
        return idxes;
    }
}

// if(module && module.exports){
//     module.exports = Board;
// }

export default Board;
