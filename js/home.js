$(function(){
    
    var sectionNames = ['home', 'about', 'people', 'contact'];
    
    var $win = $(window);
    var $doc = $(document);
    var $body = $('body');
    var $content = $('.content');
    var $sections = $('section');
    
    var $menu = $('header')
    var $menuToggle = $('.menu-toggle');
    
    var $home = $('.home');
    var $mobileScrollElement = $('#main');
    
    var $about = $('.about');
    var $aboutPanel = $about.find('.right');
    
    var $peopleContainer = $('.people');
    var $peopleBackground = $('.people-bg-image')
    var $people = $('.person');
    
    /* LAYOUT */
    
    function setSectionHeights(){
        $sections.height(window.innerHeight);
    }
    
    setSectionHeights();
    
    $win.on('resize', setSectionHeights);
    
    /* SHOWREEL */
    
    var showreelOn = false;
    var $showreel = $('.showreel');
    var $showreelImages = $showreel.find('.bg-image, .images img');
    var showreelFrame = 0;
    var showreelInterval;
    
    function showreelTick(){
        
        if(showreelFrame === $showreelImages.length){
            $showreelImages.hide();
            showreelFrame = 0;
        } else {
            $showreelImages.eq(showreelFrame).show();
            showreelFrame++;
        }
        
    }
    
    function startShowreel(){
        if(showreelOn) return;
        scrollOff();
        $content.removeClass('shows-over');
        showreelInterval = setInterval(showreelTick, 250);
        showreelOn = true;
    }
    
    function stopShowreel(){
        if(!showreelOn) return;
        $content.addClass('shows-over');
        setTimeout(function(){
            clearInterval(showreelInterval);
            $showreel.remove();
            scrollOn();
            showreelOn = false;
        }, 1000);
    }
    
    $showreel.click(stopShowreel);
    
    /* PANELS */
    
    function panelToggler(cfg, idx){
        
        var isOpen = false;
        
        function runner(state, fn){
            return function(){
                if(isOpen === state) return;
                for(var className in cfg){
                    cfg[className][fn](className);
                }
                if( isPhone() ) $body[fn]('no-scroll no-menu');
                if( state ) scrollTo( window.innerHeight * idx );
                isOpen = state;
            }
        }
        
        var open = runner(true, 'addClass');
        var close = runner(false, 'removeClass');
        var toggle = function(){ isOpen ? close() : open() };
        
        //$doc.on('scroll', close);
        
        return {
            open: open,
            close: close,
            toggle: toggle
        }
        
    }
    
    $('.toggle-people').click( panelToggler({ on: $peopleContainer }, 2 ).toggle );
    
    var aboutToggler = panelToggler({
        open: $about,
        show: $aboutPanel
    }, 1)
    
    $about.click(function(){
        if( !isPhone() ) {
            aboutToggler.toggle();
            cursor.toggleClass();
        }
    }).mousemove(function(){
        cursor.on();
    }).mouseleave(function(){
        cursor.setClass('+')
        cursor.off();
    })
    
    $('.toggle-about').click(aboutToggler.toggle);
    
    /* PEOPLE */
    
    $('#people-show').hover(function() {
        
        if( isPhone() ) return;
        
        $peopleContainer.addClass('show');
        $peopleBackground.addClass('hide');
       
        var maxX = window.innerWidth - $people.width();
        var maxY = window.innerHeight - $people.height()
       
        $people.each(function(){
            $(this).css({
                left: Math.random() * maxX,
                top: Math.random() * maxY
            });
        });
        
    }, function(){
        
        if( isPhone() ) return;
        
        $peopleContainer.removeClass('show');
        $peopleBackground.removeClass('hide');
        
    });
    
    // MAP
    
    var styles = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
    var myLatlng = new google.maps.LatLng(51.522146,-0.1109355);
    var mapOptions = {
        center: myLatlng,
        zoom: 16,
        scrollwheel: false,
        styles: styles,
        disableDefaultUI: true
    }
    
    var mapElement = document.getElementById('map');
    if (mapElement) {
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    }
    
    var marker = new google.maps.Marker({
        position: myLatlng,
        icon: {
            url: '/assets/circle.svg',
            size: new google.maps.Size(60, 80),
            anchor: new google.maps.Point(30, 105)
        }
    });
    
    marker.setMap(map);
    
    function centerMap(){
        var MOBILE_MARKER_MARGIN = window.innerWidth < 415 ? 100 : 250;
        map.setCenter(myLatlng);
        if( isPhone() ) map.panBy( -window.innerWidth / 2 + MOBILE_MARKER_MARGIN, -window.innerHeight / 2 + MOBILE_MARKER_MARGIN );
    }
    
    centerMap();
    
    $(window).on('resize', centerMap);
    
    /* SCROLL */
    
    function scrollOn(){
        $body.removeClass('no-scroll');
    }
    
    function scrollOff(){
        $body.addClass('no-scroll');
    }
    
    var $scrollElement = isPhone() ? $mobileScrollElement : $('body, html');
    var $scrollEventElement = isPhone() ? $mobileScrollElement : $(window);
    var $scrollPositionElement = isPhone() ? $mobileScrollElement : $(document);
    
    var scrollTimer;
    var autoScrolling = false;
    var lastScroll = 0;
    
    function scrollTo(where, duration){
                
        autoScrolling = true;
        
        $scrollElement.animate({
            scrollTop: where
        }, {
            duration: duration || 350,
            complete: function(){
                autoScrolling = false;
            }
        })
        
    }
    
    function scrollToSection(name, duration){
        var idx = sectionNames.indexOf( name );
        if(idx >= 0){
            scrollTo(idx * window.innerHeight, duration);
        }
    }
    
    function scrollToHash(hash, duration){
        scrollToSection( hash.substring(1), duration );
    }
    
    /*
    
    $scrollEventElement.on('scroll', function(){
        
        clearTimeout(scrollTimer);
        
        var position = $scrollPositionElement.scrollTop();
        var direction = position > lastScroll ? 1 : -1;
        lastScroll = position;
        
        if(!autoScrolling) {
            
            $scrollElement.stop();
        
            scrollTimer = setTimeout(function(){
                
                var target;
                
                if(direction === 1){
                    target = Math.ceil(lastScroll / window.innerHeight) * window.innerHeight;
                } else {
                    target = Math.floor(lastScroll / window.innerHeight) * window.innerHeight;
                }
                
                scrollTo(target);
                
            }, 300);
        
        }
        
    })
    
    */
    
    $('nav li a').each(function(){
        
        var $this = $(this);
        
        if( $this.attr('href') ) return;
        
        var section = $this.text().toLowerCase();
        
        var sectionIndex = sectionNames.indexOf( section );
        
        $this.click(function(e){
            e.preventDefault();
            stopShowreel();
            $menu.removeClass('open')
            scrollTo( window.innerHeight * sectionIndex );
        })
        
    })
    
    $('#home .arrow').click(function(e){
        e.stopPropagation();
        scrollTo( window.innerHeight );
    });
    
    if(location.hash.length > 1){
        
        scrollToHash( location.hash, 0 );
        location.hash = '';
        stopShowreel();
        
    } else if( $doc.scrollTop() <= 0 ) {
        
        startShowreel();
        
    }
    
})