 //DOM加载
 function addDomLoaded(fn){
	var isReady = false;
	var timer = null;
	function doReady(){
		if(timer) clearInterval(timer);
		if(isReady) return;
		isReady = true;
		fn();
	}

	if((sys.opera && sys.opera <9) || (sys.firefox && sys.firefox<3) ||(sys.webkit &&sys.webkit<525)){
		//无论采用哪种 基本用不着
		//
	/*	timer = setInterval(function(){
			if(/loaded|complete/.test(document.readyState)){//loaded是部分加载
				doReady();
			}
		},1)*/

		timer = setInterval(function(){
			if(document&&document.getElementById&&document.getElementsByTagName&&document.body){
				doReady();
			}
		},1);
	}else if(document.addEventListener){//w3c
		addEvent(document,'DOMContentLoaded',function(){
			fn();
			removeEvent(document,'DOMContentLoaded',arguments.callee);
		});
	}else if(sys.ie &&sys.ie<9){
		var timer = null;
		tuimer = setInterval(function(){
			try{
				document.documentElement.doScroll('left');
				doReady();
			}catch(e){};
		},1);
	}
}


 //浏览器检测
(function(){
	window.sys = {};  //定义全局变量 让外部可以访问闭包 ，保存浏览器信息对象
	var ua = navigator.userAgent.toLowerCase(); //获取浏览器信息字符串
	//alert(ua);
	var s ; //浏览器信息数组 浏览器名称加版本号
	//alert(window.opera.version()); //js自带函数获取欧朋浏览器版本号
	//alert(ua.match(/msie ([\d.]+)/)); //msie 7.0 7.0 
	//
	//
	/*if((/msie ([\d.]+)/).test(ua)){
		s = ua.match(/msie ([\d.]+)/);
		sys.ie = s[1];
	}

	//alert(ua.match(/firefox\/([\d.]+)/)); //firefox 47.0,47.0
	if((/firefox\/([\d.]+)/).test(ua)){
		s = ua.match(/firefox\/([\d.]+)/);
		sys.firefox = s[1];
	}

	alert(ua.match(/chrome\/([\d.]+)/)); //chrome 47.0,47.0
	if((/chrome\/([\d.]+)/).test(ua)){
		s = ua.match(/chrome\/([\d.]+)/);
		sys.chrome = s[1];
	}

	if((/opera\/.*version\/([\d.]+)/).test(ua)){
		s = ua.match(/opera\/.*version\/([\d.]+)/);
		sys.opera = s[1];
	}

	if((/version\/([\d.]+).*safari/).test(ua)){
		s = ua.match(/version\/([\d.]+).*safari/);
		sys.safari = s[1];
	}*/

	(s = ua.match(/msie ([\d.]+)/))? sys.ie = s[1]:
	(s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1]:
	(s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1]:
	(s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1]:
	(s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0

	if(/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d.])/)[1];
	//alert(sys.webkit);
})();


