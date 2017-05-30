
        <section data-module="news" class="page page-news">
            <h1 class="page-tit"><%= data.menuname %></h1>
            <div class="page-inside">
                <div class="page-inside_half">
                    <div class="news-view scroll-area">
                        <iframe class="news-view_iframe scroll-item" src="" scrolling="no" frameborder="0" marginwidth="0" marginheight="0" ></iframe>
                    </div>
                    <div class="scroll-controls">
                        <button class="scroll-control scroll-control-up hide"></button>
                        <button class="scroll-control scroll-control-down hide"></button>
                    </div>
                </div>
                <div class="page-inside_half">
                    <div class="news-list">
                        <ul class="news-tabs">
                            <li class="news-tabs_brand on"><a><span class="news-tabs_txt"><%= data.title1 %></span></a></li>
                            <li class="news-tabs_shopping"><a><span class="news-tabs_txt"><%= data.title2 %></span></a></li>
                        </ul>

                        <div class="news-cont news-cont-brand">
                            <ul class="news-items">
                                <% _.forEach( data.contents[0].tab1, function( item, index ) { %>
                                    <li class="item"><a data-src="<%= item.imageUrl %>" data-trace-c="<%= item.ContentNo %>"><span class="txt"><%= item.title1 %><% if(item.title2){ %><br><%= item.title2%><% }; %></span></a></li>
                                <% }); %>
                            </ul>
                            <div class="mod-list-pager"></div>
                        </div>

                        <div class="news-cont news-cont-shopping"style="display:none;">
                            <ul class="news-items">
                                <% _.forEach( data.contents[0].tab2, function( item, index ) { %>
                                    <li class="item"><a data-src="<%= item.imageUrl %>" data-trace-c="<%= item.ContentNo %>"><span class="txt"><%= item.title1 %><% if(item.title2){ %><br><%= item.title2%><% }; %></span></a></li>
                                <% }); %>
                            </ul>
                            <div class="mod-list-pager"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
