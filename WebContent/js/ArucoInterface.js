/**
 * js-aruco Interface implementation for ARC (Augmented Reality Coordinator Library)
 */

/**
 * Class that implements the ARC's AR-library "interface" for js-aruco.
 */
function ArucoInterface(modelSize, canvasWidth, canvasHeight){
	this.markers;
	this.detector = new AR.Detector();
	this.posit = new POS.Posit(modelSize, canvasWidth);
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
};

ArucoInterface.prototype = {
	getActiveSignalsId: function(){
		var ids = [];
		for (var i=0; i<this.markers.length;++i)
			ids.push(this.markers[i].id);
		return ids;
	},

	detectSignals: function(source){
		this.markers = this.detector.detect(source);
	},

	findSignalById: function(marker_id){ // NECESSARY ???????????????????????????
		for (var i=0; i<this.markers.length;++i){
			if (this.markers[i].id == marker_id){
				return i;
			}
		}
		return -1;
	},

	getPose: function(marker_id){
		//var corners = this.transformCorners(this.markers[this.findSignalById(marker_id)].corners);
    	var corners = this.markers[marker_id].corners;
    	
    	for (var j = 0; j<corners.length;++j){
    		corners[j].x = corners[j].x - (this.canvasWidth / 2);
          	corners[j].y = (this.canvasHeight / 2) - corners[j].y;
    	}
		return this.posit.pose(corners);
	},

};
window.ArucoInterface = ArucoInterface;

