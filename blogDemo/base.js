   
/*//函数式写法
function $(id){
	return document.getElementById(id);
}*/

/*

 ///对象式
var base = {
	$ : function(id){
		return document.getElementById(id);
	},
	$$ : function(name){
		return document.getElementsByName(name);
	},
	$$$ : function(tagName){
		return document.getElementsByTagName(tagName);
	},
}
*/

/*//对象式
var Base = {
	getId : function(id){
		return document.getElementById(id);
	},
	getName : function(name){
		return document.getElementsByName(name);
	},
	getTagName : function(tagName){
		return document.getElementsByTagName(tagName);
	},
}*/
/*//前台调用
var $ = function(_this){
	return new Base(_this);
}

//基础库
function Base(_this){
	//创建一个数组，用来保存获取的节点和节点数组
	this.elements = []; //放进基础库里面防止变量公有化。
	alert(typeof _this); //一开始是undefined 以为没有点击id为box的div，没有触发事件，没传参
	if(_this!=undefined){//（即有传值过来）_this是一个对象，undefined也是一个对象，区别于typeof返回的  带单引号的对象
		this.elements[0] = _this;
	}
}*/

//前台调用
var $ = function(args){
	return new Base(args);
}
function Base(args){
	//创建一个数组，用来保存获取的节点和节点数组
	this.elements = []; //放进基础库里面防止变量公有化。
	if(typeof args == 'string'){ //如果穿来的参数为string参数 则执行
		//alert(args); // #id
		//alert(args.charAt(0));//#
		//alert(args.substring(1)); //id
		//
		//CSS模拟
		//args.indexOf(' ') =-1  ==>$('#box')==>没有空格
		
		if(args.indexOf(' ') !=-1){
	    //CSS模拟程序 
	    var elements = args.split(' '); //把节点拆分保存到数组中	 
	    var childElements =[]; //存放临时节点对象数组 ,解决被覆盖问题
	    var node = [] ; //用来存放父节点用
	    for(var i = 0;i < elements.length;i++){
	    	if(node.length == 0) node.push(document); //如果默认没有父节点，就把document放入
	    	switch(elements[i].charAt(0)){
	    		case '#':
	    			childElements = []; //清理掉临时节点 以便父节点失效 ，子节点有效
	    			childElements.push(this.getId(elements[i].substring(1))); //不灵活
	    			node =childElements; //保存父节点，因为childElement要清理，所以要创建node数组
	    		break;
	    		case '.':
	    			childElements =[];
		    		for(var j = 0 ;j <node.length;j++){
		    			var temps = this.getClass(elements[i].substring(1),node[j]);	
		    			for(var k=0;k<temps.length;k++){
		    				childElements.push(temps[k]);
		    			}
		    		}
		    			node = childElements;
	    		break;
	    		default:
		    		childElements =[];
		    		for(var j = 0 ;j <node.length;j++){
		    			var temps = this.getTagName(elements[i],node[j]);	
		    			for(var k=0;k<temps.length;k++){
		    				childElements.push(temps[k]);
		    			}
		    		}
		    			node = childElements;
		    		}   
	     }
	    	   this.elements = childElements;
		}else{
		//find模拟
		switch(args.charAt(0)){
			case '#':
				//应该是将获取的对象添加到全局变量的数组中 才能连缀调用
				this.elements.push(this.getId(args.substring(1)));//因为getID方法里面去掉了添加到数组里面导致出错 ，可以在这里添加到数组去
			break;
			case ".":
				//alert(args.substring(1));
				this.elements = this.getClass(args.substring(1));

			break;
			default:
				this.elements = this.getTagName(args);
				//alert(this.elements);//  $('p')找到两个P
		}//switch
	} //}else
	  
	} else if(typeof args == 'object'){
		//alert(typeof args); //一开始是undefined 以为没有点击id为box的div，没有触发事件，没传参
		if(args!=undefined){//（即有传值过来）_this是一个对象，undefined也是一个对象，区别于typeof返回的  带单引号的对象
		this.elements[0] = args;
		}
	   } else if(typeof args == 'function'){
	   	addDomLoaded(args);
	   }	
}	//最外层

