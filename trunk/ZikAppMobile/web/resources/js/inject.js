"use strict"

var injectDebug;

/**
 * Attributs des données:
 * nom du webService, 
 * callBackMarkup: callback de mise en forme html des donnees
 * callbackRefresh: callback de rafraichissement des themes
 */
var _dataAttributes = {
    
    
    
    
    
    // ******************************************************************************************************
    // *                                               PLAYER 
    // ******************************************************************************************************
    player: [ 
    {
        injectClass: 'INJECT_TRACKS_TO_PLAY',
        query: 'local',
        ws: g_playList, /*playList, /* ds module mPlayer.js */
        callBackMarkup:  function(item){
            if(injectDebug>=2)  console.log("-----INJECT_TRACKS_TO_PLAY item-----");
            if(injectDebug>=2) console.log(item);
            
            if(item == undefined ){
                return;
            }
            var cover;
            if(item.coverPath==undefined || item.coverPath=='undefined'){
                cover="./resources/img/blank_cover.png";
                
            }else{
                cover=item.coverPath;
            }
        
            // console.log(item);
            //return '<li><img src="'+cover+'" alt="France" class="ui-li-icon">'+item.name+' - '+ item.album +'</li>';
            if(injectDebug>=2) console.log("ITEM INDEX:"+item.index);
            return '<li>\n\
                        <a <a href="track_details.jsp?id='+item.id+'&back=player.jsp">\n\
                            <img src="'+cover+'" alt="France" class="ui-li-icon">\n\
                            '+item.title+' - '+ item.album +'\n\
                        </a>\n\
                        <a href="#" data-rel="popup" data-position-to="window" data-transition="pop" onClick="playTrackAlreadyInList('+item.index+');">Play</a>\n\
                    </li>';
                
            
        },
        callbackRefresh: function(pageAttributes){
            var $div = pageAttributes.$page.find('.INJECT_TRACKS_TO_PLAY');
            if ( $div.hasClass('ui-listview')) {
                $div.listview('refresh');
            } 
            else {
                $div.trigger('create');
            }
        }
    },
    {
        injectClass: 'INJECT_CURRENT_TRACK_DETAILS',
        query: 'local',
        ws: g_currentPlayedSound,  
        callBackMarkup:  function(item){
        
            if(injectDebug>=2)console.log("-----INJECT_CURRENT_TRACK_DETAILS item-----");
            if(injectDebug>=2)console.log(item);
            if(injectDebug>=2)console.log("playListCurrentIndex:"+playListCurrentIndex);
            if(item == undefined ){
                item={
                    name:"",
                    album:"",
                    years:"",
                    author:"",
                    style:""
                }
            }
         
            return '<table>\n\
                        <tr>\n\
                            <td><label for="title">Title:</label></td>\n\
                            <td><input data-mini="true" type="text" readonly  name="title" value="'+item.name+'" /></td>\n\
                        </tr>\n\
                        <tr>\n\
                            <td><label for="author">Album:</label></td>\n\
                            <td><input data-mini="true" type="text" readonly name="author" value="'+item.album+'" /></td>\n\
                        </tr>\n\
                        <tr>\n\
                            <td><label for="year">Year:</label></td>\n\
                            <td><input data-mini="true" type="text" readonly name="year" value="'+item.years+'" /></td>\n\
                        </tr>\n\
                        <tr>\n\
                            <td><label for="author">Author:</label></td>\n\
                            <td><input data-mini="true" type="text" readonly name="author" value="'+item.author+'" /></td>\n\
                        </tr>\n\
                        <tr>\n\
                            <td><label for="style">Style:</label></td>\n\
                            <td><input data-mini="true" type="text" readonly name="style" value="'+item.style+'" /></td>\n\
                        </tr>\n\
                    </table>';
    
        },
        callbackRefresh: function(pageAttributes){
            var $div = pageAttributes.$page.find('.INJECT_CURRENT_TRACK_DETAILS');
            $div.trigger('create');
        }
    },
    {
        injectClass: 'INJECT_COVER',
        query: 'local',
        ws: g_currentPlayedSound,  
        callBackMarkup:  function(item){
            if(injectDebug>=2)console.log("-----XXXXXXXXXXXXX INJECT_COVER item-----");
            if(injectDebug>=2)console.log(item);
            if(injectDebug>=2)console.log("playListCurrentIndex:"+playListCurrentIndex);
            
            var cover;
            if(item==null || item.coverPath==undefined || item.coverPath=='undefined'){
                cover="./resources/img/blank_cover.png";
                
            }else{
                cover=item.coverPath;
            }
        
        
            if(injectDebug>=2)console.log("COVER: "+cover);
            return '<img src="'+cover+'" style="width: 100px; height:100px;"/>';
        },
        callbackRefresh: function(pageAttributes){
            var $div = pageAttributes.$page.find('.INJECT_COVER');
            $div.trigger('create');
        }
    }
    ],
    
    
    
    
    
    // ******************************************************************************************************
    // *                                               TRACKS 
    // ******************************************************************************************************
    tracks: {
        injectClass: 'INJECT_MY_TRACKS',
        query: 'all',
        ws: 'track',
        callBackMarkup:  function(item){
            if(injectDebug>=2)console.log(item);
            //console.log("CALLBACK TRACKS!");
            var play =  makePlayTrackMarkup(item);
            var add  = makeAddTrackMarkup(item);
            var addPlay = makeAddTrackPlayMarkup(item);
            var cover;
            
            
            if(item.coverPath==undefined){
                cover="./resources/img/blank_cover.png";
                
            }else{
                cover=item.coverPath;
            }
            //console.log(item);
            return '<li>\n\
                        <a href="track_details.jsp?id='+item.id+'&back=tracks.jsp">\n\
                            <img src="'+cover+'" />\n\
                            <h3>'+item.title+'</h3>\n\
                            <p>'+item.album+'</p>\n\
                        </a>\n\
                        <a href="#track'+item.id+'popup" data-rel="popup">Ecouter</a>\n\
                        <div class="popup" data-dismissible="false" data-role="popup" id="track'+item.id+'popup" data-shadow="true" data-position-to="window" data-overlay-theme="a"  >\n\
                            <a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>\n\
                            <div data-role="content">\n\
                                <h1>Player Control</h1>\n\
                                <a href="#" data-role="button" data-rel="back" onclick="'+play+'" data-theme="b" class="closepopup">Play</a>\n\
                                <a href="#" data-role="button" data-rel="back" onclick="'+add+'"  data-theme="b" class="closepopup">Add</a>\n\
                                <a href="#" data-role="button" data-rel="back" onclick="'+addPlay+'"  data-theme="b" class="closepopup">Add & play</a>\n\
                            </div>\n\
                        </div>\n\
                    </li>';
        //return '<li><a href="#TrackDetails?id='+item.id+'"><h3>'+item.title+'</h3><p>'+item.album+'</p></a><a onClick="playTrack(\'track1\', \''+getRemoteUrl(item.webPath)+'\', \''+item.title+'\' );" data-rel="popup" data-position-to="window" data-transition="pop">Ecouter</a></li>';
    
        },
        callbackRefresh: function(pageAttributes){
            var $div = pageAttributes.$page.find('.INJECT_MY_TRACKS');
            if ( $div.hasClass('ui-listview')) {
                $div.listview('refresh');
            } 
            else {
                $div.trigger('create');
            }
            
            $div = pageAttributes.$page.find('.popup');
            $div.popup();
            $div.trigger('create');
           
        }
    },
    
    
    
    
    // ******************************************************************************************************
    // *                                               PLAYLISTS 
    // ******************************************************************************************************
    playlists: {
        injectClass: 'INJECT_MY_PLAYLISTS',
        query: 'all',
        ws: 'playlist',
        callBackMarkup: function(item){
            //return '<li>
            //<a href="playlist_details.jsp?id='+item.id+'&back=playlists.jsp"><h3>'+item.name+'</h3><p>'+item.createdAt+'</p></a><a onClick="" data-rel="popup" data-position-to="window" data-transition="pop">Ecouter</a></li>';
                    
             
            var add  = makeAddPlaylistMarkup(item);
            var addPlay = makeAddPlaylistPlayMarkup(item);
            
            return '<li>\n\
                       <a href="playlist_details.jsp?id='+item.id+'&back=playlists.jsp">\n\
                            <h3>'+item.name+'</h3>\n\
                            <p>'+item.createdAt+'</p>\n\
                        </a>\n\
                        <a href="#playlist'+item.id+'popup" data-rel="popup">Ecouter</a>\n\
                        <div class="popup" data-dismissible="false" data-role="popup" id="playlist'+item.id+'popup" data-shadow="true" data-position-to="window" data-overlay-theme="a"  >\n\
                            <a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>\n\
                            <div data-role="content">\n\
                                <h1>Player Control</h1>\n\
                                <a href="#" data-role="button" data-rel="back" onclick="'+add+'"  data-theme="b" class="closepopup">Add</a>\n\
                                <a href="#" data-role="button" data-rel="back" onclick="'+addPlay+'"  data-theme="b" class="closepopup">Add & play</a>\n\
                            </div>\n\
                        </div>\n\
                    </li>';

        },
        callbackRefresh: function(pageAttributes){
            var $div = pageAttributes.$page.find('.INJECT_MY_PLAYLISTS');
            if ( $div.hasClass('ui-listview')) {
                $div.listview('refresh');
            } 
            else {
                $div.trigger('create');
            }
                       
            $div = pageAttributes.$page.find('.popup');
            $div.popup();
            $div.trigger('create');
            
        }
    },
    
    
    
    
    // ******************************************************************************************************
    // *                                               TRACKS DETAILS
    // ******************************************************************************************************
    track_details:{
        injectClass: 'INJECT_ME',
        query: 'id',
        ws: 'track',
        callBackMarkup: function(item){
            if(injectDebug>=2)console.log(item);
            
            
            
            var play =  makePlayTrackMarkup(item);
            var add  = makeAddTrackMarkup(item);
            var addPlay = makeAddTrackPlayMarkup(item);
            
            
            var cover;
            if(item.coverPath==undefined){
                cover="./resources/img/blank_cover.png";
                
            }else{
                cover=item.coverPath;
            }
            
            return '<div class="ui-grid-a">\n\
                        <div class="ui-block-a">\n\
                                <img src="'+cover+'" style="width: 150px; height:150px;"/>\n\
                        </div>\n\
                        <div class="ui-block-b">\n\
                            <a href="#" data-role="button" onclick="'+play+'"data-theme="b" data-mini="true">Play</a>\n\
                            <a href="#" data-role="button" onclick="'+add+'"  data-theme="b" data-mini="true">Add</a>\n\
                            <a href="#" data-role="button" onclick="'+addPlay+'"  data-theme="b" data-mini="true">Add & play</a>\n\
                        </div>\n\
                    </div>\n\
                    <div class="ui-grid-solo" >\n\
                        <div class="ui-block-a">\n\
                            <table>\n\
                                <tr>\n\
                                    <td><label for="title">Titre:</label></td>\n\
                                    <td><input data-mini="true" type="text" readonly name="title" value="'+item.title+'" /></td>\n\
                                </tr>\n\
                                <tr>\n\
                                    <td><label for="author">Album:</label></td>\n\
                                    <td><input data-mini="true" type="text" readonly name="author" value="'+item.album+'" /></td>\n\
                                </tr>\n\
                                <tr>\n\
                                    <td><label for="year">Année:</label></td>\n\
                                    <td><input data-mini="true" type="text" readonly name="year" value="'+item.years+'" /></td>\n\
                                </tr>\n\
                                <tr>\n\
                                    <td><label for="author">Autheur:</label></td>\n\
                                    <td><input data-mini="true" type="text" readonly name="author" value="'+item.author+'" /></td>\n\
                                </tr>\n\
                                <tr>\n\
                                    <td><label for="style">Genre:</label></td>\n\
                                    <td><input data-mini="true" type="text" readonly name="style" value="'+item.style+'" /></td>\n\
                                </tr>\n\
                            </table>\n\
                        </div>\n\
                    </div><!-- /grid-solo -->';
        //return '<h3>'+item.title+'</h3><p>'+item.album+'</p>'+'<p>'+item.author+'</p>'+'<p>'+item.id+'</p>'+'<p>'+item.localPath+'</p>'+'<p>'+item.style+'</p>'+'<p>'+item.webPath+'</p>'+'<p>'+item.years+'</p>';               
        },
        callbackRefresh: function(pageAttributes){
            var $div = pageAttributes.$page.find('.INJECT_ME');
            $div.trigger('create');
        }
    },
    
    
    
    
    // ******************************************************************************************************
    // *                                               PLAYLISTS DETAILS 
    // ******************************************************************************************************
    
    playlist_details: {
        injectClass: 'INJECT_PLAYLIST_CONTENT',
        query: 'id',
        ws: 'playlist', //FIXME
        callBackMarkup:  function(playlist){
            if(injectDebug>=2)console.log(playlist);
                     
            var $div = $('.INJECT_PLAYLIST_TITLE');
            $div.html(playlist.name);
                     
            var html="";
            console.log("playlist:");
            console.log(playlist);
            
            // Cas d'une playlist vide
            //
            if(playlist.tracks == undefined || playlist.tracks=='undefined'){
                return null;
            }
            for( var i=0; i<playlist.tracks.length; i++){
                var item=playlist.tracks[i].track;
            
                if(injectDebug>=2)console.log(item);
                
                var play =  makePlayTrackMarkup(item);
                var add  = makeAddTrackMarkup(item);
                var addPlay = makeAddTrackPlayMarkup(item);
                var cover;
                var back= escape('playlist_details.jsp?id='+playlist.id);//use this before 'sending' 
                if(item.coverPath==undefined){
                    cover="./resources/img/blank_cover.png";
                
                }else{
                    cover=item.coverPath;
                }
                 
                html+= '<li>\n\
                        <a href="track_details.jsp?id='+item.id+'&back='+back+'">\n\
                            <img src="'+cover+'" />\n\
                            <h3>'+item.title+'</h3>\n\
                            <p>'+item.album+'</p>\n\
                        </a>\n\
                        <a href="#track'+item.id+'popup" data-rel="popup">Ecouter</a>\n\
                        <div class="popup" data-dismissible="false" data-role="popup" id="track'+item.id+'popup" data-shadow="true" data-position-to="window" data-overlay-theme="a"  >\n\
                            <a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>\n\
                            <div data-role="content">\n\
                                <h1>Player Control</h1>\n\
                                <a href="#" data-role="button" data-rel="back" onclick="'+play+'" data-theme="b" class="closepopup">Play</a>\n\
                                <a href="#" data-role="button" data-rel="back" onclick="'+add+'"  data-theme="b" class="closepopup">Add</a>\n\
                                <a href="#" data-role="button" data-rel="back" onclick="'+addPlay+'"  data-theme="b" class="closepopup">Add & play</a>\n\
                            </div>\n\
                        </div>\n\
                    </li>';
            
            }//for
            return html;
        },
        callbackRefresh: function(pageAttributes){
        
             
            
            var $div = pageAttributes.$page.find('.INJECT_PLAYLIST_CONTENT');
            if ( $div.hasClass('ui-listview')) {
                $div.listview('refresh');
            } 
            else {
                $div.trigger('create');
            }
            
            
            
            $div = pageAttributes.$page.find('.popup');
            $div.popup();
            $div.trigger('create');
           
            $div = $('.MY-COLLAPSIBLE');
              
            console.log($div);
            //$div.trigger( "expand" );	
            $div.trigger("create"); 
           
        }
    },
    
    
    // ******************************************************************************************************
    // *                                               SOCIAL 
    // ******************************************************************************************************
  
    social_: {
        injectClass: 'INJECT_ME',
        query: 'all',
        ws: 'track',
        callBackMarkup:  function(item){
            if(injectDebug>=2)console.log(item);
            //console.log("CALLBACK TRACKS!");
            var play =  makePlayTrackMarkup(item);
            var add  = makeAddTrackMarkup(item);
            var addPlay = makeAddTrackPlayMarkup(item);
            var cover;
            if(item.coverPath==undefined){
                cover="./resources/img/blank_cover.png";
                
            }else{
                cover=item.coverPath;
            }
            //console.log(item);
            return '<li>\n\
                        <a href="track_details.jsp?id='+item.id+'&back=tracks.jsp">\n\
                            <img src="'+cover+'" />\n\
                            <h3>'+item.title+'</h3>\n\
                            <p>'+item.album+'</p>\n\
                        </a>\n\
                        <a href="#track'+item.id+'popup" data-rel="popup">Ecouter</a>\n\
                        <div class="popup" data-dismissible="false" data-role="popup" id="track'+item.id+'popup" data-shadow="true" data-position-to="window" data-overlay-theme="a"  >\n\
                            <a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>\n\
                            <div data-role="content">\n\
                                <h1>Player Control</h1>\n\
                                <a href="#" data-role="button" data-rel="back" onclick="'+play+'" data-theme="b" class="closepopup">Play</a>\n\
                                <a href="#" data-role="button" data-rel="back" onclick="'+add+'"  data-theme="b" class="closepopup">Add</a>\n\
                                <a href="#" data-role="button" data-rel="back" onclick="'+addPlay+'"  data-theme="b" class="closepopup">Add & play</a>\n\
                            </div>\n\
                        </div>\n\
                    </li>';
        //return '<li><a href="#TrackDetails?id='+item.id+'"><h3>'+item.title+'</h3><p>'+item.album+'</p></a><a onClick="playTrack(\'track1\', \''+getRemoteUrl(item.webPath)+'\', \''+item.title+'\' );" data-rel="popup" data-position-to="window" data-transition="pop">Ecouter</a></li>';
    
        },
        callbackRefresh: function(pageAttributes){
            var $div = pageAttributes.$page.find('.INJECT_ME');
            if ( $div.hasClass('ui-listview')) {
                $div.listview('refresh');
            } 
            else {
                $div.trigger('create');
            }
            
            $div = pageAttributes.$page.find('.popup');
            $div.popup();
            $div.trigger('create');
           
        }
    },
    
    // ******************************************************************************************************
    // *                                               SOCIAL DETAILS
    // ******************************************************************************************************
  
    
    social_detail_: {
        injectClass: 'INJECT_ME',
        query: 'id',
        ws: 'playlist', //FIXME
        callBackMarkup:  function(item){
           
        },
        callbackRefresh: function(pageAttributes){
           
        }
    }
}
 
