import Matrices from '../utils/Matrices'
import glmatrix from 'gl-matrix';

class Camera {
  constructor(){
    // camera
    this.aspectRatio = glmatrix.mat4.create();
    this.matrix = glmatrix.mat4.create();
    this.inverseViewMatrix = glmatrix.mat4.create();
    this.projection = glmatrix.mat4.create();
    this.orientation = glmatrix.mat4.create();

    this.mRX = glmatrix.mat4.create();
    this.mRY = glmatrix.mat4.create();
    this.mRZ = glmatrix.mat4.create();
    this.mT = glmatrix.mat4.create();

    this.position = glmatrix.vec3.create();
  }

  lookAt(target, up = [0, 1, 0]) {
		// this.position = glmatrix.vec3.clone(position);
		// this._center = glmatrix.vec3.clone(target);

    // glmatrix.mat4.identity(this.matrix);
		glmatrix.mat4.lookAt(this.matrix, this.position, target, up);
    // console.log(this.matrix);
	}

  rotateY(angle) {
    glmatrix.mat4.identity(this.mRY);
    glmatrix.mat4.fromYRotation(this.mRY, angle);

    // glmatrix.mat4.translate(this.matrix, this.matrix, this.position);
    // glmatrix.mat4.rotateY(this.matrix, this.matrix, angle)
  }
  rotateX(angle) {
    glmatrix.mat4.identity(this.mRX);
    glmatrix.mat4.fromXRotation(this.mRX, angle);

    // glmatrix.mat4.translate(this.matrix, this.matrix, this.position);
    // glmatrix.mat4.rotateX(this.matrix, this.matrix, angle)
  }

  rotateZ(angle) {
    glmatrix.mat4.identity(this.mRZ);
    glmatrix.mat4.fromXRotation(this.mRZ, angle);

  }

  setRotation(x, y, z) {
  }

  setPosition(x, y, z) {
    this.position = [x, y, z]
    // glmatrix.mat4.identity(this.matrix);
    // glmatrix.mat4.translate(this.matrix, this.matrix, [x, y, z]);
    glmatrix.mat4.identity(this.mT, this.mT);
    glmatrix.mat4.translate(this.mT, this.mT, [x, y, z]);
    // var translation = vec3.create();
    // vec3.set (translation, 0, 0, -1.0);
    // mat4.translate (mvMatrix, mvMatrix, translation);

    // glmatrix.mat4.fromRotationTranslation(this._matrix, 0, translation)
		// glmatrix.mat4.translate(this._matrix, this._matrix, translation);
	}

  setAspectRatio(aspectRatio) {
		this.aspectRatio = aspectRatio;
		this.perspective(this.fov, aspectRatio, this.near, this.far);
	}

  // perspective(fov, aspect, near, far, dst) {
  //   this.fov = fov;
  //   this.near = near;
  //   this.far = far;
  //
  //   dst = dst || new Float32Array(16);
  //   var f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
  //   var rangeInv = 1.0 / (near - far);
  //
  //   dst[ 0] = f / aspect;
  //   dst[ 1] = 0;
  //   dst[ 2] = 0;
  //   dst[ 3] = 0;
  //   dst[ 4] = 0;
  //   dst[ 5] = f;
  //   dst[ 6] = 0;
  //   dst[ 7] = 0;
  //   dst[ 8] = 0;
  //   dst[ 9] = 0;
  //   dst[10] = (near + far) * rangeInv;
  //   dst[11] = -1;
  //   dst[12] = 0;
  //   dst[13] = 0;
  //   dst[14] = near * far * rangeInv * 2;
  //   dst[15] = 0;
  //
  //   // this.projection = Matrices.multiply(dst, Matrices.inverse(this.matrix)) ;
  //
  //   this.projection = dst;
  //
  //   return Matrices.multiply(dst, Matrices.inverse(this.matrix));
  // }

  perspective(fov, aspect, near, far) {

    glmatrix.mat4.identity(this.matrix);

		glmatrix.mat4.perspective(this.projection, fov, aspect, near, far);

    this.fov = fov;
    this.near = near;
    this.far = far;
    this.aspect = aspect;
  }

  orthographic(left, right, bottom, top, near, far, dst) {
    dst = dst || new Float32Array(16);

    dst[ 0] = 2 / (right - left);
    dst[ 1] = 0;
    dst[ 2] = 0;
    dst[ 3] = 0;
    dst[ 4] = 0;
    dst[ 5] = 2 / (top - bottom);
    dst[ 6] = 0;
    dst[ 7] = 0;
    dst[ 8] = 0;
    dst[ 9] = 0;
    dst[10] = 2 / (near - far);
    dst[11] = 0;
    dst[12] = (left + right) / (left - right);
    dst[13] = (bottom + top) / (bottom - top);
    dst[14] = (near + far) / (near - far);
    dst[15] = 1;

    return dst;
  }
}

// const  gh = new Camera();

// export default gh;
export default Camera;
