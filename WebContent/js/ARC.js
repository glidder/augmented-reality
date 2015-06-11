/**
* Augmented Reality Coordinator Library (ARC)
*/

/*
* Function that checks if an object implements the indicated functions
* It is used to check the implementation of an ARC "interface".
*/
Object.defineProperty(Object.prototype, 'implements', {
    enumerable: false,
    value: function(methods) {
        //return (typeof this[method] === 'function');
        for(methodName in methods){
        	if(typeof this[methods[methodName]] != 'function') {
            	return false;
        	}
    	}
    	return true;
    }
});
/**
 * Function that returns an array of those input names that do not correspond with that of a
 * function implemented in the object.
 */
Object.defineProperty(Object.prototype, 'listMissingFunctions', {
    enumerable: false,
    value: function(methods) {
    	var missing = [];
        for(methodName in methods){
        	if(typeof this[methods[methodName]] != 'function') {
            	missing.push(methods[methodName]);
        	}
    	}
    	return missing;
    }
});
/**
 * Custom Error function for indicating what functions are missing in the "offender" object
 * for this one to be considered valid by the "offended" object.
 */
function missingFunctionsError(offender,offended){
	this.name = "missingFunctionsError";
	this.message = offended.constructor.name+" complains about "+offender.constructor.name+
				 " missing the following necessary functions:\n"+
				   offender.listMissingFunctions(offended.listInterface()).join("(),")+"()";
	}
missingFunctionsError.prototype = Object.create(Error.prototype);
missingFunctionsError.prototype.constructor = missingFunctionsError;

/**
 * Model class
 * It implements the necessary methods for ARC's interaction with 3D models
 * Inherits from THREE.Object3D
 */
function Model(name){
	//THREE.Object3D.call(this);
	THREE.Object3D.apply(this, arguments);
	var object = this,
		loader = new THREE.JSONLoader(),
		mesh;

	loader.load("./models/"+name+"/"+name+".js", function (geometry, materials) {
			mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial( materials ));
			object.add(mesh);
			mesh.scale.set( 0.5, 0.5, 0.5 );
		}, "models/"+name+"/");

};
//Model.prototype = Object.create( THREE.Object3D.prototype );
Model.prototype = new THREE.Object3D();

/**?????????????
 * MAP class ???
 *??????????????
function MAP(){
	this.map = {};
};*/
	
/**
 * ARC class (Augmented Reality Coordinator)
 * This is the main class that coordinates all other modules.
 */
function ARC(source,canvas,container,/*camera,*/ARlibrary){
	this.source = source;
	this.canvas = canvas;
	this.canvas.width = parseInt(this.canvas.style.width);
    this.canvas.height = parseInt(this.canvas.style.height);
	this.context= this.canvas.getContext("2d");
    //Checking that ARlibrary implements the "interface"
    if(ARlibrary.implements(this.listInterface()))
    	this.ARl = ARlibrary; //RENAME????????????
    else
    	throw new missingFunctionsError(ARlibrary,this);
    //Creating Renderer //Move out of here??? //To LibraryInterface???
    this.renderer= new THREE.WebGLRenderer();
    this.renderer.setClearColor(0xffff00, 1);
    this.renderer.setSize(this.canvas.width, this.canvas.height);
    container.appendChild(this.renderer.domElement);
    this.scene = new THREE.Scene();
    //this.camera = camera;
    this.camera = new THREE.PerspectiveCamera(40, this.canvas.width / this.canvas.height, 1, 1000);
    this.scene.add(this.camera);
    this.texture = this.createTexture();
    this.scene.add(this.texture);
    this.imageData; 

    //Structure for storing all loaded 3D models.
    //this.map = new MAP();
    this.map = {};	//Structure for all Models
    //Structure for storing all loaded external animations.
    this.amap = {};	//Structure for all animations
    //this.markers;	//Move to the ARInterface implementation!!!!!!!!!!!!!!!!!!!!!!!!!!

    /**
     * Function that updates the Scene.
     * It's behaviour can be modified by the method 'METHODNAME'
     * thus it's defined as a variable and not as a prototype.
     */
    this.updateScene = function(){
  		console.log("Active signals: ",this.ARl.getActiveSignalsId().toString());

  		this.texture.children[0].material.map.needsUpdate = true;
    };
};

