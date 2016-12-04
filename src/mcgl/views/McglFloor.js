import Mcgl from "mcgl";
import GLShader from '../GLShader';
// import GL from './helpers/GLHelpers';
// import PlaneSquare from '../helpers/gl_helpers/geometry/PlaneSquare';
import vs from '../shaders/plane.vert'
import fs from '../shaders/plane.frag'

class McglFloor {

  constructor(){
    this.shader = new GLShader(vs, fs);
    this.shader.bind();
    this.plane = new Mcgl.geom.PlaneSquare(this.shader.shaderProgram, 3000, 3000, 20, "xz", undefined, GL.gl.LINES);
    this.plane.position = [0, 0, 0]

    this.shader.uniform("alpha", "float", .2);
  }

  render(){
    this.shader.bind(); // just to use propgram
    // this.plane.render();

    GL.draw(this.plane);
  }
}

export default McglFloor;
