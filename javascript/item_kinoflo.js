


class Item_1 extends Sprite_fire{

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
        if(field.isBlock(lx+1, ly+15) || field.isBlock(lx+14, ly+15)){
            this.vy   = 0;
            this.y    = ((((ly+15)>>4)<<4)-16)<<4;//床と同じ座標にする
        };
    };

    update(){

        if(this.kill == true){
            return;
        }
        if(ojisan.kinoko != 0){
            return;
        }

        if(this.checkHit(ojisan)){
            ojisan.kinoko = 1;
            this.kill = true;
            return;
        }

        //キノコの動き方
        if(++this.count <= 32){
            this.sz = (1+this.count)>>1;
            this.y -= 1<<3;
            if(this.count == 32){
                this.vx = 24;
            }
            return;
        }
        
        this.checkWall();
        this.checkFloor();
        super.update();
    }
}