// @file uiViewer.js
// Dependency [ uiActivePage.js ]

define( ['jquery'], function( $ ){

    var defaults = {
        viewAreaClass : '',
        itemListClass : '',
        contentType : 'image'
    };

    function Viewer( el, option ){
        this.el = el;
        this.$el = $( el );
        this.option = $.extend( {}, defaults, option );

        this.init();
    }

    Viewer.prototype.init = function(){
        var _this = this;
        _this.$viewer = _this.$el.find('.'+ _this.option.viewAreaClass );
        _this.$list = _this.$el.find('.'+ _this.option.itemListClass );


        _this.$list.on('click','a',function( e ){
            e.preventDefault();
            e.stopPropagation();
            var $this = $(this);
            _this.$list.find('li').removeClass('on');
            $this.closest('li').addClass('on');
            _this.$viewer.css({ 'opacity' : '0' , 'height' : 'auto' }).attr('src', $this.data('src') );
        });

        _this.$viewer.on('load',function( ){

            if( _this.option.contentType == 'iframe' ){
                _this.iframeSetHeight();
            }

            if( _this.option.contentType == 'image' ){
                _this.$viewer.stop().animate( {'opacity' : 1} ,600 );
            }
            $(this).trigger('scrollBtnChange');
        });

    };

    Viewer.prototype.iframeSetHeight = function( callback ){
        var $iframe = this.$viewer.contents().find('body');

        this.$viewer.height( $iframe.height() ).animate( {'opacity' : 1} ,600 );
        callback && callback();
    };

    Viewer.prototype.on = function(){
        this.$list.find('a').eq( 0 ).click();
    };

    Viewer.prototype.off = function(){

    };

    return Viewer;
});
