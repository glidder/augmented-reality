/**
 * Blockly/js-aruco Manager Library
 */

//function(){

	/**
	 * MAP class
	 *
	function MAP(){
		this.map = {};
	};

	MAP.prototype = {

		
	}*/

	/**
	 * BAM class
	 */
	function BAM(source,canvas,container,camera){
		this.source = source;
		this.canvas = document.getElementById(canvas);
		this.context= this.canvas.getContext("2d");
		
		this.canvas.width = parseInt(this.canvas.style.width);
	    this.canvas.height = parseInt(this.canvas.style.height);
	    this.detector = new AR.Detector();
	    this.posit = new POS.Posit(35.0, this.canvas.width); // en MAP???????????????????????????

	    this.renderer= new THREE.WebGLRenderer();
	    this.renderer.setClearColor(0xffff00, 1);
	    this.renderer.setSize(this.canvas.width, this.canvas.height);
	    document.getElementById(container).appendChild(this.renderer.domElement);

	    this.scene = new THREE.Scene();
	    this.camera = camera;
	    this.scene.add(this.camera);
	    this.texture = this.createTexture();
	    this.scene.add(this.texture);
	    this.imageData;
	    //this.map = new MAP();
	    this.map = {};
	    this.amap = {};
	    this.markers;

	    this.updateScene = function(){
	    	for(var m=0;m<this.markers.length;++m)
      			console.log("marker",this.markers[m].id);
      		this.texture.children[0].material.map.needsUpdate = true;
	    }
	};
	
	BAM.prototype = {
		createTexture: function(){ //NO NEED TO BE INSIDE (UNLESS MODIFIED)
			var texture = new THREE.Texture(this.source),
				object = new THREE.Object3D(),
        		geometry = new THREE.PlaneGeometry(this.canvas.width/this.canvas.height, this.canvas.height/this.canvas.width, 0.0),
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

		updateObjects: function(){ //NO NEED TO BE INSIDE
		    for (var i in this.map){
		    	if(this.map[i].animationrotationz)
		    		this.map[i].rotation.z+=this.map[i].animationrotationz;
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

    	evaluate: function(generatedCode){
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

    	tick: function(){
    		//if (video.readyState === video.HAVE_ENOUGH_DATA){
    			this.snapshot();
    			this.markers = this.detector.detect(this.imageData);
    			this.updateScene();
    			//render();
    			this.renderer.autoClear = false;
      			this.renderer.clear();
      			this.renderer.render(this.scene, this.camera);
    		//}
    		//window.requestAnimationFrame(this.tick());
    	},

    	findMarker: function(marker_id){
    		for (var i=0; i<this.markers.length;++i){
    			if (this.markers[i].id == marker_id){
    				return i;
    			}
    		}
    		return -1;
    	},

    	setObjectMarker: function(object, marker_i){
    		var corners = this.transformCorners(this.markers[marker_i].corners);
    		var pose = this.posit.pose(corners);
    		var rotation = pose.bestRotation;
    		var translation = pose.bestTranslation;
    		if(!this.map[object]){
    			console.log("Creating new model "+object);
    			this.map[object]=this.createModel(object);
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
	
	window.BAM = BAM;
//};