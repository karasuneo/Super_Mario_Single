class Bless extends Sprite{

   
    update(){
        if(this.Hitoji(ojisan)!=true && this.checkHit(ojisan)==true&&ojisan.muteki!=1&&ojisan.type!=TYPE_DEAD){
            // ojisan.kinoko = 1;
            ojisan.damage=1;
        }
        if(this.count==500){
            this.kill;
        }
        this.vx=0;
        if(this.count>200){
            this.vx= -50;
        }
        this.count++;
        this.vy-=GRAVITY;
        super.update();
    }
}