Base.prototype.ready=function(fn){
	addDomLoaded(fn);
}

//设置CSS选择器子节点
Base.prototype.find = function(str){
	var childElements   = []; //用来存储要查找的节点
	for(var i = 0 ; i<this.elements.length;i++){
		switch(str.charAt(0)){
			case '#':
				//childElements.push(document.getElementById(str.substring(1)));
				childElements.push(this.getId(str.substring(1))); //同上
			break;
			case ".": 
				/*var all = this.elements[i].getElementsByTagName("*");
				for(var j=0;j<all.length;j++){
					if(all[j].className==str.substring(1)){
						childElements.push(all[j]);
					} 
				}*/
				var temps = this.getClass(str.substring(1),this.elements[i]);
				for(var j = 0 ; j<temps.length;j++){
					childElements.push(temps[j]);
				}
				//childElements = temps; 
			break;
			default:

				/*var tags = this.elements[i].getElementsByTagName(str); //this原先为document 但是现在是在P下查找  所以为传参的对象下查找
				for(var j = 0 ;j<tags.length;j++){
					//this.elements.push(tags[j]);
					childElements.push(tags[j]);
				}*/
				var temps = this.getTagName(str,this.elements[i]);
				for(var j = 0 ; j<temps.length;j++){
					childElements.push(temps[j]);
				}
		}
	}
	this.elements = childElements;
	return this;//实现连缀
}








	
//获取ID
Base.prototype.getId = function(id){
	//this.elements.push(document.getElementById(id)); 如果仅一句的话，把数据写到数组里去就写死了  不能相互调用了
	return document.getElementById(id); //所以要返回id节点原本的对象
	//return this;
	
}

//获取TagName
Base.prototype.getTagName = function(tagName,parentNode){
	var node = null;
	var temps =[]; 
	//alert(parentNode);
	//alert(tagName);//p
	if(parentNode != undefined){
		node = parentNode;
	}else{
		node=document;
	}
	//alert(node); //HTMLdocument;
	var tags = node.getElementsByTagName(tagName);
	for(var i = 0 ;i<tags.length;i++){
		//this.elements.push(tags[i]);
		temps.push(tags[i]);
	}
	return temps;
	//return this;
}

/*//获取TagName
Base.prototype.getTagName = function(tagName){
	var tags = document.getElementsByTagName(tagName);
	for(var i = 0 ;i<tags.length;i++){
		this.elements.push(tags[i]);
	}
	//return this;
}
*/


/*//获取Class节点数组
Base.prototype.getClass = function(className,idName){
	var node = null;
	if(arguments.length == 2){
		node = document.getElementById(idName);
	}else{
		node = document;
	}
	var all = node.getElementsByTagName('*');//获取全部元素
	for (var i = o;i<all.length;i++){
		if(all[i].className == className){
			this.elements.push(all[i]);
		}
	}
	return this;
}*/

//获取class节点数组，增加一个获取区间的参数
Base.prototype.getClass=function(className,parentNode){
	var node = null;
	var temps =[]; 
	//alert(parentNode);
	if(parentNode != undefined){
		node = parentNode;
	}else{
		node=document;
	}
	//alert(node); //undefined 由于if(parentNode != 'undefined')造成，parentNode为undefined
	var all = node.getElementsByTagName("*");
	for(var i=0;i<all.length;i++){
		if(all[i].className==className){
			//this.elements.push(all[i]); //直接导入到全局变量中了  
			temps.push(all[i]); //导入到临时变量中
		}
	}
	return temps; //返回临时数组
	//return this; //因为前台以及不使用了。改成在构造函数里面使用了  所以可以省
}

//获取某个节点的属性
Base.prototype.attr= function(attr,value){
	for(var i = 0 ;i <this.elements.length;i++){
		if(arguments.length == 1){
			return this.elements[i].getAttribute(attr);
		}else if(arguments.length == 2){
			 this.elements[i].setAttribute(attr,value);
		}		
	}
	return this;
}




