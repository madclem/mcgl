import mcgl, {GL} from 'mcgl';
import Mesh from './Mesh';

let gl, pivotX, pivotY, axis;

class Cube extends Mesh {
  constructor(program, w=10, h=10, d=10, drawMode = mcgl.GL.gl.TRIANGLES){

    super(program, drawMode)

    gl = mcgl.GL.gl;
    this.width = w;
    this.height = h;
    this.depth = d;

    this.cube();
  }

  cube(){
    const x = this.width / 2;
  	const y = this.height / 2;
  	const z = this.depth / 2;

  	const positions = [];
  	const coords    = [];
  	const indices   = [];
  	const normals   = [];
  	let count     = 0;


  	// BACK
  	positions.push([-x + this.position[0] ,  y + this.position[1], -z + this.position[2]]);
  	positions.push([x + this.position[0] ,  y + this.position[1], -z + this.position[2]]);
  	positions.push([x + this.position[0] , -y + this.position[1], -z + this.position[2]]);
  	positions.push([-x + this.position[0] , -y + this.position[1], -z + this.position[2]]);

  	normals.push([0, 0, -1]);
  	normals.push([0, 0, -1]);
  	normals.push([0, 0, -1]);
  	normals.push([0, 0, -1]);

  	coords.push([0, 0]);
  	coords.push([1, 0]);
  	coords.push([1, 1]);
  	coords.push([0, 1]);

  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 1);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 3);

  	count ++;

  	// RIGHT
  	positions.push([x + this.position[0] ,  y + this.position[1], -z + this.position[2]]);
  	positions.push([x + this.position[0] ,  y + this.position[1],  z + this.position[2]]);
  	positions.push([x + this.position[0] , -y + this.position[1],  z + this.position[2]]);
  	positions.push([x + this.position[0] , -y + this.position[1], -z + this.position[2]]);

  	normals.push([1, 0, 0]);
  	normals.push([1, 0, 0]);
  	normals.push([1, 0, 0]);
  	normals.push([1, 0, 0]);

  	coords.push([0, 0]);
  	coords.push([1, 0]);
  	coords.push([1, 1]);
  	coords.push([0, 1]);

  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 1);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 3);

  	count ++;

  	// FRONT
  	positions.push([x + this.position[0] ,  y + this.position[1],  z + this.position[2]]);
  	positions.push([-x + this.position[0] ,  y + this.position[1],  z + this.position[2]]);
  	positions.push([-x + this.position[0] , -y + this.position[1],  z + this.position[2]]);
  	positions.push([x + this.position[0] , -y + this.position[1],  z + this.position[2]]);

  	normals.push([0, 0, 1]);
  	normals.push([0, 0, 1]);
  	normals.push([0, 0, 1]);
  	normals.push([0, 0, 1]);

  	coords.push([0, 0]);
  	coords.push([1, 0]);
  	coords.push([1, 1]);
  	coords.push([0, 1]);

  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 1);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 3);

  	count ++;

  	// LEFT
  	positions.push([-x + this.position[0] ,  y + this.position[1],  z + this.position[2]]);
  	positions.push([-x + this.position[0] ,  y + this.position[1], -z + this.position[2]]);
  	positions.push([-x + this.position[0] , -y + this.position[1], -z + this.position[2]]);
  	positions.push([-x + this.position[0] , -y + this.position[1],  z + this.position[2]]);

  	normals.push([-1, 0, 0]);
  	normals.push([-1, 0, 0]);
  	normals.push([-1, 0, 0]);
  	normals.push([-1, 0, 0]);

  	coords.push([0, 0]);
  	coords.push([1, 0]);
  	coords.push([1, 1]);
  	coords.push([0, 1]);

  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 1);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 3);

  	count ++;

  	// TOP
  	positions.push([-x + this.position[0] ,  y + this.position[1],  z + this.position[2]]);
  	positions.push([x + this.position[0] ,  y + this.position[1],  z + this.position[2]]);
  	positions.push([x + this.position[0] ,  y + this.position[1], -z + this.position[2]]);
  	positions.push([-x + this.position[0] ,  y + this.position[1], -z + this.position[2]]);

  	normals.push([0, 1, 0]);
  	normals.push([0, 1, 0]);
  	normals.push([0, 1, 0]);
  	normals.push([0, 1, 0]);

  	coords.push([0, 0]);
  	coords.push([1, 0]);
  	coords.push([1, 1]);
  	coords.push([0, 1]);

  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 1);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 3);

  	count ++;

  	// BOTTOM
  	positions.push([-x + this.position[0] , -y + this.position[1], -z + this.position[2]]);
  	positions.push([x + this.position[0] , -y + this.position[1], -z + this.position[2]]);
  	positions.push([x + this.position[0] , -y + this.position[1],  z + this.position[2]]);
  	positions.push([-x + this.position[0] , -y + this.position[1],  z + this.position[2]]);

  	normals.push([0, -1, 0]);
  	normals.push([0, -1, 0]);
  	normals.push([0, -1, 0]);
  	normals.push([0, -1, 0]);

  	coords.push([0, 0]);
  	coords.push([1, 0]);
  	coords.push([1, 1]);
  	coords.push([0, 1]);

  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 1);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 3);

	// count ++;

    // var tempPos = []
    // var tempNormals = []
    // for (var i = 0; i < positions.length; i++) {
    //   for (var j = 0; j < positions[i].length; j++) {
    //     tempPos.push(positions[i][j])
    //     tempNormals.push(normals[i][j])
    //   }
    // }

    // var pos = new Float32Array(positions);
    // var pos = new Float32Array(tempPos);
    // var norms = new Float32Array(tempNormals);

    this.bufferNormal(normals);
    this.bufferVertex(positions);
    this.bufferIndex(indices);
    this.bufferTexCoord(coords);
  }

  render(){
  }
}

export default Cube;
