import mcgl, {GL} from 'mcgl';
import Mesh from './Mesh';

let gl, pivotX, pivotY, axis;

class Plane extends Mesh {
  constructor(program, w, h, subdivision, axis, attribPositionName = "a_position", drawMode= GL.gl.TRIANGLES){

    super(program, drawMode);

    gl = GL.gl;

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


    // for (var i = subdivision - 1; i > -1; i--) {
    //   for (var j = subdivision - 1; j > -1; j--) {
    for (var i = 0; i < subdivision; i++) {
      for (var j = 0; j < subdivision; j++) {

        if(this.axis === "xy"){
          positions.push(this.getPos(i, j));
          positions.push(this.getPos(i+1, j));
          positions.push(this.getPos(i+1, j+1));
          positions.push(this.getPos(i, j+1));
        }
        else {

          // positions.push(this.getPos(i, j+1));
          // positions.push(this.getPos(i+1, j+1));
          // positions.push(this.getPos(i+1, j));
          // positions.push(this.getPos(i, j));

          positions.push(this.getPos(i, j));
          positions.push(this.getPos(i + 1, j));
          positions.push(this.getPos(i + 1, j + 1));
          positions.push(this.getPos(i, j + 1));
        }



        indices.push(index * 4 + 0);
        indices.push(index * 4 + 1);
        indices.push(index * 4 + 2);
        indices.push(index * 4 + 0);
        indices.push(index * 4 + 2);
        indices.push(index * 4 + 3);

        index++;

        // offset += 10
      }

    }
    // var tempPos = []
    // for (var i = 0; i < positions.length; i++) {
    //   for (var j = 0; j < positions[i].length; j++) {
    //     tempPos.push(positions[i][j])
    //   }
    // }

    // var pos = new Float32Array(positions);
    // var pos = new Float32Array(positions);


    this.bufferIndex(indices);
    this.bufferVertex(positions, false, this.attribPositionName);
  }

  getPos(i, j){

    // var x = this.w / this.subdivision * i + pivotX + this.position[0];
    // var y = this.h / this.subdivision * j + pivotY + this.position[1];
    // var z = 0 + this.position[2];
    var x = this.w / this.subdivision * i + pivotX ;
    var y = this.h / this.subdivision * j + pivotY ;
    var z = 0 ;

    if(this.axis === "xy"){
      // return [x + this.position[0], y + this.position[0], z + this.position[0]];
      return [x, y, z];
    }
    else {
      // return [x + this.position[0], z + this.position[1], y + this.position[2]];
      return [x, 0, y];
    }
  }

  // bufferIndices(indices){
  //   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  //   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  //
  // }
  //
  // bufferVertex(vertices){
  //   gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  //   gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  //   // gl.enableVertexAttribArray(this.positionLocation);
  //   // gl.vertexAttribPointer(this.positionLocation, 3, gl.FLOAT, false, 0, 0)
  // }

  render(){
    // this.plane(this.w, this.h, this.subdivision, this.axis);
    // this.positionLocation = gl.getAttribLocation(this.program, "a_position");
    // gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    //
    // gl.vertexAttribPointer(this.positionLocation, 3, gl.FLOAT, false, 0, 0)
    // gl.enableVertexAttribArray(this.positionLocation);
    //
    // gl.drawElements(gl.TRIANGLES, (this.subdivision * this.subdivision * 6), gl.UNSIGNED_SHORT, this.indexBuffer, 0);
  }
}

export default Plane;