/*
// v1 获取某个节点的属性
Base.prototype.attr= function(attr){
	
		return this.elements[0].getAttribute(attr); 
	
}
*/
/*
//获取class节点数组，增加一个获取区间的参数
Base.prototype.getClass=function(className,idName){
	var node = null;
	if(arguments.length==2){
		node = document.getElementById(idName);
	}else{
		node=document;
	}
	var all = node.getElementsByTagName("*");
	for(var i=0;i<all.length;i++){
		if(all[i].className==className){
			this.elements.push(all[i]); //直接导入到全局变量中了  
		}
	}
	//return this; //因为前台以及不使用了。改成在构造函数里面使用了  所以可以省
}*/

/*
//获取某一个节点 返回这个节点对象
Base.prototype.getElement = function(num){
	var element = this.elements[num]; //新建一个变量存储获取的class对象
	this.elements = []; //清空获取的对象
	this.elements[0] = element;//给返回值赋值为获取的第几个对象
	return this;

}*/

//获取某一个节点 返回这个节点对象 获取的是元素对象
Base.prototype.getElement = function(num){
	return this.elements[num]; //新建一个变量存储获取的class对象
}



//获取首个节点，并返回这个节点对象
Base.prototype.first = function(){
	return this.elements[0];
}

//获取末尾节点，并返回这个节点对象
Base.prototype.last = function(){
	//return this.elements[this.elements];//
	return this.elements[this.elements.length-1];
};

//获取某一个节点，返回Base对象
Base.prototype.eq = function(num){
	var element = this.elements[num]; //新建一个变量存储获取的class对象
	this.elements = []; //清空获取的对象
	this.elements[0] = element;//给返回值赋值为获取的第几个对象
	return this;
}
//获取某个节点在某组的位置
Base.prototype.index = function(){
	var children = this.elements[0].parentNode.children;

	for(var i = 0 ; i < children.length ; i++){
		if(this.elements[0] == children[i]) return i;
	}
}
 

//
/*//设置CSS
Base.prototype.css = function(attr,value){
	for(var i = 0 ; i<this.elements.length;i++){
		if(arguments.length == 1){ //只有一个参数的时候  获取该CSS属性值
			return this.elements[i].style[attr];
		}
			this.elements[i].style[attr]=value;
	
	}
	return this;
}*/

//设置CSS
Base.prototype.css = function(attr,value){

	for(var i = 0 ; i<this.elements.length;i++){
		if(arguments.length == 1){ //只有一个参数的时候  获取该CSS属性值
		/*	//兼容获取外部样式  .getComputedStyle()获取的是最终应用在元素上的所有CSS属性对象
			if(typeof window.getComputedStyle != 'undefined'){ //w3c
				return window.getComputedStyle(this.elements[i],null)[attr];
			}else if(typeof this.elements[i] != 'undefined'){ //ie
				return this.elements.style[attr];
			}*/
			//return getStyle(this.elements[i],attr)+'px'; //getStyle()去掉parseInt后不用加‘px’
			return getStyle(this.elements[i],attr);
		}
			this.elements[i].style[attr]=value;
	
	}
	return this;
}


//设置节点元素的透明度
Base.prototype.opacity = function (num) {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style.opacity = num / 100;
		this.elements[i].style.filter = 'alpha(opacity=' + num + ')';
		}
		return this;
};

/*//获取某个节点的属性
Base.prototype.attr = function (attr) {    ------库中存在两个相同attr  导致出现不明错误。。。。。2016年7月28日18:34:16  花费1天 
	return this.elements[0][attr];
}*/



//获取元素长度
Base.prototype.length = function(){
	return this.elements.length;
}
//添加class
Base.prototype.addClass = function(className){
	for(var i=0;i<this.elements.length;i++){
		if(! hasClass(this.elements[i],className)){
			this.elements[i].className += " "+ className; //" "里面要加空格  防止添加的时候类名叠加在一起 a b 形成 ab
		}
		
	}
	return this;
}

