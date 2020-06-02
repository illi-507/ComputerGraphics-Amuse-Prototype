
/*
 a second example object for graphics town
 check out "simplest" first

 the cube is more complicated since it is designed to allow making many cubes

 we make a constructor function that will make instances of cubes - each one gets
 added to the grobjects list

 we need to be a little bit careful to distinguish between different kinds of initialization
 1) there are the things that can be initialized when the function is first defined
    (load time)
 2) there are things that are defined to be shared by all cubes - these need to be defined
    by the first init (assuming that we require opengl to be ready)
 3) there are things that are to be defined for each cube instance
 */
var grobjects = grobjects || [];

// allow the two constructors to be "leaked" out
var newTube2 = undefined;
var SpinningCube = undefined;

// this is a function that runs at loading time (note the parenthesis at the end)
(function() {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;

    // constructor for Cubes
    newTube2 = function newTube1(name, position, size, color,type) {
        this.name = name;
        this.position = position || [0,0,3];
        this.size = size || 1.0;
        this.color = color || [.7,.8,.9];
		this.type = type||0;
    }
/*	Cube.prototype.colors = function () {
  var values = [];
  for (var i = 0; i < 24; i++) {
    var color = this.color.slice();
    if (i % 3 !== 0) {
      var j = i + 2;
      color[0] = color[0] * Math.min(1.0, j / 24);
      color[1] = color[1] * Math.min(1.0, j / 24);
      color[2] = color[2] * Math.min(1.0, j / 24);
    }
    values = values.concat(color);
  }
  return new Float32Array(values);
};*/

    newTube2.prototype.init = function(drawingState) {
        var gl=drawingState.gl;
        // create the shaders once - for all cubes
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["cube-vs", "cube-fs"]);
        }
        if (!buffers) {
				if(this.type == 0){
            var arrays = {			
                vpos : { numComponents: 3, data: [
	                 -0.2,  0.0,-0.5,
                      -0.2,3,0,
                      0.2,3,0.0,					  
					  
					  -0.2,  0.0,-0.5,
                      0.2,0.0,-0.5,
                      0.2,3,0.0,	
					  
                   /*   0.5,0.0,-0.5,  
					  -0.5,0.0,0.0, 
					  0.5,0.86,-0.5,*/	
						 
						 
                ] },
                vnormal : {numComponents:3, data: [
                    0,0,-1, 0,0,-1, 0,0,-1,     0,0,-1, 0,0,-1, 0,0,-1,
                    0,0,1, 0,0,1, 0,0,1,        0,0,1, 0,0,1, 0,0,1,
                    0,-1,0, 0,-1,0, 0,-1,0,     0,-1,0, 0,-1,0, 0,-1,0,
                    0,1,0, 0,1,0, 0,1,0,        0,1,0, 0,1,0, 0,1,0,
                    -1,0,0, -1,0,0, -1,0,0,     -1,0,0, -1,0,0, -1,0,0,
                    1,0,0, 1,0,0, 1,0,0,        1,0,0, 1,0,0, 1,0,0,
                ]}
				}
				}
				else if(this.type ==1){
					 var arrays = {
					      vpos : { numComponents: 3, data: [
                         -0.5,0.86,0.0,
						 -0.5,0.0,0.2,
						 0.5,0.86,0.0,
						 
						 0.5,0.86,0.0,
						 -0.5,0.0,0.2,
						 0.5,0.86,0.2,
						 
						 /*
						 
						 -0.5,0.86,0.0,
						 -0.5,0.86,0.0,
						 -0.5,0.86,0.0,*/
						 
                ] },
                vnormal : {numComponents:3, data: [
                    0,0,-1, 0,0,-1, 0,0,-1,     0,0,-1, 0,0,-1, 0,0,-1,
                    0,0,1, 0,0,1, 0,0,1,        0,0,1, 0,0,1, 0,0,1,
                    0,-1,0, 0,-1,0, 0,-1,0,     0,-1,0, 0,-1,0, 0,-1,0,
                    0,1,0, 0,1,0, 0,1,0,        0,1,0, 0,1,0, 0,1,0,
                    -1,0,0, -1,0,0, -1,0,0,     -1,0,0, -1,0,0, -1,0,0,
                    1,0,0, 1,0,0, 1,0,0,        1,0,0, 1,0,0, 1,0,0,
                ]}
					 }
				
				
            };
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
        }

    };
    newTube2.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size,this.size,this.size]);
        twgl.m4.setTranslation(modelM,this.position,modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelM });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
		
    };
    newTube2.prototype.center = function(drawingState) {
        return this.position;
    }

})();

//grobjects.push(new Cube("cube2",[ 2,0.5,   0],1, [1,1,0]));

/*grobjects.push(new Cube("cube2",[ 2,0.5,   0],1, [1,1,0]));

grobjects.push(new SpinningCube("scube 1",[-2,0.5, -2],1) );*/
