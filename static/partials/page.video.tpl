        <section data-module="video" class="page page-video">
            <h1 class="page-tit"><%= data.menuname %></h1>
            <div class="page-inside">
                <div class="page-inside_half">
                    <div class="mod-video">
                        <video class="mod-video-view" src="" preload="auto"></video>
                        <button class="mod-video-toggle mod-video-play"></button>
                        <button class="mod-video-toggle mod-video-stop"></button>
                        <div class="mod-video-subtitle hide">
                            <div class="scroll-area">
                                <div class="text scroll-item"></div>
                            </div>
                            <div class="scroll-controls">
                                <button class="scroll-control scroll-control-up hide"></button>
                                <button class="scroll-control scroll-control-down hide"></button>
                            </div>
                        </div>
                    </div>
                    <button class="subtitle-toggle"></button>
                </div>
                <div class="page-inside_half">
                    <ul class="mod-list-thumb">
                        <% _.forEach( data.contents, function( item, index ){ %>
                            <li class="item">
                                <a data-src="<%= item.videoUrl %>" data-trace-c="<%= item.ContentNo %>">
                                    <img class="item-img" src="<%= item.thumbnailUrl %>" alt=""/>
                                    <div class="sr-only"><%= item.Description %></div>
                                </a>
                                <strong class="item-txt"><%= item.title %></strong>
                            </li>
                        <% }) %>
                    </ul>
                    <div class="mod-list-pager"></div>
                </div>
            </div>
        </section>
