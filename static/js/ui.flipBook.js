// @file uiFlipBook.js
// Dependency [ uiActivePage.js ]
define( ['jquery','jqueryUI', 'booklet'], function( $ ){
    var book;
    var flipBook = {

        init : function(){
            book = $('.eventFlip').booklet({
                width : '1675px',
                height : '594px',

                pagePadding: 0,
                overlays : true,
                pageNumbers : false,
                arrows: false,

                manual : false,
                shadows : true,

                easing : 'easeInOutCubic',
                easeIn : 'easeInCubic',
                easeOut : 'easeOutCubic'
            });
        },

        on : function(){

        },

        off : function(){
            book.booklet('gotopage',0);
        }
    };


    return flipBook;
});
