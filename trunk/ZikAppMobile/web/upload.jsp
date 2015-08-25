
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html> 
    <jsp:include page="includes/headtag.jsp"/>
    <body> 




        <!-- PAGE UPLOAD ------------------------------------------------------>
        <div data-role="page" id="upload">
            <script type="text/javascript" src="resources/lib/id3/jdataview.js" ></script>
            <script type="text/javascript" src="resources/js/cover.js"></script>
            <script type="text/javascript" src="resources/js/upload.js" ></script>
            <script type="text/javascript" src="resources/lib/lastfm/lastfm.api.md5.js"></script>
            <script type="text/javascript" src="resources/lib/lastfm/lastfm.api.js"></script>
            <script type="text/javascript" src="resources/lib/lastfm/lastfm.api.cache.js"></script>

            <jsp:include page="includes/header.jsp"/>

            <div data-role="content">   

                <form enctype="multipart/form-data" >
                    <h4>Choose track to upload:</h4>
                    <div data-role="fieldcontain">

                        <!-- TRACK FILE -->
                        <a href="#" data-role="button" data-mini="true"  data-inline="true" onClick="document.getElementById('track').click()" style="width: 100%;">Track file...</a>
                        <!-- this is your file input tag, so i hide it!-->
                        <div style='height: 0px;width:0px; overflow:hidden;'><input id="track" name="track" type="file"  data-clear-btn="true" onChange="onTrackFileChange();"/></div>
                    </div>

                    <div data-role="fieldcontain" style=" text-align:center; margin-left: auto ; margin-right: auto ;">
                        <img id="MY_ALBUM_COVER" name="coverimg" title="Click to change ..." src="resources/img/blank_cover.png" style="text-align: center; width: 50%; height:50% " onClick="onCoverImgClick();"/>


                    </div>

                    <div data-role="fieldcontain">
                        <table style=" margin-left: auto ; margin-right: auto ; width:100%">
                            <tr>
                                <td>
                                    <label data-mini="true" for="title" >Title:</label>
                                </td>
                                <td>
                                    <input data-mini="true" type="text" id="title" name="title" onclick="this.select()"/>
                                    <!-- CA FAIT TACHE ICI MAIS C'EST MOOOONSIEUR HAMINE QUI LE VEUT ASKE C UN GROS FLEMMARD -->
                                    <div id="COVER_INPUT" style='height: 0px;width:0px; overflow:hidden;'>
                                        <!-- PLACE POUR INPUT FILE COVER OU INPUT TEXT COVER_URL-->
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label data-mini="true" for="year" >Year:</label>
                                </td>
                                <td>
                                    <input data-mini="true" type="text" id="year" name="year" onclick="this.select()"/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label data-mini="true" for="style" class="select">Style :</label>
                                </td>
                                <td>
                                    <select data-mini="true" id="style" name="style" data-mini="true">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label data-mini="true" for="author">Author:</label>
                                </td>
                                <td>
                                    <input data-mini="true" type="text" id="author" name="author" onclick="this.select()"/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label data-mini="true" for="album">Album:</label>
                                </td>
                                <td>
                                    <input data-mini="true" type="text" id="album"  name="album" onclick="this.select()"/>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div data-role="fieldcontain">  
                        <a href="#upload_popup" data-rel="popup" data-role="button" data-mini="true"  data-inline="true" onClick="upload();" style="width: 100%;">Upload</a>
                        <div  data-role="popup" id="upload_popup" data-dismissible="false" data-shadow="true" data-position-to="window" data-overlay-theme="a"  >
                            <a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>
                            <div data-role="content" >
                                <h3>Upload status</h3>
                                <p> </p>
                                <progress data-mini="true"></progress>   <span id="loading" ></span>
                                <p> </p>
                                <a href="#" data-rel="back" data-role="button" data-theme="a">Ok</a>
                            </div>
                        </div><!-- popup-->
                    </div>

                </form>

            </div><!-- /content -->
            <jsp:include page="includes/pop_footer.jsp"/>
        </div><!-- /page -->

    </body>
</html>