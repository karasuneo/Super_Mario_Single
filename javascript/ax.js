class Ax extends Sprite{
    goalpef(){
        let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
		let ly = ((this.y+this.vy)>>4);
        if(this.count%20==0){
            console.log(field.isEnemy(lx+(this.ac*16),ly+16));
            if(field.isEnemy(lx+(this.ac*16),ly+16)==484){
                fieldData[((ly+16)>>4)*FIELD_SIZE_W+(lx+(this.ac*16)>>4)]=367;
                fallobj.push(new Fallobj(484,lx+(this.ac*16)>>4,(ly+16)>>4,0,0));
                bre.play();
            }
            this.ac--;
        }
        if(this.count2==500){
            clearW.play();
            block.push(new Block(368,lx-(2*16)>>4,(ly+16)>>4,0,0));
            peach.push(new Peach(47,lx-(2*16)>>4,-2,0,0));
        }
        this.count2++;
    }
    checkFloor(){
        //空中にいる時は判定しない
        if(this.vy <= 0){
            return;
        };
        //一番左上を表している
        let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
        let ly = ((this.y+this.vy)>>4);//ドット単位からブロック単位にするためのビットシフト

        //キャラクターの足元(左下1pxまたは右下1px)にブロックが当たる時
        if(field.isBlock(lx+1, ly+15) || field.isBlock(lx+14, ly+15)){

            this.vy   = 0;
            this.y    = ((((ly+15)>>4)<<4)-16)<<4;//床と同じ座標にする
        };
    };

    update(){
        let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
        let ly = ((this.y+this.vy)>>4);//ドット単位からブロック単位にするためのビットシフト
        if(this.checkHit(ojisan)){
            ojisan.goal3=1;
            this.dis=1;
            music.pause();
        }
        if(this.dis==1){
            this.goalpef();
        }
        if(this.count==0){
            block.push(new Block(465,(lx>>4)-13,(ly>>4),0,0));
            block.push(new Block(465,(lx>>4)-13,(ly>>4)-1,0,0));
        }
        let oji_lx = ((ojisan.x+ojisan.vx)>>4);
        if(lx-oji_lx<80){
            ojisan.sstop=1;
        }
        // console.log(ojisan.sstop);
        this.count++;
        this.checkFloor();
        super.update();
    }
    draw(){
        
        //ブロックの座標
        let px = (this.x>>4)-(field.scx);
        let py = (this.y>>4)-(field.scy);
        if(this.count%50==0 || (this.anim!=0&&this.count%10==0)){
            this.anim++;
            if(this.anim==3){
                this.anim=0;
            }
        }
        vcon.drawImage(chImg,(5+this.anim)*16,29*16,16,16, px,py,16,16);
    }
}