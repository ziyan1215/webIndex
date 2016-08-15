$().extend('drag',function(){
	//原先是按数组[$().getTagName('h2').getElement(0)]传过来的，
	//现在是按值$('h2').getElement(0)传递，
	//用arguments参数来接收值 ，就不用在function（tags）里面传tags了
	var tags = arguments;
	
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

		//自定义拖曳区域
		var flag = false;

		for(var i=0 ; i<tags.length;i++){
			if(e.target == tags[i]){
				flag = true; //只要有一个是true 立即返回
				break;
			}
		}
		if(flag == true){
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
			}else if(left<=getScroll().left){
				left = getScroll().left;
			}else if(left > getInner().width+getScroll().left-_this.offsetWidth){
				left= getInner().width+getScroll().left-_this.offsetWidth;
			}
			if(top<0){
				top =0;
			}else if(top<=getScroll().top){
				top = getScroll().top;
			}else if(top > getInner().height+getScroll().top - _this.offsetHeight){
				top = getInner().height+getScroll().top - _this.offsetHeight;
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
	}	*/
		
	});
	}
	return this;
});



