class Togeso extends Sprite{

   
    update(){
        if(this.checkHit(ojisan)&&this.anim!=2&&ojisan.muteki!=1){
            // ojisan.kinoko = 1;
            ojisan.damage=1;
        }
        this.vy-=GRAVITY;
        super.update();
    }
    draw(){
        this.count++;
        let px = (this.x>>4)-(field.scx);
        let py = (this.y>>4)-(field.scy);
        if(this.count%10==0){
            this.anim++;
            if(this.anim==2){
                this.anim=0;
            }
        }
        vcon.drawImage(chImg,10*16,(7-this.anim)*16,16,16, px,py,16,16);
    }
}