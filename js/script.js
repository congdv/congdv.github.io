/*$('.nav-item a').on('click',function(){
    $(this).parent().parent().find('a.active').removeClass('active');
    $(this).addClass('active');

})*/

$(document).ready(function(){
    var scrollLink = $('.scroll');
    // Smooth scrolling
    scrollLink.click(function(e){
        e.preventDefault();
        $('body,html').animate({
            scrollTop: $(this.hash).offset().top
        },1000);

    })

    // Active link switching
    /*
    $(window).scroll(function() {
        var scrollbarLocation = $(this).scrollTop();
        //console.log(scrollbarLocation);
        scrollLink.each(function(){
            var sectionOffset = $(this.hash).offset().top ;
            if( sectionOffset < scrollbarLocation){
                $(this).parent().parent().find('a.active').removeClass('active');
                $(this).addClass('active');
            }
        })
    })*/
})
