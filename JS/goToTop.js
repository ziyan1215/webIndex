$(function(){
	var timer =	null;
	$(window).on('scroll',function(){
		var currentHeight = document.documentElement.clientHeight;
		var stop = document.documentElement.scrollTop || document.body.scrollTop;
		if(stop >=currentHeight){
			$('#btn').css('opacity','100').fadeIn();
		}else{
			$('#btn').css('opacity','0').fadeOut();
		}
	})
	/*window.onscroll = function(){
		var currentHeight = document.documentElement.clientHeight;
		var stop = document.documentElement.scrollTop || document.body.scrollTop;
		if(stop >=currentHeight){
			$('#btn').css('opacity','100').fadeIn();
		}else{
			$('#btn').css('opacity','0').fadeOut();
		}
	};*/
	$('#btn').click(function(){
		timer = setInterval(function(){
				var stop = document.documentElement.scrollTop || document.body.scrollTop;
				var speed = stop /5 ;
				document.documentElement.scrollTop = document.body.scrollTop -= speed;
				console.log(document.body.scrollTop);
				if (stop === 0 ) {
					clearInterval(timer);
				};
		},30);
	});
})