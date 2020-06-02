
var grobjects = grobjects || [];

// allow the constructor to be "leaked" out
var Wheel = undefined;
var carCount = 0;
var step = 0.2;

// this is a function that runs at loading time (note the parenthesis at the end)
(function() {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;

    // constructor for Cubes
	/*
    Car = function Car(name, position, height, width, depth, color, dirFace, size) {
        this.name = "car"+carCount;
        this.position = position;
        this.currPos = [position[0], position[1], position[2]];
        this.currDir = 0;    // currDir
            // 0 means going towards[0,0,1]
          // 1 means going towards [1,0,0]
          // 2 means going towards [0,0,-1]
          // 3 means going towards [-1,0,0]

    //    this.position = position || [0,0,0];
      //  this.size = size || 1.0;
        this.height = height || 0.5;
        this.width = width || 0.25;
        this.depth = depth || 0.05;
      //  this.color = color || [.2,.5,.3];
        
		//this.cube1 = 
		//Cube(name, position, size, color)
        this.base = new Rect("car"+carCount, position, height, width, depth, color, dirFace | 0, size);
        this.front = new Rect("car"+carCount, [position[0]+width, position[1], position[2]],
          height*3/4, width*3/4, depth/4, color, dirFace | 0, size);   
        //this.dirFace = dirFace;
        carCount += 1;
    }*/
	//var cubeSize = 0.5;
	//Cube = function Cube(name, position, size, color) 
	Wheel = function(name, position){
		this.name = name;
		this.position = position;
		//name, position, size, color,NAME
	  
		
		this.biscuit1 = new Biscuit("biscuit1", position, 1.5, [1.5,0.1,0.1]);
		this.biscuit2 = new Biscuit("biscuit1", position, 1.5, [1.0,0.0,0.5]);
		this.cube1 = new Cube("cube1",position,0.65,[1.0,1.0,0.0],0);
		this.cube2 = new Cube("cube2",position,0.65,[0.0,0.7,0.2],0);
		this.cube3 = new Cube("cube3",position,0.65,[0.6,1.0,0.0]);
		this.cube4 = new Cube("cube4",position,0.65,[0.0,1.0,1.0]);
		this.cube5 = new Cube("cube5",position,0.65,[1.0,0.0,1.0]);
		this.cube6 = new Cube("cube6",position,0.65,[0.0,1.0,0.2]);
		
		this.tube7 = new newTube1("cube7",position,0.65,[0.0,1.0,0.2]);
		this.tube8 = new newTube2("cube8",position,0.65,[0.0,1.0,0.2]);
		
		//this.cube7 = new Cube("tube1",position,0.65,[0.0,1.0,0.2],1);
	}
	Wheel.prototype.init  = function(drawingState){
		this.cube1.init(drawingState);
		this.tube7.init(drawingState);
		this.tube8.init(drawingState);
		this.biscuit1.init(drawingState);

	} 

		 var x = 2.0;
		 var y = 2.0;
		 var z = 2.0;
		 var time =0;
		 //var position0 = [0.0,0.0,0.0];
		 
	Wheel.prototype.draw = function(drawingState) {
		var TIME = Number(drawingState.realtime);
		 var position0 = [2.0,2.0,2.0];
		 var position00 = [2.0,2.0,1.4];
		 
		 var positiontest = [3.0,2.0,0.0];
		 
        var position1 = [2+1.5*Math.sin(TIME*0.0005),2+1.5*Math.cos(TIME*0.0005),1.7];
		var position2 = [2+1.5*Math.sin(TIME*0.0005+3.1415926/3),2+1.5*Math.cos(TIME*0.0005+3.1415926/3),1.7];
		var position3 = [2+1.5*Math.sin(TIME*0.0005+2*3.1415926/3),2+1.5*Math.cos(TIME*0.0005+2*3.1415926/3),1.7];
		var position4 = [2+1.5*Math.sin(TIME*0.0005+3*3.1415926/3),2+1.5*Math.cos(TIME*0.0005+3*3.1415926/3),1.7];
		var position5 = [2+1.5*Math.sin(TIME*0.0005-3.1415926/3),2+1.5*Math.cos(TIME*0.0005-3.1415926/3),1.7];
		var position6 = [2+1.5*Math.sin(TIME*0.0005-2*3.1415926/3),2+1.5*Math.cos(TIME*0.0005-2*3.1415926/3),1.7];
		
		 var position7 = [2.0,0.0,2.0];
		 var position8 = [2.0,0.0,1.4];
		//3.1415926/3
	//	var position1 = [2*Math.sin(x*0.5),2*Math.cos(x*0.5),0.0];
		//var position2 = position0+position1;
		
		 time +=0.02;
		  x += 0.02;	
		  y += 0.02;	
         this.cube2.type =1;
		 this.cube1.position = position1;this.cube2.position = position2;this.cube3.position = position3;
		 this.cube4.position = position4;this.cube5.position = position5;this.cube6.position = position6;

		 
		 this.biscuit1.position = position0;
		 this.biscuit2.position = position00;
		 this.tube7.position = position7;
		 this.tube8.position = position8;

		 this.cube1.draw(drawingState);this.cube2.draw(drawingState);
		 this.cube3.draw(drawingState);this.cube4.draw(drawingState);
		 this.cube5.draw(drawingState);this.cube6.draw(drawingState);
		 
		 this.tube7.draw(drawingState);
		 this.tube8.draw(drawingState);
		 
		 this.biscuit1.draw(drawingState);
		 this.biscuit2.draw(drawingState);
		
	}
    Wheel.prototype.center = function(drawingState) {
        return this.position;
    }

})();

// put some objects into the scene
// normally, this would happen in a "scene description" file
// but I am putting it here, so that if you want to get
// rid of cubes, just don't load this file.

grobjects.push(new Wheel("FerriWheel",[5.0,5.0,5.0]));
//grobjects.push(new Wheel("Car1", [-centerSz,0.0,2.0], 1,1.0,2.0, [0.4,0.8,0.6], 0, 1));
//grobjects.push(new Cube("cube1",[-2,0.5,   0],1) );
/*
grobjects.push(new Cube("cube1",[-2,0.5,   0],1) );
grobjects.push(new Cube("cube2",[ 2,0.5,   0],1, [1,1,0]));
grobjects.push(new Cube("cube3",[ 0, 0.5, -2],1 , [0,1,1]));
grobjects.push(new Cube("cube4",[ 0,0.5,   2],1));

grobjects.push(new SpinningCube("scube 1",[-2,0.5, -2],1) );
grobjects.push(new SpinningCube("scube 2",[-2,0.5,  2],1,  [1,0,0], 'Y'));
grobjects.push(new SpinningCube("scube 3",[ 2,0.5, -2],1 , [0,0,1], 'Z'));
grobjects.push(new SpinningCube("scube 4",[ 2,0.5,  2],1));
*/
