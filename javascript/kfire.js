class Kfire extends Sprite{

    update(){
        this.w=32;
        let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
		let ly = ((this.y+this.vy)>>4);
        this.vy-=GRAVITY
        this.vx= -10;
        if(this.checkHit(ojisan)&&ojisan.muteki!=1){
            ojisan.damage=1;
        }
        if(this.count%50==0){
            if(this.dis==0){
                this.dis=1;
            }else if(this.dis==1){
                this.dis=0;
            }
        }
        if(this.dis==0){
            this.vy=1;
        }else if(this.dis==1){
            this.vy=-1;
        }
        this.count++;
        super.update();
    }
    draw(){
        let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
		let ly = ((this.y+this.vy)>>4);
        let px = (this.x>>4)-(field.scx);
        let py = (this.y>>4)-(field.scy);
        if(this.count%20==0){
            this.anim++;
            if(this.anim==2){
                this.anim=0;
            }
        }
        vcon.drawImage(chImg,8*16,(14+this.anim)*16,32,16, px,py,32,16);
    }
}