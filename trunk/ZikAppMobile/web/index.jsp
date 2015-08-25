<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html> 
    <jsp:include page="includes/headtag.jsp"/>
    <body> 
        <!-- INDEX POINT D'ACCES UNIQUE ------------------------------------------------------>
        <div data-role="page" id="index"  >


            <jsp:include page="includes/header.jsp"/>
            <div data-role="content"style=" height: auto; text-align: center;">   
                <h1>  ZikApp </h1>
                <h2> My MUSIC is anywere!</h2>
                <br/>

                <p><a href="tracks.jsp" data-role="button" data-theme="c"  data-inline="true" style="text-align: center; width:100%;" >Try it ! &gt;</a></p>
            </div><!-- /content -->

            <jsp:include page="includes/pop_footer.jsp"/>
        </div><!-- /page -->

    </body>
</html>