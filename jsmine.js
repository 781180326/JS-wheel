function getElementsByClassName(parent,tagName,classNmae){

	var aEls = parent.getElementsByTagName(tagName);
	var arr = [];
	for(var i=0; i<aEls.length; i++){

			var aClassName = aEls[i].className.split(' ');
			if( aClassName.indexOf(classNmae) != -1 ){ 
			}
		}
	return arr;
}


function addClassName(obj,className){
	if(obj.className == ''){
		obj.className = className;
	}else{
		var arr_className = obj.className.split(' ');

		if(arr_className.indexOf(className) == -1){

			obj.className += ' ' + className;
		}
	}
}

function removeClassName(obj,className){
	if(obj.className != ''){
		var class_arr = obj.className.split(' ');
		var _index = class_arr.indexOf(className);

		if(_index != -1){
			class_arr.splice(_index,1);
			obj.className = class_arr.join(' ');
		}
		
	}
}
function $(v){
	if(typeof v === 'function'){
		window.onload = v;
	}else if(typeof v === 'string'){
		return document.getElementById(v);
	}else{
		return v;
	}
}
function css(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}else {
		return getComputedStyle(obj, false)[attr];
	}
}

function shack_box(obj,attr,endFun){
	var pos = parseFloat(css(obj,attr));
	function shack(){
		var arr = [];
		for(var i=20;i>=0;i-=2){
			arr.push(i,-i);
		}
		clearInterval(obj.shack);
		var num = 0;
		obj.shack = setInterval(function(){
			obj.style[attr] = pos+arr[num]+'px';
			num++;
			if(num == arr.length){
				clearInterval(obj.shack);
				endFun&&endFun();
			}
		},30);
	}
	return shack;
}



function move(obj,json,speed,endFn){
	clearInterval(obj.timer);
	var cur = 0;
	var sp = speed;

	obj.timer = setInterval(function(){

		var iBtn = true;

		var cur = 0;
		for(var attr in json){
			
			var iTarget = json[attr];

			if( attr == "opacity"){
				cur = Math.round(css( obj, 'opacity' ) * 100);
			}else{
				cur = parseInt( css( obj, attr) );
			}

			speed = cur < iTarget ? sp : -sp;
			
			if( cur != iTarget){
			
				cur = cur + speed;
				if(cur > iTarget && speed > 0 || cur < iTarget && speed < 0) {
					cur = iTarget;
				}else{
					iBtn = false;
				}

				if( attr == "opacity"){
					obj.style.opacity = cur/100;
					obj.style.filter = 'alpha(opacity='+ cur +')';
				}else{
					obj.style[attr] = cur + "px";
				}
			}
			
		}
	

		if(iBtn){
			clearInterval(obj.timer);
			endFn && endFn.call(obj);
		}
		
	}, 50);
}




function bufferMove(obj,json,endFn){
	clearInterval(obj.timer);
	var cur = 0;
	obj.timer = setInterval(function(){

		var iBtn = true;
		var speed = 0;
		var cur = 0;
		
		for(var attr in json){
			
			var iTarget = json[attr];

			if( attr == "opacity"){
				cur = Math.round(css( obj, 'opacity' ) * 100);
			}else{
				cur = parseInt( css( obj, attr) );
			}

			
			speed = ( iTarget - cur ) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			
			if( cur != iTarget){
				
				cur = cur + speed;

				
				if(cur > iTarget && speed > 0 || cur < iTarget && speed < 0) {
					cur = iTarget;
				}else{
					iBtn = false;
				}

				if( attr == "opacity"){
					obj.style.opacity = cur/100;
					obj.style.filter = 'alpha(opacity='+ cur +')';
				}else{
					obj.style[attr] = cur + "px";
				}
			}
			
		}
	

		if(iBtn){
			clearInterval(obj.timer);
			endFn && endFn.call(obj);
		}
		
	}, 50);
}
