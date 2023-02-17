class Hunmer extends Sprite{
    update(){
        this.count++;
        if(this.Hitoji(ojisan)&&ojisan.muteki!=1){
            // ojisan.kinoko = 1;
            ojisan.damage=1;
        }
        this.vy= -30+this.count;
        this.vx= -10;
        super.update();
    }
    draw(){
        let px = (this.x>>4)-(field.scx);
        let py = (this.y>>4)-(field.scy);
        if(this.count%5==0){
            this.anim++;
            if(this.anim==4){
                this.anim=0;
            }
        }
        let sy = 7;
        // console.log(this.count);
        vcon.drawImage(chImg,(4+this.anim)*16,sy*16,16,16, px,py,16,16);
    }
}