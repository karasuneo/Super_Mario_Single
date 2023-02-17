class Bulos extends Sprite{

    checkWall(){
		
		//一番左上を表している
		let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
		let ly = ((this.y+this.vy)>>4);//ドット単位からブロック単位にするためのビットシフト

		//キャラクターの右側にブロックが当たる時
        //キャラクターの左側にブロックが当たる時  
		if(field.isBlock(lx+15, ly+3) || field.isBlock(lx+15, ly+12) || field.isBlock(lx, ly+3) || field.isBlock(lx, ly+12)){
			this.vx *= -1;
        
	};
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
        if(field.isBlock(lx+1, ly+31) || field.isBlock(lx+14, ly+31)){

            this.vy   = 0;
            this.y    = ((((ly+15)>>4)<<4)-16)<<4;//床と同じ座標にする
        };
    };

    update(){
        this.h=32;
        this.count++
        if(this.dis!=2&&ojisan.damage!=1&&ojisan.muteki!=1){
            if(this.Hitoji(ojisan)&&ojisan.type!=TYPE_DEAD){
                // ojisan.kinoko = 1;
                this.dis=2;
                press.play();
            }
            if(this.checkHit(ojisan)&&this.dis!=2){
                // ojisan.kinoko = 1;
                ojisan.damage=1;
            }
        }
        let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
		let ly = ((this.y+this.vy)>>4);
        if(this.count%50==0){
            if(this.dis==0){
                this.dis=1;
            }else if(this.dis==1){
                this.dis=0;
            }
            if(this.dis!=2){
                hunmer.push(new Hunmer(104,(lx+8)>>4,(ly+8)>>4,0,0));
            }
        }
        if(this.dis==0){
            this.vx= -10;
        }else if(this.dis==1){
            this.vx= 10;
        }
        if(this.dis==2){
            this.vx=0;
            this.vy=30;
        }
        if(this.dis!=2){
            this.checkWall();
            this.checkFloor();
        }
        super.update();
    }
    draw(){
        let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
		let ly = ((this.y+this.vy)>>4);
        let px = (this.x>>4)-(field.scx);
        let py = (this.y>>4)-(field.scy);
        if(this.count%50==0 || this.anim!=0){
            this.anim++;
            if(this.anim==3){
                this.anim=0;
            }
        }
        if(this.dis==2){
            this.anim=0;
        }
        vcon.drawImage(chImg,(6+this.anim)*16,10*16,16,32, px,py,16,32);
        
        // console.log(this.count);
    }
}