import Matrices from '../utils/Matrices'

class Camera {
  constructor(){
    // camera
    this.aspectRatio = Matrices.identity();
    this.matrix = Matrices.identity();
    this.projection = Matrices.identity();
    this.position = [0,0,0];
  }

  lookAt(target, up, dst) {
    dst = dst || new Float32Array(16);
    var zAxis = Matrices.normalize(
        Matrices.subtractVectors(this.position, target));
    var xAxis = Matrices.normalize(Matrices.cross(up, zAxis));
    var yAxis = Matrices.normalize(Matrices.cross(zAxis, xAxis));

    dst[ 0] = xAxis[0];
    dst[ 1] = xAxis[1];
    dst[ 2] = xAxis[2];
    dst[ 3] = 0;
    dst[ 4] = yAxis[0];
    dst[ 5] = yAxis[1];
    dst[ 6] = yAxis[2];
    dst[ 7] = 0;
    dst[ 8] = zAxis[0];
    dst[ 9] = zAxis[1];
    dst[10] = zAxis[2];
    dst[11] = 0;
    dst[12] = this.position[0];
    dst[13] = this.position[1];
    dst[14] = this.position[2];
    dst[15] = 1;

    this.matrix = dst;


    return dst;
  }

  setAspectRatio(aspectRatio) {
		this.aspectRatio = aspectRatio;
		this.perspective(this.fov, aspectRatio, this.near, this.far);
	}

  perspective(fov, aspect, near, far, dst) {
    this.fov = fov;
    this.near = near;
    this.far = far;

    dst = dst || new Float32Array(16);
    var f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
    var rangeInv = 1.0 / (near - far);

    dst[ 0] = f / aspect;
    dst[ 1] = 0;
    dst[ 2] = 0;
    dst[ 3] = 0;
    dst[ 4] = 0;
    dst[ 5] = f;
    dst[ 6] = 0;
    dst[ 7] = 0;
    dst[ 8] = 0;
    dst[ 9] = 0;
    dst[10] = (near + far) * rangeInv;
    dst[11] = -1;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = near * far * rangeInv * 2;
    dst[15] = 0;

    // this.projection = Matrices.multiply(dst, Matrices.inverse(this.matrix)) ;

    this.projection = dst;

    return Matrices.multiply(dst, Matrices.inverse(this.matrix));
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
