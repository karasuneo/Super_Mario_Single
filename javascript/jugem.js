class Jugem extends Sprite{

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
        let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
		let ly = ((this.y+this.vy)>>4);
        if(ojisan.goal3==1){
            this.kill=true;
        }
        if(this.count%50==0&&this.anim==0){
            fallobj.push(new Fallobj(105,lx>>4,ly>>4,0,0));
        }
        this.count++;
    }
    draw(){
        let px = (this.x>>4)-(field.scx);
        let py = (this.y>>4)-(field.scy);
        if(this.count%50==0){
            this.anim++;
            if(this.anim==2){
                this.anim=0;
            }
        }
        vcon.drawImage(chImg,9*16,(10-(this.anim*4))*16,16,32, px,py,16,32);
    }
}