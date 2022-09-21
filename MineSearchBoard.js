// const Board = require("./Board");
import Board from "./Board.js";
/**
 * 지뢰 찾기 보드
 */
class MineSearchBoard extends Board{
    constructor() {
        super();
        this.debug = false;
        this.boardWidth = 0;
        this.boardHeight = 0;
        this.board = [];
        // this.mineBoard = null;
    }

    setBoard(w,h){
        this.board = [];
        for(var i=0,m=w*h;i<m;i++){
            this.board.push(
                {
                    'open':0, //0:befoer open, 1:after open, 2: boom!
                    'cover':-1, //hint number
                    'flag':0, //0:no flag, 1:flag
                    'mine':0 //0:normal, 1:mine!
                }
                );
        }
        this.boardWidth = w;
        this.boardHeight = h;
        this.maxIdx = this.board.length - 1;
        this.printDebug('setBoard',Array.from(arguments).join(','))
    }
    // mine에 flag가 표시된 수
    get countFlagedMine(){
        let count = 0;
        this.board.forEach((v,k)=>{if(v.mine!==0 && v.flag !==0) count++; })
        return count;
    }
    // mine 수
    get countMine(){
        let count = 0;
        this.board.forEach((v,k)=>{if(v.mine!==0) count++ })
        return count;
    }
    // flag 수
    get countFlag(){
        let count = 0;
        this.board.forEach((v,k)=>{if(v.flag!==0) count++ })
        return count;
    }
    // open 수
    get countOpen(){
        let count = 0;
        this.board.forEach((v,k)=>{if(v.open!==0) count++ })
        return count;
    }
    // 터진 폭탄 수
    get countBoomedOpen(){
        let count = 0;
        this.board.forEach((v,k)=>{if(v.open===2) count++ })
        return count;
    }
    // 지정위치 지뢰 매설(1개)
    plantMine(x,y,v){
        this.printDebug('plantMine',Array.from(arguments))
        if(v == undefined){v = 1;}
        this.board[this.xyToIdx(x,y)].mine=v;
    }
    // 래덤으로 지뢰 매설(n개)
    plantRandomMines(n){
        this.printDebug('plantRandomMines',Array.from(arguments))
        let t = this.board.map((v,idx)=>{return idx;})
        t.sort((a,b)=>{ return Math.random() - 0.5})
        let r = t.splice(0,n);
        this.printDebug('plantRandomMines:selected',r)
        r.forEach((v)=>{this.board[v].mine=1})
    }

    flagXy(x,y,v){
        if(v===undefined){v=1;}
        if(x < 0 || y < 0 || x >= this.boardWidth || y >= this.boardHeight){
            this.printDebug('flagXy',Array.from(arguments).join(','),false);
            return false;
        }
        this.printDebug('flagXy',Array.from(arguments).join(','));
        return this.flag(this.xyToIdx(x,y),v);
    }
    flag(idx,v){
        this.board[idx].flag = v;
    }
    digXy(x,y){
        if(x < 0 || y < 0 || x >= this.boardWidth || y >= this.boardHeight){
            this.printDebug('digXy',Array.from(arguments).join(','),false);
            return false;
        }
        this.printDebug('digXy',Array.from(arguments).join(','));
        return this.dig(this.xyToIdx(x,y));
    }
    dig(idx){
        
        let idxes = this.aroundedIdxes(idx,true);
        let nIdxes = []; //다음으로 열 위치
        let r = 0; //찾기 전
        if(this.board[idx].open !==0){ //이미 오픈했을 경우
            return -1;
        }else if(this.board[idx].mine != 0){
            this.board[idx].open = 2; //
            r = 2; //폭탄 선택
        }else{
            this.board[idx].open = 1;
            r = 1; //폭탄 없음
        }

        idxes.forEach((v,k)=>{
            // console.log(v,this.board[v],this.countAroundedMines(v))
            if(this.board[v].open == 0){
                this.board[v].cover = this.countAroundedMines(v)
                if(this.board[v].mine===0 && this.board[v].cover===0){
                    nIdxes.push(v);
                }
            }
        });
        nIdxes.forEach((v,k)=>{
            if(this.board[v].open!==0) return;
            this.printDebug('dig:auto',v,this.idxToXy(v));
            this.dig(v);
        })

        return r; 
    }
    countCrossedMines(idx){
        let idxes = this.crossedIdxes(idx,true);
        let count = 0;
        idxes.forEach((v,i)=>{
            // console.log(v,this.mineBoard.board[v])
            if(this.board[v].mine!==0){
                count++;
            }
        });
        return count;
    }
    countAroundedMines(idx){
        let idxes = this.aroundedIdxes(idx,false);
        let count = 0;
        idxes.forEach((v,i)=>{
            // console.log(v,this.mineBoard.board[v])
            if(this.board[v].mine!==0){
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
                return (v.mine===0?'-':'M')+':'+(v.flag===0?'-':v.flag)+':'+(v.open==-1?'-':(v.open==-2?'X':v.open))+':'+(v.cover==-1?'-':v.cover);
            }));
            // chunk = chunk.concat(this.board.slice(i, i + chunkSize));
            arrs.push(chunk.join('\t'));
        }
        var t = '#'+'='.repeat(this.boardWidth*8)+'#';
        console.log(t)
        console.log('|'+' '.repeat(Math.floor((t.length-12)/2))+'printBoard'+' '.repeat(Math.floor((t.length-12)/2))+'|')
        console.log('| Open:'+this.countOpen + ' / Flag:'+this.countFlag + ' / Mine:' + this.countMine  + ' / FlagedMine:' + this.countFlagedMine + ' / BoomedOpen:' + this.countBoomedOpen + ' / Area:' + this.board.length);
        
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
