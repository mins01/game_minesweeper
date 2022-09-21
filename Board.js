class Board{
    constructor() {
        this.debug = false;
        this.boardWidth = 0;
        this.boardHeight = 0;
        this.board = [];

        // this.debugBoard_1 = 'V';
        // this.debugBoard_0 = '-';
    }
    
    // 보드 설정
    setBoard(w,h,v){
        if(v===undefined){v = 0}
        this.board = [];
        for(var i=0,m=h;i<m;i++){
            this.board = this.board.concat((new Array(w)).fill(0));
        }
        this.boardWidth = w;
        this.boardHeight = h;
        this.printDebug('setBoard',Array.from(arguments).join(','))
    }
    // 지정위치 지뢰 매설(1개)
    setValue(x,y,v){
        this.printDebug('setValue',Array.from(arguments).join(','))
        if(v == undefined){v = 1;}
        let idx = this.boardWidth*y+x;
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
}

// if(module && module.exports){
//     module.exports = Board;
// }

export default Board;
