import mcgl, {GL} from 'mcgl';

let gl, pivotX, pivotY, axis;

class Cube {
  constructor(program, w, h, d){

    gl = GL.gl;

    this.position = [0,0,0];
    this.width = w;
    this.height = h;
    this.depth = d;
    this.program = program;

    this.normalBuffer = gl.createBuffer();
    this.vertexBuffer = gl.createBuffer();
    this.indexBuffer = gl.createBuffer();

    this.cube();


    this.positionLocation = gl.getAttribLocation(this.program, "a_position");
    gl.enableVertexAttribArray(this.positionLocation);
    gl.vertexAttribPointer(this.positionLocation, 3, gl.FLOAT, false, 0, 0)

    this.normalLocation = gl.getAttribLocation(this.program, "a_normal");
    gl.enableVertexAttribArray(this.normalsLocation);
    gl.vertexAttribPointer(this.normalsLocation, 3, gl.FLOAT, false, 0, 0)

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

    var tempPos = []
    var tempNormals = []
    for (var i = 0; i < positions.length; i++) {
      for (var j = 0; j < positions[i].length; j++) {
        tempPos.push(positions[i][j])
        tempNormals.push(normals[i][j])
      }
    }

    // var pos = new Float32Array(positions);
    var pos = new Float32Array(tempPos);
    var norms = new Float32Array(tempNormals);

    this.bufferNormals(norms);
    this.bufferVertex(pos);
    this.bufferIndices(indices);
  }

  bufferNormals(normals){
    this.normals = normals;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);

    gl.enableVertexAttribArray(this.normalsLocation);
    gl.vertexAttribPointer(this.normalsLocation, 3, gl.FLOAT, false, 0, 0)
  }

  bufferIndices(indices){
    this.indices = indices;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  }

  bufferVertex(vertices){
    this.vertices = vertices;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.enableVertexAttribArray(this.positionLocation);
    gl.vertexAttribPointer(this.positionLocation, 3, gl.FLOAT, false, 0, 0)
  }

  render(){
    this.cube();
    // this.positionLocation = gl.getAttribLocation(this.program, "a_position");


    // gl.enableVertexAttribArray(this.normalLocation);
    // gl.vertexAttribPointer(this.normalLocation, 3, gl.FLOAT, false, 0, 0)

    gl.drawElements(gl.TRIANGLES, (6 * 6), gl.UNSIGNED_SHORT, this.indexBuffer, 0);
  }
}

export default Cube;
