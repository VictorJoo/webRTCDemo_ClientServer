// @file uiVideoPlayer.js
// Dependency [ uiActivePage.js ]

define( ['jquery'], function ( $ ){

    var defaults = {
        videoElClass : 'mod-video-view',
        listElClass : 'mod-list-thumb',
        playElClass : 'mod-video-play',
        stopElClass : 'mod-video-stop',
        subTitleElClass : 'mod-video-subtitle',
        subTitleToggle : 'subtitle-toggle',
        hasSubtitle : false
    };

    function VideoPlayer ( el, option ){
        var _this = this;

        _this.el = el;
        _this.$el = $( el );
        _this.option = $.extend( {}, defaults, option );

        _this.video = _this.$el.find('.'+ _this.option.videoElClass ).get(0);
        _this.$list = _this.$el.find('.'+ _this.option.listElClass );
        _this.$playBtn = _this.$el.find('.'+ _this.option.playElClass );
        _this.$stopBtn = _this.$el.find('.'+ _this.option.stopElClass );
        _this.$subtitle = _this.$el.find('.'+ _this.option.subTitleElClass );
        _this.$subTitleToggle = _this.$el.find('.'+ _this.option.subTitleToggle );

        _this.init();
    }

    VideoPlayer.prototype.init = function(){
        var _this = this;

        _this.$list.off('click').on('click','a',function(e){
            e.preventDefault();
            var $this = $(this),
                _videoSrc =  $this.data('src');
            if( _videoSrc ){
                _this.load( _videoSrc );
                _this.play();
            }

            if( _this.option.hasSubtitle ){
                //_this.$subtitle.empty().html( $this.find('.sr-only').html() );
                _this.$subtitle.find('.text').empty().html( $this.find('.sr-only').html() );
                _this.$subtitle.find('.scroll-area').trigger('scrollBtnChange');
            }
            $this.closest('li').addClass('on').siblings().removeClass('on');
        });

        $( _this.video ).on('click',function(){
            _this.stop();
        });

        _this.$playBtn.on('click',function(){
            _this.play();
        });


        _this.$subTitleToggle.on('click',function(){
            var $this = $(this);

            if( $this.hasClass('on') ){
                $this.removeClass('on');
                _this.$subtitle.addClass('hide');
            } else {
                $this.addClass('on');
                _this.$subtitle.removeClass('hide');
                _this.$subtitle.find('.scroll-control').addClass('hide');
                _this.$subtitle.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
                    _this.$subtitle.find('.scroll-area').trigger('scrollBtnChange');
                })
            }
        });
    };

    VideoPlayer.prototype.load = function( src ){
        this.video.src = src;
    };

    VideoPlayer.prototype.stop = function() {
        this.video.pause();
        this.$playBtn.show();
    };

    VideoPlayer.prototype.play = function() {
        this.video.play();
        this.$playBtn.fadeOut();
        this.$stopBtn.show().delay(300).fadeOut();

        $( this.video ).off('timeupdate').on('timeupdate',function(){
            var _time = this.currentTime.toFixed(0);
            
            if( (_time > 0) && (_time % 10 == 0) ) {
                if( UI.SS && UI.SS.isStageLoop ){
                    UI.SS.stageLoop( true );
                }
            }
        });

    };

    VideoPlayer.prototype.on = function() {
        this.$list.find('a').eq(0).click();
    };

    VideoPlayer.prototype.off = function() {
        this.stop();
    };


    return VideoPlayer;
});
