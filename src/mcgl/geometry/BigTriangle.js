import glmatrix from 'gl-matrix';
import mcgl, {GL} from 'mcgl';
import Mesh from './Mesh';

class BigTriangle extends Mesh {
  constructor(program, attribPositionName = "a_position", drawMode = mcgl.GL.gl.TRIANGLES){
    super(program, drawMode)
    this.attribPositionName = attribPositionName;

    this.bigTriangle();
  }

  bigTriangle(){
  	const indices = [0, 1, 2];
  	const positions = [
  		[-1 * 10000, -1 *10000],
  		[-1*10000, 4*10000],
  		[4*10000, -1*10000]
  	];

  	this.bufferData(positions, 'a_position', 2);
  	this.bufferIndex(indices);

  }

  render(){
  }
}

export default BigTriangle;
