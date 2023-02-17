class Kupa extends Sprite{

    nomal(){
        let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
		let ly = ((this.y+this.vy)>>4);
        if(this.count%50==0){
            if(this.dis==0){
                this.dis=1;
            }
            else if(this.dis==1){
                this.dis=0;
            }
            kfire.push(new Kfire(206,(lx>>4),ly>>4,0,0));
        }
        if(this.dis==0){
            this.vx = -10;
        }else if(this.dis==1){
            this.vx = 10
        }
        this.count++;
        if(this.account==5&&this.count==500){
            this.ac=2;
        }else if(this.count==500){
            this.ac=1;
        }
    }
    meteo(){
        let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
		let ly = ((this.y+this.vy)>>4);//ドット単位からブロック単位にするためのビットシフト
        if(this.count2%5==0&&this.count2<300){
            fallobj.push(new Fallobj(175,(lx>>4)-1,-1,0,0));
            fallobj.push(new Fallobj(175,(lx>>4)-3,-1,0,0));
            fallobj.push(new Fallobj(175,(lx>>4)-5,-1,0,0));
            fallobj.push(new Fallobj(175,(lx>>4)-7,-1,0,0));
            fallobj.push(new Fallobj(175,(lx>>4)-9,-1,0,0));
            fallobj.push(new Fallobj(175,(lx>>4)-11,-1,0,0));
        }
        if(this.count2==500){
            this.ac=0;
        }
    }
    bless(){
        let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
		let ly = ((this.y+this.vy)>>4);//
        if(this.count2==0){
            this.bx1=(lx>>4)-9;
            this.by1=(ly>>4)-1;
            this.bx2=(lx>>4)-9;
            this.by2=(ly>>4)-4;
            block.push(new Block(368,this.bx1,4,0,0));
            block.push(new Block(368,this.bx2,7,0,0));
        }
        if(this.count2<300){
            bless.push(new Bless(232,(lx>>4),(ly>>4)+1,0,0));
        }
        if(this.count2==700){
            fieldData[4*FIELD_SIZE_W+this.bx1]=367;
            fieldData[7*FIELD_SIZE_W+this.bx2]=367;
            this.ac=0;
        }
    }
    bigban(){
        let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
		let ly = ((this.y+this.vy)>>4);//
        if(this.count2%100==0){
            kilar.push(new Kilar(204,(lx+8)>>4,(ly+8)>>4,0,0));
            kilar.push(new Kilar(204,(lx+24)>>4,(ly+8)>>4,0,0));
            kilar.push(new Kilar(204,(lx+8)>>4,(ly+24)>>4,0,0));
            kilar.push(new Kilar(204,(lx+24)>>4,(ly+24)>>4,0,0));
        }
        if(this.count2==500){
            this.ac=0;
            this.count2=0;
        }
    }
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
            this.jump=0;
            this.vy   = 0;
            this.y    = ((((ly+15)>>4)<<4)-16)<<4;//床と同じ座標にする
            if(this.ac==2&&this.count2>300){
                this.count2=0;
                this.ac=0;
            }
        };
        
    };

    update(){
        this.h = 32;
        this.w = 32;
        //通常時
        if(ojisan.goal3==0){
            if(this.checkHit(ojisan)){
                if(ojisan.muteki!=1){
                    ojisan.damage=1;
                }
                ojisan.vx=-3;
            }
        }
        if(this.ac==0){
            this.count2=0;
            this.nomal();
        }
        //特殊技
        if(this.ac==1){
            if(this.count2==0){
                this.count=0;
                this.account++;
                this.random = Math.floor(Math.random()*3);
                // console.log(this.random);
            }
            switch (this.random){
                case 0:
                    this.meteo();
                    break;
                case 1:
                    this.bless();
                    break;
                case 2:
                    this.bigban();
                    break;
            }
            this.vx=0;
            this.count2++;
            // console.log("ac:"+this.ac+",random:"+this.random);
            // console.log(this.count2);
        }
        //大ジャンプ
        if(this.ac==2){
            if(this.count2==300){
                this.vy = -120;
                this.anim=0;
            }
            if(this.count2>300&&this.vy>0){
                this.vy-=3
            }
            this.count=0;
            this.account=0;
            this.vx=0;
            this.count2++;
        }
        // console.log("ac:"+this.ac+",vy:"+this.vy);
        // console.log(this.ac);
        if(this.ac!=2){
            this.updateJump();
        }
        this.checkWall();
        this.checkFloor();
        super.update();
    }
    draw(){
        let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
		let ly = ((this.y+this.vy)>>4);
        let px = (this.x>>4)-(field.scx);
        let py = (this.y>>4)-(field.scy);
        if(this.ac==2){
            if(this.count2<300&&this.count2%10==0){
                if(this.anim==0){
                    this.anim=3;
                }else{
                    this.anim=0;
                }
            }
        }
        vcon.drawImage(chImg,(this.anim*2)*16,14*16,32,32, px,py,32,32);
        
    }
}