//移除Class
Base.prototype.removeClass = function(className){
	for(var i=0;i<this.elements.length;i++){
		if(hasClass(this.elements[i],className)){
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)'+className)); //" "里面要加空格  防止添加的时候类名叠加在一起 a b 形成 ab
		}
		
	}
	return this;
}
//添加link或style的CSS规则 $().addRule(0,'body','font-size:200px',0);
//num表示第几个规则
Base.prototype.addRule = function(num, selectorText,cssText,position){
	var sheet = document.styleSheets[num]; //html文档里面的第几条<link>规则，从0开始
	/*if(typeof sheet.insertRule !='undefined'){//W3C
		sheet.insertRule(selectorText +'{'+cssText+'}',position);
	}else if(typeof sheet.addRule !='undefined'){//IE
		sheet.addRule(seletorText,cssText,position);
	}*/
	insertRule(sheet,selectorText,cssText,position);
	return this;
}

//移除link或style的CSS规则 $().removeRule(0);
Base.prototype.removeRule = function(num,index){
	var sheet = document.styleSheets[num];
	/*if(typeof sheet.insertRule !='undefined'){//W3C
		sheet.deleteRule(index);
	}else if(typeof sheet.addRule !='undefined'){//IE
		sheet.removeRule(index);
	}*/
	deleteRule(sheet,index);
	return this;
}
//设置innerHTML
Base.prototype.html = function(str){

	for(var i =0;i<this.elements.length;i++){
		if(arguments.length==0){//假如没有参数的时候  就获取该element的innerHTML值
		return this.elements[i].innerHTML;
	}
		this.elements[i].innerHTML = str;
	}
	return this;
}
//设置innerText
Base.prototype.text =function(str){
	for (var i = 0; i < this.elements.length; i ++) {
		if (arguments.length == 0) {
			return getInnerText(this.elements[i]);
		}
		setInnerText(this.elements[i], text);
	}
	return this;  
}
//触发点击事件
Base.prototype.click=function(fn){
	for(var i =0;i<this.elements.length;i++){
		this.elements[i].onclick = fn;
	}
}

//设置事件发生器
Base.prototype.bind = function(event,fn){
	for(var i =0;i<this.elements.length;i++){
		addEvent(this.elements[i],event,fn);
	}
	return this;
}
/*//获取class节点数组
Base.prototype.getClass=function(className){
	var all = document.getElementsByTagName("*");
	for(var i=0;i<all.length;i++){
		if(all[i].className==className){
			this.elements.push(all[i]);
		}
	}
	return this;
}*/



//设置点击切换方法
Base.prototype.toggle = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		(function (element, args) {
			var count = 0;
			addEvent(element, 'click', function () {
			args[count++ % args.length].call(element);
			});
		})(this.elements[i], arguments);
	}
	return this;
};


/*//设置点击切换
Base.prototype.toggle = function(){
	for(var i =0;i<this.elements.length;i++){
		var count =0;
		var args = arguments;
		addEvent(this.elements[i],'click',function(){
			//args[count](); //
			//count++;
			//if(count >=args.length) count = 0;
			args[count++%args.length]();
		});	
	}
	return this;
}*/


//设置鼠标移入移出
Base.prototype.hover=function(over,out){
	for(var i=0;i<this.elements.length;i++){
		//this.elements[i].onmouseover = over;  //传统事件
		//this.elements[i].onmouseout = out;
		//改用现代事件绑定
		addEvent(this.elements[i],'mouseover',over);
		addEvent(this.elements[i],'mouseout',out );
	}
	return this;
}
//设置显示
Base.prototype.show = function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display = "block";
	}
	return this;
}
//设置隐藏
Base.prototype.hide = function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display = "none";
	}
	return this;
}

