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
var Boat = undefined;
var SpinningCube = undefined;
  var time = new Date().getTime();
// this is a function that runs at loading time (note the parenthesis at the end)
(function() {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;

    // constructor for Cubes
    Boat = function Boat(name, position, size, color,rotation) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || 1.0;
        this.color = color || [1.7,.3,.3];
		this.rotation = rotation;
	    /*if (rotation === undefined)
    this.rotation = 0.0;*/
    }

	Boat.prototype.axisRotation = function() {
  //var axis = [];
 // if(this.type == 1){
  return twgl.m4.axisRotation([0, 0, 1], this.rotation);
	//}
	}
    Boat.prototype.init = function(drawingState) {
		var height = -6;		
		var scale = 5.0;
		var height2 = -0.8;
		
		var bonusHeight = -5.0;
		//+bonusHeight
		//var width = ;
        var gl=drawingState.gl;
        // create the shaders once - for all cubes
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["cube-vs", "cube-fs"]);
        }
        if (!buffers) {
            var arrays = {
                vpos : { numComponents: 3, data: [
                      
					  
					-.5,-.5,-.5,  .5,-.5,-.5,  .5, height,-.5,        -.5,-.5,-.5,  .5, height,-.5, -.5, height,-.5,    // z = 0
                    -.5,-.5, .5,  .5,-.5, .5,  .5, height, .5,        -.5,-.5, .5,  .5, height, .5, -.5, height, .5,    // z = 1
                    -.5,height,-.5,  .5,height,-.5,  .5,height, .5,     
					-.5,height,-.5,.5,height, .5, -.5,height, .5,    // y = 0
                    -.5, -.5,-.5,  .5, -.5,-.5,  .5, -.5, .5,        -.5, -.5,-.5,  .5, -.5, .5, -.5, -.5, .5,    // y = 1
                    -.5,-.5,-.5, -.5, height,-.5, -.5, height, .5,       
					-.5,-.5,-.5, -.5, height, .5, -.5,-.5, .5,    // x = 0
                     .5,-.5,-.5,  .5,height,-.5,  .5, height, .5,       
					 .5,-.5,-.5,  .5, height, .5,  .5,-.5, .5,     // x = 1
					 
					 
					  
					  /*-------------------------船身------------------------------------*/
					  -1.5*scale,-0.5+bonusHeight,-0.5,
                      -1*scale,(height2)*scale+bonusHeight,-0.5,
                      1*scale,(height2)*scale+bonusHeight,-0.5,
					  
                      1.5*scale,-0.5+bonusHeight,-0.5,  
					  -1.5*scale,-0.5+bonusHeight,-0.5, 
					  1*scale,(height2)*scale+bonusHeight,-0.5,	
					  
					  -1.5*scale,-0.5+bonusHeight,0.5,
                      -1*scale,(height2)*scale+bonusHeight,0.5,
                      1*scale,(height2)*scale+bonusHeight,0.5,
					  
                      1.5*scale,-0.5+bonusHeight,0.5,  
					  -1.5*scale,-0.5+bonusHeight,0.5, 
					  1*scale,(height2)*scale+bonusHeight,0.5,						  
					  				
						/*-------------------------船侧面------------------------------------*/									
						-1*scale,(height2)*scale+bonusHeight,-0.5,
                      1*scale,(height2)*scale+bonusHeight,-0.5,	
						1*scale,(height2)*scale+bonusHeight,0.5,

						-1*scale,(height2)*scale+bonusHeight,0.5,
                         1*scale,(height2)*scale+bonusHeight,0.5,						
                       -1*scale,(height2)*scale+bonusHeight,-0.5,
					   
					    -1.5*scale,-0.5+bonusHeight,-0.5,
						-1*scale,(height2)*scale+bonusHeight,0.5,
					    -1*scale,(height2)*scale+bonusHeight,-0.5,
						
						-1.5*scale,-0.5+bonusHeight,0.5,
						-1.5*scale,-0.5+bonusHeight,-0.5,
						-1*scale,(height2)*scale+bonusHeight,0.5,
						
						-1.5*scale,-0.5+bonusHeight,-0.5,
						-1*scale,(height2)*scale+bonusHeight,0.5,
					    -1*scale,(height2)*scale+bonusHeight,-0.5,
						
						-1.5*scale,-0.5+bonusHeight,0.5,
						-1.5*scale,-0.5+bonusHeight,-0.5,
						-1*scale,(height2)*scale+bonusHeight,0.5,
						
						1.5*scale,-0.5+bonusHeight,-0.5,
						1*scale,(height2)*scale+bonusHeight,0.5,
					    1*scale,(height2)*scale+bonusHeight,-0.5,
						
						1.5*scale,-0.5+bonusHeight,0.5,
						1.5*scale,-0.5+bonusHeight,-0.5,
						1*scale,(height2)*scale+bonusHeight,0.5,
						
						
					  
					  
                   	
                ] },
                vnormal : {numComponents:3, data: [
                    0,0,-1, 0,0,-1, 0,0,-1,     0,0,-1, 0,0,-1, 0,0,-1,
                    0,0,1, 0,0,1, 0,0,1,        0,0,1, 0,0,1, 0,0,1,
                    0,-1,0, 0,-1,0, 0,-1,0,     0,-1,0, 0,-1,0, 0,-1,0,
                    0,1,0, 0,1,0, 0,1,0,        0,1,0, 0,1,0, 0,1,0,
                    -1,0,0, -1,0,0, -1,0,0,     -1,0,0, -1,0,0, -1,0,0,
                    1,0,0, 1,0,0, 1,0,0,        1,0,0, 1,0,0, 1,0,0,
					
					0,0,-1, 0,0,-1, 0,0,-1,     0,0,-1, 0,0,-1, 0,0,-1,
                    0,0,1, 0,0,1, 0,0,1,        0,0,1, 0,0,1, 0,0,1,
                    0,-1,0, 0,-1,0, 0,-1,0,     0,-1,0, 0,-1,0, 0,-1,0,
                    0,1,0, 0,1,0, 0,1,0,        0,1,0, 0,1,0, 0,1,0,
                    -1,0,0, -1,0,0, -1,0,0,     -1,0,0, -1,0,0, -1,0,0,
                    1,0,0, 1,0,0, 1,0,0,        1,0,0, 1,0,0, 1,0,0,
					
						0,0,-1, 0,0,-1, 0,0,-1,     0,0,-1, 0,0,-1, 0,0,-1,
                    0,0,1, 0,0,1, 0,0,1,        0,0,1, 0,0,1, 0,0,1,
                    0,-1,0, 0,-1,0, 0,-1,0,     0,-1,0, 0,-1,0, 0,-1,0,
                    0,1,0, 0,1,0, 0,1,0,        0,1,0, 0,1,0, 0,1,0,
                    -1,0,0, -1,0,0, -1,0,0,     -1,0,0, -1,0,0, -1,0,0,
                    1,0,0, 1,0,0, 1,0,0,        1,0,0, 1,0,0, 1,0,0,
					
						0,0,-1, 0,0,-1, 0,0,-1,     0,0,-1, 0,0,-1, 0,0,-1,
                    0,0,1, 0,0,1, 0,0,1,        0,0,1, 0,0,1, 0,0,1,
                    0,-1,0, 0,-1,0, 0,-1,0,     0,-1,0, 0,-1,0, 0,-1,0,
                    0,1,0, 0,1,0, 0,1,0,        0,1,0, 0,1,0, 0,1,0,
                    -1,0,0, -1,0,0, -1,0,0,     -1,0,0, -1,0,0, -1,0,0,
                    1,0,0, 1,0,0, 1,0,0,        1,0,0, 1,0,0, 1,0,0,
                ]}
            };
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
        }

    };
	
	var x = 0;
		var amount = 0.005;
    Boat.prototype.draw = function(drawingState) {        // we make a model matrix to place the cube in the world
		
		var TIME = -Number(drawingState.realtime)*0.0005;
		var modelM = twgl.m4.scaling([this.size,this.size,this.size]);
		
		x+= amount;
		if(x >1){
		   amount = -0.005;
		}
		else if(x<-1)(
		   amount = 0.005
		)
		twgl.m4.rotateZ(modelM,x, modelM);
		
        twgl.m4.setTranslation(modelM,this.position,modelM);
		
		//twgl.m4.axisRotation([0, 0, 1], this.rotation);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelM });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
		
    };
    Boat.prototype.center = function(drawingState) {
        return this.position;
    }


    ////////
    // constructor for Cubes
    SpinningCube = function SpinningCube(name, position, size, color, axis) {
        Boat.apply(this,arguments);
        this.axis = axis || 'X';
    }
    SpinningCube.prototype = Object.create(Boat.prototype);
    SpinningCube.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size,this.size,this.size]);
        var theta = Number(drawingState.realtime)/200.0;
        if (this.axis == 'X') {
            twgl.m4.rotateX(modelM, theta, modelM);
        } else if (this.axis == 'Z') {
            twgl.m4.rotateZ(modelM, theta, modelM);
        } else {
            twgl.m4.rotateY(modelM, theta, modelM);
        }
        twgl.m4.setTranslation(modelM,this.position,modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:-drawingState.sunDirection,
            cubecolor:this.color, model: modelM });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    SpinningCube.prototype.center = function(drawingState) {
        return this.position;
    }


})();

