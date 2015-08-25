<div id="header" data-id="foo" data-role="header" data-position="fixed" data-tap-toggle="false" data-theme="b">


    <style>
        .myNavBar .ui-btn .ui-btn-inner { padding-top: 40px !important; }
        .myNavBar .ui-btn .ui-icon { width: 30px!important; height: 30px!important; margin-left: -15px !important; box-shadow: none!important; -moz-box-shadow: none!important; -webkit-box-shadow: none!important; -webkit-border-radius: 0 !important; border-radius: 0 !important; }
        #nav-player .ui-icon { background:  url(resources/img/ipod.png)  50% 50% no-repeat;  background-size: 22px 22px; }
        #nav-tracks .ui-icon { background:  url(resources/img/note-2.png) 50% 50% no-repeat;   background-size: 22px 22px; }
        #nav-playlists .ui-icon { background: url(resources/img/list.png)  50% 50% no-repeat;  background-size: 22px 22px; }
        #nav-upload .ui-icon { background:  url(resources/img/upload.png)  50% 50% no-repeat;   background-size: 22px 22px; }
        #nav-social .ui-icon { background:  url(resources/img/social.png)  50% 50% no-repeat;   background-size: 22px 22px; }

    </style>

    <a href="options.jsp" data-icon="gear" class="ui-btn-right" data-theme="b">Options</a>

    <span class="ui-title" >ZikApp Mobile</span>
    <div data-role="navbar" class="myNavBar">
        <ul>
            <li><a id="nav-player" href="player.jsp" data-icon="custom" >Player</a></li>
            <li><a id="nav-tracks" href="tracks.jsp" data-icon="custom">Tracks</a></li>
            <li><a id="nav-playlists" href="playlists.jsp" data-icon="custom" >Playlists</a></li>
            <li><a id="nav-upload" href="upload.jsp" data-icon="custom" >Upload</a></li>
            <li><a id="nav-social" href="social.jsp" data-icon="custom" >Social</a></li>
        </ul>
    </div><!-- /navbar -->

</div><!-- /header -->