
/*
这个文件不能以  window.onload=function(){}开头，
因为这样的话，在整个页面加载完了才能用它,
所以如果这个对象文件里没有执行页面操作的动作，而且要被其他文件引用，就不要将其设置为“当DOM页面加载完才加载它”
 */

var eventUtil={
		/*添加事件*/
		addHandler:function(element,type,action){
			if(element.addEventListener){
				element.addEventListener(type,action,false);
			}else if(element.attachEvent){
				element.attachEvent("on"+type,action);
			}else{
				element["on"+type] = action; 
			}
		},
		/*删除事件*/
		removeHandler:function(element,type,action){
			if(element.removeEventListener){
				element.removEventListener(type,action,false);
			}else if(element.detachEvent){
				element.detachEvent("on"+type,action);
			}else{
				element["on"+type] =null;
			}
		},
		getEvent:function(event){
			return event ? event : window.event;
		},
		/*获取事件类型*/
		getType:function(event){
			return event.type;
		},
		/*获取触发事件的元素*/
		getElement:function(event){
			return event.target || event.srcElement;
		},
		/*阻止事件默认行为*/
		stopDefault:function(event){    // 阻止它（被点击的元素 也就是event对象正在标记的元素）的默认行为，
			if(event.preventDefault){
				event.preventDefault();
			}else{
				event.returnValue = false;
			}
		},
		/*阻止事件冒泡*/
		stopBubble:function(event){
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelBubble = true;
			}
		}
	}

