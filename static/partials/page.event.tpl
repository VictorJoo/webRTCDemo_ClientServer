<section data-module="event" class="page page-event">
    <h1 class="page-tit"><%= data.menuname %></h1>
    <div class="eventFlip">
        <% _.forEach( data.contents, function( item, index ){ %>
            <div data-trace-c="<%= item.ContentNo %>"><img src="<%= item.Url %>" alt=""/></div>
        <% }); %>
     </div>
</section>