//跨浏览器获取视口大小
function getInner(){
	if(typeof window.innerWidth != 'undefined'){
		return{
			width :window.innerWidth,
			height:window.innerHeight
		}
	}else{
		return{
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}
}

//跨浏览器获取style
function getStyle(element,attr){ 
			var value ;
			//兼容获取外部样式  .getComputedStyle()获取的是最终应用在元素上的所有CSS属性对象
			if(typeof window.getComputedStyle != 'undefined'){ //w3c
				value = window.getComputedStyle(element,null)[attr];
			}else if(typeof elements.currentStyle != 'undefined'){ //ie
				value =  element.currentStyle[attr];
			}
			
			return value;
}

/*//跨浏览器获取style
function getStyle(element,attr){ 
			var value ;
			//兼容获取外部样式  .getComputedStyle()获取的是最终应用在元素上的所有CSS属性对象
			if(typeof window.getComputedStyle != 'undefined'){ //w3c
				value = parseInt(window.getComputedStyle(element,null)[attr]);
			}else if(typeof elements.currentStyle != 'undefined'){ //ie
				value =  parseInt(element.currentStyle[attr]);
			}
			
			return value;
}*/
/*//跨浏览器获取style
function getStyle(element,attr){ 
			//兼容获取外部样式  .getComputedStyle()获取的是最终应用在元素上的所有CSS属性对象
			if(typeof window.getComputedStyle != 'undefined'){ //w3c
				return window.getComputedStyle(element,null)[attr];
			}else if(typeof elements.currentStyle != 'undefined'){ //ie
				return element.currentStyle[attr];
			}
}*/


//判断是否存在class
function hasClass(element,className){
	return element.className.match(new RegExp("(\\s|^)"+className+"(\\s|$)" )); 
			
}

//跨浏览器添加link规则
function insertRule(sheet, selectorText,cssText,position){
	if(typeof sheet.insertRule !='undefined'){//W3C
		sheet.insertRule(selectorText +'{'+cssText+'}',position);
	}else if(typeof sheet.addRule !='undefined'){//IE
		sheet.addRule(seletorText,cssText,position);
	}
}  

//跨浏览器移除link规则
function deleteRule(sheet, index){
	if(typeof sheet.insertRule !='undefined'){//W3C
		sheet.deleteRule(index);
	}else if(typeof sheet.addRule !='undefined'){//IE
		sheet.removeRule(index);
	}
}
//获取Event对象
function getEvent(event){
	return event||window.event;
}

//取消默认行为、阻止默认行为   (兼容模式)
function preDef(event){
	var e=getEvent(event);
	if(typeof e.preventDefault != 'undefined'){ //W3C
		e.preventDefault();
	}else{  //IE
		e.returnValue = false;
	}
}

/*//跨浏览器事件绑定  （ 目标对象 事件类型  回调函数）
function addEvent(obj,type,fn){
	if(typeof obj.addEventListener != 'undefined'){//兼容W3C
		 obj.addEventListener(type,fn,false);
	}else if(typeof obj.attachEvent != 'undefined'){//兼容IE
		obj.attachEvent('on'+type,function(){
			fn.call(obj,window.event);//对象冒充   //匿名函数 传参到fn 假如fn.call(123),那么fn里面alert（this）==123 第二个参数标准化event  存在问题  1.无法删除事件2.IE无法顺序执行3.IE的现代事件绑定存在内存泄漏 
		});
	}
}

//跨浏览器删除事件绑定
function removeEvent(obj,type,fn){
	if(typeof obj.removeEventListener != 'undefined'){//兼容W3C
		 obj.removeEventListener(type,fn,false);
	}else if(typeof obj.detachEvent != 'undefined'){//兼容IE
		obj.detachEvent('on'+type,fn);
	}
} */

//跨浏览器事件绑定  （ 目标对象 事件类型  回调函数）
function addEvent(obj,type,fn){
	if(typeof obj.addEventListener != 'undefined'){//兼容W3C
		 obj.addEventListener(type,fn,false);
	}else {//用传统方法解决IE8以下的问题
		//创建一个存放事件的哈希表（散列表）
		if(!obj.events)obj.events = {};
		//第一次执行
		if(!obj.events[type]){
			//创建一个存放事件处理函数的数组
			obj.events[type]=[];
			if(obj['on'+type]){
				//把第一次的事件处理函数先存放到第一个位置上
				obj.events[type][0]=fn;
			}
			}else{
				//同一个函数注册进行屏蔽，不添加到计数器中
				if(addEvent.equal(obj.events[type],fn)) return false;
			}
			
		
		//从第二次开始我们用事件计数器来存储
		obj.events[type][addEvent.ID++]=fn;
		//执行事件处理函数
		obj['on'+type]=addEvent.exec;
		};
	}


//为每个事件分配一个计数器
addEvent.ID = 1
//执行事件处理函数 
addEvent.exec = function (event){  //通过elevent对象来获取type
	var e = event || addEvent.fixEvent(window.event);
	var es = this.events[e.type];
	for(var i in this.events[e.type]){
		es[i].call(this,e);
}
}
//同一个注册函数进行屏蔽
addEvent.equal=function(es,fn){
	for(var i in es){
		if (es[i]==fn) return true;
	}
	return false;

}

//把IE常用的Event对象配对到W3C中去
addEvent.fixEvent = function(event){
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropagation;
	event.target = event.srcElement;
	return event;
}

//IE阻止默认行为
addEvent.fixEvent.preventDefault = function(){
	this.returnValue = false ; 
}

//IE取消冒泡 
addEvent.fixEvent.stopPropagation = function(){
	this.cancelBubbble = true;
}
//跨浏览器删除事件绑定
//
function removeEvent(obj,type,fn){
	if(typeof obj.removeEventListener != 'undefined'){//兼容W3C
		 obj.removeEventListener(type,fn,false);
	}else{
		for(var i in obj.events[type]){
			if(obj.events[type][i]==fn){
				delete obj.events[type][i];
			}
		}
	}
} 
/*function removeEvent(obj,type,fn){
	if(typeof obj.removeEventListener != 'undefined'){//兼容W3C
		 obj.removeEventListener(type,fn,false);
	}else if(typeof obj.detachEvent != 'undefined'){//兼容IE
		obj.detachEvent('on'+type,fn);
	}
} */

//删除左右空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
}
/*------导致预加载点击弹框的时候会跳到顶点
//滚动条清0
function scrollTop(){
	document.documentElement.scrollTop = 0; //IE
	document.body.scrollTop = 0;//W3C
}
*/

//跨浏览器获取滚动条位置
function getScroll(){
	return {
		top:document.documentElement.scrollTop ||document.body.scrollTop,
		left:document.documentElement.scrollLeft ||document.body.scrollLeft
	};
}

//获取元素到最外层顶点的位置
function offsetTop(element){
	var top = element.offsetTop;
	var parent =element.offsetParent;
	while(parent != null){
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return top;
}

//某一个值是否存在某一个素组中
function inArrar(array,value){
	for(var i in array){
		if(array[i]==value) return true;
	}
	return false;
}

//阻止默认行为
function preDef(e){
	e.preventDefault();
}


//获取某一个节点的上一个节点的索引
function prevIndex(current,parent){
	var length = parent.children.length;
	if(current == 0)return length - 1;
	return parseInt(current) - 1;
}


//获取某一个节点的下一个节点的索引
function nextIndex(current,parent){
	var length = parent.children.length;
	if(current == length - 1)return 0;
	return parseInt(current) + 1;
}