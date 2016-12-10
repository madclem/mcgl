// import GL from '../../GLHelpers';
import mcgl, {GL} from 'mcgl';

let gl;

class Mesh {
  constructor(program, drawingType = 4){


    this.program = program;

    // console.log("----@)", GL, mcgl);
    gl = mcgl.GL.gl;

    this.position = [0,0,0];
    this.rotation = [0,0,0];

    this.drawType             = drawingType;
    this._attributes          = [];
		this._instancedAttributes = [];
		this._vertexSize          = 0;

		this._vertices            = [];
		this._texCoords           = [];
		this._normals             = [];
		this._faceNormals         = [];
		this._tangents            = [];
		this._indices             = [];
		this._faces               = [];
  }


  bufferVertex(mArrayVertices, isDynamic = false, posAttribName = "a_position", mIsFlatten = false) {
		this._vertexSize = mArrayVertices.length;
		this.bufferData(mArrayVertices, posAttribName, 3, isDynamic, mIsFlatten);
		this._vertices = mArrayVertices;
	}


	bufferTexCoord(mArrayTexCoords, isDynamic = false) {

		this.bufferData(mArrayTexCoords, 'a_textureCoord', 2, isDynamic);
		this._texCoords = mArrayTexCoords;

	}


	bufferNormal(mNormals, isDynamic = false) {

		this.bufferData(mNormals, 'a_normal', 3, isDynamic);
		this._normals = mNormals;

	}


	bufferIndex(mArrayIndices, isDynamic = false) {

		const drawType        = isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
		if (!this.iBuffer) {
			this.iBuffer      = gl.createBuffer();
		}

    if(Array.isArray(mArrayIndices[0])){
      let ind = [];
      let index = 0;
      for (var i = 0; i < mArrayIndices.length; i++) {
        for (var k = 0; k < mArrayIndices[i].length; k++) {
          ind[index++] = mArrayIndices[i][k];
        }
      }

      mArrayIndices = ind;
    }
    
    this._indices         = mArrayIndices;

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mArrayIndices), drawType);
		this.iBuffer.itemSize = 1;
		this.iBuffer.numItems = mArrayIndices.length;
	}

  bufferData(mData, mName, mItemSize, isDynamic = false, mIsFlatten = false) {
		let index = -1;
		let i = 0;
		const drawType   = isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
		let bufferData = [];
		let buffer;
		let dataArray;
		if (!mItemSize) {	mItemSize = mData[0].length; }

		//	Check for existing attributes
		for(i = 0; i < this._attributes.length; i++) {
			if(this._attributes[i].name === mName) {
				this._attributes[i].data = mData;
				index = i;
				break;
			}
		}

    //	flatten buffer data
		if(mIsFlatten) {
			bufferData = mData;
		} else {
			for(i = 0; i < mData.length; i++) {
				for(let j = 0; j < mData[i].length; j++) {
					bufferData.push(mData[i][j]);
				}
			}
		}


		if(index === -1) {

			//	attribute not exist yet, create new buffer
    	buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

			dataArray = new Float32Array(bufferData);
			gl.bufferData(gl.ARRAY_BUFFER, dataArray, drawType);
			this._attributes.push({ name:mName, data:mData, itemSize: mItemSize, buffer:buffer, dataArray:dataArray });

			// if(this.vao) {
			// 	gl.enableVertexAttribArray(attrPosition);
			// 	const attrPosition = getAttribLoc(gl, this.shader.shaderProgram, mName);
			// 	gl.vertexAttribPointer(attrPosition, mItemSize, gl.FLOAT, false, 0, 0);
			// }

		} else {
			//	attribute existed, replace with new data
			buffer = this._attributes[index].buffer;
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			dataArray = new Float32Array(bufferData);
			gl.bufferData(gl.ARRAY_BUFFER, dataArray, drawType);

			const attribute = this._attributes.find((a) => a.name === mName);
			attribute.data = mData;
			attribute.itemSize = mItemSize;
			attribute.dataArray = dataArray;
		}
	}
}

export default Mesh;
