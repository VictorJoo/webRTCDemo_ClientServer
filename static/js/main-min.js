require.config({
    baseUrl: 'static/js/',
    paths: {
        jquery : 'vendor/jquery.2.1.3.min',
        jqueryUI : 'vendor/jquery-ui.min',
        lodash : 'vendor/lodash.min',
        swipe : 'vendor/jquery.touchSwipe.min',
        easing : 'vendor/jquery.easing.1.3',
        booklet : 'vendor/jquery.booklet.latest',

        utilDataCompiler : 'util.dataCompiler',
        utilTracker : 'util.tracker',
        utilTemplate : 'util.template',

        uiScreenSaver : 'ui.screenSaver',
        uiNotification : 'ui.notification',

        uiTransition : 'ui.transition',
        uiActivePage : 'ui.activePage',
        uiListPageRolling : 'ui.listPageRolling',
        uiVideoPlayer : 'ui.videoPlayer',
        uiViewer : 'ui.viewer',
        uiTabs : 'ui.tabs',
        uiFlipBook : 'ui.flipBook',
        uiScrollBtn : 'ui.scrollbtn'
    },
    shim:{
        'booklet':{
            deps: ['jquery', 'jqueryUI'],
            exports : 'booklet'
        },
        'swipe' : {
            deps: ['jquery']
        }
    }
});

define(['jquery','lodash','utilTemplate','uiActivePage', 'uiScreenSaver' ,'uiNotification' ,'utilTracker' ],function( $, _, template, PAGE , SCREENSAVER , Notification, tracker){

    var _dataObj = template.dataObj;

    console.dir(_dataObj);

    template.init( function(){

        PAGE.init();
        PAGE.on( 1, false );

        window.UI = {};
        window.UI.PAGE = PAGE;

        //스크린세이버 생성
        if( _dataObj.ss.active == "ON" && _dataObj.ss.items.length ){

            window.UI.SS = new SCREENSAVER({
                lifeCycleTime : _dataObj.ss.lifeTime
            });
            window.UI.SS.on();

        }

        //공지사항 생성
        (function(){
            if( _dataObj.notice.active == "ON" && _dataObj.notice.message ){
                var _now = new Date(),
                    _noticeStartTime = new Date( _dataObj.notice.startDate +' '+ _dataObj.notice.startTime ),
                    _noticeEndTime = new Date( _dataObj.notice.endDate +' '+ _dataObj.notice.endTime );

                if( _now >= _noticeStartTime && _now <= _noticeEndTime ){
                    window.UI.NOTICE = new Notification.Notice();
                    window.UI.NOTICE.on( _dataObj.notice.message );
                }
            }
        })();

        //웰컴 생성
        if( _dataObj.welcome.active == "ON" ) {

            window.UI.WELCOME = new Notification.Welcome({
                templateString : _dataObj.welcome.template,
                itemDurationTime : _dataObj.welcome.itemTime,
                lifeCycleTime : _dataObj.welcome.lifeTime
            });

        }

        (function(){
            // NAV 바인딩
            $('#l-nav').on( 'click', 'a', function(e){
                e.preventDefault();
                PAGE.on( $(this).closest('li').index()+1 );
            });

            // 트래커 바인딩
            tracker.init();

            //로딩스핀 숨김
            $('#loading').addClass('ended');

        })();
		
		// call
		(function(){
			$(".call-layer-view").on("click", function(){
				
				var roomunmber = Math.floor(Math.random() * 100000) + 1;
				console.log(roomunmber);
				$(".layer-call").show();
		$(".layer-call").append("<iframe class='callview' onload='resizeIframe(this)' src='https://stisthefaceshop.koreacentral.cloudapp.azure.com:8543/web/index.html?roomid=가산'></iframe>");
				//$(".layer-call").append("<div class='txtcall'>연결 중 입니다...</div>");
			

				UI.SS.stageLoop(false)
				
				$("body").find('video').each(function(){
					$(this).get(0).pause();
				});
			
				return false;
			});
			
			$(".layer-call .btn-close").on("click", function(){
				$(".layer-call").hide();
				$(".callview").remove();
			check_end = 0;		
				UI.SS.off();
				
				return false;
			});
			
			$(".call-icon-view").on("click", function(){
				if($(this).hasClass("active") == false){
					$(this).addClass("active");
				} else {
					$(this).removeClass("active");
				}
			});
		})();
    });

    window.addEventListener("contextmenu", function (e) {e.preventDefault(); } ,false);
    window.addEventListener("MSHoldVisual", function (e) {e.preventDefault(); } ,false);
    window.addEventListener("MSGestureHold",function (e) {e.preventDefault(); },false );
});
