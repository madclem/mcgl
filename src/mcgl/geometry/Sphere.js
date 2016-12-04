import mcgl, {GL} from 'mcgl';
import Mesh from './Mesh';

let gl, pivotX, pivotY, axis;

class Sphere extends Mesh {
  constructor(program, nbVert, radius, attribPositionName = "a_position", drawMode = GL.gl.TRIANGLES){

    super(program, drawMode)
    this.attribPositionName = attribPositionName;

    this.nbVert = nbVert;
    this.radius = radius;

    this.sphere();
  }

  sphere(){
    var positions = [];
    var indices = [];
    var index = 0;

    var offset = 0;

    for (var i = 0; i < this.nbVert; i++) {
      for (var j = 0; j < this.nbVert; j++) {

      positions.push(this.getAngle(i, j));
      positions.push(this.getAngle(i + 1, j));
      positions.push(this.getAngle(i + 1, j + 1));
      positions.push(this.getAngle(i, j + 1));

        indices.push(index * 4 + 0);
        indices.push(index * 4 + 1);
        indices.push(index * 4 + 2);
        indices.push(index * 4 + 0);
        indices.push(index * 4 + 2);
        indices.push(index * 4 + 3);
        index++;
      }
    }

    this.bufferIndex(indices);
    this.bufferVertex(positions, false, this.attribPositionName);
  }

  getAngle(i, j, isNormal = false) {	//	rx : -90 ~ 90 , ry : 0 ~ 360
    const ry        = j / this.nbVert * Math.PI * 2 - Math.PI;
		const rx        = i / this.nbVert * Math.PI - Math.PI * 0.5;
		const r         = this.radius;
		const pos       = [];
		pos[1]        	= Math.sin(rx) * r;
		const t         = Math.cos(rx) * r;
		pos[0]        	= Math.cos(ry) * t;
		pos[2]        	= Math.sin(ry) * t;


		return [pos[0], pos[1], pos[2]];
	}

  render(){
  }
}

export default Sphere;
