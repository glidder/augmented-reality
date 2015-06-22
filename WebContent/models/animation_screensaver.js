function animate(obj){
	if(!obj.animationrotationz){
		obj.animationrotationz=0;
	}
	if(!obj.animationrotationy){
		obj.animationrotationy=0;
	}
	if(!obj.animationrotationx){
		obj.animationrotationx=0;
	}
	if(!obj.startTime){
		obj.startTime=Date.now();
	}
	var dtime = Date.now() - obj.startTime;
	obj.animationrotationz+=0.0175;
	obj.animationrotationy+= 0.0225;
	obj.animationrotationx+= 0.02;
	obj.animscalex	 = 1.0 + 0.3*Math.sin(dtime/300);
	obj.animscaley	 = 1.0 + 0.3*Math.sin(dtime/300);
	obj.animscalez	 = 1.0 + 0.3*Math.sin(dtime/300);
}
/*
	var dtime	     = Date.now() - startTime;
	cube.scale.x	 = 1.0 + 0.3*Math.sin(dtime/300);
	cube.scale.y	 = 1.0 + 0.3*Math.sin(dtime/300);
	cube.scale.z	 = 1.0 + 0.3*Math.sin(dtime/300);*/
