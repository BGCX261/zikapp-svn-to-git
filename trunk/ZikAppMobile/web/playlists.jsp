
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html> 
    <jsp:include page="includes/headtag.jsp"/>
    <body> 
        <!-- PAGE PLAYLISTS ------------------------------------------------------>
        <div data-role="page" id="playlists">
            <jsp:include page="includes/header.jsp"/>
            <div data-role="content">   
                
                 <div data-role="collapsible" data-collapsed="false"  data-theme="b" data-content-theme="c">
                    <h2>My playlists</h2>
                    <ul class="INJECT_MY_PLAYLISTS" data-role="listview" data-split-icon="app-play" data-split-theme="d" id="trackList" data-filter="true">

                        <li>No playlist</li>
                    </ul>
                </div><!-- "collapsible -->
                
                    <div data-role="collapsible" data-theme="b" data-content-theme="c">
                    <h2>Playlists shared by XX</h2>
                    <ul class="INJECT_PLAYLISTS_XX" data-role="listview" data-split-icon="app-play" data-split-theme="d" id="trackList" data-filter="true">

                        <li>No playlist</li>
                    </ul>
                </div><!-- "collapsible -->
            </div><!-- /content -->
            <jsp:include page="includes/pop_footer.jsp"/>
        </div><!-- /page -->

    </body>
</html>