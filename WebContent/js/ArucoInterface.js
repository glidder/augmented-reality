/**
 * js-aruco Interface implementation for ARC (Augmented Reality Coordinator Library)
 */

/**
 * Class that implements the ARC's AR-library "interface" for js-aruco.
 */
function ArucoInterface(modelSize, canvasWidth, canvasHeight){
	this.currentMarkers;
	this.previousMarkers;
	this.detector = new AR.Detector();
	this.posit = new POS.Posit(modelSize, canvasWidth);
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
};

ArucoInterface.prototype = {
	detectSignals: function(source){
		this.previousMarkers = this.currentMarkers;
		this.currentMarkers = this.detector.detect(source);
	},

	getActiveSignalList: function(){
		var ids = [];
		for (var i=0; i<this.currentMarkers.length;++i)
			ids.push(this.currentMarkers[i].id);
		return ids;
	},

	getSignalIndexById: function(signal_id){ // NECESSARY ???????????????????????????
		for (var i=0; i<this.currentMarkers.length;++i){
			if (this.currentMarkers[i].id == signal_id){
				return i;
			}
		}
		return -1;
	},

	getPreviousSignalIndexById: function(signal_id){
		for (var i=0; i<this.previousMarkers.length;++i){
			if (this.previousMarkers[i].id == signal_id){
				return i;
			}
		}
		return -1;
	},

	getPose: function(signal_id){
		console.log(this.getSignalIndexById(signal_id)+" "+signal_id);
    	var corners = this.currentMarkers[this.getSignalIndexById(signal_id)].corners,
    		pose;
    	
    	for (var j = 0; j<corners.length;++j){
    		corners[j].x = corners[j].x - (this.canvasWidth / 2);
          	corners[j].y = (this.canvasHeight / 2) - corners[j].y;
    	}
		pose = this.posit.pose(corners);

		return { translation : {x:pose.bestTranslation[0],
								y:pose.bestTranslation[1],
								z:-pose.bestTranslation[2]},
				 rotation 	 : {x:-Math.asin(-pose.bestRotation[1][2]),
	    					 	y:-Math.atan2(pose.bestRotation[0][2], pose.bestRotation[2][2]),
	    					 	z:Math.atan2(pose.bestRotation[1][0], pose.bestRotation[1][1])}};
	},

	getPreviousPose: function(signal_id){
		var corners = this.previousMarkers[this.getPreviousSignalIndexById(signal_id)].corners,
			pose;

		for (var j = 0; j<corners.length;++ j){
			corners[j].x = corners[j].x - (this.canvasWidth / 2);
			corners[j].y = (this.canvasHeight / 2) - corners[j].y;
		}
		pose = this.posit.pose(corners);

		return { translation : {x:pose.bestTranslation[0],
								y:pose.bestTranslation[1],
								z:pose.bestTranslation[2]},
				 rotation 	 : {x:-Math.asin(-pose.bestRotation[1][2]),
	    					 	y:-Math.atan2(pose.bestRotation[0][2], pose.bestRotation[2][2]),
	    					 	z:Math.atan2(pose.bestRotation[1][0], pose.bestRotation[1][1])}};
	},

	signalIsActive: function(signal_id){
		return (this.getSignalIndexById(signal_id)>=0);
	},

	signalWasActive: function(signal_id){
		return (this.getPreviousSignalIndexById(signal_id)>=0);
	},

};
window.ArucoInterface = ArucoInterface;

