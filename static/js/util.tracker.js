define( ['jquery'], function( $ ){

    var _touchYn;

    var tracker = {
        init : function(){
            var base = this;

            $('[data-trace-m]').on('click',function(e){
                e.preventDefault();
                base.sender( $(this).data('traceM')  , 'menu' );
            });

            $('[data-trace-c]').on('click',function(e){
                e.preventDefault();
                base.sender( $(this).data('traceC') , 'content' );
            });
        },

        sender : function( id, type ){
            if( !_touchYn ){
                _touchYn = $('body').data('touch');
            }

            var url = "http://beecastkioskapi.azurewebsites.net/GITService.svc/SetStatisticsKiosk";
            var sParams = "{\"StatisticsNo\":\"" + id
                + "\",\"Type\":\"" + type
                + "\",\"TouchYN\":\"" + _touchYn
                + "\"}";

            if( navigator.onLine ){
                $.ajax({
                    type: "POST",
                    url: url,
                    data: sParams,
                    contentType: "application/json",
                    dataType: "json"
                });
                console.log('[trace] '+id+','+type+','+_touchYn);
            }
        }
    };

    return tracker;

});