//设置物体居中
Base.prototype.center = function(width,height){

/*	var top=(document.documentElement.clientHeight-200)/2;
	var left=(document.documentElement.clientWidth-350)/2;*/
	//上下两句语句等效
	var top=(getInner().height-width)/2+getScroll().top;
	var left=(getInner().width-height)/2+getScroll().left;

	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.top = top+"px";
		this.elements[i].style.left = left+"px";
	}
	return this;
}
//触发浏览器窗口事件
Base.prototype.resize =function(fn){
	for(var i=0;i<this.elements.length;i++){
		var element =this.elements[i];
		//传统事件绑定
	/*window.onresize = function(){
		fn();
		if(element.offsetLeft > getInner().width-element.offsetWidth){
			element.style.left = getInner().width-element.offsetWidth +'px';
		}
		if(element.offsetTop > getInner().height-element.offsetHeight){
			element.style.top = getInner().height-element.offsetHeight +'px';
		}
	}*/

	//现代事件绑定
	addEvent(window,'resize',function(){
		fn();
		if(element.offsetLeft > getInner().width+getScroll().left-element.offsetWidth){
			element.style.left = getInner().width+getScroll().left-element.offsetWidth +'px';
			if(element.offsetLeft <= 0+ getScroll().left){
				element.style.left = 0+getScroll().left+'px';
			}
		}
		if(element.offsetTop > getInner().height+getScroll().top-element.offsetHeight){
			element.style.top = getInner().height+getScroll().top-element.offsetHeight +'px';
			if(element.offsetTop <= 0+ getScroll().top){
				element.style.top = 0+getScroll().top+'px';
			}
		}
	});
	}
	return this;
}
//锁屏功能
Base.prototype.lock=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.height =getInner().height+ getScroll().top+'px';
		this.elements[i].style.width = getInner().width +getScroll().left+ 'px';
		this.elements[i].style.display ='block'; 
		 parseFloat(sys.firefox)<4?document.body.style.overflow = 'hidden':document.documentElement.style.overflow = 'hidden';//有滚动条的时候先隐藏掉
		//addEvent(window,'scroll',scrollTop); //解决有滚动条时登录窗口能下拉的问题
		addEvent(this.elements[i],'mousedown',preDef);
		addEvent(this.elements[i],'mouseup',preDef);
		addEvent(this.elements[i],'selectstart',preDef);
	}
	return this;
}

//解锁屏功能
Base.prototype.unlock=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none';
		 parseFloat(sys.firefox)<4?document.body.style.overflow = 'auto':document.documentElement.style.overflow = 'auto';
		//removeEvent(window,'scroll',scrollTop);//解决有滚动条时登录窗口能下拉的问题
		removeEvent(this.elements[i],'mousedown',preDef);
		removeEvent(this.elements[i],'mouseup',preDef);
		removeEvent(this.elements[i],'selectstart',preDef);
	}
	return this;
}

