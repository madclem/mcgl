import mcgl, {GL} from 'mcgl';
import Mesh from './Mesh';
import FacesMultiplicator from '../utils/FacesMultiplicator';
import FacesSeparator from '../utils/FacesSeparator';

let gl, pivotX, pivotY, axis;

class Cube extends Mesh {
  constructor(program, w=10, h=10, d=10, multiFace = false, subdivision, drawMode = mcgl.GL.gl.TRIANGLES){

    super(program, drawMode)

    subdivision = subdivision || 0;
    gl = mcgl.GL.gl;
    this.multiFace = multiFace;

    this.subdivision = subdivision;
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

    if(this.multiFace){
      coords.push([0, 0]);
    	coords.push([1/4, 0]);
    	coords.push([1/4, 1/2]);
    	coords.push([0, 1/2]);
    }
    else {
      coords.push([0, 0]);
      coords.push([1, 0]);
      coords.push([1, 1]);
      coords.push([0, 1]);
    }

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

    if(this.multiFace){
      coords.push([1/4, 0]);
    	coords.push([1/4 * 2, 0]);
    	coords.push([1/4 * 2, 1/2]);
    	coords.push([1/4, 1/2]);
    }
    else {
      coords.push([0, 0]);
      coords.push([1, 0]);
      coords.push([1, 1]);
      coords.push([0, 1]);
    }

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

    if(this.multiFace){
      coords.push([1/4 * 2, 0]);
    	coords.push([1/4 * 3, 0]);
    	coords.push([1/4 * 3, 1/2]);
    	coords.push([1/4 * 2, 1/2]);
    }
    else {
      coords.push([0, 0]);
      coords.push([1, 0]);
      coords.push([1, 1]);
      coords.push([0, 1]);
    }

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

    if(this.multiFace){
      coords.push([0, 1/2]);
    	coords.push([1/4, 1/2]);
    	coords.push([1/4, 1/2 * 2]);
    	coords.push([0, 1/2 * 2]);
    }
    else {
      coords.push([0, 0]);
      coords.push([1, 0]);
      coords.push([1, 1]);
      coords.push([0, 1]);
    }

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

    if(this.multiFace){
      coords.push([1/4, 1/2]);
    	coords.push([1/4 * 2, 1/2]);
    	coords.push([1/4 * 2, 1/2 * 2]);
    	coords.push([1/4, 1/2 * 2]);
    }
    else {
      coords.push([0, 0]);
      coords.push([1, 0]);
      coords.push([1, 1]);
      coords.push([0, 1]);
    }

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

    if(this.multiFace){
      coords.push([1/4 * 2, 1/2]);
    	coords.push([1/4 * 3, 1/2]);
    	coords.push([1/4 * 3, 1/2 * 2]);
    	coords.push([1/4 * 2, 1/2 * 2]);
    }
    else {
      coords.push([0, 0]);
      coords.push([1, 0]);
      coords.push([1, 1]);
      coords.push([0, 1]);
    }

  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 1);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 3);

    let ind = []

    for (var i = 0; i < indices.length; i+=3) {
      ind.push([indices[i], indices[i+1], indices[i+2]])
    }

    // TODO this is a temporary fix
    let faces = FacesMultiplicator.multiplyTriangles(1, ind, positions);
    let l = positions.length - coords.length
    for (var i = 0; i < l; i++) {
      coords.push([0, 0]);
      normals.push([0, -1, 0]);
    }

    this.bufferNormal(normals);
    this.bufferVertex(positions);
    this.bufferIndex(faces);
    this.bufferTexCoord(coords);
  }

  render(){
  }
}

export default Cube;
