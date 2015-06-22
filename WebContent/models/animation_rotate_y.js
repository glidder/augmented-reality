function animate(obj){
	if(!map['animation_rotate'+obj]){
		map['animation_rotate'+obj]=0;
	}
	map['animation_rotate'+obj]+=0.05;
	map[obj].rotation.y +=map['animation_rotate'+obj];
}
