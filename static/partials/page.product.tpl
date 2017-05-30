
        <section data-module="product" class="page page-product">
            <h1 class="page-tit"><%= data.menuname %></h1>
            <div class="page-inside">
                <div class="page-inside_half">
                    <div class="product-view scroll-area">
                        <img class="product-view_img scroll-item" src="" alt=""/>
                    </div>
                    <div class="scroll-controls">
                        <button class="scroll-control scroll-control-up hide"></button>
                        <button class="scroll-control scroll-control-down hide"></button>
                    </div>
                </div>
                <div class="page-inside_half">
                    <ul class="mod-list-thumb">
                        <% _.forEach( data.contents, function( item, index ){ %>
                            <li class="item">
                                <a data-src="<%= item.imageUrl %>" data-trace-c="<%= item.ContentNo %>"><img class="item-img" src="<%= item.thumbnailUrl %>" alt=""/></a>
                                <strong class="item-txt"><%= item.title %></strong>
                            </li>
                        <% }) %>
                    </ul>
                    <div class="mod-list-pager"></div>
                </div>
            </div>
        </section>
