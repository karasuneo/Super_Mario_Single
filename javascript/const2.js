//
// 定数の定義用のJS
//

const GAME_FPS      = 1000/60;	//FPS
const SCREEN_SIZE_W = 256;		//画面のサイズ横
const SCREEN_SIZE_H = 224;		//画面のサイズ縦

//一画面当たりのブロックの数
const MAP_SIZE_W    = SCREEN_SIZE_W/16;
const MAP_SIZE_H    = SCREEN_SIZE_H/16;

//マップデータのブロックの数
const FIELD_SIZE_W  = 256;
const FIELD_SIZE_H  = 14;



//スプライトの基本クラス
class Sprite{
    constructor(sp, x, y, vx, vy){
        this.sp = sp;

        //ブロック単位で取得
        this.x = x<<8;
        this.y = y<<8;
        this.ay = 0;

        this.w = 16;
        this.h = 16;
        this.vx = vx;
        this.vy = vy;
        this.sz = 0;
        this.kill = false;
        this.count = 0;
        this.count2=0;
        this.dis=0;
        this.anim=0;
        this.jump=0;
        this.ac=0;
        this.random=0;
        this.account=0;
        this.bx1;
        this.by1;
        this.bx2;
        this.by2;
    }
    
    //当たり判定
    checkHit(obj){
        //物体１
        // console.log(obj.ay);
        let left1 = (this.x>>4) +2;
        let right1 = left1+this.w -4;
        let top1 = (this.y>>4) +5 +this.ay;
        let bottom1 = top1+this.h -7;

        //物体２
        let left2 = (obj.x>>4) +2;
        let right2 = left2+obj.w -4;
        let top2 = (obj.y>>4) +5 +obj.ay;
        let bottom2 = top2+obj.h -7;

        return (left1 <= right2 && right1 >= left2 && top1 <= bottom2 && bottom1 >= top2);
    }
    Hitoji(obj){
        //物体１
        let left1 = (this.x>>4) +2;
        let right1 = left1+this.w -4;
        let top1 = (this.y>>4)+this.ay;
        let bottom1 = top1+this.h;

        //物体２
        let left2 = (obj.x>>4) +2;
        let right2 = left2+obj.w -4;
        let top2 = (obj.y>>4)+obj.ay;
        let bottom2 = top2+obj.h;
        if(left1 <= right2 && right1 >= left2 && top1 < bottom2 && bottom1-this.h-obj.h+5 >= top2){
            ojisan.vy= -30;
            ojisan.jump=0;
            return true;
        }
    }


    //更新処理
    update(){
        if(this.vy < 64){
            this.vy  += GRAVITY;
        }
        this.x += this.vx;
        this.y += this.vy;
        if((this.y)>>4 > FIELD_SIZE_H*16){
            this.kill = true;
        }
    }

    //描画処理
    draw(){
        let an = this.sp;
        let sx = (an&15)<<4;//スプライトデータの読み込み位置の設定(横列のキャラクター数が16だから一度16で割っている)
		let sy = (an>>4)<<4;

        //ブロックの座標
        let px = (this.x>>4)-(field.scx);
        let py = (this.y>>4)-(field.scy);
        let s;

        if(this.sz){
            s = this.sz;
        }else {
            s = 16;
        }
		vcon.drawImage(chImg,sx,sy,16,s, px,py,16,s);//左:スプライトデータの表示位置　右:キャラクターの画面表示位置設定
    }
}