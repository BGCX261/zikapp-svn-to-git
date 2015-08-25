<div  id="footer" data-id="foo1" data-role="footer" data-position="fixed" data-tap-toggle="false" data-theme="b" >

    <style>
       

        #popupPanelPlayer-popup {
            width: 100%;
            bottom: 0 !important;
            top: auto !important;
        }
        #popupPanelPlayer {

            border: 1px solid #000;
            border-top: none;
            background: rgba(0,0,0,.5);
            margin: 0 -10px ;

        </style>
        <script>
            //Because the popup container is positioned absolute, you can't make the panel full height with height:100%;. This small script sets the height of the popup to the actual screen height.

            $( "#popupPanel" ).on({
                popupbeforeposition: function() {
                    var h = $( window ).height();

                    $( "#popupPanel" ).css( "height", h );
                }
            });
        </script>

        <div data-role="popup" style="top: 60%;" id="popupPanelPlayer" data-corners="false" data-theme="none" data-shadow="false" data-tolerance="0,0">
            <jsp:include page="pop_player.jsp"/>
        </div>
        <a href="#popupPanelPlayer" data-rel="popup" data-transition="slideup" data-position-to="window" data-role="button" style="width:100%; height: 40px;"> 
            <span class="playlistname">Player controls</span>
        </a>

    </div><!-- /FOOTER -->