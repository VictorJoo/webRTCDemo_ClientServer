// @file uiScreenSaver.js
// Dependency [ main.js ]

define(['jquery', 'lodash', 'utilTracker'],function( $ , _, tracker ){

    var defaults = {
        itemClassName : 'ss-item',
        lifeCycleTime : 100000,
        itemDurationTime : {
            html : 5,
            image : 5,
            video : 5,
            etc : 10
        }
    };

    /**
     * 스크린세이버
     * @param option
     * @constructor
     */
    function ScreenSaver( option ){
        this.$el = $('#ss');
        this.option = $.extend( {}, defaults, option );
        this.index = 0;
        this.itemTypes = [];
        this.timer = {
            stage : null,
            item : null
        };
        this.isStageLoop = false;
        this.init();

    }

    ScreenSaver.prototype.init = function(){
        var base = this;
        base.$items = base.$el.find('.' + base.option.itemClassName );
        base.itemLen = base.$items.length;

        $.each( base.$items, function( index ){
            base.itemTypes[index] = $(this).data('type').toLowerCase();
        });
    };

    /*
     * 스크린세이버 윈도우 루프
     */
    ScreenSaver.prototype.stageLoop = function( _isLoop ){
        var base = this;
        clearTimeout( base.timer.stage );
        base.timer.stage = null;
        base.isStageLoop = false;

        if( _isLoop ){
            base.isStageLoop = true;
            base.timer.stage = setInterval(function(){
                if( base.$el.is(':hidden') ){
                    base.on();
                }

            }, base.option.lifeCycleTime );

            $('body').off( 'click' ).on( 'click' ,function( e ){
                e.stopPropagation();
                if( base.$el.is(':hidden')){
                    base.stageLoop( true );
                }
            });
        } else {
			
		}
    };

    /*
     * 스크린세이버를OFF시키기전에,
     * Item루프를 중단하고, 재생중인 영상도 정지시킴
     */
    ScreenSaver.prototype.itemLoopStop = function(){
        var base = this;

        clearTimeout( base.timer.item );
        base.timer.item = null;

        base.$items.find('video').each(function(){
            $(this).get(0).pause();
        });
    };


    /*
     * Item의 타입에 따른 실행부
     */
    ScreenSaver.prototype.itemChange = function(){
        var base = this;

        var _index =  ( base.index >= base.itemLen ) ? 0 : base.index,
            _target = base.$items.eq( _index ),
            _type = base.itemTypes[ _index ],
            _duration = _target.data('time') || base.option.itemDurationTime[ _type ];

        _duration = _duration*1000;

        clearTimeout( base.timer.item );
        base.timer.item = null;

        ({
            'html' : function(){
                base.timer.item = setTimeout( function(){
                    base.itemChange();
                }, _duration );
            },

            'image' : function(){
                this.html();
            },

            'video' : function(){
                var videoEl = _target.find('video').get(0);
                videoEl.src = videoEl.src;
                videoEl.play();

                $( videoEl ).off('ended').on({
                    'ended' : function() {
                        base.itemChange();
                    }
                });

            },

            'etc' : function(){
                base.off();
                base.timer.item = setTimeout(function(){
                    base.on();
                }, _duration );
            }

        })[_type]();

        base.index = _index+1;
        _target.addClass('on').siblings().removeClass('on');
        tracker.sender( _target.data('traceC'), 'content' );
    };


    ScreenSaver.prototype.on = function(){
        var base = this;

		if($(".layer-call").is(":hidden")){
			base.$el.show().off('click').on('click',function( e ){
				base.off();
				$(this).off('click');
				e.preventDefault();
				e.stopPropagation();
			});
			base.itemChange();
			base.stageLoop( false );
			
			UI.PAGE.reset();
		}
    };

    ScreenSaver.prototype.off = function(){
        var base = this;

        base.$el.hide();
        base.itemLoopStop();
        base.stageLoop( true );
        UI.PAGE.on();
    };


    return ScreenSaver;
});
