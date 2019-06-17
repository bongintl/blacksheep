$(function(){
    
    var $mouseText = $('#mouse-text');
    
    if ($mouseText) {
        $('.thumbnail a').hover(
            
            function() {
                var projectTitle =  $(this).attr('data-title');
                $mouseText.text(projectTitle);
                $mouseText.addClass('on');
            }, function() {
                $mouseText.removeClass('on');
            }
            
        );
        
    	$(document).bind('mousemove', function(e){
    	    $mouseText.css({
    	       left:  e.pageX,
    	       top:   e.pageY
    	    });
    	});
    }
    
    $('.thumbnail').click(function() {
        $('.thumbnail').removeClass('active');
        $(this).addClass('active');
    });
    
});