import MineBoard from "./MineBoard.js";
import MineSearchBoard from "./MineSearchBoard.js";

class Minesweeper{
    constructor() {
        this.debug = false;
        this.msb = new MineSearchBoard();
        // this.width = 0;
        // this.height = 0;
        // this.maxIdx = 0;
        this.playing = false;
        this.endding = 0; //0:엔딩없음,1:전부 찾음,2:폭발!        
        this.numberAction = 0; //클릭 수
        this.startDate = null;
        this.endDate = null;

        this.lastIdx = -1;

        this.confNumberMine = 0;
        this.confLevel = 0;

        this.fnInit = (thisC)=>{} //보드 기본 세팅 후 호출
        this.fnStart = (thisC)=>{} //게임 시작시 호출
        this.fnDraw = (thisC)=>{thisC.printBoard()} //화면 그릴 때 호출
        this.fnEnd = (thisC)=>{thisC.printBoard(true)} //게임 완료시 호출
    }

    init(w,h,lvl){
        this.msb.setBoard(w,h)
        // console.log(this.msb);
        this.confLevel = lvl;
        let blen = this.msb.board.length

        if(this.confLevel==1) this.confNumberMine = Math.ceil(blen * 0.123);
        else if(this.confLevel==2) this.confNumberMine = Math.ceil(blen * 0.156);
        else if(this.confLevel==3) this.confNumberMine = Math.ceil(blen * 0.226);
        else this.confNumberMine = Math.ceil(blen * 0.123);
        
        this.fnInit(this);
    }
    get width(){ return this.msb.width;  }
    get height(){ return this.msb.height;  }
    get maxIdx(){ return this.msb.maxIdx;  }


    start(){
        this.msb.plantRandomMines(this.confNumberMine);
        this.msb.reset();
        this.playing = true;
        this.numberAction = 0;
        this.endding = 0;
        this.lastIdx = -1;
        this.startDate = null;
        this.fnStart(this);
        this.drawOrEnd();
    }
    draw(){
        this.fnDraw(this);
    }
    drawOrEnd(){
        if(this.isEnd()!==0){
            this.end();
        }else{
            this.draw();
        }
    }
    end(){
        this.endDate = new Date();
        this.playing=false;
        this.endding=this.isEnd();
        this.fnEnd(this);
    }
    isEnd(){
        return this.msb.isEnd();
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
        console.log('| Dig:'+this.numberAction);
        console.log('| Diged:'+this.msb.countDig + ' / Flaged:'+this.msb.countFlag + ' / Mine:' + this.msb.countMine  + ' / FlagedMine:' + this.msb.countFlagedMine + ' / Boom!:' + this.msb.countBoom + ' / Area:' + this.msb.board.length);

        var t2 = '#'+'-'.repeat(this.width*8)+'#';
        console.log(t2)
        console.log(arrs.join('\n'));
        console.log(t2)
        if(ended){ //엔딩결과
            if(this.startDate==null){
                console.log('| Play time : 시작전');
            }else{
                console.log('| Play time : '+((this.endDate.getTime()-this.startDate.getTime())/1000).toFixed(2)+' sec');
            }
        }
    }
    flagXy(x,y){
        return this.flag(this.msb.xyToIdx(x,y));
    }
    flag(idx){
        if(!this.playing){
            console.log('Game ended');
            return false;
        }
        
        let r = this.msb.flag(idx,(this.msb.board[idx].flag+1)%3);
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
        return this.dig(this.msb.xyToIdx(x,y));
    }
    dig(idx){
        if(!this.playing){
            console.log('Game ended');
            return false;
        }
        //-- 최초 동작 시 시간 기록
        if(this.numberAction===0){
            this.startDate = new Date();
        }
        //-- 최초 동작 시 폭탄이 있다면 폭탄을 재배치 한다.
        let limitResetMine = 100;
        while(this.numberAction===0 && this.msb.board[idx].mine !== 0 && limitResetMine-- >= 0){
            this.msb.printDebug('최초 동작시 폭탄 선택 => 재배치함')
            this.msb.reset(true);
            this.msb.plantRandomMines(this.confNumberMine);
            this.msb.reset();
        }
        
        let r = this.msb.dig(idx);
        
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
        this.lastIdx = idx;
        this.numberAction++;
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