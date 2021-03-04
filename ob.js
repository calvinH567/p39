class obstacle {
  constructor(x,y){
    this.x = x;
    this.x = y
    
  }
  display(){
    push();
    rect(this.x,this.y,50,50);
    pop();
  }
  istouching(object,touch){
    if(touch.width/2>object.x-touch.x||
      touch.height/2>object.y+touch.y){  
      return true;
    }else{
      return false;
    }
  }
}