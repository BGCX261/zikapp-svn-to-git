
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html> 
    <jsp:include page="includes/headtag.jsp"/>
    <body> 

        <!-- PAGE LECTEUR ------------------------------------------------------>
        <div data-role="page" id="options">
            <jsp:include page="includes/header.jsp"/>
            <div data-role="content" >   
                <form enctype="multipart/form-data">
                    <table>
                        <tr>
                            <td><label for="server">ZikApp server:</label></td>
                            <td><input type="text" id="server" name="server" onclick="this.select()"/></td>
                        </tr>
                        <tr>
                            <td><label for="login">Login:</label></td>
                            <td><input type="text" id="login" name="login" onclick="this.select()"/></td>
                        </tr>
                        <tr>
                            <td><label for="password">Password:</label></td>
                            <td><input type="password" id="password" name="password" onclick="this.select()"/></td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <label for="opt1">Option 1</label>
                                <input type="checkbox" id="opt1" name="opt1"  />
                            </td>
                        </tr> 
                        <tr>
                            <td colspan="2">
                                <div data-role="fieldcontain">
                                    <label for="flip-2">Flip switch:</label>
                                    <select name="flip-2" id="flip-2" data-role="slider">
                                        <option value="nope">Off</option>
                                        <option value="yep">On</option>
                                    </select> 
                                </div>
                            </td> 
                        </tr> 
                    </table>
                </form>
            </div><!-- /content -->
            <jsp:include page="includes/pop_footer.jsp"/>
        </div><!-- /page -->


    </body>
</html>