ARC.prototype = {
	listInterface: function(){//IMPLEMENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		return ["getActiveSignalsId","detectSignals","findSignalById"];
	},

	createTexture: function(){
		var texture = new THREE.Texture(this.source),
			object = new THREE.Object3D(),
    		//geometry = new THREE.PlaneGeometry(this.canvas.width/this.canvas.height, this.canvas.height/this.canvas.width, 0.0),
     		geometry = new THREE.PlaneGeometry(1.0, 1.0, 0.0),
     		material = new THREE.MeshBasicMaterial( {map: texture, depthTest: false, depthWrite: false} ),
     		mesh = new THREE.Mesh(geometry, material);
		object.position.z = -1;
 		object.add(mesh);
 		return object;
	},

	snapshot: function(){
		this.context.drawImage(this.source, 0, 0, this.canvas.width, this.canvas.height);
		this.imageData = this.context.getImageData(0,0,this.canvas.width,this.canvas.height);
	},

	createModel: function(name){ 
		var object = new THREE.Object3D(),
			mesh,
			loader = new THREE.JSONLoader();

		loader.load("./models/"+name+"/"+name+".js", function (geometry, materials) {
			mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial( materials ));
			object.add(mesh);
			mesh.scale.set( 0.5, 0.5, 0.5 );
		}, "models/"+name+"/");

		return object;
	},

	updateObjects: function(){ //JUST CALL THE INDIVIDUAL OBJECT'S ONES??????????
	    for (var i in this.map){
	    	if(this.map[i].animationrotationz)
	    		this.map[i].rotation.z+=this.map[i].animationrotationz;
	    	if(this.map[i].animscalez){
	    		this.map[i].rotation.x+=this.map[i].animationrotationx;
	    		this.map[i].rotation.y+=this.map[i].animationrotationy;
	    		this.map[i].scale.z*=this.map[i].animscalez;
	    		this.map[i].scale.x*=this.map[i].animscalex;
	    		this.map[i].scale.y*=this.map[i].animscaley;
	    	}
	    }
	},

	updatePose: function(id, error, rotation, translation){ //NO NEED TO BE INSIDE
	    var yaw = -Math.atan2(rotation[0][2], rotation[2][2]);
	    var pitch = -Math.asin(-rotation[1][2]);
	    var roll = Math.atan2(rotation[1][0], rotation[1][1]);
	      
	    var d = document.getElementById(id);
	    d.innerHTML = " error: " + error
	                + "<br/>"
	                + " x: " + (translation[0] | 0)
	                + " y: " + (translation[1] | 0)
	                + " z: " + (translation[2] | 0)
	                + "<br/>"
	                + " yaw: " + Math.round(-yaw * 180.0/Math.PI)
	                + " pitch: " + Math.round(-pitch * 180.0/Math.PI)
	                + " roll: " + Math.round(roll * 180.0/Math.PI);
	},

	transformCorners: function(corners){ //NO NEED TO BE INSIDE
    	var j;
    	for (j = 0; j<corners.length;++j){
    		corners[j].x = corners[j].x - (canvas.width / 2);
          	corners[j].y = (canvas.height / 2) - corners[j].y;
    	}

    	return corners;
	},

	evaluate: function(generatedCode){ //Change to something like newUpdateBehaviour ?
										//or setUpdateBehaviour ?
		var openfunction, closefunction;
		openfunction = "this.updateScene = function() {";
						//"var corners, corner, pose, i,k;";
						//"for (i=0; i<this.markers.length; ++i){";
		generatedCode=openfunction+generatedCode;
		closefunction = "this.updateObjects();"+
						"this.texture.children[0].material.map.needsUpdate = true; };";
		generatedCode+=closefunction;
		console.log('generatedCode inside view iframe', generatedCode);
		eval(generatedCode);
	},

	tick: function(){ //Change to Update ?
		//if (video.readyState === video.HAVE_ENOUGH_DATA){
			this.snapshot();
			this.ARl.detectSignals(this.imageData);
			this.updateScene();
			//render();
			this.renderer.autoClear = false;
  			this.renderer.clear();
  			this.renderer.render(this.scene, this.camera);
		//}
		//window.requestAnimationFrame(this.tick());
	},

	setObjectMarker: function(object, marker_i){ //WITH THE NEW ONES THIS WILL BE DEPRECATED!!!!!!!!!!!!
		var corners = this.transformCorners(this.ARl.markers[marker_i].corners);
		var pose = this.ARl.posit.pose(corners);
		var rotation = pose.bestRotation;
		var translation = pose.bestTranslation;
		if(!this.map[object]){
			console.log("Creating new model "+object);
			this.map[object]=new Model(object);
			//this.map[object]=this.createModel(object);
			//console.log("Instance of Object3D: " + ( this.map[object] instanceof THREE.Object3D) );
			this.scene.add(this.map[object]);
		}
		this.map[object].scale.x = 35.0; //MODEL SIZE SHOULD BE IN MAP/AMAP
	    this.map[object].scale.y = 35.0;
	    this.map[object].scale.z = 35.0;
	      
	    this.map[object].rotation.x = -Math.asin(-rotation[1][2]);
	    this.map[object].rotation.y = -Math.atan2(rotation[0][2], rotation[2][2]);
	    this.map[object].rotation.z = Math.atan2(rotation[1][0], rotation[1][1]);

	    this.map[object].position.x = translation[0];
	    this.map[object].position.y = translation[1];
	    this.map[object].position.z = -translation[2];
	},

	runAnimation: function(animation, object){ 
	//THIS WITH THE PREVIOUS ONE AND THE NEW ONES SHOULD BE A SEPARATED CATEGORY OF FUNCTIONS!!!!!!!!!!!!!!!!!!!!
		if(!this.amap[animation]){
			var ramap = this.amap;
			$.ajax({url: "./models/"+animation+".js", dataType: "script", async: false,
			success: function(){
				ramap[animation]=animate;
				console.log("Creating new animation "+animation);
			}});
		}
		this.amap[animation](this.map[object]);
	},

	sceneAdd: function(object){
		this.scene.add(object);
	}
};

window.ARC = ARC;
