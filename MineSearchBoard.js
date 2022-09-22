// const Board = require("./Board");
import Board from "./Board.js";
/**
 * 지뢰 찾기 보드
 */
class MineSearchBoard extends Board{
    constructor() {
        super();
        this.debug = false;
        this.width = 0;
        this.height = 0;
        this.board = [];
        // this.mineBoard = null;
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
    // dig 수
    get countDig(){
        let count = 0;
        this.board.forEach((v,k)=>{if(v.dig!==0) count++ })
        return count;
    }
    // 터진 폭탄 수
    get countBoom(){
        let count = 0;
        this.board.forEach((v,k)=>{if(v.dig===2) count++ })
        return count;
    }

    setBoard(w,h){
        this.board = [];
        for(var i=0,m=w*h;i<m;i++){
            this.board.push(
                {
                    'dig':0, //0:befoer dig, 1:after dig, 2: boom!
                    'cover':-1, //hint number
                    'flag':0, //0:no flag, 1:flag
                    'mine':0 //0:normal, 1:mine!
                }
                );
        }
        this.width = w;
        this.height = h;
        this.maxIdx = this.board.length - 1;
        this.printDebug('setBoard',Array.from(arguments).join(','))
    }
    reset(withMine){
        this.board.forEach((v,k)=>{
            v.dig=0;
            v.cover=-1;
            v.flag=0;
            if(withMine){
                v.mine=0;
            }
        })
        this.fillHint();
    }
    
    // 지정위치 지뢰 매설(1개)
    plantMineXy(x,y,v){
        // this.printDebug('plantMineXy',Array.from(arguments))
        if(v == undefined){v = 1;}
        this.plantMine(this.xyToIdx(x,y),v)
    }
    plantMine(idx,v){
        this.printDebug('plantMine',Array.from(arguments))
        if(v == undefined){v = 1;}
        this.board[idx].mine=v;
    }
    // 래덤으로 지뢰 매설(n개)
    plantRandomMines(n){
        this.printDebug('plantRandomMines',Array.from(arguments))
        let t = this.board.map((v,idx)=>{return idx;})
        t.sort((a,b)=>{ return Math.random() - 0.5})
        let r = t.splice(0,n);
        this.printDebug('plantRandomMines:selected',r)
        r.forEach((v,k)=>{
            this.plantMine(v,1)
        })
    }
    fillHint(){
        this.printDebug('fillHint',Array.from(arguments))
        this.board.forEach((v,k)=>{
            v.cover = this.countAroundedMines(k);
        })
    }

    flagXy(x,y,v){
        if(v===undefined){v=1;}
        if(x < 0 || y < 0 || x >= this.width || y >= this.height){
            this.printDebug('flagXy',Array.from(arguments).join(','),false);
            return false;
        }
        this.printDebug('flagXy',Array.from(arguments).join(','));
        return this.flag(this.xyToIdx(x,y),v);
    }
    flag(idx,v){
        if(this.board[idx].dig===0) this.board[idx].flag = v;
        return true;
    }
    digXy(x,y){
        if(x < 0 || y < 0 || x >= this.width || y >= this.height){
            this.printDebug('digXy',Array.from(arguments).join(','),false);
            return false;
        }
        this.printDebug('digXy',Array.from(arguments).join(','));
        return this.dig(this.xyToIdx(x,y));
    }
    dig(idx,noChain){
        
        let idxes = this.aroundedIdxes(idx,true);
        let nIdxes = []; //다음으로 열 위치
        let r = 0; //찾기 전
        if(this.board[idx].dig !==0){ //이미 오픈했을 경우
            return -1;
        }else if(this.board[idx].mine != 0){
            this.board[idx].dig = 2; //
            r = 2; //폭탄 선택
        }else{
            this.board[idx].dig = 1;
            r = 1; //폭탄 없음
        }
        if(!noChain && r !== 2){
            idxes.forEach((v,k)=>{
                // console.log(v,this.board[v],this.countAroundedMines(v))
                if(this.board[v].dig == 0){
                    // this.board[v].cover = this.countAroundedMines(v)
                    // if(this.board[v].mine===0 && this.board[v].cover===0){
                    if(this.board[v].mine===0 ){
                        nIdxes.push({idx:v,noChain:(this.board[v].cover!==0)});
                    }
                }
            });
        }
        
        nIdxes.forEach((v,k)=>{
            if(this.board[v.idx].dig!==0) return;
            this.printDebug('dig:auto',v.idx,this.idxToXy(v.idx));
            this.dig(v.idx,v.noChain);
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

    isEnd(){
        if(this.countBoom>0){
            return 2; //폭발 엔딩
        }
        if(this.countFlagedMine === this.countMine && this.countFlagedMine === this.countFlag){
            return 1; //전부 찾음
        }
        if(this.board.length - this.countDig === this.countMine){
            return 1; //전부 찾음
        }
        return 0; //게임중
    }

    // 디버깅용 보드 내용 출력
    printBoard(){
        let arrs = [];
        var t = (new Array(this.width+1)).fill(0).map((v,idx) => { return '[x'+(idx-1)+']'; })
        t[0] = '[y⧵x]';
        arrs.push(t.join('\t'));
        let chunkSize = this.width;
        for (let i = 0,m= this.board.length; i < m; i += chunkSize) {
            let defIdx = i;
            let chunk = ['['+'y'+Math.floor(i/this.width)+']'];
            chunk = chunk.concat(this.board.slice(i, i + chunkSize).map((v,k)=>{
                return (v.mine===0?'-':'M')+':'+(v.flag===0?'-':v.flag)+':'+(v.dig==-1?'-':(v.dig==-2?'X':v.dig))+':'+(v.cover==-1?'-':v.cover);
            }));
            // chunk = chunk.concat(this.board.slice(i, i + chunkSize));
            arrs.push(chunk.join('\t'));
        }
        var t = '#'+'='.repeat(this.width*8)+'#';
        console.log(t)
        console.log('|'+' '.repeat(Math.floor((t.length-12)/2))+'printBoard'+' '.repeat(Math.floor((t.length-12)/2))+'|')
        console.log('| Diged:'+this.countDig + ' / Flaged:'+this.countFlag + ' / Mine:' + this.countMine  + ' / FlagedMine:' + this.countFlagedMine + ' / Boom!:' + this.countBoom + ' / Area:' + this.board.length);
        
        var t2 = '#'+'-'.repeat(this.width*8)+'#';
        console.log(t2)
        console.log(arrs.join('\n'));
        console.log(t2)
    }
    
}

// if(module && module.exports){
//     module.exports = MineSearchBoard;
// }
export default MineSearchBoard;
