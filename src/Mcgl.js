import GLTool from "./mcgl/GLTool";
import GLShader from "./mcgl/GLShader";
import Texture from "./mcgl/Texture";
import Camera from "./mcgl/cameras/index-camera.js";
import OrbitalControl from "./mcgl/OrbitalControl";
import CameraControl from "./mcgl/CameraControl";
import Geom from "./mcgl/geometry/index-geom";
import Controller from "./mcgl/utils/Controller";
import Easings from "./mcgl/utils/Easings";
import FBO from "./mcgl/FrameBuffer";
import Mesh from "./mcgl/geometry/Mesh";
import BatchCopy from "./mcgl/utils/BatchCopy";

class Mcgl {
  constructor(){
    this.GL = GLTool;
    this.GLTool = GLTool;
    this.GLShader = GLShader;
    this.camera = Camera;
    this.orbitalControl = new OrbitalControl();
    this.CameraControl = CameraControl;
    this.geom = Geom;
    this.Mesh = Mesh;
    this.Texture = Texture;
    this.Controller = Controller;
    this.Easings = Easings;
    this.FBO = FBO;
    this.BatchCopy = BatchCopy;
  }
}

export default new Mcgl();
