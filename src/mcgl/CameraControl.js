class CameraControl {
  constructor(){
    this.rxT = 0;
    this.ryT = 0;
    this.ry = 0;
    this.rx = 0;
    this.tr = 0;

    this.prevMouse = [null, null]
    this.prevRx = null;
		this.prevRy = null;

    this._addEvents();
  }

  setRy(value){
    this.prevRy = this.ryT = value;
  }

  onDown(e){
    if(e.touches) {
      this.prevMouse = [e.touches[0].pageX, e.touches[0].pageY]
	  }
    else {
      this.prevMouse = [e.clientX, e.clientY]
	  }

    this.isDown = true;
    this.prevRx = this.rxT = this.rx;
		this.prevRy = this.ryT = this.ry;
  }

  onMove(e){

    if(!this.isDown) return;

    if(e.touches) {
      this.currentPos = [e.touches[0].pageX, e.touches[0].pageY]
	  }
    else {
      this.currentPos = [e.clientX, e.clientY];
	  }


    // this.speed = this.getSpeed();
    // if(!this.speed[0]) this.speed[0] = 0;
    // if(!this.speed[1]) this.speed[1] = 0;

    // this.previousTime = Date.now();
    // this.previousPos[0] = this.currentPos[0];
    // this.previousPos[1] = this.currentPos[1];
    let diffX = -(this.currentPos[0] - this.prevMouse[0]);
		this.ryT = this.prevRy - diffX * 0.005;


		let diffY = -(this.currentPos[1] - this.prevMouse[1]);
		this.rxT = this.prevRx - diffY * 0.005;
  }

  onUp(e){
    this.isDown = false;
  }

  update(){

    // console.log(this.ry);
    this.ry += (this.ryT - this.ry) * (this.isDown ? .1 : 0.03);
    this.rx += (this.rxT - this.rx) * (this.isDown ? .1 : 0.03);
    //
    // if(!this.isDown) {
    //   this.speed[0] *= .9;
    //   this.speed[1] *= .9;
    // }
    //
    // this.ry -= this.speed[0]/ 100;
    // this.rx -= this.speed[1]/ 100;
  }

  _addEvents(){
    window.addEventListener('mousedown',this.onDown.bind(this), false);
    window.addEventListener('touchstart',this.onDown.bind(this), false);
    window.addEventListener('mousemove', this.onMove.bind(this), false);
    window.addEventListener('touchmove', this.onMove.bind(this), false);
    window.addEventListener('mouseup', this.onUp.bind(this), false)
    window.addEventListener('touchend', this.onUp.bind(this), false)
  }

  _removeEvents(){
    window.removeEventListener('mousedown',this.onDown.bind(this), false);
    window.removeEventListener('mousemove', this.onMove.bind(this), false);
    window.removeEventListener('mouseup', this.onUp.bind(this), false)
    window.removeEventListener('touchstart',this.onDown.bind(this), false);
    window.removeEventListener('touchmove', this.onMove.bind(this), false);
    window.removeEventListener('touchend', this.onUp.bind(this), false)
  }
}

export default CameraControl;
