define(['jquery','lodash','../data/meta','../data/data'],function( $, _ ){
    var dataObj,
        _META = meta_data,
        _META_settings = _META.personal_info[0],
        _PAGE = bindingdata,
        _langType = (function(){
            if( _META_settings.Language == 'en'){
                return 'eng';
            } else {
                return 'mylang'
            }
        })();

    dataObj = {
        base : {},
        ss : {},
        notice : {},
        welcome : {},
        page : {
            navigation : [],
            section : []
        }
    };

    dataObj.base.lang = _META_settings.Language;
    dataObj.base.touch = _META_settings.TouchMode;
    dataObj.base.cursor = _META_settings.Cursor;

    dataObj.ss.active = _META_settings.ScreenSaverMode;
    dataObj.ss.lifeTime = _META_settings.ScreenSaverSec;
    dataObj.ss.items = _META.screensaver;

    dataObj.notice.active = _META_settings.Notice;
    dataObj.notice.startDate = _META_settings.NoticeStartDate;
    dataObj.notice.startTime = _META_settings.NoticeStartTime;
    dataObj.notice.endDate = _META_settings.NoticeEndDate;
    dataObj.notice.endTime = _META_settings.NoticeEndTime;
    dataObj.notice.message = ( _META.notice_message[0] ) ? _META.notice_message[0][_langType] : '';

    dataObj.welcome.active = _META_settings.WelcomeMessageYN;
    dataObj.welcome.lifeTime = _META_settings.WelcomeDuration;
    dataObj.welcome.itemTime = _META_settings.WelcomeTrasitionTime;
    dataObj.welcome.template = _META_settings.WelcomeMessage;

    dataObj.page.navigation = _META['menu_bottom_'+_langType];
    dataObj.page.section = _META['menu_bottom_'+_langType];

    _.forEach( dataObj.page.section , function( item ){
        item.contents = _PAGE[ item.menuname ]
    });

    delete meta_data;
    delete bindingdata;

    return ( dataObj );
});
