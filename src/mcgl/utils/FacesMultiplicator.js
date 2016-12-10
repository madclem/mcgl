
class FacesMultiplicator {
  constructor(){
    this.indexUniq = 0;
    this.middlePointIndexCache = {};
    this.vertices = [];
    this.isNormalised = true;
  }


  multiplyTriangles(n, indices, vertices){
    this.indexUniq = vertices.length;
    this.vertices = vertices;
    let faces = indices.slice();

    this.isNormalised = true;
    for (var i = 0; i < this.vertices.length; i++) {
      if(!this.isNormalised) break;

      for (var k = 0; k < this.vertices[i].length; k++) {
        if(Math.abs(this.vertices[i][k]) > 1){
          this.isNormalised = false;
        }
      }
    }
    for (var i = 0; i < n; i++) {
      let faces2 = [];
      for (var k = 0; k < faces.length; k++) {
        let tri = faces[k];

        let a = this.getMiddlePoint(tri[0], tri[1]);
        let b = this.getMiddlePoint(tri[1], tri[2]);
        let c = this.getMiddlePoint(tri[2], tri[0]);

        faces2.push([tri[0], a, c]);
        faces2.push([tri[1], b, a]);
        faces2.push([tri[2], b, c]);
        faces2.push([a, b, c]);
      }

      faces = faces2.slice();
    }

    return faces;
  }

  addVertex(position) {
    let length = this.isNormalised ? Math.sqrt(position[0] * position[0] + position[1] * position[1] + position[2] * position[2]) : 1;
    this.vertices.push([position[0]/length, position[1]/length, position[2]/length]);

    return this.indexUniq++;
  }

  getMiddlePoint(p1, p2) {
    let firstPointIsSmaller = p1 < p2;
    let smallerIndex = firstPointIsSmaller ? p1 : p2;
    let greaterIndex = firstPointIsSmaller ? p2 : p1;
    let key = (smallerIndex << 32) + greaterIndex;

    let point1 = this.vertices[p1];
    let point2 = this.vertices[p2];
    let middle = [
      (point1[0] + point2[0]) / 2.0,
      (point1[1] + point2[1]) / 2.0,
      (point1[2] + point2[2]) / 2.0];

    let i = this.addVertex(middle);
    this.middlePointIndexCache[key] = i;

    return i;
  }
}

export default new FacesMultiplicator();
