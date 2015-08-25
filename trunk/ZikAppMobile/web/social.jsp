
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html> 
    <jsp:include page="includes/headtag.jsp"/>
    <body> 

        <!-- PAGE MORCEAUX ------------------------------------------------------>
        <div data-role="page" id="social" style="height: 20%;">
            <jsp:include page="includes/header.jsp"/>
            <div  data-role="content" >   
                <ul class="INJECT_ME" data-role="listview" data-split-icon="app-play" data-split-theme="d" id="trackList" data-filter="true">
                    <li> No friend</li>
                </ul>
            </div><!-- /content -->
            <jsp:include page="includes/pop_footer.jsp"/>
        </div><!-- /page -->

    </body>
</html>