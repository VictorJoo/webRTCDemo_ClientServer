
        <section data-module="story" class="page page-story">
            <h1 class="page-tit"><%= data.menuname %></h1>
            <div class="page-inside story">
                <div class="page-inside_half">
                    <div class="mod-video">
                        <video class="mod-video-view" src="" preload="auto"></video>
                        <button class="mod-video-toggle mod-video-play"></button>
                        <button class="mod-video-toggle mod-video-stop"></button>
                    </div>
                </div>
                <div class="page-inside_half">
                    <ul class="mod-list-thumb">
                        <% _.forEach( data.contents[0].tab1, function( item, index ){ %>
                            <li class="item">
                                <a data-src="<%= item.videoUrl %>" data-trace-c="<%= item.ContentNo %>"><img class="item-img" src="<%= item.thumbnailUrl %>" alt=""/></a>
                                <strong class="item-txt"><%= item.title %></strong>
                            </li>
                        <% }); %>
                    </ul>
                    <div class="mod-list-pager"></div>
                </div>
            </div>
        </section>
