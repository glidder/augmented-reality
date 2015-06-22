function Animation(){
	this.startTime = Date.now();
	this.x=this.y=this.z=0;
};
Animation.prototype.animate = function(obj){
	var dtime = Date.now() - this.startTime;
	this.x+=0.02; this.y+=0.0225; this.z+=0.0175;
	obj.rotate(this.x,this.y,this.z);
	obj.rescale(1.0 + 0.3*Math.sin(dtime/300),
				1.0 + 0.3*Math.sin(dtime/300),
				1.0 + 0.3*Math.sin(dtime/300));
};
