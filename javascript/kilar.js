class Kilar extends Sprite{

   
    update(){
        if(this.dis!=1&&ojisan.damage!=1&&ojisan.muteki!=1){
            if(this.Hitoji(ojisan)){
               // ojisan.kinoko = 1;
                this.dis=1;
                press.play();

            }
            if(this.Hitoji(ojisan)!=true && this.checkHit(ojisan)==true){
                // ojisan.kinoko = 1;
                ojisan.damage=1;
            }
        }
        this.vx= -24;
        this.vy  -= GRAVITY;
        if(this.dis==1){
            this.vy+=GRAVITY;
            this.vx=0;
            this.count2++;
            if(this.count2==50){
                this.kill=true;
            }
        }
        super.update();
    }
}