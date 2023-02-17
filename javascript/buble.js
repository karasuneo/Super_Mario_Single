class Buble extends Sprite{
    // checkFloor(){
    //     //空中にいる時は判定しない
    //     if(this.vy <= 0){
    //         return;
    //     };
    //     //一番左上を表している
    //     let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
    //     let ly = ((this.y+this.vy)>>4);//ドット単位からブロック単位にするためのビットシフト

    //     //キャラクターの足元(左下1pxまたは右下1px)にブロックが当たる時
    //     if(field.isBlock(lx+1, ly+15) || field.isBlock(lx+14, ly+15)){

    //         this.vy   = 0;
    //         this.y    = ((((ly+15)>>4)<<4)-16)<<4;//床と同じ座標にする
    //     };
    // };

    update(){
        let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
		let ly = ((this.y+this.vy)>>4);
        if(this.checkHit(ojisan)==true&&ojisan.muteki!=1){
            ojisan.damage=1;
        }
        // console.log(ly);
        if(field.isMag(lx,ly-16)==true){
            this.dis=2;
        }else if(this.dis==2){
            this.count2++;
            if(this.count2==60){
                this.count2=0;
                this.dis=1;
            }
        }else if(ly<=5*16){
            this.dis=0;
        }
        if(this.dis==1){
            this.vy = -50;
        } else if(this.dis==0){
            this.vy= 50;
        } else if(this.dis==2){
            this.vy= 0;
            this.vy-=GRAVITY;
        }
        // console.log(this.count2+","+this.vy+","+ly);
        super.update();
    }
    draw(){
        
        //ブロックの座標
        let px = (this.x>>4)-(field.scx);
        let py = (this.y>>4)-(field.scy);
        let sx = 0;
        if(this.dis==0){
            sx = 15;
        }else{
            sx = 14;
        }
        
        let sy = 10;
        vcon.drawImage(chImg,sx*16,sy*16,16,16, px,py,16,16);
    }
}