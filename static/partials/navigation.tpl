<%
    var iconName = function( templateNo ){
        return ({
            'B02' : 'home',
            'B03' : 'newProd',
            'B04' : 'event',
            'B05' : 'video',
            'B06' : 'news'
        })[ templateNo ];
    };
%>

<nav id="l-nav" class="l-nav">
    <ul class="nav-list">
        <% _.forEach( items , function( item, index ){ %>
            <li class="nav-item nav-item-0<%- index+1 %>"><a data-trace-m="<%= item.menuNo %>"><img class="nav-item_ico" src="static/image/common/nav-icon-<%- iconName(item.templateNo) %>.png" alt=""/><span class="nav-item_txt"><%= item.menuname %></span></a></li>
        <% }) %>
		<li class="nav-item nav-item-06"><a data-trace-m="14" class="call-layer-view"><img class="nav-item_ico" src="static/image/common/nav-icon-call.png" alt=""><span class="nav-item_txt">CALL</span></a></li>
    </ul>
</nav>
