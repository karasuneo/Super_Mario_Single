class Koura extends Sprite{
    checkWall(){
		
		//一番左上を表している
		let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
		let ly = ((this.y+this.vy)>>4);//ドット単位からブロック単位にするためのビットシフト

		//キャラクターの右側にブロックが当たる時
        //キャラクターの左側にブロックが当たる時  
		if(field.isBlock(lx+15, ly+3) || field.isBlock(lx+15, ly+12) || field.isBlock(lx, ly+3) || field.isBlock(lx, ly+12)){
			this.vx *= -1;
            if(this.dis==1){
                this.dis=2;
            }else if(this.dis==2){
                this.dis=1;
            }
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
        if(field.isBlock(lx+1, ly+15) || field.isBlock(lx+15, ly+15)){

            this.vy   = 0;
            this.y    = ((((ly+15)>>4)<<4)-16)<<4;//床と同じ座標にする
        };
    };
   
    update(){
        let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
        let ly = ((this.y+this.vy)>>4);
        if(this.dis!=0){
            this.count++;
        }
        // if(this.Hitoji(ojisan)==true&&this.dis!=0&&ojisan.type!=TYPE_DEAD&&this.count==0){
        //     this.dis=0;
        //     press.play();
        // }
        else if(this.checkHit(ojisan)==true&&this.dis!=0&&this.count>5&&ojisan.muteki!=1){
            ojisan.damage=1;
        }
        if(this.checkHit(ojisan)&&this.dis==0&&ojisan.type!=TYPE_DEAD){
            ojisan.vx *= -1;
            if(this.x<ojisan.x){
                this.dis=2;
            }else if(this.x>=ojisan.x){
                this.dis=1;
            }
        }
        console.log(this.dis);
        if(this.dis==0){
            this.vx=0;
        }else if(this.dis==1){
            this.vx=60;
        }else if(this.dis==2){
            this.vx= -60;
        }
        // if(this.count==5){
        //     this.count=0;
        // }
        this.checkWall();
        this.checkFloor();
        super.update();
    }
}