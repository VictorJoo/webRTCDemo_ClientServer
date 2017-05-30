// @file uiNotification.js
// Dependency [ main.js ]
define(['jquery', 'lodash'], function( $ , _ ){

    /**
     * 공지사항
     * @constructor
     */
    function Notice(){
        this.$notice = $('#l-notice');
        this.strWidth = 0;
    }

    Notice.prototype.getStrWidth = function( str, font ){
        var f = font || '45px',
            o = $('<div>' + str + '</div>')
                .css({'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font-size': f})
                .appendTo($('body')),
            w = o.width();
        o.remove();
        return w;
    };

    Notice.prototype.on = function( str ){
        var base = this;
        base.off();
        if(!str){
            return false;
        }

        base.strWidth = base.getStrWidth( str );

        var marqueeSpeed = parseInt( base.strWidth / 100 );

        marqueeSpeed = (marqueeSpeed < 10 ) ? 10 : marqueeSpeed;

        this.$notice.find('.l-notice_box').width( base.strWidth+'px' )
            .find('.l-notice_param').css({
                '-webkit-animation': 'marquee '+ marqueeSpeed +'s linear infinite',
                '-ms-animation': 'marquee '+ marqueeSpeed +'s linear infinite',
                'animation': 'marquee '+ marqueeSpeed +'s linear infinite'
            }).html( str );
        this.$notice.addClass('on');
    };

    Notice.prototype.off = function(){
        this.$notice.removeClass('on');
    };




    /**
     * 웰컴메시지
     * @constructor
     */
    var welcomeDefaults = {
        templateString : 'Dear ##Customer Name##, Welcome ##Dealer Name## \<br\> Your appointment time is ##Appointment Time##',
        itemDurationTime : 1000,
        lifeCycleTime : 10000
    };

    function Welcome( option ){
        this.$el = $('#l-welcome');
        this.index = 0;
        this.intervalTimer = null;
        this.lifeCycleTimer = null;
        this.dataArray = [];
        this.option = $.extend( {}, welcomeDefaults, option );

        this.init()
    }

    Welcome.prototype.init = function(){
        var tags = {
            name : '<span class="name"></span>',
            place : '<span class="place"></span>',
            time : '<span class="time12"></span>'
        };
        var tpl = this.option.templateString;

        tpl = tpl.replace( '##Customer Name##', tags.name ).replace( '##Dealer Name##', tags.place ).replace( '##Appointment Time##', tags.time );
        this.$el.find('.l-welcome_txt').html( tpl );
    };

    Welcome.prototype.replace = function(){
        var base = this,
            _index = base.index,
            _data = base.dataArray;

        if( _index >= _data.length){
            _index = 0;
        }

        base.$el.find('.name').text( _data[_index].name)
            .end().find('.place').text( _data[_index].place )
            .end().find('.time12').text( _data[_index].time );

        base.index = _index;
    };

    Welcome.prototype.on = function( info ){
        var base = this;
        base.off();
        if( _.isPlainObject( info ) ){
            base.dataArray.push( info );
        } else if (_.isArray( info ) ){
            base.dataArray = info;
        } else {
            $.error('ERROR : 전달된 웰컴메시지 정보가 Object 나 Array가 아님');
            return false;
        }


        if( base.dataArray.length ){
            base.replace();

            if( base.dataArray.length > 1){
                base.intervalTimer = setInterval(function(){
                    base.index++;
                    base.replace();
                }, base.option.itemDurationTime );
            }

            base.lifeCycleTimer = setTimeout( function(){
                base.off();
            }, base.option.lifeCycleTime );

            base.$el.addClass('on').find('.l-welcome_btn').one('click',function(){
                base.off();
            });
        }
    };

    Welcome.prototype.off = function(){
        clearInterval( this.intervalTimer );
        clearTimeout( this.lifeCycleTimer );
        this.intervalTimer = null;
        this.lifeCycleTimer = null;

        this.index = 0;
        this.dataArray = [];
        this.$el.removeClass('on');
    };





    return {
        Notice : Notice,
        Welcome : Welcome
    };
});
