import mcgl, {GL} from 'mcgl';

let gl;

function isSame(array1, array2) {
	if(array1.length !== array2.length) {
		return false;
	}

	for(let i = 0; i < array1.length; i++) {
		if(array1[i] !== array2[i]) {
			return false;
		}
	}

	return true;
};

const uniformMapping = {
	float: 'uniform1f',
	vec2: 'uniform2fv',
	vec3: 'uniform3fv',
	vec4: 'uniform4fv',
	int: 'uniform1i',
	mat3: 'uniformMatrix3fv',
	mat4: 'uniformMatrix4fv'
};

function addLineNumbers(string) {
	const lines = string.split('\n');
	for (let i = 0; i < lines.length; i ++) {
		lines[i] = `${(i + 1)}: ${lines[i]}`;
	}
	return lines.join('\n');
};

class GLShader {

  constructor(vertexShader, fragmentShader) {

		gl                   = GL.gl;
		this.parameters      = [];
		this.uniformTextures = [];

		const vsShader = this._createShaderProgram(vertexShader, true);
		const fsShader = this._createShaderProgram(fragmentShader, false);
		this._attachShaderProgram(vsShader, fsShader);

	}


	bind() {

		if(GL.shader === this) {
			return;
		}

		gl.useProgram(this.shaderProgram);
		GL.useShader(this);
		this.uniformTextures = [];
	}


	uniform(mName, mType, mValue) {
		function cloneArray(mArray) {
			if(mArray.slice) {
				return mArray.slice(0);
			} else {
				return new Float32Array(mArray);
			}
		}

		if(mValue === undefined || mValue === null) {
			console.warn('mValue Error:', mName);
			return;
		}

		const uniformType = uniformMapping[mType] || mType;
		const isNumber = uniformType === 'uniform1i' || uniformType === 'uniform1f';
		let hasUniform = false;
		let oUniform;
		let parameterIndex = -1;


		for(let i = 0; i < this.parameters.length; i++) {
			oUniform = this.parameters[i];
			if(oUniform.name === mName) {
				hasUniform = true;
				parameterIndex = i;
				break;
			}
		}


		if(!hasUniform) {
			this.shaderProgram[mName] = gl.getUniformLocation(this.shaderProgram, mName);
			if(isNumber) {
				this.parameters.push({ name : mName, type: uniformType, value: mValue, uniformLoc: this.shaderProgram[mName] });
			} else {
				this.parameters.push({ name : mName, type: uniformType, value: cloneArray(mValue), uniformLoc: this.shaderProgram[mName] });
			}

			parameterIndex = this.parameters.length - 1;
		} else {
			this.shaderProgram[mName] = oUniform.uniformLoc;
		}


		if(!this.parameters[parameterIndex].uniformLoc) {
			return;
		}

		if(uniformType.indexOf('Matrix') === -1) {


			if(!isNumber) {
				if(!isSame(this.parameters[parameterIndex].value, mValue) || !hasUniform) {
					gl[uniformType](this.shaderProgram[mName], mValue);
					this.parameters[parameterIndex].value = cloneArray(mValue);
				}
			} else {
				const needUpdate = (this.parameters[parameterIndex].value !== mValue || !hasUniform);
				if(needUpdate) {
					gl[uniformType](this.shaderProgram[mName], mValue);
					this.parameters[parameterIndex].value = mValue;
				}
			}

		} else {
			if(!isSame(this.parameters[parameterIndex].value, mValue) || !hasUniform) {
        // console.log("here");
				gl[uniformType](this.shaderProgram[mName], false, mValue);
				this.parameters[parameterIndex].value = cloneArray(mValue);

			}
		}

	}





  createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
    var errFn = function(msg){
      console.log("error ------");
      console.log(msg);
    };

    var program = gl.createProgram();
    shaders.forEach(function(shader) {
      gl.attachShader(program, shader);
    });
    if (opt_attribs) {
      opt_attribs.forEach(function(attrib, ndx) {
        gl.bindAttribLocation(
            program,
            opt_locations ? opt_locations[ndx] : ndx,
            attrib);
      });
    }
    gl.linkProgram(program);

    // Check the link status
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        // something went wrong with the link
        var lastError = gl.getProgramInfoLog(program);
        errFn("Error in program linking:" + lastError);

        gl.deleteProgram(program);
        return null;
    }

    return program;
  }

  createProgramFromScripts(gl, shadersSources, opt_attribs, opt_locations, opt_errorCallback) {
     var shaders = [this.vsShader, this.fsShader];
    //  for (var ii = 0; ii < shaderScriptIds.length; ++ii) {
      //  shaders.push(vsShader);
    //  }
     this.shaderProgram = this.createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback);
   }

  _createShaderProgram(mShaderStr, isVertexShader) {

		const shaderType = isVertexShader ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER;
		const shader = gl.createShader(shaderType);

		gl.shaderSource(shader, mShaderStr);
		gl.compileShader(shader);

		if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.warn('Error in Shader : ', gl.getShaderInfoLog(shader));
			return null;
		}

		return shader;
	}


	_createShaderProgram(mShaderStr, isVertexShader) {

	const shaderType = isVertexShader ? GL.gl.VERTEX_SHADER : GL.gl.FRAGMENT_SHADER;
	const shader = gl.createShader(shaderType);

	gl.shaderSource(shader, mShaderStr);
	gl.compileShader(shader);

	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.warn('Error in Shader : ', gl.getShaderInfoLog(shader));
		// console.log(addLineNumbers(mShaderStr));
		return null;
	}

	return shader;
}

_attachShaderProgram(mVertexShader, mFragmentShader) {

	this.shaderProgram = gl.createProgram();

	this.shaderProgram.id = Math.random() * 10;
	gl.attachShader(this.shaderProgram, mVertexShader);
	gl.attachShader(this.shaderProgram, mFragmentShader);
	gl.linkProgram(this.shaderProgram);

}

}

export default GLShader;
