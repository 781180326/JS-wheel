		function $(v){
				if(typeof v === 'function'){
					window.onload = v;
				}else if(typeof v === 'string'){
					return document.getElementById(v);
				}else{
					return v;
				}
		}
		function getStyle( obj, attr ){
			return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle( obj )[attr];
		}
		function doMove(obj,attr,v,most,endFun){
				var v = parseInt(getStyle( obj, attr )) < most ? v : -v;
				clearInterval(obj.timer);
				obj.timer = setInterval(function(){
					var speed =parseFloat(getStyle(obj,attr))+v;
					if(speed>most&&v>0||speed<most&&v<0){
						speed = most;
					}
					obj.style[attr] =speed+'px';
					if(speed===most){
						clearInterval(obj.timer);
						endFun&&endFun();
					}
				},50);
			}

			function opacity(obj,v,most,endFun){
				clearInterval(obj.opcit);
				v =  getStyle(obj,'opacity')<most? v:-v;;
				obj.opcit = setInterval(function(){
					var speed = parseFloat(getStyle(obj,'opacity')) + v;
					if(speed>most&&v>0||speed<most&&v<0){
						speed = most;
					}
					obj.style.opacity = speed;
					if(speed===most){
						clearInterval(obj.opcit);
						endFun&&endFun();
					}
				},100);

			}

			function shack_box(obj,attr,endFun){
				var pos = parseFloat(getStyle(obj,attr));
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

			function getElementsByClassName(parent,tagName,classNmae){

				var aEls = parent.getElementsByTagName(tagName);
				var arr = [];
				for(var i=0; i<aEls.length; i++){

						var aClassName = aEls[i].className.split(' ');//将元素的class按照空格拆分成数组
						if( aClassName.indexOf(classNmae) != -1 ){ //如果数组中存在 传入的className，push进arr数组中
							arr.push(aEls[i]);
						}
					}
				return arr;
			}

			
			function addClassName(obj,className){

				//如果原来没有class，
				if(obj.className == ''){
					obj.className = className;
				}else{
					//如果原来有class
					//如果要添加的class在原来的class中已经存在,不做处理
					//如果要添加的class在原来的class中不存在,添加class
					var arr_className = obj.className.split(' ');

					if(arr_className.indexOf(className) == -1){

						obj.className += ' ' + className;
					}
				}
			}

			function removeClassName(obj,className){

				//如果原来有class
				if(obj.className != ''){
					var class_arr = obj.className.split(' ');
					var _index = class_arr.indexOf(className);

					if(_index != -1){
						//如果有要移除的className
						class_arr.splice(_index,1);
						obj.className = class_arr.join(' ');
					}
					
				}
			}
