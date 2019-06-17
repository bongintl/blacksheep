$(function(){
    
    var $menuToggle = $('.menu-toggle');
    var $hidden = $('.hidden.under');
    var $body = $('body');
    
    function togglePanel(){
        $hidden.toggleClass('on');
        $body.toggleClass('no-scroll no-cursor no-menu')
        cursor.toggle('x');
    }
    
    $hidden.click(function(){
        if( !isPhone() ) togglePanel();
    });
    
    $('.open-panel, .close-panel').click(togglePanel);
    
})