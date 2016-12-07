import glmatrix from 'gl-matrix';
import mcgl, {GL} from 'mcgl';
import Mesh from './Mesh';

let gl, pivotX, pivotY, axis;
let index = 0;
let vertices = [];
let indices = [];
let middlePointIndexCache = {}

class IcoSphere extends Mesh {
  constructor(program, nbVert, radius, attribPositionName = "a_position", drawMode = mcgl.GL.gl.TRIANGLES){
    super(program, drawMode)
    this.attribPositionName = attribPositionName;

    this.nbVert = nbVert;
    this.radius = radius;

    this.middlePointIndexCache = [];

    this.sphere();
  }

  sphere(){

    let faces = [];
    // let vertices = [];
    let indices = [];
    let radius = 100;
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
    // 5 faces around point 0
    faces.push([0, 11, 5]);
    faces.push([0, 5, 1]);
    faces.push([0, 1, 7]);
    faces.push([0, 7, 10]);
    faces.push([0, 10, 11]);

    // 5 adjacent faces
    faces.push([1, 5, 9]);
    faces.push([5, 11, 4]);
    faces.push([11, 10, 2]);
    faces.push([10, 7, 6]);
    faces.push([7, 1, 8]);

    // 5 faces around point 3
    faces.push([3, 9, 4]);
    faces.push([3, 4, 2]);
    faces.push([3, 2, 6]);
    faces.push([3, 6, 8]);
    faces.push([3, 8, 9]);

    // 5 adjacent faces
    faces.push([4, 9, 5]);
    faces.push([2, 4, 11]);
    faces.push([6, 2, 10]);
    faces.push([8, 6, 7]);
    faces.push([9, 8, 1]);


    for (var i = 0; i < 2; i++) {
      let faces2 = [];
      for (var k = 0; k < faces.length; k++) {
        let tri = faces[k];

        let a = this.getMiddlePoint(tri[0], tri[1]);
        let b = this.getMiddlePoint(tri[1], tri[2]);
        let c = this.getMiddlePoint(tri[2], tri[0]);

        faces2.push([tri[0], a, c]);
        faces2.push([tri[1], b, a]);
        faces2.push([tri[2], b, c]);
        faces2.push([a, b, c]);
      }

      faces = faces2.slice();
    }

    let pos = [];

    for (var i = 0; i < vertices.length; i++) {
      let v = vertices[i];
      v[0] *= 100;
      v[1] *= 100;
      v[2] *= 100;
    }

    let ind = [];
    for (var i = 0; i < faces.length; i++) {
      ind.push(faces[i][0], faces[i][1], faces[i][2]);
    }
    console.log(vertices.length);
    this.bufferIndex(ind);
    this.bufferVertex(vertices, false, this.attribPositionName);
  }

  addVertex(position)
  {
    let length = Math.sqrt(position[0] * position[0] + position[1] * position[1] + position[2] * position[2]);
    vertices.push([position[0]/length, position[1]/length, position[2]/length]);

    return index++;
  }

  getMiddlePoint(p1, p2) {
    let firstPointIsSmaller = p1 < p2;
    let smallerIndex = firstPointIsSmaller ? p1 : p2;
    let greaterIndex = firstPointIsSmaller ? p2 : p1;
    let key = (smallerIndex << 32) + greaterIndex;
    // console.log(key);
    // console.log(smallerIndex, smallerIndex<<32);
    let foundValueIterator = middlePointIndexCache[key];
    if(foundValueIterator)
    {
      // return foundValueIterator;
    }

    let point1 = vertices[p1];
    let point2 = vertices[p2];
    let middle = [
      (point1[0] + point2[0]) / 2.0,
      (point1[1] + point2[1]) / 2.0,
      (point1[2] + point2[2]) / 2.0];

    let i = this.addVertex(middle);

    middlePointIndexCache[key] = i;
  // this.middlePointIndexCache.insert(std::make_pair(key, i));
    return i;
  }



  render(){
  }
}

export default IcoSphere;
