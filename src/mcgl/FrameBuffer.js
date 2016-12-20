import mcgl from 'mcgl';

let gl, GL;

class FrameBuffer {
  constructor(w, h){

    gl = mcgl.GL.gl;
    GL = mcgl.GL;

    this.textures = [];

    this.texture = gl.createTexture();
    this.gltexture = new mcgl.Texture(this.texture, true);

    this.textures.push(this.gltexture)


    if (this.isPowerOf2(w) && this.isPowerOf2(h)) {
      // gl.generateMipmap(gl.TEXTURE_2D);
    }

    this.frameBuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);

    var floatTextures = GL.getExtension('OES_texture_float');
    if (!GL.getExtension("OES_texture_float")){
      throw new Error( "float textures not supported" );
    }

    // var halfFloat = GL.getExtension("OES_texture_half_float");
    let type = gl.UNSIGNED_BYTE;
    const extHalfFloat = GL.getExtension('OES_texture_half_float');
    GL.getExtension("OES_texture_float_linear");

    if (mcgl.GL.checkExtension('OES_texture_float')) {
			type = gl.FLOAT;
		}
    else if(extHalfFloat) {
			type = extHalfFloat.HALF_FLOAT_OES;
		}


		if (mcgl.GL.isMobile && type === gl.FLOAT && extHalfFloat) {
			type = extHalfFloat.HALF_FLOAT_OES;
		}
    // alert(type);
    // alert(gl.UNSIGNED_BYTE);


    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, type, null);

    // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, type, null);
    // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.FLOAT, new Float32Array(w * h));
    // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.FLOAT, null);


    this.renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, w, h);

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
    // gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderbuffer);

    //	CHECKING FBO

    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  isPowerOf2(value) {
    return (value & (value - 1)) == 0;
  }

  bind(w, h){
    this.w = w || this.w;
    this.h = h || this.h;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
    gl.viewport(0, 0, this.w, this.h);
  }

  unbind(){
    gl.bindFramebuffer(gl.FRAMEBUFFER, null); // when set to null, draw to the canvas
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }

  clear(){
    this.bind();
		gl.clear(0,0,0,0);
		// this.unbind();
  }
}

export default FrameBuffer;
