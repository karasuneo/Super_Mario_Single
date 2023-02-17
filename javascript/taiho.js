class Taiho extends Sprite{
    Hitoji2(obj){
        //物体１
        let left1 = (this.x>>4) +2;
        let right1 = left1+this.w -4;
        let top1 = (this.y>>4) +5 +this.ay;
        let bottom1 = top1+this.h -7;

        //物体２
        let left2 = (obj.x>>4) +2;
        let right2 = left2+obj.w -4;
        let top2 = (obj.y>>4) +5 +obj.ay;
        let bottom2 = top2+obj.h -7;
        if(left1 <= right2 && right1 >= left2 && top1-8 <= bottom2 && bottom1 >= top2){
            return true;
        }
    }
    update(){
        this.h=32;
        let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
	    let ly = ((this.y+this.vy)>>4);
        let oji_lx = ((this.x + this.vx) >> 4);
        let oji_ly = ((ojisan.y + ojisan.vy) >> 4)+ojisan.h;
        if(this.Hitoji2(ojisan)&&ojisan.type!=TYPE_DEAD){
            // console.log("!");
            ojisan.vy=0;
            ojisan.y-=GRAVITY;
            ojisan.jump=0;
        }
        if(this.checkHit(ojisan)){
            if(this.x>=ojisan.x){
                ojisan.vx = 0;
			    ojisan.x -= 8;
            }else if(ojisan.x>=this.x){
                ojisan.vx = 0;
			    ojisan.x += 8;
            }
        }
        if(this.count%100==0&&this.checkHit(ojisan)!=true&&this.Hitoji(ojisan)!=true){
            kilar.push(new Kilar(189,lx>>4,ly>>4,0,0));
        }
        this.count++;
    }
}