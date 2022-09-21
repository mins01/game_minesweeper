import MineBoard from "./MineBoard.js";
import MineSearchBoard from "./MineSearchBoard.js";

class Minesweeper{
    constructor() {
        this.debug = false;
        this.msb = new MineSearchBoard();
        this.boardWidth = 0;
        this.boardHeight = 0;
        this.maxIdx = 0;
        this.playing = false;
        this.endding = 0; //0:엔딩없음,1:전부 찾음,2:폭발!
        this.fnDraw = ()=>{this.printBoard()}
        this.countDig = 0;
    }
    start(){
        this.playing = true;
        this.countDig = 0;
    }
    isEnd(){
        if(this.msb.countBoomedOpen>0){
            return 2; //폭발 엔딩
        }
        if(this.msb.countFlagedMine === this.msb.countMine){
            return 1; //전부 찾음
        }
        if(this.msb.board.length - this.msb.countOpen === this.msb.countMine){
            return 1; //전부 찾음
        }
        return 0;
    }

    setBoard(w,h){
        this.msb.setBoard(w,h)
        this.boardWidth = this.msb.boardWidth;
        this.boardHeight = this.msb.boardHeight;
        this.maxIdx = this.msb.maxIdx;
    }

    printBoard(){
        this.msb.printBoard()
        let arrs = [];
        let board = this.msb.board;
        var t = (new Array(this.boardWidth+1)).fill(0).map((v,idx) => { return '[x'+(idx-1)+']'; })
        t[0] = '[y⧵x]';
        arrs.push(t.join('\t'));
        let chunkSize = this.boardWidth;
        for (let i = 0,m= board.length; i < m; i += chunkSize) {
            let chunk = ['['+'y'+Math.floor(i/this.boardWidth)+']'];
            chunk = chunk.concat(board.slice(i, i + chunkSize).map((v,k)=>{
                if(v.open == 2){//boom!
                    return 'X';
                }else if(v.open == 1){// after dig
                    return '-';
                }else{ //before dig
                    if(v.flag != 0){ 
                        return 'F';
                    }else if(v.cover == 0){
                        // return '?';
                        return v.cover;
                    }else if(v.cover != -1){
                        return v.cover;
                    }else{
                        return '?';
                    }
                }
                // return (v.mine===0?'-':'M')+':'+(v.flag===0?'-':v.flag)+':'+(v.open==-1?'-':(v.open==-2?'X':v.open))+':'+(v.cover==-1?'-':v.cover);
            }));
            // chunk = chunk.concat(board.slice(i, i + chunkSize));
            arrs.push(chunk.join('\t'));
        }
        var t = '#'+'='.repeat(this.boardWidth*8)+'#';
        console.log(t)
        console.log('|'+' '.repeat(Math.floor((t.length-12)/2))+'printBoard'+' '.repeat(Math.floor((t.length-12)/2))+'|')
        console.log('| Dig:'+this.countDig);
        console.log('| Open:'+this.msb.countOpen + ' / Flag:'+this.msb.countFlag + ' / Mine:' + this.msb.countMine  + ' / FlagedMine:' + this.msb.countFlagedMine + ' / BoomedOpen:' + this.msb.countBoomedOpen + ' / Area:' + this.msb.board.length);

        var t2 = '#'+'-'.repeat(this.boardWidth*8)+'#';
        console.log(t2)
        console.log(arrs.join('\n'));
        console.log(t2)
    }

    digXy(x,y){
        if(!this.playing){
            console.log('Game ended');
            return false;
        }
        
        let r = this.msb.digXy(x,y);
        if(r === false){
            console.log('잘못된 좌표입니다.')
            // this.draw();
            return true;
        }
        if(r == -1){
            console.log('이미 판 곳')
            // this.draw();
            return true;
        }
        this.countDig++;
        if(r == 2){
            this.playing = false;
            this.endding = 2;
            return false; //엔딩
        }
        let endding = this.isEnd();
        if(endding == 2){ //폭발 엔딩
            this.playing = false;
            this.endding = endding;
            return false; //엔딩
        }
        if(endding == 1){ //해제 엔딩
            this.playing = false;
            this.endding = endding;
            return false; //엔딩
        }
        return true;
    }

    draw(){
        this.fnDraw();
    }
}

export default Minesweeper;