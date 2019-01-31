$(document).ready(function(){
	$('.slide-for').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  fade: true,
		  asNavFor: '.slide-nav',
		  autoplay: true
		});
		$('.slide-nav').slick({
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  asNavFor: '.slide-for',
		  centerMode: true,
		  focusOnSelect: true,
		  responsive: [
		    {
		      breakpoint: 700,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2
		      }
		    }
		  ]
		});
	$(".fancybox").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none'
	});
	showItem("intro");
})

var stickySidebar = new StickySidebar('#side-bar', {
		topSpacing: 80,
		bottomSpacing: 20,
		containerSelector: '#main-content',
		innerWrapperSelector: '.sidebar__inner'
});

function showItem(id){
	//When screen size is mobile size, we will display all content
	var screenWidth = window.innerWidth;
	if(screenWidth < 768){
		$("article").children().fadeIn();
		return;
	}
	$("article").children().hide();
	$("#"+id).fadeIn();//Show content
	/*Set active in menu item*/
	$("#side-bar li").removeClass("active");
	$('a[href="#'+id+'"]').parent().addClass("active");
	$('html,body').animate({scrollTop: 0}, 'duration');
    // return false;
    stickySidebar.updateSticky();
}