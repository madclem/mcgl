import Camera from './Camera'
import glmatrix from 'gl-matrix';

class CameraPOV extends Camera{
  constructor(){
    super();
  }

  perspective(fov, aspect, near, far) {

    glmatrix.mat4.identity(this.matrix);
    glmatrix.mat4.multiply(this.matrix, this.matrix, this.mRX);
    glmatrix.mat4.multiply(this.matrix, this.matrix, this.mRY);
    glmatrix.mat4.multiply(this.matrix, this.matrix, this.mRZ);
    glmatrix.mat4.multiply(this.matrix, this.matrix, this.mT);

    glmatrix.mat4.perspective(this.projection, fov, aspect, near, far);

    this.fov = fov;
    this.near = near;
    this.far = far;
    this.aspect = aspect;
  }
}

export default CameraPOV;
