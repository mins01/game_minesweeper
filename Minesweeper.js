import MineBoard from "./MineBoard.js";
import MineSearchBoard from "./MineSearchBoard.js";

class Minesweeper{
    constructor() {
        this.debug = false;
        this.msb = new MineSearchBoard();
        this.width = 0;
        this.height = 0;
        this.maxIdx = 0;
        this.playing = false;
        this.endding = 0; //0:엔딩없음,1:전부 찾음,2:폭발!        
        this.numberDig = 0; //클릭 수
        this.startDate = null;
        this.endDate = null;

        this.confNumberMine = 0;

        this.fnStart = (thisC)=>{}
        this.fnDraw = (thisC)=>{thisC.printBoard()}
        this.fnEnd = (thisC)=>{thisC.printBoard(true)}
    }
    start(){
        this.msb.plantRandomMines(this.confNumberMine);
        this.msb.reset();
        this.playing = true;
        this.numberDig = 0;
        this.startDate = new Date();
        this.fnStart(this);
    }
    draw(){
        this.fnDraw(this);
    }
    end(){
        this.endDate = new Date();
        this.playing=false;
        this.endding=this.isEnd();
        this.fnEnd(this);
    }
    isEnd(){
        if(this.msb.countBoom>0){
            return 2; //폭발 엔딩
        }
        if(this.msb.countFlagedMine === this.msb.countMine && this.msb.countFlagedMine === this.msb.countFlag){
            return 1; //전부 찾음
        }
        if(this.msb.board.length - this.msb.countDig === this.msb.countMine){
            return 1; //전부 찾음
        }
        return 0;
    }

    setBoard(w,h){
        this.msb.setBoard(w,h)
        this.width = this.msb.width;
        this.height = this.msb.height;
        this.maxIdx = this.msb.maxIdx;
    }

    printBoard(ended){
        // this.msb.printBoard() //해답 맵 출력
        let arrs = [];
        let board = this.msb.board;
        var t = (new Array(this.width+1)).fill(0).map((v,idx) => { return '[x'+(idx-1)+']'; })
        t[0] = '[y⧵x]';
        arrs.push(t.join('\t'));
        let chunkSize = this.width;
        for (let i = 0,m= board.length; i < m; i += chunkSize) {
            let chunk = ['['+'y'+Math.floor(i/this.width)+']'];
            chunk = chunk.concat(board.slice(i, i + chunkSize).map((v,k)=>{
                if(ended){ //엔딩결과
                    if(v.flag!=0 && v.mine != 0){ 
                        return 'FLAG';
                    }else if(v.mine != 0){
                        return 'BOOM!';
                    }else{
                        if(v.dig != 0){
                            return 'DIG';
                        }
                        return '-';
                    }
                }else{ //게임중
                    if(v.dig == 2){//boom!
                        return 'X';
                    }else if(v.dig == 1){// after dig
                        if(v.cover == 0){
                            return '-';
                            // return v.cover;
                        }else if(v.cover != -1){
                            return v.cover;
                        }else{
                            return '-';
                        }
                    }else{ //before dig
                        if(v.flag != 0){ 
                            return 'F';
                        }
                        return '?';
                    }
                }
                
                // return (v.mine===0?'-':'M')+':'+(v.flag===0?'-':v.flag)+':'+(v.dig==-1?'-':(v.dig==-2?'X':v.dig))+':'+(v.cover==-1?'-':v.cover);
            }));
            // chunk = chunk.concat(board.slice(i, i + chunkSize));
            arrs.push(chunk.join('\t'));
        }
        var t = '#'+'='.repeat(this.width*8)+'#';
        console.log(t)
        console.log('|'+' '.repeat(Math.floor((t.length-12)/2))+'printBoard'+' '.repeat(Math.floor((t.length-12)/2))+'|')
        console.log('| Dig:'+this.numberDig);
        console.log('| Diged:'+this.msb.countDig + ' / Flaged:'+this.msb.countFlag + ' / Mine:' + this.msb.countMine  + ' / FlagedMine:' + this.msb.countFlagedMine + ' / Boom!:' + this.msb.countBoom + ' / Area:' + this.msb.board.length);

        var t2 = '#'+'-'.repeat(this.width*8)+'#';
        console.log(t2)
        console.log(arrs.join('\n'));
        console.log(t2)
    }
    flagXy(x,y){
        if(!this.playing){
            console.log('Game ended');
            return false;
        }
        
        let r = this.msb.flagXy(x,y,this.msb.board[this.msb.xyToIdx(x,y)].flag===0?1:0);
        if(r === false){
            console.log('잘못된 좌표입니다.')
            // this.draw();
            return true;
        }
        
        let endding = this.isEnd();
        if(endding == 2){ //폭발 엔딩
            return false; //엔딩
        }
        if(endding == 1){ //해제 엔딩
            return false; //엔딩
        } 
        return true;
    }
    digXy(x,y){
        if(!this.playing){
            console.log('Game ended');
            return false;
        }
        //-- 최초 클릭시 폭탄이 있다면 폭탄을 재배치 한다.
        let limitResetMine = 100;
        while(this.numberDig===0 && this.msb.board[this.msb.xyToIdx(x,y)].mine !== 0 && limitResetMine-- >= 0){
            this.msb.printDebug('최초 동작시 폭탄 선택 => 재배치함')
            this.msb.reset(true);
            this.msb.plantRandomMines(this.confNumberMine);
            this.msb.reset();
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
        this.numberDig++;
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


}

export default Minesweeper;