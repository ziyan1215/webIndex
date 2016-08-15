$(document).ready(function(){

	
	$('.part1 .icon1').hover(function(){
		$('#html').css('display','block');
		$('#html').fadeIn();
	},function(){
		$('#html').css('display','none').fadeOut();
	});

	$('.part1 .icon2').hover(function(){
		$('#CSS').css('display','block');
		$('#CSS').fadeIn();
	},function(){
		$('#CSS').css('display','none').fadeOut();
	});

	$('.part1 .icon3').hover(function(){
		$('#JS').css('display','block');
		$('#JS').fadeIn();
	},function(){
		$('#JS').css('display','none').fadeOut();
	});

	$('#side-click').click(function(){
		$('#side').css('right',0);
		$('#mask').fadeIn();
	});


	$('#mask').click(function(){
		$('#side').css('right',-240);
		$('#mask').fadeOut();
	});

	move(".photo").rotate(360).end();
	move("#banner .info").set('margin-top',0).end()

});