// @file uiTabs.js
// Dependency [ uiActivePage.js ]
define( ['jquery'], function( $ ){
    var defaults = {
        tabsClassName : 'news-tabs',
        contClassName : 'news-cont'
    };

    function Tabs ( el, option ){
        this.el = el;
        this.$el = $( el );
        this.option = $.extend( {}, defaults, option );

        this.init();
    }

    Tabs.prototype.init = function(){

        var $tabs = this.$el.find('.'+this.option.tabsClassName),
            $conts = this.$el.find('.'+this.option.contClassName);


        $tabs.on('click', 'a' , function(e){
            e.preventDefault();
            var $self = $(this).closest('li');

            if( !$self.hasClass('on') ){
                $self.addClass('on').siblings().removeClass('on');
                $conts.hide().eq( $self.index() ).fadeIn(  );
            }

        })
    };

    Tabs.prototype.on = function(){
        this.$el.find('.'+this.option.tabsClassName).find('a').eq(0).click();
    };

    Tabs.prototype.off = function(){

    };

    return Tabs;
});
