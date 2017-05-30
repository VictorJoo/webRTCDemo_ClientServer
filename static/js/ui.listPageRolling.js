// @file uiListPageRolling.js
// Dependency [ uiActivePage.js ]
define( ['jquery','swipe'], function( $ ){

    var defaults = {
        listClassName : 'mod-list-thumb',
        pagerClassName : 'mod-list-pager',
        dotClassName : 'dot',
        dotActiveClassName : 'dot-current',
        showItemLen : 9,
        transitionTimeMs : 800,
        hasInterval : false,
        intervalTimeMs : 5000
    };

    function MakeListPaging( el, option ){
        this.el = el;
        this.$el = $(el);
        this.option = $.extend( {}, defaults, option );
        this.currentIdx = 1;
        this.intervalTimer = null;
        this.totalPageLen = null;

        this.init();
    }


    MakeListPaging.prototype.init = function(){
        var _this = this;
        this.$listItem = this.$el.find('.'+ this.option.listClassName ).children();
        this.$pager = this.$el.find('.'+ this.option.pagerClassName);
        this.totalPageLen = Math.ceil( this.$listItem.length / this.option.showItemLen );

        if( this.totalPageLen > 1 ){

            // Dots Generation
            this.makePager();

            // SWIPE Event
            this.$el.swipe( {
                swipe:function(event, direction) {
                    if(direction == 'left'){
                        _this.next();
                    }
                    if(direction == 'right'){
                        _this.prev();
                    }
                },
                excludedElements: ""
            });

            // Dots Click Event
            this.$pager.on('click','a',function(e){
                e.preventDefault();
                _this.showPage( $(this).index()+1 );
            });

        } else {

            this.option.hasInterval = false;

        }

    };

    /**
     * 페이지네비게이션 생성
     */
    MakeListPaging.prototype.makePager = function(){
        var _pageLen = this.totalPageLen,
            tmpArray = [];

        for (var i= 0; i < _pageLen; i++ ){
            tmpArray.push('<a class="dot" href="#"><span class="sr-only">'+ (i+1) +'페이지</span></a>');
        }

        this.$pager.html( tmpArray.join('') );
        this.$dots = this.$pager.find( '.'+ this.option.dotClassName );

    };

    /**
     * 인덱스 페이시 활성화
     * @param targetIndex 페이지인덱스 시작값 {Number : 1}
     */
    MakeListPaging.prototype.showPage = function( targetIndex ){
        this.currentIdx = targetIndex;
        targetIndex = targetIndex-1;

        var _startRange = targetIndex * this.option.showItemLen,
            _endRange = _startRange + this.option.showItemLen;

        this.$listItem.hide().slice( _startRange, _endRange).fadeIn( this.option.transitionTimeMs );
        if( this.$dots ){
            this.$dots.removeClass( this.option.dotActiveClassName ).eq( targetIndex ).addClass( this.option.dotActiveClassName );
        }
    };

    /**
     * 이전페이지 보기
     */
    MakeListPaging.prototype.prev = function(){
        var _targetPage =  this.currentIdx-1;

        if( _targetPage <= 0 ){
            _targetPage = this.totalPageLen;
        }
        this.showPage( _targetPage );
    };

    /**
     * 다음 페이지 보기
     */
    MakeListPaging.prototype.next = function(){
        var _targetPage =  this.currentIdx+1;

        if( this.currentIdx >= this.totalPageLen ){
            _targetPage = 1
        }
        this.showPage( _targetPage );
    };

    /**
     * 페이지 오토루프
     * @param flag    // true : loop start , false : loop stop
     */
    MakeListPaging.prototype.interval = function( flag ){
        var _this = this;

        clearInterval( _this.intervalTimer );
        _this.intervalTimer = null;

        if( flag ){
            _this.intervalTimer = setInterval( function(){
                _this.next();
            }, this.option.intervalTimeMs );
        }
    };

    MakeListPaging.prototype.on = function(){
        this.showPage( 1 );
        this.interval( this.option.hasInterval );

    };

    MakeListPaging.prototype.off = function(){
        this.interval( false );
    };

    return MakeListPaging;
});
