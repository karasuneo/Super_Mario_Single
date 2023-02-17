class Peach extends Sprite{
    
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
            this.vy   = 0;
            this.y    = ((((ly+15)>>4)<<4)-16)<<4;//床と同じ座標にする
            setTimeout(()=>{
                document.location = 'clear.html';
            },3000);
        };
    };
   
    update(){
        let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
        let ly = ((this.y+this.vy)>>4);
        this.vy-=GRAVITY;
        if(ly>2){
            this.checkFloor();
        }
        this.vy=2;
        super.update();
    }
    draw(){
        this.count++;
        let px = (this.x>>4)-(field.scx);
        let py = (this.y>>4)-(field.scy);
        
        vcon.drawImage(chImg,15*16,2*16,16,32, px,py,16,32);
    }
}