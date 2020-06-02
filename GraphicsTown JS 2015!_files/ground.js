var grobjects = grobjects || [];

var groundPlaneSize = groundPlaneSize || 8;
var planeSz = planeSz || 8;


(function() {
    "use strict";

    var vertexPos = [

		      -planeSz, 0, -planeSz,
		-planeSz, 0, planeSz,
		planeSz, 0, planeSz, // black street
        planeSz, 0, planeSz,
		planeSz, 0, -planeSz,
		-planeSz, 0, -planeSz,
    ];

    var shaderProgram = undefined;
    var buffers = undefined;


    var ground = {
       
        name : "Ground Plane",
      
        init : function(drawingState) {
           
            var gl = drawingState.gl;
            if (!shaderProgram) {
                shaderProgram = twgl.createProgramInfo(gl,["ground-vs","ground-fs"]);
            }
            var arrays = { vpos : {numComponents:3, data:vertexPos }};
            buffers = twgl.createBufferInfoFromArrays(gl,arrays);
       },
        draw : function(drawingState) {
            var gl = drawingState.gl;
            gl.useProgram(shaderProgram.program);
            twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
            twgl.setUniforms(shaderProgram,{
                view:drawingState.view, proj:drawingState.proj
            });
            twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
        },
        center : function(drawingState) {
            return [0,0,0];
        }

    };

   
    grobjects.push(ground);
})();