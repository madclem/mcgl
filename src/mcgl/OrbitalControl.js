// import Matrices from './utils/Matrices'
import glmatrix from 'gl-matrix'

class OrbitalControl {
  constructor(){
    this.position = [0, 100, 0];
    this._position = [0, 0, 0];
    this.target = [0, 0, 0];
    this.up = [0, 1, 0];
    this.radius = 800;

    this.prevMouse = [null, null]
    this.prevRx = null;
		this.prevRy = null;

    this.ry = 0;
    this.rx = 0;
    this.tr = 0;
    this.locked = false;
    this.autoRotation = false;
    this._auto = true; // do we listen to zoom/unzoom automatically etc.
    this._addEvents();
    this.bounds = [
      [-1000, 1000],
      [-1000, 1000],
      [1, 10000]
    ]

    // properties scroll
    this.speed = [0,0];
    this._lastScroll = null;
    this.isDown = false;
    this.currentPos = [];
    this.previousPos = [];
    this.previousTime = null;



    // this.m = glmatrix.mat4.create();
  }

  getSpeed() {
    let x = this.currentPos[0];
    let y = this.currentPos[1];
    let new_x;
    let new_y;
    let new_t;

    let x_dist;
    let y_dist, interval,velocity = [], t;

    if (!this.previousTime) {return [0,0];}
    t = this.previousTime;
     new_x = this.previousPos[0];
     new_y = this.previousPos[1];
     new_t = Date.now();

    x_dist = new_x - x;

    // console.log(x_dist);
    y_dist = new_y - y;
    interval = new_t - t;
      // update values:
    // x = new_x;
    // y = new_y;

    velocity[0] = Math.round(x_dist / interval * 10);//*x_dist+y_dist*y_dist)/ (interval/10);
    velocity[1] = Math.round(y_dist / interval * 10);//*x_dist+y_dist*y_dist)/ (interval/10);
    // velocity = Math.sqrt(x_dist*x_dist+y_dist*y_dist)/ (interval/10);

    // if(isNaN(velocity)) velocity = 0;
    if(isNaN(velocity[0])) velocity[0] = 0;
    if(isNaN(velocity[1])) velocity[1] = 0;

    return velocity;

  }

  onDown(e){
    this.isDown = true;

    this.prevMouse = [e.clientX, e.clientY]

    this.prevRx = this.rx;
		this.prevRy = this.ry;
  }

  onMove(e){

    if(!this.isDown) return;

    this.currentPos = [e.clientX, e.clientY];

    // this.speed = this.getSpeed();
    // if(!this.speed[0]) this.speed[0] = 0;
    // if(!this.speed[1]) this.speed[1] = 0;

    // this.previousTime = Date.now();
    // this.previousPos[0] = this.currentPos[0];
    // this.previousPos[1] = this.currentPos[1];
    let diffX = -(this.currentPos[0] - this.prevMouse[0]);
		this.ry = this.prevRy - diffX * 0.005;


		let diffY = -(this.currentPos[1] - this.prevMouse[1]);
		this.rx = this.prevRx - diffY * 0.005;
  }

  onUp(e){
    this.isDown = false;
  }

  onScroll(e){
    if(!this._lastScroll){
      this._lastScroll = e.deltaY;

      return;
    }

    if((this.radius + e.deltaY > this.bounds[2][0] && this.radius + e.deltaY < this.bounds[2][1])
    || (this.radius <= this.bounds[2][0] && e.deltaY >= 0)
    || (this.radius >= this.bounds[2][1] && e.deltaY <= 0)){
      this.radius += e.deltaY;
    }

    this._lastScroll = e.deltaY;
  }

  _addEvents(){
    window.addEventListener('mousewheel', this.onScroll.bind(this));
    window.addEventListener('DOMMouseScroll', this.onScroll.bind(this));
    window.addEventListener('mousedown',this.onDown.bind(this), false);
    window.addEventListener('mousemove', this.onMove.bind(this), false);
    window.addEventListener('mouseup', this.onUp.bind(this), false)
  }

  _removeEvents(){
    window.removeEventListener('mousewheel', this.onScroll.bind(this));
    window.removeEventListener('DOMMouseScroll', this.onScroll.bind(this));
    window.removeEventListener('mousedown',this.onDown.bind(this), false);
    window.removeEventListener('mousemove', this.onMove.bind(this), false);
    window.removeEventListener('mouseup', this.onUp.bind(this), false)
  }

  set auto(val){
    if(val){
      this._addEvents();
    }
    else {
      this._removeEvents();
    }
  }

  update(){

    if(this.autoRotation){
      this.ry += 0.004;
    }
    //
    // if(!this.isDown) {
    //   this.speed[0] *= .9;
    //   this.speed[1] *= .9;
    // }
    //
    // this.ry -= this.speed[0]/ 100;
    // this.rx -= this.speed[1]/ 100;

    this._position[1] = Math.sin(this.rx) * this.radius;

    const tr = Math.cos(this.rx) * this.radius;
    this._position[0] = Math.cos(this.ry + Math.PI * 0.5) * tr;
    this._position[2] = Math.sin(this.ry + Math.PI * 0.5) * tr;
    glmatrix.vec3.add(this._position, this._position, this.position);
  }
}

export default OrbitalControl;
