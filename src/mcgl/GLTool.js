import Matrices from './utils/Matrices'

const getAttribLoc = function (gl, shaderProgram, name) {
	if(shaderProgram.cacheAttribLoc === undefined) {	shaderProgram.cacheAttribLoc = {};	}
	if(shaderProgram.cacheAttribLoc[name] === undefined) {
		shaderProgram.cacheAttribLoc[name] = gl.getAttribLocation(shaderProgram, name);
	}

	return shaderProgram.cacheAttribLoc[name];
};

let gl;

class GLTool {
  constructor(){
    this.gl = null;
    this.canvas = null;
    this.width = 0;
    this.height = 0;
    this.aspectRatio = 0;

    this.camera = null;
    this.shader = null;
    this.shaderProgram = null;

    this._enabledVertexAttribute = [];
    this._lastMesh				 = null;
  }

  reset(_gl){
    this.gl = _gl;
    gl = _gl;
    this.canvas = gl.canvas;
  }

  useShader(shader){
    this.shader = shader;
    this.shaderProgram = this.shader.shaderProgram;

    // console.log(this.shaderProgram.id);
    // this.draw(); // for the main uniforms
  }

  setMatrices(camera) {
		this.camera = camera;
	}

  draw(mMesh, mDrawingType){

    if (this._lastMesh !== mMesh) {
			this._bindBuffers(mMesh);
		}

    if(this.camera && this.camera !== undefined && this.camera.projection) {
			this.shader.uniform('u_worldViewProjection', 'mat4', this.camera.projection);
			this.shader.uniform('u_world', 'mat4', Matrices.inverse(this.camera.matrix));
		}

    let drawType = mMesh.drawType;
		if(mDrawingType !== undefined) {
			drawType = mDrawingType;
		}

    // if(drawType === gl.POINTS) {
		// 	gl.drawArrays(drawType, 0, mMesh.vertexSize);
		// } else {

			gl.drawElements(drawType, mMesh.iBuffer.numItems, gl.UNSIGNED_SHORT, 0);
		// }
  }

  _bindBuffers(mMesh) {
		//	ATTRIBUTES
		for(let i = 0; i < mMesh._attributes.length; i++) {

			const attribute = mMesh._attributes[i];
			gl.bindBuffer(gl.ARRAY_BUFFER, attribute.buffer);
			const attrPosition = getAttribLoc(gl, this.shaderProgram, attribute.name);

      // console.log(attribute.name + " " +  attrPosition + " // size " + attribute.itemSize);
			gl.vertexAttribPointer(attrPosition, attribute.itemSize, gl.FLOAT, false, 0, 0);


			if(this._enabledVertexAttribute.indexOf(attrPosition) === -1) {
				gl.enableVertexAttribArray(attrPosition);
				this._enabledVertexAttribute.push(attrPosition);
			}
		}

		//	BIND INDEX BUFFER
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mMesh.iBuffer);

		this._lastMesh = mMesh;
	}

  resize(width, height){

    this.canvas.style.width = `${width}px`;
	  this.canvas.style.height = `${height}px`;
	  this.canvas.style.top = `${(window.innerHeight - height)/2}px`;
	  this.canvas.style.left = `${(window.innerWidth - width)/2}px`;


		this.width        = width;
		this.height       = height;

		this.canvas.width  = this.width;
		this.canvas.height = this.height;
		this.aspectRatio  = this.width / this.height;

		this.gl.viewport(0, 0, this.width, this.height);
  }
}

export default new GLTool();
// export default GLTool;
