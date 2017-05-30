// @file uiActivePage.js
// Dependency [ main.js ]
define(['jquery','lodash','uiListPageRolling','uiVideoPlayer', 'uiViewer' ,'uiTabs', 'uiFlipBook','uiTransition','uiScrollBtn' ], function( $, _, ListRolling ,Player, Viewer, Tabs, FlipBook, Transition, ScrollBtn ){

    var _beforePageIdx = null;
    var _initPage = 1;
    var transition;

    var page = {

        init : function(){
            //트랜지션 생성
            transition = new Transition();

            //페이지 모듈에 따라 스크립트 바인딩
            $('.page').each(function(index){
                var _this = this,
                    $this = $(this);
                var _moduleName = $this.data('module'),
                    _pageList = page.list[index+1] = {} ;

                ({
                    'story' : function(){
                        _pageList.listRoll = new ListRolling( _this );
                        _pageList.player = new Player( _this );
                    },

                    'event' : function(){
                        _pageList.flip = FlipBook;
                        _pageList.flip.init();
                    },

                    'product' : function(){
                        _pageList.listRoll = new ListRolling( _this );
                        _pageList.viewer = new Viewer( _this ,{
                            viewAreaClass : 'product-view_img',
                            itemListClass : 'mod-list-thumb',
                            contentType : 'image'
                        });
                        _pageList.scrollBtn = new ScrollBtn( _this );
                    },

                    'video' : function(){
                        _pageList.listRoll = new ListRolling( _this );
                        _pageList.player = new Player( _this , {
                            hasSubtitle : true
                        });
                        _pageList.scrollBtn = new ScrollBtn( _this );
                    },

                    'news' : function(){
                        _pageList.listRoll1 = new ListRolling( $this.find('.news-cont-brand') , {
                            listClassName : 'news-items',
                            showItemLen : 12
                        });

                        _pageList.listRoll2 = new ListRolling( $this.find('.news-cont-shopping') , {
                            listClassName : 'news-items',
                            showItemLen : 12
                        });

                        _pageList.viewer = new Viewer( _this ,{
                            viewAreaClass : 'news-view_iframe',
                            itemListClass : 'news-items',
                            contentType : 'iframe'
                        });

                        _pageList.tabs = new Tabs( _this , {
                            tabsClassName : 'news-tabs',
                            contClassName : 'news-cont'
                        });

                        _pageList.scrollBtn = new ScrollBtn( _this );
                    }
                })[_moduleName]();

            });
        },

        on : function( targetPageIdx, isAnimation ){
            var _this = this;
            _initPage = targetPageIdx || _beforePageIdx || 1;

            //console.log(_initPage + 'PAGE START');

            //현재페이지와 이전페이지가 같으면 중지
            if( _beforePageIdx == _initPage ){
             //   return false;
            }

            //이전페이지 스크립트들 off
            if( _beforePageIdx != _initPage ){
                _.forEach( _this.list[_beforePageIdx] , function( item ){
                    item.off();
                });
            }

            //새로운페이지 스크립트들 on
            _.forEach( _this.list[_initPage] , function( item ){
                item.on();
            });

            _beforePageIdx = _initPage;
            transition.go( _initPage, isAnimation );
        },

        reset : function(){
            var _this = this;
            _.forEach( _this.list[_beforePageIdx] , function( item ){
                item.off();
            });
//            console.log(_beforePageIdx + ' PAGE RESET');
        },

        list : {}

    };



    return page;

});