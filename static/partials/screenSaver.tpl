<section id="ss" class="ss">
    <div class="ss-frame">
        <ul class="ss-list">
            <% _.forEach( items, function( item ,index ){ %>
                <li class="ss-item" data-type="<%= item.type %>" data-time="<%= item.datatime %>" data-trace-c="<%= item.ContentNo %>">
                    <% if ( item.type == 'image' ) { %>
                        <img src="<%= item.url %>" alt=""/>
                    <% } else if ( item.type == 'video' ) { %>
                        <video class="video" src="<%= item.url %>" preload="auto"></video>
                    <% } %>
                </li>
            <% }); %>
        </ul>
    </div>
    <span class="ss-touch">
        <i class="ss-touch-hand"><img src="static/image/common/ss-touch.png" alt=""/></i>
        <i class="ss-touch-circle"></i>
    </span>
</section>
