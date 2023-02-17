class Fallobj extends Sprite{
    update(){
        if(this.checkHit(ojisan)&&this.anim!=2){
            // ojisan.kinoko = 1;
            ojisan.damage=1;
        }
        this.vy=15;
        super.update();
    }
}