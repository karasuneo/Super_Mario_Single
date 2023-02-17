



class Block{
    constructor(bl, x, y, ty, vx, vy){
        if(ty == undefined){
            this.ty = 0;
        }
        this.ty = ty;
        if(vx == undefined){
            this.vx = 0;
        }
        this.vx = vx;
        if(vy == undefined){
            this.vy = 0;
        }
        this.vy = vy;

        //ブロックが壊れた時に１
        
        this.bl = bl;

        //1pxずつの座標
        this.ox = x;
        this.oy = y;

        //スプライト１つ１つの座標
        this.x = x<<8;
        this.y = y<<8;

        //ブロックにぶつかっているか判定
        this.kill = false;
        this.count = 0;



        //なにもない場所を指定
        fieldData[y*FIELD_SIZE_W+x] = 367;
        
    }

    update(){
        if(this.kill == true){
            return;
        }
        if( ++this.count == 11 && this.ty == 0){
            this.kill = true;
        
            //ブロックを叩いて動き終わった後ブロックを元に戻す
            fieldData[this.oy*FIELD_SIZE_W+this.ox] = this.bl;
            return;
        }
        if(this.ty == 0){
            return;
        }
        
        
        if(this.vy < 64){
            this.vy  += GRAVITY;
        }
        this.x += this.vx;
        this.y += this.vy;

        if((this.y>>4) > FIELD_SIZE_H*16){
            this.kill = true;
        }

        this.count++;
    }
    
    draw(){
        if(this.kill == true){
            return;
        }
        let an;
        if(this.ty == 0){
            an = this.bl;
        }else {
            an = 388+((frameCount>>4)&1);
        }

        if( this.ty != 0 && this.bl == 368){
            //ブロックを叩いて動き終わった後ブロックを元に戻す
            fieldData[this.oy*FIELD_SIZE_W+this.ox] = 374;
            return;
        }
       


        let sx = (an&15)<<4;//スプライトデータの読み込み位置の設定(横列のキャラクター数が16だから一度16で割っている)
		let sy = (an>>4)<<4;

        //ブロックの座標
        let px = (this.x>>4)-(field.scx);
        let py = (this.y>>4)-(field.scy);

		//叩かれた時のブロックの動き
        if(this.ty == 0){
            const anim = [0, 2, 4, 5, 6, 5, 4, 2 , 0, -2, -1];
            py -= anim[this.count];
        }

		vcon.drawImage(chImg,sx,sy,16,16, px,py,16,16);//左:スプライトデータの表示位置　右:キャラクターの画面表示位置設定
    }
}

