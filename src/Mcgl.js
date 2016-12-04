import GLTool from "./mcgl/GLTool";
import Camera from "./mcgl/cameras/Camera";
import Geom from "./mcgl/geometry/index-geom";

class Mcgl {
  this.GL = GLTool;
  this.GLTool = GLTool;
  this.camera = new Camera();
  this.geom = Geom;
}

export default new Mcgl();
