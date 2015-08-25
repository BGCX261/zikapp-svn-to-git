
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html> 
    <jsp:include page="includes/headtag.jsp"/>
    <body> 

        <!-- PAGE PLAYLIST DETAILS ------------------------------------------------------>
        <div data-role="page" id="playlist_details">
            <jsp:include page="includes/header.jsp"/>

            <div data-role="content" class="MY" >   
                <h3 class="INJECT_PLAYLIST_TITLE" style="text-align: center;">My playlist name</h3> 
                <!--<div class="MY-COLLAPSIBLE" data-role="collapsible" data-collapsed="false"  data-theme="b" data-content-theme="c">
                    <h3>Content</h3> -->
                    <ul class="INJECT_PLAYLIST_CONTENT" data-role="listview" data-split-icon="app-play" data-split-theme="d" >

                        <li>No track</li>
                    </ul>
                <!--</div><!-- "collapsible -->

            </div><!-- content -->
            <jsp:include page="includes/pop_footer.jsp"/>
        </div><!-- /page -->

    </body>
</html>