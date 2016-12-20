import Matrices from './utils/Matrices'
import glmatrix from 'gl-matrix';

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

		let isMobile = false;
  	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))isMobile = true})(navigator.userAgent||navigator.vendor||window.opera);
  	let iPad = navigator.userAgent.toLowerCase().indexOf('ipad') !== -1;

		if(!isMobile){
    	isMobile = iPad;
  	}

		this.isMobile = isMobile

    this.camera = null;
    this.shader = null;
    this.shaderProgram = null;
		this.inverseViewMatrix = glmatrix.mat4.create();
		this.modelMatrix = glmatrix.mat4.create();
		this.identityMatrix          = glmatrix.mat4.create();
		this.matrix          = glmatrix.mat4.create();
		glmatrix.mat4.identity(this.identityMatrix, this.identityMatrix);


    this._enabledVertexAttribute = [];
    this._lastMesh				 = null;



  }

  reset(_gl){
    this.gl = _gl;
    gl = _gl;
    this.canvas = gl.canvas;

		const ctx = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
		gl = this.gl = ctx;
		const extensions = [
			'EXT_shader_texture_lod',
			'EXT_sRGB',
			'EXT_frag_depth',
			'OES_texture_float',
			'OES_texture_half_float',
			'OES_texture_float_linear',
			'OES_texture_half_float_linear',
			'OES_standard_derivatives',
			'WEBGL_depth_texture',
			'EXT_texture_filter_anisotropic',
			'ANGLE_instanced_arrays',
			'WEBGL_draw_buffers'
		];

		this.extensions = {};
		for(let i = 0; i < extensions.length; i++) {
			this.extensions[extensions[i]] = gl.getExtension(extensions[i]);
		}

		// console.log(this.extensions);
  }

  useShader(shader){
    this.shader = shader;
    this.shaderProgram = this.shader.shaderProgram;

    // console.log(this.shaderProgram.id);
    // this.draw(); // for the main uniforms
  }

  setMatrices(camera) {
		this.camera = camera;
		this.rotate(this.identityMatrix);
	}

	rotate(rotation) {
		glmatrix.mat4.copy(this.modelMatrix, rotation);
		glmatrix.mat4.multiply(this.matrix, this.camera.matrix, this.modelMatrix);

		glmatrix.mat3.fromMat4(this.inverseViewMatrix, this.matrix);
		glmatrix.mat3.invert(this.inverseViewMatrix, this.inverseViewMatrix);
	}

  draw(mMesh, mDrawingType){

    if (this._lastMesh !== mMesh) {
			this._bindBuffers(mMesh);
		}

		// console.log(this.inverseViewMatrix);

    if(this.camera && this.camera !== undefined && this.camera.projection) {
			this.shader.uniform('u_projectionMatrix', 'mat4', this.camera.projection);
			this.shader.uniform('u_viewMatrix', 'mat4', this.camera.matrix);
			this.shader.uniform('u_inverseViewMatrix', 'mat4', this.inverseViewMatrix);
			this.shader.uniform('u_modelMatrix', 'mat4', this.modelMatrix);
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

	checkExtension(mExtension) {
		return !!this.extensions[mExtension];
	}

	getExtension(mExtension) {
		return this.extensions[mExtension];
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
