$(function(){
	//个人中心
	$('.member').hover(function(){
		//$().getId("set").style.display= "block";
		//$().getClass('member').css("background","green");
		$(this).css("background","green");
		
		$('#header .item').show().animate({
			mul:{
				o:100,
				h:80
			},
			t:30,
			step:10
		});
	},function(){
		//$('ul').hide();
		$('#header .item').animate({
			mul:{
				o:0,
				h:0
			},
			t:30,
			step:10,

			fn:function(){
				$('#header .item').hide();  
			}
		});
		$(this).css("background","#C3C3C3");
	});
	 //登录框
	 var login = $('#login');
	 var screen = $('#screen');

	  login.center(200,350).resize(function(){
	  	//login.center(200,350); //锁屏居中  //2.拖曳后不再居中
	  if(login.css('display')=='block'){
	  		screen.lock(); //锁屏
	  };
	  
	  });

	/* login.center(200,350);
	login.center(200,350).resize(function(){
	 		login.center(200,350);
	 });*/

	  $('login .login').click(function(){
	  	var _this = this;
	  	login.center(200,350);
	 	login.css('display','block');
	 	screen.css('display','block').lock();  
	 	//增加遮罩过动画
	 	screen.lock().animate({
	 		'attr':'o',
	 		'target':70,
	 		't':30,
	 		'step':30
	 	});
	 	//screen.lock();

	 });

	  //关闭登录
	 $('#login .close').click(function(){
	 	login.css('display','none');
	 	//screen.css('display','none').unlock();  
	 	//screen.unlock();  //加上过渡动画
	 	screen.animate({
	 		'attr':'o',	 		
	 		'target':0,
	 		't':10,
	 		'step':30,
	 		fn:function(){
	 			screen.unlock();
	 		}
	 	}); 
	 });

	 //拖曳
	login.drag($('h2').getElement(0));  


//百度分享初始化位置、
$('#share').css('top',getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2+'px');

addEvent(window,'scroll',function(){
	$('#share').animate({
		attr:'y',
		target:getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2

	});
	//$('#share').css('top',getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2+'px');
});
//分享按钮收缩功能
$('#share').hover(function(){
	$(this).animate({
		'attr':'x',
		'target':0,
		t:10,
		step:10
	});
},function(){
	$(this).animate({
		'attr':'x',
		'target':-230,
		t:10,
		step:10
	});
});

$('#nav .about li').hover(function () {
	var target = $(this).first().offsetLeft;
	$('#nav .nav_bg').animate({
				attr : 'x',
				target : target + 20,
				t : 30,
				step : 10,
				fn : function () {
					$('#nav .white').animate({
					attr : 'x',
					target : -target
					});
				  }
				});
}, function () {
	$('#nav .nav_bg').animate({
				attr : 'x',
				target : 20,
				t : 30,
				step : 10,
				fn : function () {
				$('#nav .white').animate({
					attr : 'x',
					target : 0
				});
			}
	});
});

//左侧菜单
$('#sidebar h2').toggle(function(){
	$(this).next().animate({
		mul:{
			h:0,
			o:0
		}
	});
},function(){
	$(this).next().animate({
		mul:{
			h:150,
			o:100
		}
	});
});

$('#banner img').opacity(0); 
$('#banner img').eq(0).opacity(100);
$('#banner ul li').eq(0).css('color','#333'); //初始化li
$('#banner strong').html($('#banner img').eq(0).attr('alt')); //初始化标题

//自动轮播计数
var banner_count = 1;
//轮播类型
var banner_type = 1; //1 过渡动画  2 上下滚动动画
//自动轮播
var banner_timer = setInterval(banner_fn,3000);


//手动轮播器
$('#banner ul li').hover(function(){
	//alert($(this).index()); // 0 1 2 
	/*$('#banner img').css('display','none');
	$('#banner img').eq($(this).index()).css('display','block');
	$('#banner ul li').css('color','#999'); 
	$('#banner ul li').eq($(this).index()).css('color','#333'); 
	$('#banner strong').html($('#banner img').eq($(this).index()).attr('alt'));*/
	clearInterval(banner_timer); 
	console.log($(this).css('color'));
	//如果非选定的再执行动画
	if($(this).css('color') != 'rgb(51, 51, 51)'){
		banner(this,banner_count == 0 ? $('#banner ul li').length()-1 : banner_count-1);
	}
	
},function(){
	banner_count = $(this).index()+1;
	banner_timer = setInterval(banner_fn,3000);
});

 
//图片轮播动画 
function banner(obj,prev){
	//$('#banner img').css('display','none');
	//$('#banner img').eq($(obj).index()).css('display','block');
	
	$('#banner ul li').css('color','#999'); //圆点li变灰
	$(obj).css('color','#333'); //选定圆点变黑
	$('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));//小标题
	
	if(banner_type == 1){
		$('#banner img').eq(prev).animate({
		attr :'o',
		target:0,
		t:30, 
		step:10
	}).css('z-index',1);

		$('#banner img').eq($(obj).index()).animate({
			attr :'o',
			target:100,
			t:30,
			step:10
		}).css('z-index',2);
	}else if(banner_type == 2){
		$('#banner img').eq(prev).animate({
		attr :'y',
		target:150,
		t:30, 
		step:10
	}).css('z-index',1).opacity(100);

		$('#banner img').eq($(obj).index()).animate({
			attr :'y',
			target:0,
			t:30,
			step:10
		}).css('top','-150px').css('z-index',2).opacity(100);
	}
	

}
function banner_fn(){
	if(banner_count >=$('#banner ul li').length()) banner_count=0;
	banner($('#banner ul li').eq(banner_count).first(),banner_count == 0 ? $('#banner ul li').length()-1 : banner_count-1);
	banner_count++;
}

var wait_load = $(".wait_imgitem");
wait_load.opacity(0);

$(window).bind('scroll',_wait_load);
$(window).bind('resize',_wait_load);


function _wait_load(){
	setTimeout(function(){
 		for(var i = 0 ; i<wait_load.length();i++){
 			var _this = wait_load.getElement(i);

 			if(getInner().height+getScroll().top>=offsetTop(_this)){
 				$(_this).attr('src',$(_this).attr('xrc')).animate({
 				attr:'o',
 				target:100,
 				t:30,
 				step:10
 			  });
 			}
 			
 		}
 	},100);
}

//
//
 //预加载图片展示
	 var pre_load = $('#pre_load');
	 var screen = $('#screen');

	 //弹框居中
	  pre_load.center(511,620).resize(function(){
	  	//login.center(200,350); //锁屏居中  //2.拖曳后不再居中
	  if(pre_load.css('display')=='block'){
	  		screen.lock(); //锁屏
	  };	  
	  });


	  $('#wait_load dl dt img').click(function(){
	  	//var _this = this;
	  	pre_load.center(511,620).css('display','block');
	 	//pre_load.css('display','block');
	 	//screen.css('display','block').lock();  
	 	//增加遮罩过动画
	 	screen.lock().animate({
	 		'attr':'o',
	 		'target':70,
	 		't':30,
	 		'step':30
	 	});
	 	//screen.lock();
	 	var  temp_img = new Image();
		
		$(temp_img).bind('load',function(){ //图片加载完毕再执行
				$('#pre_load .big img').attr('src',temp_img.src).animate({
			attr:'o',
			target:100
			}).css('width','600px').css('height','450px').css('top',0).opacity(0);
		});
		temp_img.src = $(this).attr('brc');
		
		var children = this.parentNode.parentNode;
		prev_next_img(children);
		
	
	 	//
	 	//

	 });

	 $('#pre_load .pre_close').click(function(){
	 	pre_load.css('display','none');
	 	//screen.css('display','none').unlock();  
	 	//screen.unlock();  //加上过渡动画
	 	screen.animate({
	 		'attr':'o',	 		
	 		'target':0,
	 		't':10,
	 		'step':30,
	 		fn:function(){
	 			screen.unlock();
	 		}
	 	}); 
	 	$('#pre_load .big img').attr('src',"imgs/loading.gif").css('width', '32px').css('height', '32px').css('top', '190px');
	 });

	 $('#pre_load .big .left').hover(function(){
	   		$('#pre_load .big .sl').animate({
	   			attr:'o',
	   			target:50,
	   			t:30,
				step:10
	   		});
	   },function(){
	   		$('#pre_load .big .sl').animate({
	   			attr:'o',
	   			target:0,
	   			t:30,
				step:10
	   		});
	   });

	    $('#pre_load .big .right').hover(function(){
	   		$('#pre_load .big .sr').animate({
	   			attr:'o',
	   			target:50,
	   			t:30,
				step:10
	   		});
	   },function(){
	   		$('#pre_load .big .sr').animate({
	   			attr:'o',
	   			target:0,
	   			t:30,
				step:10
	   		});
	   });


	    $('#pre_load .big .left').click(function () {
			$('#pre_load .big img').attr('src',"imgs/loading.gif").css('width', '32px').css('height', '32px').css('top', '190px');
			var curren_img = new Image();
			$(curren_img).bind('load', function () {
			$('#pre_load .big img').attr('src', curren_img.src).animate({
				attr : 'o',
				target : 100,
				t:30,
				step:10
			}).opacity(0).css('width', '600px').css('height', '450px').css('top', 0);
		});
			curren_img.src = $(this).attr('src');
			
			//alert($('wait_load').first());
			
			//当前节点 img.pareNode.pareNode  == > #wait_load 
			var children = $('#wait_load dl dt img').getElement(prevIndex($('#pre_load .big img').attr('index'), $('#wait_load').first())).parentNode.parentNode;
			
			prev_next_img(children);

		
		});


	   	$('#pre_load .big .right').click(function () {
			$('#pre_load .big img').attr('src',"imgs/loading.gif").css('width', '32px').css('height', '32px').css('top', '190px');
		
			var curren_img = new Image();
			$(curren_img).bind('load', function () {
			$('#pre_load .big img').attr('src', curren_img.src).animate({
				attr : 'o',
				target : 100,
				t:30,
				step:10
			}).opacity(0).css('width', '600px').css('height', '450px').css('top', 0);
		});
			curren_img.src = $(this).attr('src');
			//var children = $('#wait_load dl dt img').getElement(nextIndex($('#pre_load .big img').attr('index'), $('#wait_load').first())).parentNode.parentNode;
			var children = $('#wait_load dl dt img').getElement(nextIndex($('#pre_load .big img').attr('index'), $('#wait_load').first())).parentNode.parentNode;
			prev_next_img(children);

		
	});

	 function prev_next_img(children){
			var prev = prevIndex($(children).index(),children.parentNode);
			var next = nextIndex($(children).index(),children.parentNode);
			//alert($("#wait_load dt img").eq(prev).attr('alt'));
			//alert('xia '+next);
			var prev_img = new Image();
			var next_img = new Image();
			prev_img.src = $("#wait_load dl dt img").eq(prev).attr('brc'); //获取上一个节点的大图
			next_img.src = $("#wait_load dl dt img").eq(next).attr("brc"); 

			$('#pre_load .big .left').attr('src', prev_img.src); //讲大图src放到span中
			$('#pre_load .big .right').attr('src', next_img.src);
			$('#pre_load .big img').attr('index', $(children).index());
			$('#pre_load .big .index').html(parseInt($(children).index()) + 1 + '/' + $('#wait_load dl dt img').length());
		}

	 //拖曳
	pre_load.drag($('#pre_load h2').getElement(0));  

});