//var timer=null ;
//设置动画
//Base.prototype.animate =function(attr,start,step,target)
//
Base.prototype.animate =function(obj){
	for(var i=0;i<this.elements.length;i++){
		var element = this.elements[i];
		//var t = 50;
		//var attr = obj['attr']=='x'?'left' : obj['attr']=='y' ? 'top' : 'left'; // 可选 top  left
		var attr = obj['attr']=='x'?'left' : obj['attr']=='y' ? 'top' : 
					obj['attr']=='w' ? 'width' :obj['attr']=='h' ? 'height':
					obj['attr']=='o' ?'opacity' : obj['attr'] !=undefined ? obj['attr']:'left';
												//obj[attr] !=undefinded ? obj['attr']兼容其它属性
		/*var attr = obj['attr']=='x'?'left' : obj['attr']=='y' ? 'top' : 
					obj['attr']=='w' ? 'width' :obj['attr']=='h' ? 'height':
					obj['attr']=='o' ?'opacity' : 'left';	*/		
		var start =obj['start']!=undefined?obj['start']:
					attr == 'opacity' ? parseFloat(getStyle(element,attr))*100 : 
					parseInt(getStyle(element,attr)); //可选，默认为CSS值

		var step =obj['step']!=undefined?obj['step']:20;// 可选

		var t = obj['t']!=undefined?obj['t']:30;// 可选  定时器运行间隔
		var alter =obj['alter']; //必选 增量
		var target =obj['target'];
		var speed =obj['speed'] != undefined ? obj['speed']:6 //可选 默认缓冲运动为6
		var type = obj['type'] == 0 ? 'constant' : obj['type']== 1 ? 'buffer':'buffer' //可选 0表示匀速 1表示缓冲  默认缓冲
		var mul = obj['mul'];//接收多组键值对
		
		//单个动画和多个动画至少传一个
		if(alter != undefined && target ==undefined){
			target = alter + start;
		}else if(alter == undefined && target == undefined&&mul==undefined){
			throw new Error(alert('alter增量或target目标量必选传一个'));
		}//两个存在会忽略掉alter

		
		
		

		if(start>target) step=-step;
		if(attr == 'opacity'){
			element.style.opacity =parseInt(start) / 100; 	
			element.style.filter = 'alpha(opacity=' + parseInt(start)+')'; 			
		}else{
			element.style[attr] = start+'px';
		}		

		//假如没传mul参数  就把原先的参数加进mul对象中
		if(mul==undefined){
			mul = {};
			mul[attr] = target;
			
		}

		clearInterval(element.timer);
		element.timer = setInterval(function(){
		//element.style[attr]=getStyle(element,attr)+step+'px'; //防止突兀
		//
		var flag = true; //判断同步动画都结束的标志

		//
		//在定时器里面循环
		for (var i in mul){
			attr = i=='x' ? 'left' : i=='y' ? 'top' : i=='w' ? 'width' : i=='h' ? 'height' : i == 'o' ? 'opacity' : i != undefined ? i : 'left';
			
			target = mul[i];

		if(type == 'buffer'){
			//缓冲运动步进速度计算
			step = attr=='opacity' ? (target - parseFloat(getStyle(element,attr))*100) /speed :
									 (target - parseInt(getStyle(element,attr)))/speed; //Math.ceil()向上取整  Math.floor()向下取整
			//step = Math.floor(step); 会提前到0
			step = step >0 ? Math.ceil(step) : Math.floor(step) ;		
		}
		//	
		//透明度动画
		if(attr == 'opacity'){	

			//运动动画 判断终点状态
			if(step == 0){//到达终点
				setOpacity();

			}else if(step>0 && Math.abs(parseFloat(getStyle(element,attr))*100-target)<=step){
				setOpacity();
			}else if(step<0 && (parseFloat(getStyle(element,attr))*100-target)<=Math.abs(step)){
				setOpacity();
			}else{
				var temp = parseFloat(getStyle(element,attr))*100;
				element.style.opacity = parseInt(temp + step)/100;
				element.style.filter = 'alpha(opacity=' + parseInt(temp + step)+')'; 
			}	
			if(parseInt(target) != parseInt(parseFloat(getStyle(element,attr))*100)) flag = false;	
		}else {
			//运动动画
			if(step == 0){
				setTarget();
			}else if(step>0 && Math.abs(parseInt(getStyle(element,attr))-target)<=step){
				setTarget();
			}else if(step<0 && (parseInt(getStyle(element,attr))-target)<=Math.abs(step)){
				setTarget();
			}else{
				element.style[attr]=parseInt(getStyle(element,attr))+step+'px'; 
			}
			if(parseInt(target) != parseInt(getStyle(element,attr))) flag = false;
		}


		}
		
		if(flag){
				
			clearInterval(element.timer);
			if(obj.fn!==undefined)obj.fn();
			
			
		}
		
		//element.style[attr]=getStyle(element,attr)+step+'px';//如果放这会慢一拍
		//if(getStyle(element,attr)==target) clearInterval(timer);
		//document.getElementById('show').innerHTML +=getStyle( element,attr)+'<br>';
	},t);
		function setTarget(){
			element.style[attr]=target+'px';
			//clearInterval(element.timer);
			//if(obj.fn!==undefined)obj.fn();
		};
		function setOpacity(){

			element.style.opacity = parseInt(target)/100;
			element.style.filter = 'alpha(opacity=' + parseInt(target)+')';  
			//clearInterval(element.timer);
			//if(obj.fn!==undefined)obj.fn();
		};
	}
	
	return this;
} 
//V1.0
/*Base.prototype.animate =function(obj){
	for(var i=0;i<this.elements.length;i++){
		var element = this.elements[i];
		//var t = 50;
		var attr = obj['attr']=='x'?'left' : obj['attr']=='y' ? 'top' : 'left'; // 可选 top  left
		var start =obj['start']!=undefined?obj['start']:getStyle(element,attr); //可选，默认为CSS值
		var step =obj['step']!=undefined?obj['step']:2;// 可选
		var t = obj['t']!=undefined?obj['t']:50;// 可选
		var target =obj['alter']+start; //必选 增量
		if(start>target) step=-step;
		element.style[attr] = start+'px'; 
		clearInterval(window.timer);
		timer = setInterval(function(){
		//element.style[attr]=getStyle(element,attr)+step+'px'; //防止突兀
		if(step>0 && Math.abs(getStyle(element,attr)-target)<=step){
			element.style[attr]=target+'px';
			clearInterval(timer);
		}else if(step<0 && (getStyle(element,attr)-target)<=Math.abs(step)){
			element.style[attr]=target+'px';
			clearInterval(timer);
		}else{
			element.style[attr]=getStyle(element,attr)+step+'px'; 
		}
		//element.style[attr]=getStyle(element,attr)+step+'px';//如果放这会慢一拍
		//if(getStyle(element,attr)==target) clearInterval(timer);
		document.getElementById('show').innerHTML += getStyle(element,attr)+'<br>';
	},t);
	}
	return this;
} */

