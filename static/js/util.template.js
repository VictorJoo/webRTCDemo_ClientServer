// @file template.js
// Dependency [ main.js ]
define( ['jquery', 'lodash', 'utilDataCompiler'],  function( $, _ , dataObj ){

    /**
     * 전달된 tpl파일에 데이터를 반영하여 DOM 생성
     * @param $target
     * @param templatePath
     * @param data
     */
    var dataPlacement = function( $target, templatePath, data ){
        $.ajax({
            url : 'static/partials/'+templatePath+'.tpl',
            async : false,
            dataType : 'html',
            success : function(template){
                var _template = _.template(template);
                $target.append( _template( data ) );
            }
        });
    };

    //터치모드 및 커서모드 바인딩
    var baseSetting = function(){
        var $body = $('body');

        if( dataObj.base.cursor.toLowerCase() == 'off' ){
            $body.addClass('no-cursor');
            $body.data('cursor','N');
        } else {
            $body.data('cursor','Y');
        }

        $body.data('touch',(dataObj.base.touch.toLowerCase() == 'touch') ? 'Y' : 'N');
    };

    //네비게이션 생성
    var makeNavigation = function(){
        dataPlacement( $('body'), 'navigation', { 'items' : dataObj.page.navigation } );
    };

    //스크린세이버 생성
    var makeScreenSaver = function(){

        if( dataObj.ss.items.length ) {
            dataPlacement( $('body'), 'screenSaver', { 'items' : dataObj.ss.items } );
        }

    };

    //각 페이지 생성
    var makePages = function(){

        var getTplName = function( templateNo ){
            return ({
                //Brand Story
                'B02' : 'page.story',
                //New Product
                'B03' : 'page.product',
                //Event
                'B04' : 'page.event',
                //Video
                'B05' : 'page.video',
                //News
                'B06' : 'page.news'
            })[ templateNo ];
        };

        _.forEach( dataObj.page.section , function( page ){
            dataPlacement( $('#l-wrap'), getTplName( page.templateNo ), { 'data' : page } );
        });

    };

    return {

        init : function( callback ){
            $.when(
                baseSetting(), makeNavigation(), makeScreenSaver(), makePages()
            ).then(function(){
                callback && callback();
            });
        },

        dataObj : dataObj

    }
});
