// const Board = require("./Board");
import Board from "./Board.js";
/**
 * 지뢰 찾기 보드
 * -2:지뢰가 터짐
 * -1:찾기전
 * 0:없음
 * >0:주위의 지뢰 수
 */
class MineSearchBoard extends Board{
    constructor() {
        super();
        this.debug = false;
        this.boardWidth = 0;
        this.boardHeight = 0;
        this.board = [];
        this.mineBoard = null;
    }

    setBoard(w,h){
        this.board = [];
        for(var i=0,m=w*h;i<m;i++){
            this.board.push({'value':-1,'cover':-1,'flag':0});
        }
        this.boardWidth = w;
        this.boardHeight = h;
        this.maxIdx = this.board.length - 1;
        this.printDebug('setBoard',Array.from(arguments).join(','))
    }
    flagXy(x,y,v){
        this.printDebug('flagXy',Array.from(arguments).join(','));
        return this.flag(this.xyToIdx(x,y),v);
    }
    flag(idx,v){
        this.board[idx].flag = v;
    }
    digXy(x,y){
        this.printDebug('digXy',Array.from(arguments).join(','));
        return this.dig(this.xyToIdx(x,y));
    }
    dig(idx){
        let idxes = this.aroundedIdxes(idx,true);
        idxes.forEach((v,k)=>{
            // console.log(v,this.board[v],this.countAroundedMines(v))
            if(this.board[v].value == -1){
                this.board[v].cover = this.countAroundedMines(v)
            }
        });

        if(this.mineBoard.board[idx] != 0){
            this.board[idx].value = -2;
            // this.board[idx].cover = -2;
            return -2;
        }else{
            this.board[idx].value = 0;
            // this.board[idx].cover = 0;
            return 0;
        }
    }
    countCrossedMines(idx){
        let idxes = this.crossedIdxes(idx,true);
        let count = 0;
        idxes.forEach((v,i)=>{
            // console.log(v,this.mineBoard.board[v])
            if(this.mineBoard.board[v]!==0){
                count++;
            }
        });
        return count;
    }
    countAroundedMines(idx){
        let idxes = this.aroundedIdxes(idx,true);
        let count = 0;
        idxes.forEach((v,i)=>{
            // console.log(v,this.mineBoard.board[v])
            if(this.mineBoard.board[v]!==0){
                count++;
            }
        });
        return count;
    }


        // 디버깅용 보드 내용 출력
        printBoard(){
            let arrs = [];
            var t = (new Array(this.boardWidth+1)).fill(0).map((v,idx) => { return '[x'+(idx-1)+']'; })
            t[0] = '[y⧵x]';
            arrs.push(t.join('\t'));
            let chunkSize = this.boardWidth;
            for (let i = 0,m= this.board.length; i < m; i += chunkSize) {
                let defIdx = i;
                let chunk = ['['+'y'+Math.floor(i/this.boardWidth)+']'];
                chunk = chunk.concat(this.board.slice(i, i + chunkSize).map((v,k)=>{
                    return (this.mineBoard.board[defIdx+k]===0?'-':'M')+':'+(v.flag===0?'-':v.flag)+':'+(v.value==-1?'-':v.value)+':'+(v.cover==-1?'-':v.cover);
                }));
                // chunk = chunk.concat(this.board.slice(i, i + chunkSize));
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
//     module.exports = MineSearchBoard;
// }
export default MineSearchBoard;
