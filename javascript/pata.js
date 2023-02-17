class Pata extends Sprite{

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
    updateJump(){
		//ジャンプ
		if( keyb.ABUTTON ){
			if(this.jump==0){
				this.anim = ANIME_JUMP;
				this.jump = 1;
			};
			if(this.jump<15){
				this.vy = -(64-this.jump);
			};
		};
		if(this.jump != 0){//大ジャンプか小ジャンプを判定
            this.jump++;
        };
	};
    checkFloor(){
        //空中にいる時は判定しない
        if(this.vy <= 0){
            return;
        };
        //一番左上を表している
        let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
        let ly = ((this.y+this.vy)>>4);//ドット単位からブロック単位にするためのビットシフト

        //キャラクターの足元(左下1pxまたは右下1px)にブロックが当たる時
        if(field.isBlock(lx+1, ly+31) || field.isBlock(lx+15, ly+31)){
            this.jump=0;
            this.vy   = 0;
            this.y    = ((((ly+15)>>4)<<4)-16)<<4;//床と同じ座標にする
        };
    };
    updateJump(){
		//ジャンプ
		if( keyb.ABUTTON ){
			if(this.jump==0){
				this.jump = 1;
			};
			if(this.jump<15){
				this.vy = -(64-this.jump);
			};
		};
		if(this.jump != 0){//大ジャンプか小ジャンプを判定
            this.jump++;
        };
	};
    update(){
        this.h = 32;
        let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
		let ly = ((this.y+this.vy)>>4);
        if(this.dis!=3&&ojisan.damage!=1&&ojisan.muteki!=1){
            if(this.Hitoji(ojisan)){
                noko.push(new Noko(10,lx>>4,ly>>4,0,0));
                this.dis=3;
                this.kill=true;
                press.play();
            }
            if(this.checkHit(ojisan)&&this.dis!=3){
                // ojisan.kinoko = 1;
                ojisan.damage=1;
            }
        }
        if(field.isBlock(this.lx,this.ly)==true){
            if(dis==0){
                this.vx= -10;
            }else if(dis==1){
                this.vx=10;
            }
        }
        // console.log(this.vx);
        if(this.dis==0){
            this.vx = -10;
        }
        if(this.dis==1){
            this.vx = 10;
        }
        // this.checkWall();
        this.updateJump();
        this.checkFloor();
        this.updateJump();
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
        
        vcon.drawImage(chImg,this.anim*16,10*16,16,32, px,py,16,32);
    }
}