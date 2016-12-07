import glmatrix from 'gl-matrix';
import mcgl, {GL} from 'mcgl';
import Mesh from './Mesh';

let gl, pivotX, pivotY, axis;

class Sphere extends Mesh {
  constructor(program, nbVert, radius, attribPositionName = "a_position", drawMode = mcgl.GL.gl.TRIANGLES){
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
    var uv = []
    var offset = 0;

    let dTex = 1/ this.nbVert;

    for (var i = 0; i < this.nbVert; i++) {
      // texX += dTex;
      for (var j = 0; j < this.nbVert; j++) {
        // texY += dTex;

        positions.push(this.getAngle(i, j));
        positions.push(this.getAngle(i + 1, j));
        positions.push(this.getAngle(i + 1, j + 1));
        positions.push(this.getAngle(i, j + 1));

        // uv.push([texX, texY]);
        // uv.push([texX + dTex, texY]);
        // uv.push([texX + dTex, texY + dTex]);
        // uv.push([texX, texY + dTex]);
        // uv.push(this.getUV(i, j));
        // uv.push(this.getUV(i + 1, j));
        // uv.push(this.getUV(i + 1, j + 1));
        // uv.push(this.getUV(i, j + 1));

        const u = j / this.nbVert;
			  const v = i / this.nbVert;


  			uv.push([1.0 - u, v]);
  			uv.push([1.0 - u, v + dTex]);
  			uv.push([1.0 - u - dTex, v + dTex]);
  			uv.push([1.0 - u - dTex, v]);

        // console.log(this.getUV(i, j + 1));

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
    this.bufferTexCoord(uv, false);
    this.bufferVertex(positions, false, this.attribPositionName);
  }


  getUV(i, j, isNormal = false) {	//	rx : -90 ~ 90 , ry : 0 ~ 360
    const ry        = j / this.nbVert * Math.PI * 2 - Math.PI;
		const rx        = i / this.nbVert * Math.PI - Math.PI * 0.5;
		const r         = this.radius;
		const pos       = [];
		pos[1]        	= Math.sin(rx) * r;
		const t         = Math.cos(rx) * r;
		pos[0]        	= Math.cos(ry) * t;
		pos[2]        	= Math.sin(ry) * t;

    let d = [];
    glmatrix.vec3.sub(d, [0,0,0], pos);
    // let len = glmatrix.vec3.len(d);

    let mag = Math.sqrt(d[0]*d[0] +d[1]*d[1]+d[2]*d[2])
    // let norm = [];
    // glmatrix.vec3.normalize(norm, d);

    d[0] /= mag;
    d[1] /= mag;
    d[2] /= mag;

    // console.log("d:", d);

    let u = 0.5 + (Math.atan2(d[2], d[0]))/ 2 * Math.PI;
    let v = 0.5 - (Math.asin(d[1]))/ Math.PI;


    // console.log(Math.asin(norm[1]));

		return [u, v];
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
