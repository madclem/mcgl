import glmatrix from 'gl-matrix';
import mcgl, {GL} from 'mcgl';
import Mesh from './Mesh';
import FacesMultiplicator from '../utils/FacesMultiplicator';
import FacesSeparator from '../utils/FacesSeparator';

let gl, pivotX, pivotY, axis;
let indexUniq = 0;
let vertices = [];
let indices = [];
let middlePointIndexCache = {}

class IcoSphere extends Mesh {
  constructor(program, subdivision = 2, scale = 1, attribPositionName = "a_position", drawMode = mcgl.GL.gl.TRIANGLES){
    super(program, drawMode)
    this.attribPositionName = attribPositionName;

    this.scale = scale;
    this.subdivision = subdivision;

    this.middlePointIndexCache = [];

    this.sphere();
  }

  sphere(){

    let faces = [];
    // let vertices = [];
    let indices = [];
    let radius = 1;
    // create 12 vertices of a icosahedron
    var t = (1.0 + Math.sqrt(5.0)) / 2.0 * radius;

    this.positions = [];

    this.addVertex([-1 * radius,  t,  0]);
    this.addVertex([1 * radius,  t,  0]);
    this.addVertex([-1 * radius, -t,  0]);
    this.addVertex([ 1 * radius, -t,  0]);

    this.addVertex([ 0, -1 * radius,  t]);
    this.addVertex([ 0,  1 * radius,  t]);
    this.addVertex([ 0, -1 * radius, -t]);
    this.addVertex([ 0,  1 * radius, -t]);

    this.addVertex([ t,  0, -1 * radius]);
    this.addVertex([ t,  0,  1 * radius]);
    this.addVertex([-t,  0, -1 * radius]);
    this.addVertex([-t,  0,  1 * radius]);

    // create 20 triangles of the icosahedron
    faces.push([0, 11, 5]);
    faces.push([0, 5, 1]);
    faces.push([0, 1, 7]);
    faces.push([0, 7, 10]);
    faces.push([0, 10, 11]);

    faces.push([1, 5, 9]);
    faces.push([5, 11, 4]);
    faces.push([11, 10, 2]);
    faces.push([10, 7, 6]);
    faces.push([7, 1, 8]);

    faces.push([3, 9, 4]);
    faces.push([3, 4, 2]);
    faces.push([3, 2, 6]);
    faces.push([3, 6, 8]);
    faces.push([3, 8, 9]);

    faces.push([4, 9, 5]);
    faces.push([2, 4, 11]);
    faces.push([6, 2, 10]);
    faces.push([8, 6, 7]);
    faces.push([9, 8, 1]);

    faces = FacesMultiplicator.multiplyTriangles(this.subdivision, faces, vertices);

    let data = FacesSeparator.separate(faces, vertices);
    let newVertices = data.vertices;
    let triangles = data.faces;

    for (var i = 0; i < newVertices.length; i++) {
      let v = newVertices[i];
      v[0] *= this.scale;
      v[1] *= this.scale;
      v[2] *= this.scale;
    }

    this.bufferIndex(triangles);
    this.bufferVertex(newVertices, false, this.attribPositionName);
  }

  addVertex(position)
  {
    let length = Math.sqrt(position[0] * position[0] + position[1] * position[1] + position[2] * position[2]);
    vertices.push([position[0]/length, position[1]/length, position[2]/length]);
  }

  render(){
  }
}

export default IcoSphere;