Base.prototype.extend = function(name,fn){
	Base.prototype[name] = fn;
}




/*
//拖曳功能
Base.prototype.drag =function(){
	--------封装成插件
	 for(var i = 0; i<this.elements.length;i++){
		//this.elements[i].onmousedown = function(e){
		addEvent(this.elements[i],'mousedown',function(e){


			//preDef(e);
			//e.preventDefault(); //阻止默认行为后，input不能输入了
			if(trim(this.innerHTML).length == 0) e.preventDefault();
			//var e = getEvent(e);
			var _this=this
			var diffX = e.clientX - _this.offsetLeft;
			var diffY = e.clientY - _this.offsetTop;
		if(typeof _this.setCapture != 'undefined'){
			_this.setCapture; //兼容IE鼠标拖出可视区域事件无效的问题
		}
		if(e.target.tagName == 'H2'){
			addEvent(document,'mousemove',move);
			addEvent(document,'mouseup',up);
		}else{
			removeEvent(document,'mousemove',move);
			removeEvent(document,'mouseup',up);
		}
		
		function move(e){
			var left = e.clientX-diffX;
			var top = e.clientY-diffY;
			//alert(getInner().width);
			//alert(left);
			if(left<0){
				left= 0;
			}else if(left > getInner().width-_this.offsetWidth){
				left= getInner().width-_this.offsetWidth;
			}
			if(top<0){
				top =0;
			}else if(top > getInner().height - _this.offsetHeight){
				top = getInner().height - _this.offsetHeight;
			}
			_this.style.left=left+'px';
			_this.style.top=top+'px';
		}
		function up(){
			removeEvent(document,'mousemove',move);
			removeEvent(document,'mouseup',up);
			if(typeof _this.releaseCapture != 'undefined'){
			_this.releaseCapture();
		}
		}
		/*---传统事件绑定
		 this.onmousemove=function(e){
		//	var e =getEvent(e);
			//alert(_this.setCapture); 
			//alert(oDiv.style.top);
			//alert(oDiv.style.left);
			var left = e.clientX-diffX;
			var top = e.clientY-diffY;
			//alert(getInner().width);
			//alert(left);
			if(left<0){
				left= 0;
			}else if(left > getInner().width-_this.offsetWidth){
				left= getInner().width-_this.offsetWidth;
			}
			if(top<0){
				top =0;
			}else if(top > getInner().height - _this.offsetHeight){
				top = getInner().height - _this.offsetHeight;
			}
			_this.style.left=left+'px';
			_this.style.top=top+'px';
	}
	 this.onmouseup=function(){
	
		this.onmousemove = null;
		this.onmouseup = null;
		if(typeof _this.releaseCapture != 'undefined'){
			_this.releaseCapture();
		}
	}	
		
	});
	}
	return this;
}*/

//获取当前同级节点的下一个元素节点
Base.prototype.next = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i] = this.elements[i].nextSibling;
		if (this.elements[i] == null) throw new Error('找不到下一个同级元素节点！');
		if (this.elements[i].nodeType == 3) this.next();
		}
		return this;
}

//获取当前同级节点的上一个元素节点
Base.prototype.prev = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i] = this.elements[i].previousSibling;
		if (this.elements[i] == null) throw new Error('找不到上一个同级元素节点！');
		if (this.elements[i].nodeType == 3) this.prev();
		}
		return this;
}