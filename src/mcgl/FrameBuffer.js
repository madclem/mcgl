import mcgl, {GL} from 'mcgl';

let gl;

class FrameBuffer {
  constructor(w, h){

    gl = mcgl.GL.gl;

    this.frameBuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);

    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    if (this.isPowerOf2(w) && this.isPowerOf2(h)) {
      gl.generateMipmap(gl.TEXTURE_2D);
    }
    else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    }

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);


    this.renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, w, h);

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderbuffer);


    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  isPowerOf2(value) {
    return (value & (value - 1)) == 0;
  }

  bind(w, h, toCanvas){
    this.w = w;
    this.h = h;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
    gl.viewport(0, 0, this.w, this.h);
  }

  unbind(){
    gl.bindFramebuffer(gl.FRAMEBUFFER, null); // when set to null, draw to the canvas
    gl.viewport(0, 0, this.w, this.h);
  }

  clear(){
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
    mcgl.GL.gl.clear(0,0,0,0);
  }
}

export default FrameBuffer;
