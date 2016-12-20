import Keyboard from '../libs/Keyboard';
import Signal from 'signals';

class Controller {
  constructor(){

    this.onKeyPressed = new Signal();
    this.onTouchStart = new Signal();
    this.onTouchEnd = new Signal();
    this.keyboard = new Keyboard();

    this.keyboard.onKeyPress('space', ()=> {
      this.onKeyPressed.dispatch("space");
    });

    this.keyboard.onKeyPress('p', ()=> {
      this.onKeyPressed.dispatch("p");
    });


    // var el = document.getElementsByTagName("canvas")[0];
    window.addEventListener("touchstart", ()=>{
      this.onTouchStart.dispatch();
    }, false);

    window.addEventListener("touchend", ()=>{
      this.onTouchEnd.dispatch();
    }, false);
  }

  update(){
  }
}

export default Controller;
