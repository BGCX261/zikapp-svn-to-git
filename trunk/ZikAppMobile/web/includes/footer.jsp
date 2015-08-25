<div data-id="myfooter" data-theme="a" >
    <style>
        .my-player .ui-btn .ui-btn-inner { padding-top: 40px !important; }
        .my-player .ui-btn .ui-icon { width: 30px!important; height: 30px!important; margin-left: -15px !important; box-shadow: none!important; -moz-box-shadow: none!important; -webkit-box-shadow: none!important; -webkit-border-radius: 0 !important; border-radius: 0 !important; }
        #prev .ui-icon { background:  url(resources/img/prev_track.png)  50% 50% no-repeat;  background-size: 22px 22px; }
        #backward .ui-icon { background:  url(resources/img/backward.png)  50% 50% no-repeat;  background-size: 22px 22px; }
        #play .ui-icon { background:  url(resources/img/play.png) 50% 50% no-repeat;   background-size: 22px 22px; }
        #pause .ui-icon { background: url(resources/img/pause.png)  50% 50% no-repeat;  background-size: 22px 22px; }
        #stop .ui-icon { background:  url(resources/img/stop.png)  50% 50% no-repeat;   background-size: 22px 22px; }
        #forward .ui-icon { background:  url(resources/img/forward.png)  50% 50% no-repeat;  background-size: 22px 22px; }
        #next .ui-icon { background:  url(resources/img/next_track.png)  50% 50% no-repeat;   background-size: 22px 22px; }

        #playlisttracks { overflow: auto; height: 62%; width: 97%; top: 258px; left: 0; list-style-type: none; border: 1px solid #2489ce; position: fixed; z-index: 3; background-color: #e5e5e5;}
        #playlisttracks li { border-bottom: 1px solid #2489ce; margin-left: -38px;}
        #playlistname { text-align: center; border: 1px solid #2489ce; position: fixed; height: 20px; left: 0; top: 253px; width: 100%; background-color: #e5e5e5; z-index: 3;}
        #myCollapsible { max-height: 100%; position: fixed; top: 92%; width: 100%; opacity: 1; background-color: #e5e5e5; z-index: 3; }
        
    </style>
    <script>
        var test = true;
        $(document).on('pageinit', function(event){
            $(".ui-btn-up-c","#myCollapsible").click(function(){
                if(test)
                    {
                        $("#myCollapsible").attr("style", "top:72px;");
                        test =!test;
                    }
                else {
                    $("#myCollapsible").attr("style", "top:92%;");
                    test =!test;
                }
            }); 
        });
    </script>

    <div data-role="collapsible" data-mini="false" id="myCollapsible" >
        <h3><div id="tracktitle">morceau en lecture</div></h3>
        <div id="slider">
            <span id="currenttime">00:00</span><span id="trackduration" class="pull-right">00:00</span>
            <input id="timeslide" type="range" min="0" max="100" step="1" value="0" onchange="trackGoTo(this.value)" data-role="none" />

        </div>
        <div data-role="navbar" class="my-player" data-grid="d" >
            <ul>
                <li><a href="#" data-role="button" data-icon="custom" id="prev" onclick="playPrev();"></a></li>
                <li><a href="#" data-role="button" data-icon="custom" id="backward"  onclick="trackPrev();"></a></li>
                <li id="liplay"><a href="#" data-role="button" data-icon="custom" id="play" onclick="playCurrent();" ></a></li><!-- onclick: voir tools.js -->
                <li><a href="#" data-role="button" data-icon="custom" id="forward"  onclick="trackNext();"></a></li>
                <li><a href="#" data-role="button" data-icon="custom" id="next"  onclick=" playNext();"></a></li>
            </ul>
        </div>
        <div id="playlistname">Nouvelle play list</div>
        <ul id="playlisttracks"></ul>
    </div>
</div><!-- /footer -->