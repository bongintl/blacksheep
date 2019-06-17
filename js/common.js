var $buoop = {c:2}; 
function $buo_f(){ 
 var e = document.createElement("script"); 
 e.src = "//browser-update.org/update.min.js"; 
 document.body.appendChild(e);
};
try {document.addEventListener("DOMContentLoaded", $buo_f,false)}
catch(e){window.attachEvent("onload", $buo_f)}

$.fn.$$ = function(){
    return this.map(function(){ return $(this) });
}

function isPhone(){
    return window.innerWidth <= 1024;
}

var cursor = {};

$(function(){

    var $header = $('header');
    var $body = $('body');
    
    $('.menu-toggle').click(function(){
        $header.toggleClass('open');
    });
    
    $('nav ul.phone a').each(function(){
        
        var $this = $(this);
        
        if( !$this.attr('href') ) {
            
            $this.click(function(){
                $header.removeClass('open');
            })
            
        }
        
    })
    
    var $doc = $(document);
    var $cursor = $('#cursor');
    var cursorClass = '+';
    var cursorOn = false;
    
    cursor.bind = function(){
        $doc.on('mousemove.cursor', function(e){
            $cursor.css({
                top: e.clientY,
                left: e.clientX
            })
        })
    }
    
    cursor.unbind = function(){
        $doc.off('mousemove.cursor');
    }
    
    cursor.setClass = function(cls){
        
        if(cursorClass === cls) return;
        
        if(cls === 'x'){
            $cursor.addClass('plus-cross');
        } else {
            $cursor.removeClass('plus-cross');
        }
        
        cursorClass = cls;
        
    }
    
    cursor.toggleClass = function(){
        cursor.setClass( cursorClass === 'x' ? '+' : 'x' );
    }
    
    cursor.on = function(cls){
        
        if(cls) cursor.setClass(cls);
        
        if(!cursorOn){
            $cursor.addClass('on');
            cursor.bind();
            cursorOn = true;
        }
        
    }
    
    cursor.off = function(){
        
        if(cursorOn){
            $cursor.removeClass('on');
            cursor.unbind();
            cursorOn = false;
        }
        
    }
    
    cursor.toggle = function(cls){
        cursorOn ? cursor.off() : cursor.on(cls);
    }
  
});