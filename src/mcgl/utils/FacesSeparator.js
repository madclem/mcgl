class FacesSeparator {
  constructor(){
  }

  separate(faces, vertices){
    let triangles = [];
    let ind = [];

    for (var i = 0; i < faces.length; i++) {
     triangles.push(faces[i][0], faces[i][1], faces[i][2]);
     ind.push(faces[i][0], faces[i][1], faces[i][2]);
    }

    let oldVerts = vertices.slice();
    let newVertices = [];
    for (let i = 0; i < triangles.length; i++) {
      newVertices[i] = oldVerts[triangles[i]].slice();
      triangles[i] = i;
    }

    return {faces: triangles, vertices: newVertices}
  }
}

export default new FacesSeparator();
