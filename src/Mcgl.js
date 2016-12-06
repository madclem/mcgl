import GLTool from "./mcgl/GLTool";
import GLShader from "./mcgl/GLShader";
import Texture from "./mcgl/Texture";
import Camera from "./mcgl/cameras/Camera";
import OrbitalControl from "./mcgl/OrbitalControl";
import Geom from "./mcgl/geometry/index-geom";

class Mcgl {
  constructor(){
    this.GL = GLTool;
    this.GLTool = GLTool;
    this.GLShader = GLShader;
    this.camera = new Camera();
    this.orbitalControl = new OrbitalControl();
    this.geom = Geom;
    this.Texture = Texture;
  }
}

export default new Mcgl();
