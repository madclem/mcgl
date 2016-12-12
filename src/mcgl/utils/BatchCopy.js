// BatchCopy.js
import mcgl from '../../Mcgl';
// import Geom from '../Geom';
import GLShader from '../GLShader';
import Batch from './Batch';

import vs from '../shaders/bigTriangle.vert';
import fs from '../shaders/copy.frag';
// const fs = require('../shaders/copy.frag');

class BatchCopy extends Batch {

	constructor() {
    const shader = new GLShader(vs, fs);
		const mesh = new mcgl.geom.BigTriangle(shader.shaderProgram);
    super(mesh, shader);

		shader.bind();
		shader.uniform('texture', 'uniform1i', 0);
	}


	draw(texture) {
		this.shader.bind();
		// texture.bind(0);
    // gl.activeTexture(gl.TEXTURE0);
		texture.bind();
		super.draw();
	}

}

export default BatchCopy;
