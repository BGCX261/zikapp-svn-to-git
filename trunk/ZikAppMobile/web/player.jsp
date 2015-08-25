
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html> 
    <jsp:include page="includes/headtag.jsp"/>
    <body> 
        <body> 
            <!-- PLAYER ------------------------------------------------------>
            <style>
                @media all   {
                    .my-breakpoint.ui-grid-a .ui-block-a { width: 32%; }
                    .my-breakpoint.ui-grid-a .ui-block-b { width: 68%; }
                }
            </style>
            <div data-role="page" id="player">
                <jsp:include page="includes/header.jsp"/>

                <div  data-role="content" calss="my-breakpoint"  >   




                    <div data-role="collapsible" data-mini="true"  data-collapsed="false" data-theme="b" data-content-theme="b">
                        <h3>Playing ...</h3>

                        <fieldset data-role="fieldcontain"  class="ui-grid-a ">
                            <div class="ui-block-a" >
                                <div class="INJECT_COVER">
                                    <img src="" style="width: 100px; height:100px;"/>
                                </div>
                            </div><!-- ui-block-a -->

                            <fieldset class="ui-block-b">
                                <div class="INJECT_CURRENT_TRACK_DETAILS" >
                                    <table>
                                        <tr>
                                            <td><label for="title">Title:</label></td>
                                            <td><input data-mini="true" type="text" readonly  name="title" value="'+item.name+'" /></td>
                                        </tr>
                                        <tr>
                                            <td><label for="author">Album:</label></td>
                                            <td><input data-mini="true" type="text" readonly name="author" value="'+item.album+'" /></td>
                                        </tr>
                                        <tr>
                                            <td><label for="year">Year:</label></td>
                                            <td><input data-mini="true" type="text" readonly name="year" value="'+item.years+'" /></td>
                                        </tr>
                                        <tr>
                                            <td><label for="author">Author:</label></td>
                                            <td><input data-mini="true" type="text" readonly name="author" value="'+item.author+'" /></td>
                                        </tr>
                                        <tr>
                                            <td><label for="style">Style:</label></td>
                                            <td><input data-mini="true" type="text" readonly name="style" value="'+item.style+'" /></td>
                                        </tr>
                                    </table>
                                </div>
                            </fieldset><!-- ui-block-b -->
                        </fieldset><!-- ui-grid-a --> 
                    </div>

                    <div data-role="collapsible" data-mini="true" data-theme="b" data-content-theme="b">
                        <h3>Play options</h3>
                        <style>
                            .my-player-options .ui-btn .ui-btn-inner { padding-top: 30px !important; }
                            .my-player-options .ui-btn .ui-icon { width: 30px!important; height: 30px!important; margin-left: -15px !important; box-shadow: none!important; -moz-box-shadow: none!important; -webkit-box-shadow: none!important; -webkit-border-radius: 0 !important; border-radius: 0 !important; }
                            .ui-icon-my-player-options-shuffle { background:  url(resources/img/shuffle.png)  50% 50% no-repeat;  background-size: 22px 22px; }
                            .ui-icon-my-player-options-repeat .ui-icon { background:  url(resources/img/repeat.png)  50% 50% no-repeat;  background-size: 22px 22px; }
                              
                        </style>

                        <div class="my-player-options"  data-role="controlgroup"  data-type="horizontal">
                            
                            <a id="tstBtn" href="#" data-role="button" data-theme="c" data-iconpos="notext" data-theme="a" data-inline="true" onmouseout="togleOptionRepeat();">Repeat</a>
                            <a href="#" data-role="button" data-theme="c"   data-iconpos="notext" data-theme="a" data-inline="true" onClick="togleOptionShuffle();">Shuffle</a>

                        </div>

                    </div>

                    <div data-role="collapsible" data-mini="true" data-collapsed="false" data-theme="b" data-content-theme="d">
                        <h3>Current playlist</h3>
                        <ul class="INJECT_TRACKS_TO_PLAY" data-role="listview"  data-split-icon="app-play" data-split-theme="d" >
                        </ul>
                    </div>

                </div><!-- /content -->
                <jsp:include page="includes/pop_footer.jsp"/>
            </div><!-- /page -->
        </body>
</html>