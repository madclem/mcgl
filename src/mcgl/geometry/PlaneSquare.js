import mcgl, {GL} from 'mcgl';
import Mesh from './Mesh';

let gl, pivotX, pivotY, axis;


class PlaneSquare extends Mesh {
  constructor(program, w, h, subdivision, axis, attribPositionName = "a_position", drawMode){
    drawMode = drawMode || mcgl.GL.gl.POINTS;
    super(program, drawMode);
    gl = mcgl.GL.gl;

    this.attribPositionName = attribPositionName;

    this.subdivision = subdivision;
    this.axis = axis || "xy";
    this.w = w;
    this.h = h;


    this.plane(this.w, this.h, this.subdivision, this.axis);
  }

  plane(w, h, subdivision, axis){

    pivotX = -this.w/2;
    pivotY = -this.h/2;

    var positions = [];
    var indices = [];

    var index = 0;

    var offset = 0;


    for (var i = 0; i < subdivision; i++) {

      for (var j = 0; j < subdivision; j++) {

        if(this.axis === "xy"){
          positions.push(this.getPos(i, j));
          positions.push(this.getPos(i+1, j));
          positions.push(this.getPos(i+1, j+1));
          positions.push(this.getPos(i, j+1));
        }
        else {
          positions.push(this.getPos(i, j+1));
          positions.push(this.getPos(i+1, j+1));
          positions.push(this.getPos(i+1, j));
          positions.push(this.getPos(i, j));
        }


        indices.push(index * 4 + 0);
        indices.push(index * 4 + 1);
        indices.push(index * 4 + 2);

        indices.push(index * 4 + 3);
        indices.push(index * 4 + 2);
        indices.push(index * 4 + 1);

        index++;

        // offset += 10
      }

    }

    this.bufferIndex(indices);
    this.bufferVertex(positions, false, this.attribPositionName);
  }

  getPos(i, j){

    var x = this.w / this.subdivision * i + pivotX;
    var y = this.h / this.subdivision * j + pivotY;
    var z = 0;

    if(this.axis === "xy"){
      return [x + this.position[0], y + this.position[1], z + this.position[2]];
    }
    else {
      return [x + this.position[2], z + this.position[1], y + this.position[0]];
    }
  }
}

export default PlaneSquare;
