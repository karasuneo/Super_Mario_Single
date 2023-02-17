class Sprite_fire{
    constructor(sp, x, y, vx, vy, kinoflo, dir){
        this.sp = sp;

        //ブロック単位で取得
        this.x = x<<8;
        this.y = y<<8;
        this.ay = 0;

        this.w = 16;
        this.h = 16;
        this.vx = vx;
        this.vy = vy;
        //size
        this.sz = 0;
        this.dis=0;
        this.anim=0;
        
        //0できのこ　1で花　2でファイヤーマリオ
        this.kinoflo = kinoflo;

        this.dir = dir;

        //アイテムを取ったかを判定
        this.kill = false;
        this.count = 0;

    }
    
    //当たり判定
    checkHit(obj){
        //物体１
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
    let top1 = (this.y>>4) +5 +this.ay;
    let bottom1 = top1+this.h -7;

    //物体２
    let left2 = (obj.x>>4) +2;
    let right2 = left2+obj.w -4;
    let top2 = (obj.y>>4) +5 +obj.ay;
    let bottom2 = top2+obj.h -7;
    if(left1 <= right2 && right1 >= left2 && top1 <= bottom2 && bottom1 >= top2+15){
        ojisan.vy= -30;
        ojisan.jump=0;
        return true;
    }
}



    //更新処理
    update(){
        if(this.kinoflo == 0 || this.kinoflo == 2){
            if(this.vy < 64){
                this.vy  += GRAVITY;
            }
            this.x += this.vx;
            this.y += this.vy;
         }
        
        if((this.y)>>4 > FIELD_SIZE_H*16){
            this.kill = true;
        }
    }

    

    //描画処理
    draw(){
        if(this.kinoflo == 0){
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

        if(this.kinoflo == 1){
            let an = 250;
            //花のアニメーション
            const anim_flo = [0, 1, 2, 3, 4, 5, 1];
            an += anim_flo[(frameCount>>3)%7];
        
		    let sx = (an&15)<<4;//スプライトデータの読み込み位置の設定(横列のキャラクター数が16だから一度16で割っている)
		    let sy = (an>>4)<<4;
            let px = (this.x>>4)-(field.scx);
            let py = (this.y>>4)-(field.scy);
            let s;

            if(this.sz){
                s = this.sz;
            }else {
                s = 16;
            }
		    vcon.drawImage(chImg,sx+1,sy,16,s, px,py,16,s);//左:スプライトデータの表示位置　右:キャラクターの画面表示位置設定
        }

        if(this.kinoflo == 2){
            let an = 204;
            //花のアニメーション
            const anim_fire = [0, 1, 2, 1, 0];
            an += anim_fire[(frameCount>>3)%3];
        
		    let sx = (an&15)<<4;//スプライトデータの読み込み位置の設定(横列のキャラクター数が16だから一度16で割っている)
		    let sy = (an>>4)<<4;
            let px = (this.x>>4)-(field.scx);
            let py = (this.y>>4)-(field.scy);
            let s;

            if(this.sz){
                s = this.sz;
            }else {
                s = 16;
            }
		    vcon.drawImage(chImg,sx,sy,16,s, px+8,py,16,s);//左:スプライトデータの表示位置　右:キャラクターの画面表示位置設定
        }
        
    }
}