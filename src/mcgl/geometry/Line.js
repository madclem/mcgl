import mcgl, {GL} from 'mcgl';
import Mesh from './Mesh';

let gl, pivotX, pivotY, axis;

class Line extends Mesh {
  constructor(program, vertices, attribPositionName = "a_position", drawMode = "GL.gl.TRIANGLES"){

    gl = GL.gl;
      super(program, GL.gl.TRIANGLES)
    this.attribPositionName = attribPositionName;
    this.indices = [];
    this.counters = [];
    let vert = [
      [0, 0, 0],
      [100, 250, 0],
      [50, 200 ,0],
      [0, 200 ,0],
      [-100, 220 ,0],
      [-70, 300 ,0]
    ];


    this.vertices = vertices || vert;


    this.line();

  }

  line(){
    var positions = [];
    var indices = [];

    var index = 0;

    var offset = 0;
    let v = this.vertices.slice();
    this.positions = [];

    for (var i = 0; i < v.length; i++) {


    			this.positions.push( v[i][0], v[i][1], v[i][2]);
    			this.positions.push( v[i][0], v[i][1], v[i][2]);

          var c = i/v.length;
			    this.counters.push([c]);
			    this.counters.push([c]);

    }

    this.process();
  }

  compareV3 = function( a, b ) {
  	var aa = a * 6;
  	var ab = b * 6;
    // console.log(this.positions[ aa ] === this.positions[ ab ] ) && ( this.positions[ aa + 1 ] === this.positions[ ab + 1 ] ) && ( this.positions[ aa + 2 ] === this.positions[ ab + 2 ] );
  	return ( this.positions[ aa ] === this.positions[ ab ] ) && ( this.positions[ aa + 1 ] === this.positions[ ab + 1 ] ) && ( this.positions[ aa + 2 ] === this.positions[ ab + 2 ] );
  }

  copyV3 = function( a ) {
	  var aa = a * 6;
    // console.log(this.positions[ aa ], this.positions[ aa + 1 ], this.positions[ aa + 2 ]);
    return [ this.positions[ aa ], this.positions[ aa + 1 ], this.positions[ aa + 2 ] ];
  }

  process(avoid){

    var l = this.positions.length / 6;

  	this.previous = [];
  	this.next = [];
  	// this.width = [];
  	// this.side = [];
  	this.uvs = [];


    // for( var j = 0; j < l; j++ ) {
  	// 	this.side.push( [1] );
  	// 	this.side.push( [-1] );
  	// }

    // var w;
  	// for( var j = 0; j < l; j++ ) {
  	// 	w = 1.0;
  	// 	this.width.push( [w] );
  	// 	this.width.push( [w] );
  	// }

    for( var j = 0; j < l; j++ ) {
  		this.uvs.push([ j / ( l - 1 ), 0 ]);
  		this.uvs.push([ j / ( l - 1 ), 1 ]);
  	}

	  var v;

  	if( this.compareV3( 0, l - 1 ) ){
  		v = this.copyV3( l - 2 );
  	} else {
  		v = this.copyV3( 0 );
  	}

    this.previous.push( v[ 0 ], v[ 1 ], v[ 2 ] );
	  this.previous.push( v[ 0 ], v[ 1 ], v[ 2 ] );

    for( var j = 0; j < l - 1; j++ ) {
  		v = this.copyV3( j );
  		this.previous.push( v[ 0 ], v[ 1 ], v[ 2 ] );
  		this.previous.push( v[ 0 ], v[ 1 ], v[ 2 ] );
  	}

  	for( var j = 1; j < l; j++ ) {
  		v = this.copyV3( j );
  		this.next.push( v[ 0 ], v[ 1 ], v[ 2 ] );
  		this.next.push( v[ 0 ], v[ 1 ], v[ 2 ] );
  	}

  	if( this.compareV3( l - 1, 0 ) ){
  		v = this.copyV3( 1 );
  	} else {
  		v = this.copyV3( l - 1 );
  	}

    this.next.push( this.positions[ this.positions.length-3 ], this.positions[ this.positions.length-2 ], this.positions[ this.positions.length-1 ] );
    this.next.push( this.positions[ this.positions.length-3 ], this.positions[ this.positions.length-2 ], this.positions[ this.positions.length-1 ] );

    // this.next.push( v[ 0 ], v[ 1 ], v[ 2 ] );
	  // this.next.push( v[ 0 ], v[ 1 ], v[ 2 ] );


    for( var j = 0; j < l - 1; j++ ) {
  		var n = j * 2;

      // console.log(n, n+1, n+2, n + 2, n + 1, n + 3);
  		this.indices.push( n, n + 1, n + 2 );
  		this.indices.push( n + 2, n + 1, n + 3 );
  	}

  	// this.next.push([ v[ 0 ], v[ 1 ], v[ 2 ] ]);
  	// this.next.push([ v[ 0 ], v[ 1 ], v[ 2 ] ]);



    var pos = [];
    var offsets = [];
    var directions = [];
    for (var i = 0; i < this.positions.length; i+=3) {
      var p = this.positions;
      pos.push([p[i], p[i+1], p[i+2]]);

      if(i % 2 === 0){
        directions.push([1])
        offsets.push([0,0,0]);
      }
      else {
        directions.push([-1])
        offsets.push([Math.random()*50,Math.random()*50,Math.random()*50]);
      }
    }
    // console.log(pos);
    this.bufferVertex(pos, true, this.attribPositionName);
    this.bufferData(directions, 'direction', 1, false);

    this.bufferData(this.uvs, 'a_uv', 2, false);
    // this.bufferVertex(offsets, false, "a_offsets");

    // console.log(this.width);

    // console.log(this.previous[20]);
    // console.log(this.next[20]);
    // console.log(this.positions[20]);

    var nextPos = [];
    for (var i = 0; i < this.next.length; i+=3) {
      var p = this.next;
      nextPos.push([p[i], p[i+1], p[i+2]]);
    }

    this.bufferData(nextPos, 'a_next', 3, true);

    var prevPos = [];
    for (var i = 0; i < this.previous.length; i+=3) {
      var p = this.previous;
      prevPos.push([p[i], p[i+1], p[i+2]]);
    }

    this.bufferData(prevPos, 'a_previous', 3, true);


    this.bufferIndex(this.indices, false);
    // this.bufferData(this.side, 'a_side', 1, true);
    // this.bufferData(this.width, 'a_width', 1, true);
    this.bufferData(this.counters, 'a_counters', 1, true);

  }

  // bufferIndex(mArrayIndices, isDynamic = false) {
  //
	// 	const drawType        = isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
	// 	this._indices         = mArrayIndices;
	// 	if (!this.iBuffer) {
	// 		this.iBuffer      = gl.createBuffer();
	// 	}
	// 	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);
	// 	// gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(9 * 6), drawType);
	// 	this.iBuffer.itemSize = 1;
	// 	this.iBuffer.numItems = mArrayIndices.length;
  //
  //
	// 	// if (this._vertices.length > 0 && this.drawType === GL.TRIANGLES) {
	// 	// 	this._generateFaces();
	// 	// }
	// }

  render(points){
    // this.vertices[0] += 1;
    // console.log(points);
    // this.vertices = points;
    // this.vertices = [
    //   [0, 0, 0],
    //   [100, 250, 0],
    //   [50, 200 ,0],
    //   [0, 200 ,0],
    //   [-100, 220 ,0],
    //   [-70, 300 ,0]
    // ];

    this.vertices = points;
    // GL._bindBuffers(this);
    this.line();
    // console.log("here");
  }
}

export default Line;
