class Enemy2 extends Sprite{

    checkWall(){
		
		//一番左上を表している
		let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
		let ly = ((this.y+this.vy)>>4);//ドット単位からブロック単位にするためのビットシフト

		//キャラクターの右側にブロックが当たる時
        //キャラクターの左側にブロックが当たる時  
		if(field.isBlock(lx+15, ly+3) || field.isBlock(lx+15, ly+12) || field.isBlock(lx, ly+3) || field.isBlock(lx, ly+12)){
            if(this.dis==0){
                this.dis=1;
            }else if(this.dis==1){
                this.dis=0;
            }
			this.vx *= -1;
        };
    }
    checkFloor(){
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
        this.h=16;
        if(this.anim!=2&&ojisan.damage!=1&&ojisan.muteki!=1){
            if(this.Hitoji(ojisan)){
                // ojisan.kinoko = 1;
                this.anim=2;
                press.play();
            }
            if(this.checkHit(ojisan)&&this.anim!=2){
                // ojisan.kinoko = 1;
                ojisan.damage=1;
            }
            if(this.checkHit(koura)){
                console.log("Hit");
                this.kill=true;
            }
        }
        // console.log(this.vx);
        if(this.dis==0){
            this.vx = -10;
        }
        if(this.dis==1){
            this.vx = 10;
        }
        if(this.anim==2){
            this.vx=0;
            this.count2++;
            if(this.count2==10){
                this.kill = true;
            }
        }
        // this.checkWall();
        this.checkFloor();
        this.checkWall();
        super.update();
    }
    draw(){
        this.count++;
        let px = (this.x>>4)-(field.scx);
        let py = (this.y>>4)-(field.scy);
        if(this.count%10==0&&this.anim!=2){
            this.anim++;
            if(this.anim==2){
                this.anim=0;
            }
        }
        
        vcon.drawImage(chImg,this.anim*16,6*16,16,16, px,py,16,16);
        // console.log(this.count);
    }
}