define(['jquery'], function( $ ){

    var defaults = {
        handlerClass : 'scroll-handler',
        areaClass : 'scroll-area',
        itemClass : 'scroll-item',

        btnClass : 'scroll-control',
        upClass : 'scroll-control-up',
        downClass : 'scroll-control-down'
    };


    function Scroll( el , option ){
        this.el = el;
        this.$el = $(el);
        this.option = $.extend( {}, defaults, option );
        this.init();
    }

    Scroll.prototype.init = function() {
        this.$area = this.$el.find('.'+ this.option.areaClass );
        this.$item = this.$el.find('.'+ this.option.itemClass );
        this.$btns = this.$el.find('.'+ this.option.btnClass );
        this.$up = this.$el.find('.'+ this.option.upClass );
        this.$down = this.$el.find('.'+ this.option.downClass );

        this.revert();
    };

    /**
     * 초기화
     * area의 scroll좌표를 0 으로 셋팅
     * btn에 hide클래스 추가 및 on클래스 제거
     */
    Scroll.prototype.revert = function(){
        this.$btns.addClass('hide').removeClass('on');
        this.$area.scrollTop(0);
    };

    /**
     * [1]
     * area 높이에서 item 높이를 빼
     * 값이 0 보다 작으면 hide 클래스 제거
     */
    Scroll.prototype.initBtn = function(){
        var base = this;

        var _tagName = base.$item.get(0).tagName.toLowerCase();
        var _init = function(){
            var maxRange = base.$area.filter(':visible').outerHeight() - base.$item.filter(':visible').outerHeight();
            if( maxRange < 0 ){
                base.$area.filter(':visible').data('maxRange',maxRange);
                base.$btns.removeClass('hide');
                base.changeBtn( maxRange );
            }
        };

        if( _tagName === 'img' || _tagName === 'iframe'){
            _init();
            base.$item.filter(':visible').load(function(){
//                _init();
            });
        } else {
            _init();
        }

    };

    /**
     * [1]의 상황이 만족한다는 전제
     * area의 스크롤 좌표에 따른 버튼상태변화
     * 버튼에 on클래스 추가
     * 스크롤 좌표가 0이면 up에 on클래스 제거
     * 스크롤 좌표가 maxRange([1]에서 나온값) 과 같으면 down에 on클래스 제거
     */
    Scroll.prototype.changeBtn = function( _rangeVal ){
        var _$area = this.$area.filter(':visible');

        var _areaScrollVal= _$area.scrollTop();
        _rangeVal = _rangeVal || _$area.data('maxRange');

        this.$btns.addClass('on');

        if( _areaScrollVal == 0 ){
            this.$up.removeClass('on');
        } else if( _areaScrollVal >= Math.abs(_rangeVal) ){
            this.$down.removeClass('on');
        }
    };

    /**
     * Area스크롤 애니메이션
     * @param _ypos
     */
    Scroll.prototype.changeYpos = function( _ypos ){
        var base = this;
        var _$area = base.$area.filter(':visible');

        _$area.stop().animate({'scrollTop' : '+='+_ypos+'px' }, 400,function(){
            base.changeBtn();
        });
    };

    Scroll.prototype._eventOn = function(){
        var base = this;
        var _scrollTimer = null;

        base.$up.on('click',function(){
            if( $(this).hasClass('on') ){
                base.changeYpos( -100 );
            }
        });

        base.$down.on('click',function(){
            if( $(this).hasClass('on') ){
                base.changeYpos( 100 );
            }
        });

        base.$area.on('scrollBtnChange',function(e){
            e.stopPropagation();
            e.preventDefault();
            base.refresh();
        });

        base.$area.on('scroll',function(){
            setTimeout(_scrollTimer);
            _scrollTimer = null;
            _scrollTimer = setTimeout(function(){
                base.changeBtn();
            },400);
        })
    };

    Scroll.prototype._eventOff = function(){
        this.$up.off('click');
        this.$down.off('click');
        this.$area.off('scrollBtnChange');
        this.$area.off('scroll');
    };

    Scroll.prototype.refresh = function(){
        this.off();
        this.on();
    };

    Scroll.prototype.on = function(){
        this.initBtn();
        this._eventOn();
    };

    Scroll.prototype.off = function(){
        this.revert();
        this._eventOff();
    };
    return Scroll;
});
